import React, { useEffect, useState } from 'react';
import { DeviceMotion } from 'expo-sensors';


export function DeviceMotionComponent() {
    const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0, time: 0 });

    const [subscription, setSubscription] = useState(null);

    const startTime = Date.now()

    useEffect(() => {
        if (DeviceMotion.isAvailableAsync()) {
            DeviceMotion.setUpdateInterval(50)

            // Subscribe to device motion sensor updates when the component mounts
            const motionSubscription = DeviceMotion.addListener(handleMotionUpdate);

            // Save the subscription to state for later removal
            setSubscription(motionSubscription);

            // Clean up the subscription when the component unmounts
            return () => {
                if (subscription) {
                    motionSubscription.remove();
                    setSubscription(null)
                }
            }
        }
    }, [])

    const handleMotionUpdate = async (motionData) => {
        try {
            // Update the acceleration state when a new motion data is received

            const timeStamp = Date.now()
            const updatedAcceleration = {
                x: motionData.acceleration.x,
                y: motionData.acceleration.y,
                z: motionData.acceleration.z,
                time: timeStamp // Update the timestamp here
            };
            setAcceleration(updatedAcceleration);

        } catch (error) {
            //console.error('Error occurred in handleMotionUpdate:', error);
            console.error(error.stack);
        }

    };
    return { acceleration }
}

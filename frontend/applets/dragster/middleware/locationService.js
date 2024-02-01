import * as Location from 'expo-location';
import { useEffect, useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLocation = async () => {
      try {
        const options = { accuracy: Location.Accuracy.BestForNavigation }
        let location = await Location.getCurrentPositionAsync(options);
        if (isMounted) {
          setLocation(location);
          
        }
      } catch (error) {
        setErrorMsg('Error fetching location');
      }
    };

    const interval = setInterval(fetchLocation, 100); // 

    return () => {
      console.log("location stopped")
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
    })();
  }, []); // Request permission only when the component mounts

  return { location, errorMsg };
}



export const calculateAverage = (magnitudeLog) => {
  const dataPoints = magnitudeLog.slice(50, 1000); // Get the first 100 data points
  const sum = dataPoints.reduce((total, data) => total + data.mag, 0);
  const average = sum / dataPoints.length;
  return average;
};

export const getMagnitude = (accel) => {

  var mag = Math.sqrt(((accel.x) ** 2 + (accel.y) ** 2 + (accel.z ** 2)))
  
  return(mag);
  };

// Function to detect a spike in magnitude and return the timestamp
export function detectMagnitudeSpike(magnitudes, threshold = 1.2) {
  for (let i = 0; i < magnitudes.length; i++) {
    if (magnitudes[i].magnitude > threshold) {
      return magnitudes[i].timestamp
    }
  }

  // If no spike is found, return null
  return null
}


// Function to process the acceleration data
export function processAccelerationData(accelerationLog) {
  const magnitudesWithTimestamp = accelerationLog.map((accel) => {
    const magnitude = getMagnitude(accel);
    const timestamp = accel.time
    return { magnitude, timestamp };
  });
  
  const magSpike = detectMagnitudeSpike(magnitudesWithTimestamp, 1)

  return {magnitudesWithTimestamp, magSpike};
}


export function splitLocationData(locationLog, splitTimestamp) {
  let splitIndex

  if (splitTimestamp){
  splitIndex = locationLog.findIndex(item => item.timestamp >= splitTimestamp)
  } else {return { calibrationData: locationLog, runData: [] }}

  if (splitIndex === -1) {
    // SplitTimestamp is greater than all timestamps, so all data is calibrationData
    return { calibrationData: locationLog, runData: [] };
  }

  // Split the locationLog array based on the found index
  const calibrationData = locationLog.slice(0, splitIndex);
  const runData = locationLog.slice(splitIndex);

  return { calibrationData, runData };
}



// Function to process the location data
export function processLocationData(locationLog, acc) {
  const data = splitLocationData(locationLog, acc.magSpike)
  return data
}



// Function to calculate the duration of the run in seconds
export function calculateRunDuration(runData, realTimestamp) {
  if (runData.length === 0) {
    return 0;
  }
  

  ///////////////////////
  //////////////////////
  //need to get end time from magnitude spike in other direction
  //in order to get more accurate end time
  const startTime = realTimestamp / 1000; // Convert to seconds
  const endTime = runData[runData.length - 1].timestamp / 1000; // Convert to seconds

  return endTime - startTime;
}



// Function to calculate the distance covered during the run in meters
export function calculateRunDistance(runData) {
  //console.log(runData)
  if (runData.length <= 1) {
    return 0;
  }

  const earthRadius = 6371000

  let totalDistance = 0;
  for (let i = 1; i < runData.length; i++) {
    const prevLat = runData[i - 1].coords.latitude;
    const prevLon = runData[i - 1].coords.longitude;
    const currLat = runData[i].coords.latitude;
    const currLon = runData[i].coords.longitude;

    // Calculate distance using Haversine formula
    const dLat = toRadians(currLat - prevLat);
    const dLon = toRadians(currLon - prevLon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(prevLat)) * Math.cos(toRadians(currLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    totalDistance += distance;
  }

  const feetPerMeter = 3.28084

  return totalDistance * feetPerMeter ;
}

// Function to find the timestamp when distance reached 402.336 meters
export function findTimestampAtDistance(runData, realStartTime, targetDistance = 402) {
  if (runData.length <= 1) {
    return null;
  }

  startTime = realStartTime / 1000

  const earthRadius = 6371000; // Earth's radius in meters
  let totalDistance = 0;

  for (let i = 1; i < runData.length; i++) {
    const prevLat = runData[i - 1].coords.latitude;
    const prevLon = runData[i - 1].coords.longitude;
    const currLat = runData[i].coords.latitude;
    const currLon = runData[i].coords.longitude;

    // Calculate distance using Haversine formula
    const dLat = toRadians(currLat - prevLat);
    const dLon = toRadians(currLon - prevLon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(prevLat)) * Math.cos(toRadians(currLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    totalDistance += distance;

    if (totalDistance >= targetDistance) {
      return (runData[i].timestamp / 1000) - startTime;
    }
  }

  return null;
}


// Function to convert degrees to radians
function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

// Function to find the top speed during the run in km/h
export function findTopSpeed(runData) {
  if (runData.length === 0) {
    return 0;
  }

  let topSpeed = 0;
  for (let i = 0; i < runData.length; i++) {
    const speed = runData[i].coords.speed;
    if (speed > topSpeed) {
      topSpeed = speed;
    }
  }

  return topSpeed 
}


export function findDuplicateLocation(locationLog) {
  // Extract timestamps from the locationLog array
  const timestamps = locationLog.map((item) => item.timestamp);

  // Find duplicate timestamps and count occurrences using reduce
  const duplicates = timestamps.reduce((acc, timestamp) => {
    acc[timestamp] = (acc[timestamp] || 0) + 1;
    return acc;
  }, {});

  // Filter out the duplicate timestamps with their count
  const duplicateTimestamps = Object.entries(duplicates)
    .filter(([timestamp, count]) => count > 1)
    .map(([timestamp, count]) => ({ timestamp: parseFloat(timestamp), count }));

  return duplicateTimestamps;
}


//
//
//
//
// Function to process
export function processData(locationLog, accelerationLog) {
  const acc = processAccelerationData(accelerationLog) // returns {magnitudesWithTimestamp, magSpike}
  const loc = processLocationData(locationLog, acc) // returns { calibrationData, runData }

  const runData = loc.runData
  const calibrationData = loc.calibrationData // i think this is useless i need sleep

  const runDuration = calculateRunDuration(runData, acc.magSpike).toFixed(3);
  const runDistance = calculateRunDistance(runData).toFixed(3);
  const topSpeed = findTopSpeed(runData);
  
  const timedQuarterMile = findTimestampAtDistance(runData, acc.magSpike)

  const metersPerSecondMPH = 2.23694
  const metersPerSecondKPH = 3.6

  const topSpeedMPH = (topSpeed * metersPerSecondMPH).toFixed(3); // Convert m/s to mph
  const topSpeedKMH = (topSpeed * metersPerSecondKPH).toFixed(3) // convert to kph
  const quarterMileTime = timedQuarterMile ? timedQuarterMile.toFixed(3) : "0.000"

  console.log("Run Duration (seconds):", runDuration);
  console.log("Run Distance (feet):", runDistance);
  console.log("Top Speed (km/h):", topSpeedKMH);
  console.log("qrtr mile time:", quarterMileTime)


  return {runDuration, runDistance, topSpeedMPH, topSpeedKMH, quarterMileTime}
}
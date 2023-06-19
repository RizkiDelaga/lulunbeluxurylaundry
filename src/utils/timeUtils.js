export function adjustTime(hour) {
    // Subtract the timezone offset
    let adjustedHour = hour - 7;
  
    // Check if the adjusted hour is negative
    if (adjustedHour < 0) {
      // Add 24 hours to convert it to a positive value
      adjustedHour += 24;
    }
  
    // Check if the adjusted hour is more than 24
    if (adjustedHour >= 24) {
      // Subtract 24 hours to adjust for the change in the day
      adjustedHour -= 24;
    }
  
    return adjustedHour;
  }
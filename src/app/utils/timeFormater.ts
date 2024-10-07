/* eslint-disable @typescript-eslint/no-explicit-any */
export function convertTo24HrsFormat(time12h : any) {
    const [time, modifier] = time12h.split(' '); // Split into time and AM/PM
    let [hours, minutes] = time.split(':'); // Split hours and minutes
  
    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12; // Add 12 for PM times
    }
  
    if (modifier === 'AM' && hours === '12') {
      hours = '00'; // Midnight case
    }
  
    return `${hours}:${minutes}`;
  }
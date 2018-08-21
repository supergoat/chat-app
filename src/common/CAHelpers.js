import { Dimensions, Platform } from 'react-native';

// Returns true if the phone is iphone X
export const isIphoneX = () => {
  let d = Dimensions.get('window');
  const { height, width } = d;

  return (
    // Check if the Platform is iOS
    Platform.OS === 'ios' &&
      // Accounting for the height in either orientation
      (height === 812 || width === 812)
  );
}

/**
 * Returns the time in the format HH:mm
 * @param { string } date - the date
 */
export const formatTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;

  return `${hours}:${minutes}`
}

/**
 * Returns the date in the format of the time zone the user is in
 * For example
 *  UK: DD/MM/YY
 *  US: MM/DD/YY
 * @param { string } date - the date
 */
export const formatDate = (date: Date) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }
  return date.toLocaleDateString(undefined, options);
}

/**
 * Returns:
 *  The time if the date is Today
 *  'YESTERDAY' if the date was yesterday
 *  The date if the date was before yesterday
 * @param { string } date - The date
 */
export const getTimeStamp = (date: Date) => {
  const dateNow = new Date();
  const dayDifference = Math.abs(dateNow.getDate() - date.getDate());
  const monthDifference = Math.abs(dateNow.getMonth() - date.getMonth());
  const yearDifference = Math.abs(dateNow.getFullYear() - date.getFullYear());

  const isSameMonthAndYear =  monthDifference + yearDifference === 0;
  const today = isSameMonthAndYear && dayDifference === 0
  const yesterday = isSameMonthAndYear && dayDifference === 1

  if (today) {
    return formatTime(date)
  } else if (yesterday) {
    return 'YESTERDAY'
  } else {
    return formatDate(date);
  }
}

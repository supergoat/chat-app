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

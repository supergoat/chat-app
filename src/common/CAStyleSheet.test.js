import { Platform } from 'react-native';
import CAStyleSheet from './CAStyleSheet';

describe('CAStyleSheet', () => {
  it('produces styles for ios that do not contain android styles', () => {
    // Set the platform to ios
    Platform.OS = 'ios';

    const styles = CAStyleSheet.create({
      button: {
        backgroundColor: 'blue',
        ios: {
          width: 100
        },
        android: {
          height: 100
        }
      }
    });

    const iosStyles = {
      button: {
        backgroundColor: 'blue',
        width: 100
      }
    };
    expect(styles).toEqual(iosStyles);
  });

  it('produces styles for android that do not contain ios styles', () => {
    // Set the platform to android
    Platform.OS = 'android';

    const styles = CAStyleSheet.create({
      button: {
        backgroundColor: 'blue',
        ios: {
          width: 100
        },
        android: {
          height: 100
        }
      }
    });

    const androidStyles = {
      button: {
        backgroundColor: 'blue',
        height: 100
      }
    };
    expect(styles).toEqual(androidStyles);
  });
});

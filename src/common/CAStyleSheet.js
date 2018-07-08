// @flow
import { StyleSheet, Platform } from "react-native";

/* =============================================================================
CAStyleSheet.create({})
--------------------------------------------------------------------------------
Enchanced StyleSheet
Allows the use of 'ios' and 'android' to specify platform specific styles

For example:
const styles = CAStyleSheet.create({
  property: {
    ...,
    ios: {
      ...
    },
    android: {
      ...
    }
  }
});

============================================================================= */

export default {
  create(styles: Object): { [name: string]: any } {
    const platformStyles = {};
    Object.keys(styles).forEach(name => {
      let { ios, android, ...style } = { ...styles[name] };
      if (ios && Platform.OS === "ios") {
        style = { ...style, ...ios };
      }
      if (android && Platform.OS === "android") {
        style = { ...style, ...android };
      }
      platformStyles[name] = style;
    });
    return StyleSheet.create(platformStyles);
  }
};

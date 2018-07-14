// @flow
import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import CAColors from "../common/CAColors";
import CAStyleSheet from "../common/CAStyleSheet";
import profilePhotoPlaceholder from '../assets/img/profile_photo_placeholder.png';

/* Constants
============================================================================= */
const PROFILE_PHOTO_HEIGHT = 50;
const PROFILE_PHOTO_WIDTH = PROFILE_PHOTO_HEIGHT;
const PROFILE_PHOTO_BORDER_RADIUS = PROFILE_PHOTO_HEIGHT / 2;

/** ============================================================================
<ProfilePhoto
  [profilePhoto]={string}
  name={string}
  [style]={object}
/>
--------------------------------------------------------------------------------
The profile photo of the user
@param { string } [profilePhoto] - The profile photo of the person
@param { string } name - The name of the person
@param { object } style - custom style
============================================================================= */
type Props = {
  profilePhoto?: string,
  name: string,
  style?: { [name: string]: any }
}
class ProfilePhoto extends Component<Props> {

  static __cards__: Function

  render() {
    const { profilePhoto, name, style } = this.props;
    return (
      <Image
        source={profilePhoto ? {uri: profilePhoto} : profilePhotoPlaceholder}
        style={[styles.profilePhoto, style]}
        alt={name}
      />
    )
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  profilePhoto: {
    backgroundColor: CAColors.gallery,
    borderRadius: PROFILE_PHOTO_BORDER_RADIUS,
    height: PROFILE_PHOTO_HEIGHT,
    width: PROFILE_PHOTO_WIDTH,
  }
});

/* Playground Cards - the different states of ProfilePhoto
============================================================================= */
ProfilePhoto.__cards__ = define => {
  define("Without Profile Photo", () => {
    return (
      <ProfilePhoto
        name="James Gordon"
      />
    )
  });

  define("With Profile Photo", () => {
     return (
       <ProfilePhoto
         profilePhoto='https://placekitten.com/60/60'
         name="Alex Stone"
       />
     )
  });
};


/* Export
============================================================================= */
export default ProfilePhoto;

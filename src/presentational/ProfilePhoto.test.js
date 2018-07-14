// @flow
import React from 'react';
import ProfilePhoto from './ProfilePhoto';
import renderer from 'react-test-renderer';

describe('ProfilePhoto', () => {
  it('displays the profilePhoto when its provided', () => {
    const tree = renderer.create(
      <ProfilePhoto
        profilePhoto='https://placekitten.com/60/60'
        name="Alex Stone"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays a placeholder image when the profilePhoto is NOT provided', () => {
    const tree = renderer.create(
      <ProfilePhoto
        name="James Gordon"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

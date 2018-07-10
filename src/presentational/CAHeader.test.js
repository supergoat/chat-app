// @flow
import React from 'react';
import { Platform } from 'react-native';
import CAHeader from './CAHeader';
import renderer from 'react-test-renderer';

describe('CAHeader', () => {
  it('renders correctly when the Platform is ios', () => {
    const tree = renderer.create(<CAHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when the Platform is android', () => {
    Platform.OS = 'android';
    const tree = renderer.create(<CAHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

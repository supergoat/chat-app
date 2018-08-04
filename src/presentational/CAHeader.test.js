// @flow
import React from 'react';
import { View, Text, Platform } from 'react-native';
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

  it('renders correctly when leftItem is provided', () => {
    Platform.OS = 'android';
    const tree = renderer.create(
      <CAHeader
        leftItem={
          <View>
            <Text>left item</Text>
          </View>
        }
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when rightItem is provided', () => {
    Platform.OS = 'android';
    const tree = renderer.create(
      <CAHeader
        rightItem={
          <View>
            <Text>right item</Text>
          </View>
        }
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when leftItem and rightItem are provided', () => {
    Platform.OS = 'android';
    const tree = renderer.create(
      <CAHeader
        leftItem={
          <View>
            <Text>left item</Text>
          </View>
        }
        rightItem={
          <View>
            <Text>right item</Text>
          </View>
        }
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

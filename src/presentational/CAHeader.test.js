// @flow
import React from 'react';
import { View, Text } from 'react-native';
import CAHeader from './CAHeader';
import renderer from 'react-test-renderer';

describe('CAHeader', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CAHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when leftItem is provided', () => {
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

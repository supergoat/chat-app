// @flow
import React from 'react';
import BackButton from './BackButton';
import renderer from 'react-test-renderer';

describe('BackButton', () => {

  // Mock TouchableOpacity so we can access onPress
  jest.mock('TouchableOpacity', () => {
    const RealComponent = require.requireActual('TouchableOpacity');
    const React = require('React');
    class TouchableOpacity extends React.Component {
      render() {
        return React.createElement('TouchableOpacity', this.props, this.props.children);
      }
    }
    TouchableOpacity.propTypes = RealComponent.propTypes;
    return TouchableOpacity;
  });

  it('renders correctly', () => {
    const tree = renderer.create(<BackButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls navigation pop from props when BackButton is pressed', () => {
    const navigation = {
      pop: jest.fn(() => console.log('Pop Called'))
    };

    const tree = renderer.create(
      <BackButton
        navigation={navigation}
      />
    );

    // Call on press
    tree.toJSON().props.onPress();

    expect(navigation.pop.mock.calls.length).toBe(1);
  });
});

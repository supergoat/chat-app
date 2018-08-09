// @flow
import React from 'react';
import MessageInput from './MessageInput';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('MessageInput', () => {

  it('renders correctly', () => {
    const tree = renderer.create(<MessageInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets the KeyboardAvoidingView behaviour to padding when iOS', () => {
    const component = shallow(<MessageInput />);
    const behavior = component.prop('behavior');
    expect(behavior).toEqual('padding');
  });

  it('sets the KeyboardAvoidingView behaviour to default when android', () => {
    // Set platform to android
    jest.mock('Platform', () => ({
      OS: 'android',
    }));

    const component = shallow(<MessageInput />);
    const behavior = component.prop('behavior');
    expect(behavior).toEqual('default');
  });

  it('sets the state to the message entered in the textInput', () => {
      const component = shallow(<MessageInput />);
      const textInput = component.find('TextInput');
      textInput.simulate('ChangeText', 'hello');
      expect(component.state('message')).toEqual('hello');
  });

  it('sets the state to the message entered in the textInput', () => {
      const component = shallow(<MessageInput />);
      const textInput = component.find('TextInput');
      textInput.simulate('ChangeText', 'hello');
      expect(component.state('message')).toEqual('hello');
  });

  it('clears the state message and calls onSendMessage from props', () => {
      const component = shallow(<MessageInput />);
      const sendMessage = component.find('TouchableOpacity');
      component.setState({ message: 'hello'})
      sendMessage.simulate('Press');
      expect(component.state('message')).toEqual('');
  });

  it('sets a paddingBottom to messageInput when the phone is iphone X', () => {
    const CAHelpers = require('../common/CAHelpers');

    // Mock isIphoneX to return true
    CAHelpers.isIphoneX = jest.fn(() => true);

    const tree = renderer.create(<MessageInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

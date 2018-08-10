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
      OS: 'android'
    }));

    const component = shallow(<MessageInput />);
    const behavior = component.prop('behavior');
    expect(behavior).toEqual('default');
  });

  it('sets a paddingBottom to messageInput when the phone is iphone X', () => {
    const CAHelpers = require('../common/CAHelpers');

    // Mock isIphoneX to return true
    CAHelpers.isIphoneX = jest.fn(() => true);

    const tree = renderer.create(<MessageInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('sets the state to the message entered in the textInput', () => {
    const component = shallow(<MessageInput />);
    const textInput = component.find('TextInput');
    textInput.simulate('ChangeText', 'hello');
    expect(component.state('message')).toEqual('hello');
  });

  describe('sendMessage', () => {
    it('does nothing if state message is empty', () => {
      const onSendMock = jest.fn();
      const component = shallow(<MessageInput onSend={onSendMock} />);
      const sendMessage = component.find('TouchableOpacity');
      sendMessage.simulate('Press');
      expect(component.state('message')).toEqual('');
      expect(onSendMock.mock.calls.length).toBe(0);
    });

    it('clears the state message and calls onSendMessage from props', () => {
      const onSendMock = jest.fn();
      const component = shallow(<MessageInput onSend={onSendMock} />);
      const sendMessage = component.find('TouchableOpacity');
      component.setState({ message: 'hello' });
      sendMessage.simulate('Press');
      expect(component.state('message')).toEqual('');
      expect(onSendMock.mock.calls.length).toBe(1);
    });

  })
});

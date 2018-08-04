// @flow
import React from 'react';
import ChatCard from './ChatCard';
import renderer from 'react-test-renderer';

describe('ChatCard', () => {
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

  // Custom constant date, so our snapshots don't fail when the date changes
  const customDate = new Date(2018, 1, 3, 15, 30);
  const RealDate = Date;

  beforeEach(() => {
    // Mock Date to always return our custom date
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(customDate);
      }
    };
  });

  afterEach(() => {
    // Set the Date back to the real date
    global.Date = RealDate;
  });

  it('displays the profilePhoto when it is provided', () => {
    const tree = renderer.create(
      <ChatCard
        profilePhoto='https://placekitten.com/60/60'
        name="Alex Stone"
        latestMessage={{
          text: "Hey whats up?",
          createdAt: new Date()
        }}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('it displays a profilePhoto placeholder when it is NOT provided', () => {
    const tree = renderer.create(
      <ChatCard
        name="James Gordon"
        latestMessage={{
          text: "Hey how is it going?",
          createdAt: new Date()
        }}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('truncates the latest message text when its longer than one line', () => {
    const tree = renderer.create(
      <ChatCard
        name="James Gordon"
        latestMessage={{
          text: "Hey man how is it going? Long time no see.",
          createdAt: new Date()
        }}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays a notification when there are undread messages', () => {
    const tree = renderer.create(
      <ChatCard
        name="James Gordon"
        latestMessage={{
          text: "Hey man how is it going? Long time no see.",
          createdAt: new Date()
        }}
        unRead={1}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onPress passed from props when ChatCard is pressed', () => {
    const onPressEvent = jest.fn(() => {
      console.log('On press event')
    });

    const tree = renderer.create(
      <ChatCard
        name="James Gordon"
        latestMessage={{
          text: "Hey man how is it going? Long time no see.",
          createdAt: new Date()
        }}
        onPress={onPressEvent}
      />
    );

    // Call on press
    tree.toJSON().props.onPress();

    expect(onPressEvent.mock.calls.length).toBe(1);
  });
});

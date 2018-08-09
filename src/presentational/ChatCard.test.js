// @flow
import React from 'react';
import ChatCard from './ChatCard';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('ChatCard', () => {

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
    const onPressMock = jest.fn();

    const component = shallow(
      <ChatCard
        name="James Gordon"
        latestMessage={{
          text: "Hey man how is it going? Long time no see.",
          createdAt: new Date()
        }}
        onPress={onPressMock}
      />
    );
    const sendMessage = component.find('TouchableOpacity');
    sendMessage.simulate('Press');
    expect(onPressMock.mock.calls.length).toBe(1);
  });
});

// @flow
import React from 'react';
import { Text } from 'react-native';
import ChatBubble from './ChatBubble';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';


describe('ChatBubble', () => {
  // // Custom constant date, so our snapshots don't fail when the date changes
  // const customDate = new Date(1, 1, 3, 9, 5);
  // const RealDate = Date;
  //
  // beforeEach(() => {
  //   // Mock Date to always return our custom date
  //   global.Date = class extends RealDate {
  //     constructor() {
  //       return new RealDate(customDate);
  //     }
  //   };
  // });
  //
  // afterEach(() => {
  //   global.Date = RealDate;
  // });

  it('renders correctly', () => {
    const message = {
      id: '1',
      text: 'Hello!',
      createdAt: new Date(1, 1, 3, 9, 5),
      createdBy: 'Panayiotis'
    };

    const tree = renderer.create(
      <ChatBubble
        message={message}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when isAlignedLeft is set to to true', () => {
    const message = {
      id: '1',
      text: 'Hello!',
      createdAt: new Date(1, 1, 3, 9, 5),
      createdBy: 'Panayiotis'
    };

    const tree = renderer.create(
      <ChatBubble
        isAlignedLeft={true}
        message={message}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a hidden text field used to correctly align the timestamp', () => {
    const message = {
      id: '1',
      text: 'Hello!',
      createdAt: new Date(1, 1, 3, 9, 5),
      createdBy: 'Panayiotis'
    };

    const component = shallow(
      <ChatBubble
        isAlignedLeft={true}
        message={message}
      />
    )

    expect(component.find(Text).at(1).exists()).toBe(true);
    expect(component.find(Text).at(1).prop('children')).toEqual('xxxxxx');
    expect(component.find(Text).at(1).prop('style')).toEqual({"color": "transparent", "opacity": 0});
  });
});

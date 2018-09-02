// @flow
import React from 'react';
import { Text } from 'react-native';
import Chat from './Chat';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';


describe('Chat', () => {
  it('renders correctly', () => {
    const messages = [{
      id: '1',
      text: 'Hello!',
      createdAt: new Date(1, 1, 3, 9, 5),
      createdBy: 'Panayiotis'
    }];

    const tree = renderer.create(
      <Chat
        didLoadAllMessages={false}
        messages={messages}
        onLoadMoreMessages={() => {}}
        refreshing={false}
        viewer={'Panayiotis'}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when didLoadAllMessages is set to true', () => {
    const messages = [{
      id: '1',
      text: 'Hello!',
      createdAt: new Date(1, 1, 3, 9, 5),
      createdBy: 'Panayiotis'
    }];

    const tree = renderer.create(
      <Chat
        didLoadAllMessages={true}
        messages={messages}
        onLoadMoreMessages={() => {}}
        refreshing={false}
        viewer={'Panayiotis'}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when refreshing is set to true', () => {
    const messages = [{
      id: '1',
      text: 'Hello!',
      createdAt: new Date(1, 1, 3, 9, 5),
      createdBy: 'Panayiotis'
    }];

    const tree = renderer.create(
      <Chat
        didLoadAllMessages={false}
        messages={messages}
        onLoadMoreMessages={() => {}}
        refreshing={true}
        viewer={'Panayiotis'}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('getMarginBottom', () => {
    it('returns 12 when its the first item', () => {
      const messages = [
        {
          id: '1',
          text: 'Hello!',
          createdAt: new Date(1, 1, 3, 9, 5),
          createdBy: 'Panayiotis'
        },
        {
          id: '2',
          text: 'Hey!',
          createdAt: new Date(1, 1, 3, 9, 5),
          createdBy: 'Alex'
        }
      ];

      const component = shallow(
        <Chat
          didLoadAllMessages={false}
          messages={messages}
          onLoadMoreMessages={() => {}}
          refreshing={true}
          viewer={'Panayiotis'}
        />
      )
      expect(component.instance().getMarginBottom(messages[0], 0)).toEqual(12);
    });

    it('returns 3 when the author of the previous item is the same', () => {
      const messages = [
        {
          id: '1',
          text: 'Hello!',
          createdAt: new Date(1, 1, 3, 9, 5),
          createdBy: 'Panayiotis'
        },
        {
          id: '2',
          text: 'How are you?',
          createdAt: new Date(1, 1, 3, 9, 5),
          createdBy: 'Panayiotis'
        }
      ];

      const component = shallow(
        <Chat
          didLoadAllMessages={false}
          messages={messages}
          onLoadMoreMessages={() => {}}
          refreshing={true}
          viewer={'Panayiotis'}
        />
      )
      expect(component.instance().getMarginBottom(messages[1], 1)).toEqual(3);
    });

    it('returns 12 when the author of the previous item is different', () => {
      const messages = [
        {
          id: '1',
          text: 'Hello!',
          createdAt: new Date(1, 1, 3, 9, 5),
          createdBy: 'Panayiotis'
        },
        {
          id: '2',
          text: 'Hey!',
          createdAt: new Date(1, 1, 3, 9, 5),
          createdBy: 'Alex'
        }
      ];

      const component = shallow(
        <Chat
          didLoadAllMessages={false}
          messages={messages}
          onLoadMoreMessages={() => {}}
          refreshing={true}
          viewer={'Panayiotis'}
        />
      )
      expect(component.instance().getMarginBottom(messages[1], 1)).toEqual(12);
    });
  });
});

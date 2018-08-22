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

  describe('isCloseToTop', () => {
    it('returns false when the viewer does not scroll to the top', () => {
      const messages = [{
        id: '1',
        text: 'Hello!',
        createdAt: new Date(1, 1, 3, 9, 5),
        createdBy: 'Panayiotis'
      }];

      const component = shallow(
        <Chat
          didLoadAllMessages={false}
          messages={messages}
          onLoadMoreMessages={() => {}}
          refreshing={true}
          viewer={'Panayiotis'}
        />
      );

      const nativeEvent = {
        layoutMeasurement: { height: 100 },
        contentOffset: { y: 100},
        contentSize: { height: 300}
      };
      expect(component.instance().isCloseToTop(nativeEvent)).toEqual(false);
    });

    it('returns true when the viewer scrolls to the top', () => {
      const messages = [{
        id: '1',
        text: 'Hello!',
        createdAt: new Date(1, 1, 3, 9, 5),
        createdBy: 'Panayiotis'
      }];

      const component = shallow(
        <Chat
          didLoadAllMessages={false}
          messages={messages}
          onLoadMoreMessages={() => {}}
          refreshing={true}
          viewer={'Panayiotis'}
        />
      );

      // Set the contentSize.height to a number LOWER than
      // layoutMeasurement.height + contentOffset.y
      // to simulate viewer being scrolled to the top
      const nativeEvent = {
        layoutMeasurement: { height: 100 },
        contentOffset: { y: 100},
        contentSize: { height: 190}
      };
      expect(component.instance().isCloseToTop(nativeEvent)).toEqual(true);
    });
  });

  describe('onScroll', () => {
    it('does nothing if the viewer is not scrolled to the top', () => {
      const onLoadMoreMessages = jest.fn();

      const component = shallow(
        <Chat
          didLoadAllMessages={false}
          messages={[]}
          onLoadMoreMessages={onLoadMoreMessages}
          refreshing={true}
          viewer={'Panayiotis'}
        />
      );

      component.instance().isCloseToTop = jest.fn(() => false);

      const nativeEvent = {}; // nativeEvent won't be used
      component.instance().onScroll({nativeEvent})
      expect(onLoadMoreMessages).not.toHaveBeenCalled()
    });

    it('it does nothing if didLoadAllMessages is true and viewer is scrolled to the top', () => {
      const onLoadMoreMessages = jest.fn();

      const component = shallow(
        <Chat
          didLoadAllMessages={true}
          messages={[]}
          onLoadMoreMessages={onLoadMoreMessages}
          refreshing={true}
          viewer={'Panayiotis'}
        />
      );

      component.instance().isCloseToTop = jest.fn(() => true)

      const nativeEvent = {}; // nativeEvent won't be used
      component.instance().onScroll({nativeEvent})
      expect(onLoadMoreMessages).not.toHaveBeenCalled()
    });

    it('calls onLoadMoreMessages if the viewer scrolls to the top', () => {
      const onLoadMoreMessages = jest.fn();

      const component = shallow(
        <Chat
          didLoadAllMessages={false}
          messages={[]}
          onLoadMoreMessages={onLoadMoreMessages}
          refreshing={true}
          viewer={'Panayiotis'}
        />
      );

      component.instance().isCloseToTop = jest.fn(() => true);

      const nativeEvent = {}; // nativeEvent won't be used
      component.instance().onScroll({nativeEvent})
      expect(onLoadMoreMessages).toHaveBeenCalled()
    });
  });
});

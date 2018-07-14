// @flow
import React from 'react';
import NotificationBadge from './NotificationBadge';
import renderer from 'react-test-renderer';

describe('NotificationBadge', () => {
  it("does't display notifications when noOfNotifications is 0", () => {
    const tree = renderer
      .create(<NotificationBadge noOfNotifications={0} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays notifications in a circle when less than 100', () => {
    const tree = renderer
      .create(<NotificationBadge noOfNotifications={10} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('displays +99 in a rounded rectangle when over 99', () => {
    const tree = renderer
      .create(<NotificationBadge noOfNotifications={100} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

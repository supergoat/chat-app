// @flow
import React from 'react';
import TimeStamp from './TimeStamp';
import ChatCard from './ChatCard';
import renderer from 'react-test-renderer';

describe('TimeStamp', () => {
  // Custom constant date, so our snapshots don't fail when the date changes
  const customDate = new Date(2018, 1, 3, 9, 5);
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
    global.Date = RealDate;
  });


  it('displays the time (HH:mm) when the date is today', () => {

    let anHourAgo = new Date();
    anHourAgo.setHours(anHourAgo.getHours() - 1);

    const tree = renderer
      .create(
        <TimeStamp
          date={anHourAgo}
        />)

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("displays 'YESTERDAY' when the date was yesterday", () => {
    let aDayAgo = new Date();
    aDayAgo.setDate(aDayAgo.getDate() - 1);

    const tree = renderer
      .create(
        <TimeStamp
          date={aDayAgo}
        />)

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('displays the date when the date was before yesterday', () => {
    let towDaysAgo = new Date();
    towDaysAgo.setDate(towDaysAgo.getDate() - 2);

    const tree = renderer
      .create(
        <TimeStamp
          date={towDaysAgo}
        />)

    expect(tree.toJSON()).toMatchSnapshot();
  });

});

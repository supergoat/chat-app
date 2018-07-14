// @flow
import React, { Component } from 'react';
import { Text } from 'react-native';
import CAColors from "../common/CAColors";
import CAStyleSheet from "../common/CAStyleSheet";

/** ============================================================================
<TimeStamp
  date={Date}
  [style]={object}
/>
--------------------------------------------------------------------------------
Displays the date of the latest message
@param { string } date - The date of the latest message
@param { object } [style] - custom style
============================================================================= */
class TimeStamp extends Component<{
  date: Date,
  style?: { [name: string]: any }
}, {}> {

  /**
   * Returns:
   *  The time if the date is Today
   *  'YESTERDAY' if the date was yesterday
   *  The date if the date was before yesterday
   * @param { string } date - The date
   */
  getTimeStamp = (date: Date) => {
    const dateNow = new Date();
    const dayDifference = Math.abs(dateNow.getDate() - date.getDate());
    const monthDifference = Math.abs(dateNow.getMonth() - date.getMonth());
    const yearDifference = Math.abs(dateNow.getFullYear() - date.getFullYear());

    const isSameMonthAndYear =  monthDifference + yearDifference === 0;
    const today = isSameMonthAndYear && dayDifference === 0
    const yesterday = isSameMonthAndYear && dayDifference === 1

    if (today) {
      return this.formatTime(date)
    } else if (yesterday) {
      return 'YESTERDAY'
    } else {
      return this.formatDate(date);
    }
  }

  /**
   * Returns the time in the format HH:mm
   * @param { string } date - the date
   */
  formatTime = (date: Date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;

    return `${hours}:${minutes}`
  }

  /**
   * Returns the date in the format of the time zone the user is in
   * For example
   *  UK: DD/MM/YY
   *  US: MM/DD/YY
   * @param { string } date - the date
   */
  formatDate = (date: Date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }
    return date.toLocaleDateString(undefined, options);
  }

  render() {
    const { date, style } = this.props;

    return (
      <Text style={[styles.timeStamp, style]}>
        {this.getTimeStamp(date)}
      </Text>
    )
  }
}

/* StyleSheet
============================================================================= */
const styles = CAStyleSheet.create({
  timeStamp: {
    color: CAColors.oxfordBlue,
    fontSize: 12
  },
});


/* Export
============================================================================= */
export default TimeStamp;

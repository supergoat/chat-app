// @flow
import React from 'react';
import BackButton from './BackButton';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('BackButton', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BackButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays chevronLeft when Platform is iOS', () => {
    const component = shallow(<BackButton />);
    const image = component.find('Image')
    const source = image.prop('source');
    expect(source.testUri.includes('chevron_left.png')).toBe(true)
  });

  it('displays arrowBack when Platform is Android', () => {
    // Set platform to android
    jest.mock('Platform', () => ({
      OS: 'android',
    }));

    const component = shallow(<BackButton />);
    const image = component.find('Image')
    const source = image.prop('source');
    expect(source.testUri.includes('arrow_back.png')).toBe(true)
  });

  it('calls navigation pop from props when BackButton is pressed', () => {
    const navigation = {
      pop: jest.fn(() => console.log('Pop Called'))
    };
    const component = shallow(<BackButton navigation={navigation} />);
    component.find('TouchableOpacity').prop('onPress')()
    expect(navigation.pop.mock.calls.length).toBe(1);
  });
});

import { createStackNavigator } from 'react-navigation';
import type { NavigationContainerProps } from 'react-native';
import * as ReactNavigation from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import CAColors from './src/common/CAColors';

/** ============================================================================
<RootStack />
--------------------------------------------------------------------------------
Responsible for navigation in the app
============================================================================= */
const RootStack : NavigationContainerProps = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Chat: {
      screen: ChatScreen
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home'
  }
);

/* Export
============================================================================= */
export default RootStack;

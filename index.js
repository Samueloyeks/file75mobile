/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import App from './src';
import {name as appName} from './app.json';
import { typography } from './src/utils/typography'
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`']);


typography()

AppRegistry.registerComponent(appName, () => App);

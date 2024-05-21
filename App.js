import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import AppNavigation from './navigation/appNavigation';
import Setting from './new/Setting';
export default function App() {
  return (
    <AppNavigation/>
    // <Setting/>
  );
}


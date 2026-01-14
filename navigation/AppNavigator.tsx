import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import TasksScreen from '../screens/TasksScreen';
import ComparisonScreen from '../screens/ComparisonScreen';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Tasks: undefined;
  Comparison: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen}
          options={{ title: 'About' }}
        />
        <Stack.Screen 
          name="Tasks" 
          component={TasksScreen}
          options={{ title: 'Tasks' }}
        />
        <Stack.Screen 
          name="Comparison" 
          component={ComparisonScreen}
          options={{ title: 'Comparison' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

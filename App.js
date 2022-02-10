import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from './Themes/colors.js';
import PreviewScreen from './components/PreviewScreen.js';
import SongScreen from './components/SongScreen.js';
import HomeScreen from './components/HomeScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions= {{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            color: Colors.white,
          },
        }}>
        <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Stack.Screen name="Song Details" component={SongScreen} />
        <Stack.Screen name="Song Preview" component={PreviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

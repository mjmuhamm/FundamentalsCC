import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';


const RootStack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: Screen1,
            options: { title: 'HomeScreen' },
        },
        Detail: {
            screen: Screen2,
            options: { title: 'Detail' },
        },
    },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;

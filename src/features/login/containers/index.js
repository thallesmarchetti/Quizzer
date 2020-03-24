import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';

export default createStackNavigator({
    Login: {
        screen: Login
    }
},
{
    initialRouteName: 'Login',
    defaultNavigationOptions: {
        headerShown: false
    }
});
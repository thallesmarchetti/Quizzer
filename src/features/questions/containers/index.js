import { createStackNavigator } from 'react-navigation-stack';
import Question from './Question';
import Ranking from './Ranking';

export default createStackNavigator({
    Question: {
        screen: Question
    },
    Ranking: {
        screen: Ranking
    }
},
{
    initialRouteName: 'Question',
    defaultNavigationOptions: {
        headerShown: false
    }
});
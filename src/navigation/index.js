import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginStack from "../features/login/containers";
import QuestionStack from '../features/questions/containers';

const AppNavigator = createSwitchNavigator({
    Login: LoginStack,
    Question: QuestionStack,
});

export default createAppContainer(AppNavigator);
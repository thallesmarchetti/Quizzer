import loginReducer from '../features/login/reducers';
import questionReducer from '../features/questions/reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    loginReducer,
    questionReducer
});

export default rootReducer;
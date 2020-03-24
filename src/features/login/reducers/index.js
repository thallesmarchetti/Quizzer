import React from 'react';
import { LOGIN_USER } from '../actions';

const initialState = {
    loggedUser: ''
};

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER:
            console.log("[loginReducer - action]", action);
            console.log("[loginReducer] - oldState", state);
            const newState = {
                ...state,
                loggedUser: action.payload
            };
            console.log("[loginReducer] - newState", newState);
            return newState;
        default:
            return state;
    }
};

export default loginReducer;
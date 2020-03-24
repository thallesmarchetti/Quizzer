import React from 'react';
import {
    PREVIOUS_QUESTION,
    NEXT_QUESTION,
    SELECT_OPTION,
    FINISH_QUIZ_STARTED,
    FINISH_QUIZ_SUCCESS, 
    FINISH_QUIZ_FAILURE,
    UPDATE_RANKING,
    FETCH_QUESTIONS_STARTED,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUESTIONS_FAILURE
} from '../actions';

const initialState = {
    currentQuestion: 0,
    userChoices: [],
    questions: [],
    loading: false,
    userFirebaseId: null,
    error: '',
    ranking: []
};


const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case PREVIOUS_QUESTION:
            if (state.currentQuestion === 0) return state;
            return {
                ...state,
                currentQuestion: state.currentQuestion - 1
            };
        case NEXT_QUESTION:
            if (state.currentQuestion + 1 === state.questions.length) return state;
            return {
                ...state,
                currentQuestion: state.currentQuestion + 1
            };
        case SELECT_OPTION:
            const userChoices = [
                ...state.userChoices,
                {
                    questionIndex: state.currentQuestion,
                    choiceIndex: action.payload
                }
            ];
            return {
                ...state,
                userChoices
            };
        case FINISH_QUIZ_STARTED:
            return {
                ...state,
                loading: true
            };
        case FINISH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                userFirebaseId: action.payload
            };
        case FINISH_QUIZ_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case UPDATE_RANKING:
            return {
                ...state,
                ranking: action.payload
            };
        case FETCH_QUESTIONS_STARTED:
            return {
                ...state,
                loading: true
            };
        case FETCH_QUESTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                questions: action.payload
            };
        case FETCH_QUESTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default questionReducer;
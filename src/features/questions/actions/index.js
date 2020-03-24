import { FIREBASE_REALTIME_REF, API_QUESTIONS } from "../../../config";
import NavigationService from "../../../NavigationService";

export const PREVIOUS_QUESTION = 'PREVIOUS_QUESTION';
export const previousQuestion = () => (
    {
        type: PREVIOUS_QUESTION
    }
);

export const NEXT_QUESTION = 'NEXT_QUESTION';
export const nextQuestion = () => (
    {
        type: NEXT_QUESTION
    }
);

export const SELECT_OPTION = 'SELECT_OPTION';
export const selectOption = (selectedOptionIndex) => (
    {
        type: SELECT_OPTION,
        payload: selectedOptionIndex
    }
);

export const FINISH_QUIZ_STARTED = 'FINISH_QUIZ_STARTED';
export const finishQuizStarted = () => (
    {
        type: FINISH_QUIZ_STARTED
    }
);
 
export const FINISH_QUIZ_SUCCESS = 'FINISH_QUIZ_SUCCESS';
export const finishQuizSuccess = (userFirebaseId) => (
    {
        type: FINISH_QUIZ_SUCCESS,
        payload: userFirebaseId
    }
);

export const FINISH_QUIZ_FAILURE = 'FINISH_QUIZ_FAILURE';
export const finishQuizFailure = (error) => (
    {
        type: FINISH_QUIZ_FAILURE,
        payload: error
    }
);

export const FINISH_QUIZ = 'FINISH_QUIZ';
export const finishQuiz = () => {
    return async (dispatch, getState, { database }) => {
        // access firebase
        dispatch(finishQuizStarted());

        try {
            const ref = database().ref(FIREBASE_REALTIME_REF).push();

            const { loginReducer, questionReducer } = getState();

            await ref.set({
                name: loginReducer.loggedUser,
                choices: questionReducer.userChoices
            });

            dispatch(finishQuizSuccess(ref.key));

            NavigationService.navigate('Ranking');
        } catch (error) {
            // dispatch error
            dispatch(finishQuizFailure(error.message));
            console.log(error);
        }
    };
};

export const UPDATE_RANKING = 'UPDATE_RANKING';
export const updateRanking = (ranking) => (
    {
        type: UPDATE_RANKING,
        payload: ranking
    }
);

export const FETCH_RANKING = 'FETCH_RANKING';
export const fetchRanking = () => {
    return async (dispatch, getState, { database }) => {
        try {
            const ref = database().ref(FIREBASE_REALTIME_REF);

            await ref.on('value', (snapshot) => {
                let ranking = [];
                const firebaseList = snapshot.val();
                for (const i in firebaseList) {
                    ranking.push({
                        id: i,
                        ...firebaseList[i]
                    });
                }

                dispatch(updateRanking(ranking));
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const FETCH_QUESTIONS_STARTED = 'FETCH_QUESTIONS_STARTED';
export const fetchQuestionsStarted = () => (
    {
        type: FETCH_QUESTIONS_STARTED
    }
);

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const fetchQuestions = () => {
    return async (dispatch, getState, { api }) => {
        dispatch(fetchQuestionsStarted());

        try {
            const response = await api.get(API_QUESTIONS);

            dispatch(fetchQuestionsSuccess(response.data));
        } catch(error) {
            dispatch(fetchQuestionsFailure(error.message));
            console.log(error);
        }
    };
};

export const FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
export const fetchQuestionsSuccess = (questions) => (
    {
        type: FETCH_QUESTIONS_SUCCESS,
        payload: questions
    }
);

export const FETCH_QUESTIONS_FAILURE = 'FETCH_QUESTIONS_FAILURE';
export const fetchQuestionsFailure = (error) => (
    {
        type: FETCH_QUESTIONS_FAILURE,
        payload: error
    }
);
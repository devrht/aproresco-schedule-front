import {
    ASSIGN_STUDENT,
    START_DATE, 
    END_DATE
} from '../actionType';


const INIT_STATE = {
    assignStudent:[],
    startDate: '1900-01-01',
    endDate: '2030-01-01'
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {

        case ASSIGN_STUDENT:
            return { ...state, assignStudent:action.payload};
        case START_DATE:
            console.log('Here => ', action.payload)
            return {startDate: action.payload};
        case END_DATE:
            return { ...state, endDate:action.payload};
    
        default:
            return state;
    }
}
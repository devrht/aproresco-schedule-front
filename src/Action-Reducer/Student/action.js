import {ASSIGN_STUDENT} from '../actionType'
import {START_DATE} from '../actionType'
import {END_DATE} from '../actionType'

export const assignStudents = (students) => {
    return (dispatch) => {
      dispatch({ type: ASSIGN_STUDENT, payload: students });
    };
  };

  export const setStartDate = (startDate) => {
    return (dispatch) => {
      console.log('Passage ici ', startDate)
      dispatch({ type: START_DATE, payload: startDate });
    };
  };

  export const setEndDate = (endDate) => {
    return (dispatch) => {
      dispatch({ type: END_DATE, payload: endDate });
    };
  };
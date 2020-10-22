import {combineReducers} from 'redux'
import Student from './Student/reducer'
import StarDate from './Student/reducer'
import EndDate from './Student/reducer'

const reducers = combineReducers({
    Student:Student,
    StarDate: StarDate,
    EndDate: EndDate
});

export default reducers;
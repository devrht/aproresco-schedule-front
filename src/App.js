import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import LayoutOfApp from './components/Layout'
// Pages
const TeacherList = React.lazy(() => import('./container/TeacherList'));
const Login = React.lazy(() => import('./container/Login'));
const StudentList = React.lazy(() => import('./container/StudentList'));
const Settings = React.lazy(() => import('./container/StudentList/Settings'));
const ShortMessages = React.lazy(() => import('./container/StudentList/shortMessages'));
const StudentsOfTeacher = React.lazy(() => import('./container/TeacherList/StudentListOfTeacher'));
const StudentDetail = React.lazy(() => import('./container/StudentList/StudentDetail'))
function App() {
  return (

    <BrowserRouter>
      <Switch>
        <LayoutOfApp>
          <React.Suspense fallback={<div>Loading... </div>}>
            {/* <Route exact path="/login" name="Login Page" render={props => <Login {...props} />} /> */}
            <Route exact path="/" name="Student Page" render={props => <StudentList {...props} />} />
            <Route exact path="/studentlist" name="Student Page" render={props => <StudentList {...props} />} />
            <Route exact path="/settings" name="Settings Page" render={props => <Settings {...props} />} />
            <Route exact path="/short-messages" name="Settings Page" render={props => <ShortMessages {...props} />} />
            <Route exact path="/studentlist/teacher/:id" name="StudentOfTeacher Page" render={props => <StudentsOfTeacher {...props} />} />
            <Route exact path="/teacherlist" name="Teacher Page" render={props => <TeacherList {...props} />} />
            <Route exact path="/studentlist/studentDetail/:id" name="Student Page" render={props => <StudentDetail {...props} />} />
            {/* <Redirect from="/" to="/login" /> */}
          </React.Suspense>
        </LayoutOfApp>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

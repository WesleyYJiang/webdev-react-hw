import React, {Component}  from 'react';
import CourseList from "./CourseList";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CourseEditor from "./CourseEditor";
import LessonTabs from "./LessonTabs";

class CourseManager extends React.Component {
    render() {
        return (
            <Router>
            <div className="container-fluid">
                <Route path="/courses" component={CourseList}/>
                <Route path="/course/:courseId/edit" component={CourseEditor}/>
                <Route path="/course/:courseId/module/:moduleId/edit" component={LessonTabs}/>
            </div>
            </Router>);
    }
}
export default CourseManager;
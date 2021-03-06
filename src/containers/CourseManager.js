import React, {Component}  from 'react';
import CourseList from "./CourseList";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import CourseEditor from "./CourseEditor";

class CourseManager extends React.Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <Route path="/courses" component={CourseList}/>
                    <Route path="/course/:courseId"
                           component={CourseEditor}/>
                </div>
            </Router>);
    }
}
export default CourseManager;
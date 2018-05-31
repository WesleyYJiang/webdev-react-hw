import React from 'react';
import ModuleList from './ModuleList';
import {Link} from 'react-router-dom'
import CourseService from "../services/CourseService";

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courseId: '', courseTitle: '', moduleId: ''};
        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);

    }

    componentDidMount(){
        this.selectCourse(this.props.match.params.courseId);
    }

    componentWillReceiveProps(newProps){
        this.selectCourse(newProps.match.params.courseId);
    }


    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }


    selectModule(moduleId) {
        this.setState({moduleId: moduleId});
    }


    render() { return (
        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <Link to={"/courses"}>
                            <i className="fa fa-times"/>
                        </Link>
                    </div>
                    <p className="text-light">
                        Editing Course ID: {this.state.courseId}
                    </p>
                </div>
            </nav>
            <ModuleList courseId={this.state.courseId}/>
        </div>

    );
    }
}

export default CourseEditor;
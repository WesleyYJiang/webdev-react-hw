import React from 'react';
import LessonTabs from './LessonTabs';
import ModuleList from './ModuleList';

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.state = {courseId: '', courseTitle: ''};
    }

    componentDidMount(){
        this.selectCourse(
            this.props.match.params.courseId
        );
    }

    componentWillReceiveProps(newProps){
        this.selectCourse
        (newProps.match.params.courseId);
    }


    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }


    render() { return (
        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <i className="fa fa-times"/>
                    </div>
                    <p className="text-light">
                        Editing Course: {this.state.courseId}
                    </p>
                </div>
            </nav>

        <div className="row">
            <div className="col-4">
                <ModuleList courseId={this.state.courseId}/>
            </div>
            <div className="col-8">
                <LessonTabs/>
            </div>

        </div>

        </div>

    );
    }
}

export default CourseEditor;
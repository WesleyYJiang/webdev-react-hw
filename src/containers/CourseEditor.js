import React from 'react';
import ModuleList from './ModuleList';

class CourseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.selectTitle = this.selectTitle.bind(this);
        this.state = {courseId: '', courseTitle: '', moduleId: ''};
    }

    componentDidMount(){
        this.selectCourse(this.props.match.params.courseId);
        this.selectTitle(this.props.match.params.courseTitle);
    }

    componentWillReceiveProps(newProps){
        this.selectCourse(newProps.match.params.courseId);
        this.selectTitle(newProps.match.params.courseTitle);
    }


    selectCourse(courseId) {
        this.setState({courseId: courseId});
    }

    selectTitle(courseTitle) {
        this.setState({courseTitle: courseTitle});
    }


    selectModule(moduleId) {
        this.setState({moduleId: moduleId});
    }


    render() { return (
        <div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <i className="fa fa-times"/>
                    </div>
                    <p className="text-light">
                        Editing Course: {this.state.courseTitle}
                    </p>
                </div>
            </nav>

            <ModuleList courseId={this.state.courseId}/>

        {/*<div className="row">*/}
            {/*<div className="col-4">*/}
                {/*<ModuleList courseId={this.state.courseId}/>*/}
            {/*</div>*/}
            {/*<div className="col-8">*/}
                {/*<LessonTabs moduleId={this.state.moduleId}/>*/}
            {/*</div>*/}

        {/*</div>*/}

        </div>

    );
    }
}

export default CourseEditor;
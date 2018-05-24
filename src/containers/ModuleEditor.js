import React from 'react';
import LessonService from "../services/LessonService";
import CourseService from "../services/CourseService";
class ModuleEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courseId: '', moduleId: '',
            lessons: []};
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.setLessons = this.setLessons.bind(this);
        this.lessonService = LessonService.instance;
        this.courseService = CourseService.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
        //this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
        this.findAllLessonsForModule(newProps.match.params.moduleId);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }
    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }
    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    findAllLessonsForModule(moduleId) {
        this.lessonService
            .findAllLessonForModule(moduleId)
            .then((lessons) => {this.setLessons(lessons)});
    }
    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    renderLessons() {
        var l = this.state.lessons.map((lesson) => {
            return (
                <li className="nav-item">
                    <a className="nav-link" id={lesson.id}>
                        {lesson.title}
                        &nbsp;
                        </a>
                </li>
            )
        });
        return l;
    }

    createLesson() {
        this.lessonService.createLesson(this.state.moduleId,  {title: 'Default'})
            .then(() => {this.findAllLessonsForModule(this.state.moduleId); });
        this.courseService.updateCourse(this.state.courseId, {modified: Date.now()});
    }

    deleteLesson(lessonId) {
        var c = window.confirm("Are you sure you want to delete the course?")
        if (c) {
            alert("You Deleted the course!");
            this.lessonService.deleteLesson(lessonId)
                .then(() => {
                    this.findAllLessonsForModule(this.state.moduleId);
                });
            this.courseService.updateCourse(this.state.courseId, {modified: Date.now()});
        } else {
            alert("Nothing was changed!");
        }
    }


    render() {
        return (
            <div>
                <h1>Module Editor</h1>
                <ul className="nav nav-tabs">
                    {this.renderLessons()}
                    <button type="button" className="btn btn-primary"
                            onClick={this.createLesson}>Add</button>
                </ul>
            </div>
        )}}

export default ModuleEditor;

import React from 'react';
import LessonService from "../services/LessonService";
import CourseService from "../services/CourseService";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import WidgetList from "./WidgetList";
import LessonEditor from "./LessonEditor"
import Link from "react-router-dom/es/Link";

class ModuleEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courseId: '', moduleId: '', lessons: []};
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.setLessons = this.setLessons.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.lessonService = LessonService.instance;
        this.courseService = CourseService.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
        this.componentWillReceiveProps(this.props);
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

    renderLessons() {
        var l = this.state.lessons.map((lesson) => {
            return (
                <li className="nav-item"  key={lesson.id} >
                    <div className="nav-link">
                        <Link to={`/course/${this.state.courseId}/module/${this.state.moduleId}/lesson/${lesson.id}`}>
                        {lesson.title}
                        </Link>
                        &nbsp;
                        <i className="fa fa-times fa-lg"
                           onClick={() => {this.deleteLesson(this.state.moduleId, lesson.id)}}/>
                        </div>

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

    deleteLesson(moduleId, lessonId) {
        var c = window.confirm("Are you sure you want to delete the course?");
        if (c) {
            alert("You Deleted the course!");
            this.lessonService.deleteLesson(moduleId, lessonId)
                .then(() => {
                    this.findAllLessonsForModule(this.state.moduleId);
                });
            this.courseService.updateCourse(this.state.courseId, {modified: Date.now()});
        } else {
            alert("Nothing was changed!");
        }
    }

    titleChanged(event) {
        this.setState({Lesson: {title: event.target.value}});
    }

    updateTitle() {
        this.lessonService.update(this.props.moduleId, this.state.lessonId, this.state.Lesson.title)
            .then(() => {
                this.findAllLessonsForModule(this.state.moduleId);
            });
        this.courseService.updateCourse(this.state.courseId, {modified: Date.now()});
    }


    render() {
        return (
            <Switch>
            <div>
                <ul className="nav nav-tabs">
                    {this.renderLessons()}
                    <button type="button" className="btn btn-primary"
                            onClick={this.createLesson}>Add</button>
                </ul>
                <div>
                    <form className="form-inline">
                    <input className="form-control col-10"
                           onChange={this.titleChanged}
                           placeholder="Lesson Title"/>
                    <button className="btn btn-primary col" onClick={this.updateTitle}>
                        Edit Lesson Name
                    </button>
                    </form>
                   <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId" component={LessonEditor}/>
                </div>
            </div>
            </Switch>
        )}}

export default ModuleEditor;

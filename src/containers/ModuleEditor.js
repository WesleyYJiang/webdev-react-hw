import React from 'react';
import LessonService from "../services/LessonService";
class ModuleEditor
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courseId: '', moduleId: '',
            lessons:
                [
                    {title: 'lesson 1', id: 123},
                    {title: 'lesson 2', id: 1},
                    {title: 'lesson 3', id: 2}
                ]};
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.setLessons = this.setLessons.bind(this);
        this.lessonService = LessonService.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
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
                    <a className="nav-link active" href="#" id={lesson.id}>
                        {lesson.title}</a>
                </li>
            )
        });
        return l;
    }

    createLesson() {
        this.lessonService.createLesson(this.state.moduleId,  {title: 'Default'})
            .then(() => {this.findAllLessonsForModule(this.state.moduleId); });
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

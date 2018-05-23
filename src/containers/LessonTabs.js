import React from 'react';
import TopicPills from '../components/TopicPills'
import LessonService from "../services/LessonService";
import Lesson from "../components/Lesson";

export default class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleId: '',
            lessons:
                [
                    {title: 'lesson 1', id: 123},
                    {title: 'lesson 2', id: 1},
                    {title: 'lesson 3', id: 2}
                ]
        };
        this.setModuleId = this.setModuleId.bind(this);
        this.createLesson = this.createLesson.bind(this); 
        this.lessonService = LessonService.instance;
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.moduleId);
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
            return <Lesson lesson={lesson} key={lesson.id}/>
        });
        return l;
    }

    createLesson() {
        this.moduleService.createLesson(this.props.moduleId,  {title: 'Default'})
            .then(() => {this.findAllLessonsForModule(this.state.moduleId); });
    }

    render() {
        return(
            <ul className="nav nav-tabs">
                {this.renderLessons()}
                <button type="button" className="btn btn-primary"
                        onClick={this.createLesson}>Add</button>
            </ul>
        );
    }

}
import React from 'react';
import TopicPills from '../components/TopicPills'
import LessonService from "../services/LessonService";
import Lesson from "../components/Lesson";

export default class LessonTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            lessons:
                [
                    {title: 'Module 1', id: 123},
                    {title: 'Module 2', id: 1},
                    {title: 'Module 3', id: 2}
                ]
        };
        this.createLesson = this.createLesson.bind(this);
        this.lessonService = LessonService.instance;
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
        this.setModuleId(this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.setModuleId(newProps.moduleId);
        this.findAllLessonsForModule(newProps.courseId, newProps.moduleId);
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

    findAllLessonsForModule(courseId, moduleId) {
        this.lessonService
            .findAllLessonForModule(courseId, moduleId)
            .then((lessons) => {this.setLessons(lessons)});
    }

    renderLessons() {
        let lessons = this.state.lessons.map(function(lesson){
            return <Lesson title={lesson} key={lesson.id}/>
        });
        return lessons;
    }

    createLesson() {
        this.moduleService.createLesson(this.props.courseId,  {title: 'Default'})
            .then(() => {this.findAllLessonsForModule(this.state.courseId,
                this.state.moduleId); });
    }


    render() {
        return(
            <ul className="nav nav-tabs">
                {/*{this.renderLessons()}*/}
            </ul>
        );
    }

}
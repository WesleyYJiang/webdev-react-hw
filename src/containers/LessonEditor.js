import React from 'react';
import App from "./WidgetList";
import {widgetReducer} from "../reducers/widgetReducer";
import {createStore} from 'redux';
import Provider from "react-redux/es/components/Provider";


class LessonEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courseId: '', moduleId: '', lessonId: '', widgets: []};
        this.setCourseId = this.setCourseId.bind(this);
        this.setModuleId = this.setModuleId.bind(this);
        this.setLessonId = this.setLessonId.bind(this);
    }

    componentDidMount() {
        this.setCourseId(this.props.match.params.courseId);
        this.setModuleId(this.props.match.params.moduleId);
        this.setLessonId(this.props.match.params.lessonId);
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.match.params.courseId);
        this.setModuleId(newProps.match.params.moduleId);
        this.setLessonId(newProps.match.params.lessonId);
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }
    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }
    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    store = createStore(widgetReducer);

    render() {
        return (
                <div>
                    <Provider store={this.store}>
                        <App lessonId={this.state.lessonId}/>
                    </Provider>
                </div>
        )}}

export default LessonEditor;

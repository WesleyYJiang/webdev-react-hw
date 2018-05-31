import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
import ModuleEditor from './ModuleEditor';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import CourseService from "../services/CourseService";



export default class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courseId: '', modules: []};
        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.moduleService = ModuleService.instance;
        this.courseService = CourseService.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
    }

    setModules(modules) {
        this.setState({modules: modules});
    }

    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {
                this.setModules(modules)
            });
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    renderListOfModules() {
        if (this.state) {
            var modules = this.state.modules.map((module) => {
                return <ModuleListItem module={module}
                                       key={module.id}
                                       delete={this.deleteModule}
                                       courseId={this.state.courseId}
                                       active={""}/>
            });
        }
        return modules;
    }

    createModule() {
        this.moduleService.createModule(this.props.courseId, this.state.module)
            .then(() => {
                this.findAllModulesForCourse(this.state.courseId);
            });
        this.courseService.updateCourse(this.state.courseId, {modified: Date.now()});
    }

    deleteModule(moduleId) {
        var c = window.confirm("Are you sure you want to delete the course?")
        if (c) {
            alert("You Deleted the course!");
            this.moduleService
                .deleteModule(moduleId)
                .then(() => {
                    this.findAllModulesForCourse(this.state.courseId);
                });
            this.courseService.updateCourse(this.state.courseId, {modified: Date.now()});
        } else {
            alert("Nothing was changed!");
        }
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }


    render() {
        return (
            <Switch>
                <div className="row">
                    <div className="col-4">
                        <ul className="list-group">
                            {this.renderListOfModules()}
                            <form className="form-inline">
                                <input className="form-control col-10"
                                       onChange={this.titleChanged}
                                       placeholder="title"/>
                                <button className="btn btn-primary col" onClick={this.createModule}>
                                    <i className="fa fa-plus"/>
                                </button>
                            </form>
                        </ul>
                    </div>
                    <div className="col-8">
                        <Route path="/course/:courseId/module/:moduleId" component={ModuleEditor}/>
                    </div>
                </div>
            </Switch>
        );
    }
}

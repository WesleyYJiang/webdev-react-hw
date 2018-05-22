import React from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';

export default class ModuleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            modules:
                [
                    {title: 'Module 1', id: 123},
                    {title: 'Module 2', id: 1},
                    {title: 'Module 3', id: 2}
                ]
        };
        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.setCourseId = this.setCourseId.bind(this);
        this.moduleService = ModuleService.instance;
    }

    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }

    componentWillReceiveProps(newProps) {
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId);
    }

    setModules(modules) {
        this.setState({modules: modules})
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
        let modules = this.state.modules.map(function (module) {
            return <ModuleListItem key={module.id} title={module.title}/>
        })
        return modules;
    }

    createModule() {
        this.moduleService.createModule(this.props.courseId, this.state.module);
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}});
    }


    render() {
        return (
            <div>
                <br/>
                <h3>Module List for course: {this.state.courseId}</h3>
                <input className="form-control"
                       onChange={this.titleChanged}
                       // value={this.state.module.title}
                       placeholder="title"/>
                <button className="btn btn-primary btn-block" onClick={this.createModule}>
                    <i className="fa fa-plus"/>
                </button>
                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
            </div>
        );
    }
}

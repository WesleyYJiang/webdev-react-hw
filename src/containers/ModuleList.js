import React from 'react';
import ModuleListItem from '../components/ModuleListItem';

export default class ModuleList extends React.Component {
    constructor() {
        super();
        this.state = {
            modules:
                [
                    {title: 'Module 1', id: 123},
                    {title: 'Module 2', id: 1},
                    {title: 'Module 3', id: 2}
                ]
        };
        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
    }

    renderListOfModules() {
        let modules = this.state.modules.map(function (module) {
            return <ModuleListItem key={module.id} title={module.title}/>
        })
        return modules;
    }

    createModule(){
        console.log(this.state.module);
    }

    titleChanged(event){
        this.setState({module: {title: event.target.value}});
    }


    render() { return (
        <div>
            <br/>
            <input className="form-control"
                   onChange={this.titleChanged}
                   placeholder="title"/>
            <button className="btn btn-primary btn-block" onClick={this.createModule}>
                <i className="fa fa-plus"></i>
            </button>
            <ul className="list-group">
            {this.renderListOfModules()}
            </ul>
        </div>
    );}}

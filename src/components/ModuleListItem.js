import React from 'react';

class ModuleListItem extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <li className="list-group-item">
                {this.props.title}
                <span className={"float-right"}>
                    <i className="fa fa-pencil"/>
                    <i className="fa fa-trash"/>
                </span>
            </li>
        );
    }
}

export default ModuleListItem;
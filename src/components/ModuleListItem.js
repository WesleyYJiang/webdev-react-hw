import React from 'react';

class ModuleListItem extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <li className="list-group-item">
                {this.props.module.title}
                <span className={"float-right"}>
                     <i className="fa fa-trash fa-lg"
                        onClick={() => {this.props.delete(this.props.module.id)}}/>
                </span>
            </li>
        );
    }
}

export default ModuleListItem;
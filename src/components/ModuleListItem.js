import React from 'react';
import {Link} from 'react-router-dom'

class ModuleListItem extends React.Component {
    constructor(props){
        super(props);
    }



    render() {
        return (
            <li className={`list-group-item ${this.props.active}`}>
                <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}`}>
                {this.props.module.title}
                </Link>
                <span className={"float-right"}>
                    <Link to={`/course/${this.props.courseId}/module`}>
                     <i className="fa fa-trash fa-lg"
                        onClick={() => {this.props.delete(this.props.module.id)}}/>
                        </Link>
                </span>
            </li>
        );
    }
}

export default ModuleListItem;
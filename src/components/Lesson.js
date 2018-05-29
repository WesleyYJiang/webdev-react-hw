import React from 'react';
import {Link} from 'react-router-dom'

class Lesson extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <Link to={`/lesson/${this.props.id}/widget/list`}>
                <a className="nav-link active">Default</a>
                </Link>
            </li>
        );
    }
}

export default Lesson;


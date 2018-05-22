import React from 'react';

class Lesson extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <li className="nav-item">
                <a className="nav-link active" href="#">{this.props.title}</a>
            </li>
        );
    }
}

export default Lesson;
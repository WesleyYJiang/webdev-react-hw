import React from 'react';
import TopicPills from '../components/TopicPills'

export default class LessonTabs extends React.Component {
    render() {
        return(
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" href="#">Active Tab</a>
                    <TopicPills/>
                </li>
                <li className="nav-item"><a className="nav-link" href="#">Another Tab</a></li>
            </ul>
        );
    }

}
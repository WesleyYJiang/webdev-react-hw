import React from 'react';
import LessonTabs from './LessonTabs';
import ModuleList from './ModuleList';

export default class CourseEditor extends React.Component {
    render() { return (
        <div className="row">
            <div className="col-4">
                <LessonTabs/>
            </div>
            <div className="col-8">
                <ModuleList/>
            </div>
        </div>
    );
    }
}
import React from 'react';
import {Link} from 'react-router-dom'

class CourseRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <tr>
                <td>
                    <i className="fa fa-book fa-lg text-primary"/>
                    &nbsp;
                    &nbsp;
                    <Link to={{pathname: `/course/${this.props.course.id}`,
                        state: {courseTitle: this.props.course.title}}}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td>me</td>
                <td>
                    {this.props.course.modified}
                </td>
                <td>
                    <i className="fa fa-trash fa-lg"
                       onClick={() => {this.props.delete(this.props.course.id)}}/>
                </td>
            </tr>
        )
    }
}
export default CourseRow;
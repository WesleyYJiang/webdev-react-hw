import React from 'react';
import {Link} from 'react-router-dom'

class CourseRow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props);
        return (
            <tr>
                <td>
                    <i className="fa fa-book fa-lg text-primary"/>
                    &nbsp;
                    &nbsp;
                    <Link to={`/course/${this.props.course.id}/${this.props.course.title}/edit`}>
                        {this.props.course.title}
                    </Link>
                </td>
                <td>me</td>
                <td>time</td>
                <td>
                    <i className="fa fa-trash fa-lg"
                       onClick={() => {this.props.delete(this.props.course.id)}}/>
                </td>
            </tr>
        )
    }
}

export default CourseRow;
//
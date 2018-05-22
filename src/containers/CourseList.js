import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService
            .findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            })
    }

    renderCourseRows() {
        if(this.state) {
            var courses = this.state.courses.map((course) => {
                return <CourseRow course={course} key={course.id}
                                  delete={this.deleteCourse}/>
            });
        }
        return (courses);
    }

    titleChanged(event) {
        this.setState({
            course: { title: event.target.value }
        });
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => { this.findAllCourses(); });
    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then(() => {this.findAllCourses(); });
    }

        render() {
        return (
            <div>
                <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                    <div className="navbar-brand">
                        <i className="fa fa-bars" />
                        &nbsp;
                        Course Manager
                    </div>
                    <form className="form-inline my-2 my-lg-0 col-9">
                        <input className="form-control mr-sm-2 col-8" id="titleFld" placeholder="cs101"
                               onChange={this.titleChanged}/>
                        <button onClick={this.createCourse} className="btn btn-primary">Add</button>
                    </form>
                    </div>
                </nav>


                <table className="table">
                    <thead>

                    {/*<tr>*/}
                        {/*<th scope="col">*/}
                            {/*<i className="fa fa-bars"></i>*/}
                            {/*Course  Manager*/}
                        {/*</th>*/}
                        {/*<th scope="col"><input onChange={this.titleChanged}*/}
                                   {/*className="form-control" id="titleFld"*/}
                                   {/*placeholder="cs101"/></th>*/}
                        {/*<th scope="col"><button onClick={this.createCourse}*/}
                                    {/*className="btn btn-primary">*/}
                            {/*Add</button></th>*/}
                    {/*</tr>*/}
                    </thead>
                    <tbody>
                    {this.renderCourseRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default CourseList;

let _singleton = Symbol();
const COURSE_API_URL = 'http://localhost:8080/api/course';
const REMOTE = 'https://webdev-hw-wj.herokuapp.com/api/course';



class CourseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new CourseService(_singleton);
        return this[_singleton]
    }

    findAllCourses() {
        return fetch(REMOTE).then(function (response)
        {
            return response.json();
        });
    }

    findCourseById(courseId) {
        return fetch(`${REMOTE}/${courseId}`)
            .then(function (response) {
            return response.json();
        })
    }

    deleteCourse(courseId) {
        return fetch(`${REMOTE}/${courseId}`,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })
    }

    createCourse(course) {
        return fetch(REMOTE, {
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }

    updateCourse(courseId, course) {
        return fetch(REMOTE + '/'+ courseId, {
            method: 'put',
            body: JSON.stringify(course),
            headers: {'content-type': 'application/json'}
        });

    }
}
export default CourseService;

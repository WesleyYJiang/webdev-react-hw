const WIDGET_API_URL = 'http://localhost:8080/api/lesson/LID/widget';
const REMOTE = 'https://webdev-hw-wj.herokuapp.com/api/lesson/LID/widget';


let _singleton = Symbol();
export default class WidgetService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new WidgetService(_singleton);
        return this[_singleton]
    }


    createWidget(lessonId, widget) {
        return fetch(REMOTE.replace('LID', lessonId),
            {   body: JSON.stringify(widget),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteWidget(widgetId, lessonId) {
        return fetch(REMOTE.replace('LID', lessonId) + '/' + widgetId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })

    }

    findAllWidgetForLesson(lessonId) {
        return fetch(
            REMOTE.replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

}

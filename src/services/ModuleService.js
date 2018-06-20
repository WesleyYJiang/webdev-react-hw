const MODULE_API_URL = 'http://localhost:8080/api/course/CID/module';
const REMOTE = 'https://webdev-hw-wj.herokuapp.com/api/course/CID/module';

let _singleton = Symbol();
export default class ModuleService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }
    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ModuleService(_singleton);
        return this[_singleton]
    }


    createModule(courseId, module) {
        return fetch(REMOTE.replace('CID', courseId),
            {   body: JSON.stringify(module),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteModule(moduleId) {
        return fetch("https://webdev-hw-wj.herokuapp.com/api/module/" + moduleId,
            {
                method: 'DELETE'
            }).then(function (response) {
            return response;
        })

    }

    findAllModulesForCourse(courseId) {
        return fetch(
            REMOTE
                .replace('CID', courseId))
            .then(function (response) {
                return response.json();
            })
    }

    findAllModules() {
        return fetch(
            "https://webdev-hw-wj.herokuapp.com/api/module")
            .then(function (response) {
                return response.json();
            })
    }

}

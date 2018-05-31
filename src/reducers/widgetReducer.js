import * as constants from "../constants/index"

let countId = 0;

export const widgetReducer = (state = {widgets: [], preview: false}, action) => {
    let newState;
    switch (action.type) {

        case constants.CHANGE_LIST_TYPE:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.listType = action.listType
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.SET_LESSON_ID:
            return {
                lessonId: action.lessonId
            };

        case constants.CONVERT_LIST:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text.split("\n");
                        widget.text.map((item) => {
                            return '* ' + item;
                        });
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.PREVIEW:
            return {
                widgets: state.widgets,
                preview: !state.preview
            };

        case constants.HEADING_TEXT_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.text = action.text
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.HEADING_SIZE_CHANGED:
            return {
                widgets: state.widgets.map(widget => {
                    if(widget.id === action.id) {
                        widget.size = action.size
                    }
                    return Object.assign({}, widget)
                })
            };

        case constants.SELECT_WIDGET_TYPE:
            newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            };
            return JSON.parse(JSON.stringify(newState));

        case constants.SAVE:
            fetch('/api/lesson/LID/widget'.replace('LID', action.lessonId),
                {
                    method: 'post',
                    body: JSON.stringify({lesson: {widget : state.widgets}}),
                    headers: {
                    'content-type': 'application/json'}
                });
            return state;


        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state);
            newState.widgets = action.widgets;
            return newState;

        case constants.UP:
            return {
                widgets: state.widgets.map(widget => {
                    if(action.displayOrder !== 1 && widget.displayOrder == (action.displayOrder - 1)) {
                        widget.displayOrder += 1;
                    }
                    else if (action.displayOrder !== 1 && widget.displayOrder == action.displayOrder) {
                        widget.displayOrder -= 1;
                    }
                    return Object.assign({}, widget)
                }).sort(function(a, b){return a.displayOrder - b.displayOrder})
            };

        case constants.DOWN:
            return {
                widgets: state.widgets.map(widget => {
                    if(action.displayOrder !== state.widgets.length
                        && widget.displayOrder == (action.displayOrder + 1)) {
                        widget.displayOrder -= 1;
                    }
                    else if (action.displayOrder !== state.widgets.length
                        && widget.displayOrder == action.displayOrder) {
                        widget.displayOrder += 1;
                    }
                    return Object.assign({}, widget)
                }).sort(function(a, b){return a.displayOrder - b.displayOrder})
            };

        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                )).map(widget => {
                    if(widget.displayOrder > action.displayOrder) {
                        widget.displayOrder -= 1;
                    }
                    return Object.assign({}, widget)
                })

            };

        case constants.ADD_WIDGET:
            countId += 1;
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: countId,
                        name: 'New Widget',
                        displayOrder: state.widgets.length + 1,
                        text: 'New Widget',
                        className: '',
                        width: '',
                        height: '',
                        listType: '',
                        widgetType: 'Paragraph',
                        src: 'https://source.unsplash.com/random',
                        href: '#',
                        size: '2',
                    }
                ]
            };
        default:
            return state
    }
};
import * as constants from "../../../../webdev-react-hw/src/constants/index"

export const widgetReducer = (state = {widgets: [], preview: false}, action) => {
    let newState;
    switch (action.type) {

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
            let newState = {
                widgets: state.widgets.filter((widget) => {
                    if(widget.id === action.id) {
                        widget.widgetType = action.widgetType
                    }
                    return true;
                })
            };
            return JSON.parse(JSON.stringify(newState))

        case constants.SAVE:
            fetch('http://localhost:8080/api/widget/save', {
                method: 'post',
                body: JSON.stringify(state.widgets),
                headers: {
                    'content-type': 'application/json'}
            });
            return state;

        case constants.FIND_ALL_WIDGETS:
            newState = Object.assign({}, state);
            newState.widgets = action.widgets;
            return newState;

        case constants.DELETE_WIDGET:
            return {
                widgets: state.widgets.filter(widget => (
                    widget.id !== action.id
                ))
            };

        case constants.ADD_WIDGET:
            return {
                widgets: [
                    ...state.widgets,
                    {
                        id: state.widgets.length + 1,
                        name: 'New Widget',
                        order: 0,
                        text: 'New Widget',
                        className: '',
                        width: '',
                        height: '',
                        listType: '',
                        widgetType: 'Paragraph',
                        src: 'https://source.unsplash.com/random',
                        href: '#',
                        size: '2'
                    }
                ]
            };
        default:
            return state
    }
};
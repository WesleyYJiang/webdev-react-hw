import * as constants from "../../../../webdev-react-hw/src/constants/index"

export const headingTextChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
);

export const imageChanged = (dispatch, widgetId, newsrc) => (
    dispatch({
        type: constants.IMAGE_CHANGED,
        id: widgetId,
        text: newsrc
    })
);

export const hrefChanged = (dispatch, widgetId, newhref) => (
    dispatch({
        type: constants.HREF_CHANGED,
        id: widgetId,
        href: newhref
    })
);
export const headingSizeChanged = (dispatch, widgetId, newSize) => (
    dispatch({
        type: constants.HEADING_SIZE_CHANGED,
        id: widgetId,
        size: newSize
    })
);

export const convertToList = (dispatch, widgetId, newList) => (
    dispatch({
        type: constants.CONVERT_LIST,
        id: widgetId,
        size: newList
    })
);


export const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
};

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
);
export const save = dispatch => (
    dispatch({type: constants.SAVE})
);
export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
);
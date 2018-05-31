import * as constants from "../constants/index"

export const textChanged = (dispatch, widgetId, newText) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        text: newText
    })
);

export const changeListType = (dispatch, widgetId, newListType) => (
    dispatch({
        type: constants.HEADING_TEXT_CHANGED,
        id: widgetId,
        listType: newListType
    })
);

export const imageChanged = (dispatch, widgetId, newsrc) => (
    dispatch({
        type: constants.IMAGE_CHANGED,
        id: widgetId,
        text: newsrc
    })
);

export const up = (dispatch, widgetId, displayOrder) => (
    dispatch({
        type: constants.UP,
        id: widgetId,
        displayOrder: displayOrder
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

export const findWidgetsForLesson = (dispatch, lessonId) => {
    fetch('http://localhost:8080/api/lesson/LID/widget'.replace('LID', lessonId))
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
};

export const setLessonId = (dispatch, lessonId) => (
    dispatch({
        type: constants.SET_LESSON_ID,
        lessonId: lessonId
    })
);

export const findAllWidgets = dispatch => {
    fetch('http://localhost:8080/api/widget')
        .then(response => (response.json()))
        .then(widgets => dispatch({
            type: constants.FIND_ALL_WIDGETS,
            widgets: widgets
        }))
};

export const addWidget = dispatch => (
    dispatch({type: constants.ADD_WIDGET})
);

export const save = (dispatch, lessonId) => (
    dispatch({type: constants.SAVE, lessonId: lessonId})
);

export const preview = dispatch => (
    dispatch({type: constants.PREVIEW})
);
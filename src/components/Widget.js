import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/index"
import * as actions from '../actions'
import {HeadingContainer} from './Heading'

const Paragraph = ({widget, preview, headingTextChanged}) => {
    let inputElem;
    return(
        <div>
            <form hidden={preview}>
                <div className="form-group">
                    <h2>Paragraph Widget ORDER:{widget.displayOrder}</h2>
                </div>
                <div className="form-group">
                    <textarea className="form-control"
                              onChange={() => headingTextChanged(widget.id, inputElem.value)}
                              value={widget.text}
                              ref={node => inputElem = node}/>
                </div>
                <div className="form-group">
                    <h3>Preview</h3>
                </div>
            </form>
            <p>{widget.text}</p>
        </div>
    )
};

const Image = ({widget, preview, imageChanged}) => {
    let inputElem;
    return(
        <div>
            <form hidden={preview}>
                <div className="form-group">
                    <h2>Image Widget</h2>
                </div>
                <div className="form-group">
                    <input onChange={() => imageChanged(widget.id, inputElem.value)}
                           placeholder={widget.src}
                        //value={widget.src}
                           ref={node => inputElem = node}
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <h3>Preview</h3>
                </div>
            </form>
            <img src={widget.src}/>
        </div>
    )
};

const Link = ({widget, preview, hrefChanged, headingTextChanged}) => {
    let inputElem;
    return(
        <div>
            <form hidden={preview}>
                <div className="form-group">
                    <h2>Link Widget</h2>
                </div>
                <div className="form-group">
                    <input onChange={() => hrefChanged(widget.id, inputElem.value)}
                           placeholder={widget.href}
                           ref={node => inputElem = node}
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <input onChange={() => headingTextChanged(widget.id, inputElem.value)}
                           value={widget.text}
                           ref={node => inputElem = node}
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <h3>Preview</h3>
                </div>
            </form>
            <a href={widget.href}>{widget.text}</a>
        </div>
    )
};

const List = ({widget, preview, headingTextChanged, changeListType}) => {
    let inputElem;
    let selectElem;
    return(
        <div>
            <form hidden={preview}>
                <div className="form-group">
                    <h2>List Widget</h2>
                </div>
                <div className="form-group">
                    <textarea className="form-control"
                              onChange={() => headingTextChanged(widget.id, inputElem.value)}
                              value={widget.text}
                              ref={node => inputElem = node}>
                    </textarea>
                    <select onChange={() => changeListType(widget.id, selectElem.value)}
                            value={widget.listType}
                            className="form-control"
                            ref={node => selectElem = node}>
                        <option value="1">Unordered</option>
                        <option value="2">Ordered</option>
                    </select>
                </div>
                <div className="form-group">
                    <h3>Preview</h3>
                </div>
            </form>
            <p>{widget.text}</p>
        </div>
    )
};

const dispatchToPropsMapper =
    dispatch => ({
        changeListType:(widgetId, newListType) => actions.changeListType(dispatch, widgetId, newListType),
        headingTextChanged: (widgetId, newText) => actions.textChanged(dispatch, widgetId, newText),
        hrefChanged: (widgetId, newhref) => actions.hrefChanged(dispatch, widgetId, newhref),
        imageChanged: (widgetId, newsrc) => actions.imageChanged(dispatch, widgetId, newsrc),
        convertToList: (widgetId, newList) => actions.convertToList(dispatch, widgetId, newList)
    });

const stateToPropsMapper = state => ({preview: state.preview});

const ParagraphContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Paragraph);
const ImageContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Image);
const LinkContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Link);
const ListContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(List);


const Widget = ({widget, preview, dispatch}) => {
    let selectElement;
    return(
        <li className="list-group-item">
            <div hidden={preview} className="row">
                <div className="col-sm-9">
                    <h3>{widget.widgetType} (widget id : {widget.id} )</h3>
                </div>

                <div className="btn-toolbar btn-group" role="toolbar" aria-label="Basic example">
                    <div className="btn-group mr-2" role="group" >
                        <button type="button"
                                className="btn btn-warning"
                                onClick={e => (dispatch({
                                    type: 'UP',
                                    id: widget.id,
                                    displayOrder: widget.displayOrder
                                    }))}>
                            <i className="fa fa-chevron-up"/>
                        </button>

                        <button type="button"
                                className="btn btn-warning"
                                onClick={e => (dispatch({
                                    type: 'DOWN',
                                    id: widget.id,
                                    displayOrder: widget.displayOrder
                                }))}>
                            <i className="fa fa-chevron-down"/>
                        </button>
                    </div>

                    <div className="btn-group mr-2" role="group">
                        <select value={widget.widgetType}
                                onChange={e =>
                                    dispatch({
                                        type: 'SELECT_WIDGET_TYPE',
                                        id: widget.id,
                                        widgetType: selectElement.value
                                    })} ref={node => selectElement = node}>
                            <option>Heading</option>
                            <option>Paragraph</option>
                            <option>List</option>
                            <option>Image</option>
                            <option>Link</option>
                        </select>
                    </div>

                    <div className="btn-group mr-2" role="group">
                        <button type="button"
                                className="btn btn-danger"
                                onClick={e => (dispatch({type: DELETE_WIDGET,
                                    id: widget.id,
                                    displayOrder: widget.displayOrder}))}>
                            <i className="fa fa-times"/>
                        </button>
                    </div>
                </div>

            </div>
            <div>
                {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
                {widget.widgetType==='Paragraph' && <ParagraphContainer widget={widget}/>}
                {widget.widgetType==='List' && <ListContainer widget={widget}/>}
                {widget.widgetType==='Image' && <ImageContainer widget={widget}/>}
                {widget.widgetType==='Link' && <LinkContainer widget={widget}/>}
            </div>
        </li>
    )
};

const WidgetContainer = connect(state => ({preview: state.preview}))(Widget);
export default WidgetContainer;
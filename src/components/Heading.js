import React from  'react';
import * as actions from "../actions";
import {connect} from 'react-redux';

const Heading = ({widget, preview, headingTextChanged, headingSizeChanged}) => {
    let selectElem;
    let inputElem;
    return(
        <div>
            <form hidden={preview}>
                <div className="form-group">
                    <h2> Heading Widget (size: {widget.size})</h2>
                </div>
                <div className="form-group">
                    <input onChange={() => headingTextChanged(widget.id, inputElem.value)}
                           value={widget.text}
                           ref={node => inputElem = node}
                           className="form-control"/>
                </div>
                <div className="form-group">
                    <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                            value={widget.size}
                            className="form-control"
                            ref={node => selectElem = node}>
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                    </select>
                </div>
                <div className="form-group">
                    <h3>Preview</h3>
                </div>
            </form>
            {widget.size == 1 && <h1>{widget.text}</h1>}
            {widget.size == 2 && <h2>{widget.text}</h2>}
            {widget.size == 3 && <h3>{widget.text}</h3>}
        </div>
    )
};

const dispatchToPropsMapper =
    dispatch => ({
        headingTextChanged: (widgetId, newText) => actions.textChanged(dispatch, widgetId, newText),
        headingSizeChanged: (widgetId, newSize) => actions.headingSizeChanged(dispatch, widgetId, newSize)
    });

const stateToPropsMapper = state => ({preview: state.preview});

export const HeadingContainer = connect(stateToPropsMapper, dispatchToPropsMapper)(Heading);

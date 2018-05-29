import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions"
import WidgetContainer from '../components/Widget'
import {DELETE_WIDGET} from "../../../../webdev-react-hw/src/constants/index";

class WidgetList extends Component {
    constructor(props) {
        super(props);
        this.props.findAllWidgets();
    }

    render() {
        return (
            <div>
                <div className="btn-toolbar btn-group" role="toolbar">
                    <div className="btn-group mr-3" role="group">
                        &nbsp;
                        <button type="button"
                                onClick={this.props.save}
                                className="btn btn-success">Save
                        </button>
                    </div>

                    <div className="btn-group mr-2" role="group">
                        <h4>Preview</h4>
                        &nbsp;
                        <i hidden={!this.props.previewMode}
                           className="fa fa-toggle-on fa-2x"
                           onClick={this.props.preview}/>
                        <i hidden={this.props.previewMode}
                           className="fa fa-toggle-off fa-2x"
                           onClick={this.props.preview}/>

                    </div>
                </div>


                <ul className="list-group">

                    {this.props.widgets.map(widget => (
                        <WidgetContainer widget={widget}
                                         preview={this.props.previewMode}
                                         key={widget.id}/>
                    ))}

                </ul>
                <button className='btn btn-primary float-right'
                        onClick={this.props.addWidget}>
                    <i className="fa fa-plus"/>
                </button>

            </div>
        )
    }
}

const stateToPropertiesMapper = (state) => ({
    widgets: state.widgets,
    previewMode: state.preview
});

const dispatcherToPropsMapper = dispatch => ({
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    addWidget: () => actions.addWidget(dispatch),
    // save: () => actions.save(dispatch),
    preview: () => actions.preview(dispatch)
});

const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList);

export default App;
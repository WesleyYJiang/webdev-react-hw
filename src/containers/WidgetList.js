import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from "../actions";
import WidgetContainer from '../components/Widget';

class WidgetList extends Component {
    constructor(props) {
        super(props);
        // this.props.findAllWidgets();
        // this.props.findWidgetsForLesson(this.props.lessonId);
        this.state = {
            loaded: false,
            lessonId: 0,
            widgets: []
        }
        this.widgetListUpdate = this.widgetListUpdate.bind(this)
    }

    widgetListUpdate(newProps) {
        // this.setState({
        //     lessonId: newProps.lessonId,
        //     widgets: newProps.findWidgetsForLesson(newProps.lessonId)
        // });
    }

    componentWillReceiveProps(newProps) {
        if(!this.state.loaded)
            newProps.findWidgetsForLesson(newProps.lessonId)
        this.setState({loaded: true})
    }

    render() {
        return (
            <div>
                <h1>{this.props.lessonId}</h1>
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

const stateToPropertiesMapper = (state, ownProps) => ({
    widgets: state.widgets,
    previewMode: state.preview,
    lessonId: ownProps.lessonId
});

const dispatcherToPropsMapper = dispatch => ({
    findWidgetsForLesson: (lessonId) => actions.findWidgetsForLesson(dispatch, lessonId),
    findAllWidgets: () => actions.findAllWidgets(dispatch),
    addWidget: () => actions.addWidget(dispatch),
    save: () => actions.save(dispatch),
    preview: () => actions.preview(dispatch)
});

const App = connect(
    stateToPropertiesMapper,
    dispatcherToPropsMapper)(WidgetList);

// let store = createStore(widgetReducer);
//
// class WidgetListContainer extends Component {
//     render() {
//         return (
//             <Provider store={store}>
//                 <App/>
//             </Provider>
//         )
//     }
// }
export default App;


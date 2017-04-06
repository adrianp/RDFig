import React, { Component } from 'react';
import './index.css';
import './App.css';
import ArticleInputContainer from "./components/articleid_form.js";
import CustomFieldInputContainer from "./components/custom_field_form.js";
import XSLTInputContainer from "./components/xslt_form.js";
import rdfApp from "./reducers"
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import { render } from 'react-dom'
import { applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunkMiddleware from 'redux-thunk';


class App extends Component {
  render() {
    switch(this.props.uiState) {
      case "displayArticleID":
        return <ArticleInputContainer />
      case "displayCustomField":
        return <CustomFieldInputContainer />
      case "displayXSLT":
        return <XSLTInputContainer />
      case "finalXML":
        return <XSLTInputContainer />
      default:
        return <ArticleInputContainer />
    }
  }
}

const mapStateToProps = (state) => {
  return {
    uiState: state.uiReducer
  };
}

const mapDispatchToProps = () => {
  return {};
};

const MyApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


const store = createStore(rdfApp, applyMiddleware(thunkMiddleware, logger));

render(
  <Provider store={store}>
    <MyApp />
  </Provider>,
  document.getElementById('root')
);


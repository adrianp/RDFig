import React, { Component } from 'react';
import { connect } from 'react-redux'

import xslt from "../utils//xslt";
import {addXSLT} from "../actions";


class XSLTInput extends Component {
  constructor(props) {
    super(props);
    this.state = {"xslt": this.props.xslt}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({xslt: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addXSLT(this.props.xml, this.state.xslt);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          XML:
          <br/>
          <textarea defaultValue={this.props.xml} readOnly="true" />
          <br/>
        </label>
        <label>
          XSL:
          <br/>
          <textarea defaultValue={this.props.xslt} onChange={this.handleChange} />
          <br/>
        </label>
        <label>
          Result:
          <br/>
          <textarea value={this.props.new_xml} readOnly="true" />
          <br/>
        </label>
        <input type="submit" value="Get transformed XML" />
      </form>
    );
  }

} // XSLTInput


const XSLTInputContainer = connect(
  (state) => {
    return {
      "xml": state.articleReducer.xml,
      "xslt": xslt,
      "new_xml": state.articleReducer.new_xml || ""
    };
  },
  (dispatch) => {
    return {
      "addXSLT": (xml, xslt) => {
        dispatch(addXSLT(xml, xslt));
      }
    }
  }
)(XSLTInput);

export default XSLTInputContainer;


import React, { Component } from 'react';

import xslt from "../utils//xslt";


class XSLTInput extends Component {
  constructor(props) {
    super(props);
    this.state = {"xslt": xslt};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({xslt: e.target.value});
  }

  handleSubmit(e) {
    console.log("xslt: ", this.state.xslt)
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          XSL:
          <br/>
          <textarea defaultValue={this.state.xslt} onChange={this.handleChange} />
          <br/>
        </label>
        <input type="submit" value="Get transformed XML" />
      </form>
    );
  }

} // XSLTInput

export default XSLTInput;


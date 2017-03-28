import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addCustomField } from '../actions';


class CustomFieldInput extends Component {
  constructor(props) {
    super(props);
    this.state = {"fieldOntology": "http://purl.org/dc/elements/1.1/", "fieldName": "spatial"};
    this.handleOntologyChange = this.handleOntologyChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOntologyChange(e) {
    this.setState({fieldOntology: e.target.value});
  }

  handleNameChange(e) {
    this.setState({fieldName: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addCustomField(this.state.fieldOntology, this.state.fieldName);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Field ontology:
          <input type="text" defaultValue={this.state.fieldOntology} onChange={this.handleOntologyChange} />
        </label>
        <label>
          Field name:
          <input type="name" defaultValue={this.state.fieldName} onChange={this.handleNameChange} />
        </label>
        <input type="submit" value="Add custom field" />
      </form>
    );
  }

}

const CustomFieldInputContainer = connect(
  (state) => {
    return {};
  },
  (dispatch) => {
    return {
      "addCustomField": (fieldOntology, fieldName) => {
        dispatch(addCustomField({fieldOntology, fieldName}));
      }
    }
  }
)(CustomFieldInput);

export default CustomFieldInputContainer;


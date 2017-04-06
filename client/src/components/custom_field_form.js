import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addCustomField } from '../actions';


class CustomFieldInput extends Component {
  constructor(props) {
    super(props);
    this.state = {"fieldOntology": "http://purl.org/dc/elements/1.1/", "fieldName": "spatial", "fieldValue": "Romania"};
    this.handleOntologyChange = this.handleOntologyChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOntologyChange(e) {
    this.setState({fieldOntology: e.target.value});
  }

  handleNameChange(e) {
    this.setState({fieldName: e.target.value});
  }

  handleValueChange(e) {
    this.setState({fieldValue: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addCustomField(this.props.articleID, this.state.fieldOntology, this.state.fieldName, this.state.fieldValue);
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
        <label>
          Field value:
          <input type="value" defaultValue={this.state.fieldValue} onChange={this.handleValueChange} />
        </label>
        <input type="submit" value="Add custom field" />
      </form>
    );
  }

}

const CustomFieldInputContainer = connect(
  (state) => {
    return {"articleID": state.articleReducer.articleID};
  },
  (dispatch) => {
    return {
      "addCustomField": (articleID, fieldOntology, fieldName, fieldValue) => {
        dispatch(addCustomField(articleID, {fieldOntology, fieldName, fieldValue}));
      }
    }
  }
)(CustomFieldInput);

export default CustomFieldInputContainer;


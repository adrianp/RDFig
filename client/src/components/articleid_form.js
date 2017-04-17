import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addArticleID } from '../actions';


class ArticleInput extends Component {
  constructor(props) {
    super(props);
    this.state = {"articleID": 3219238}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({articleID: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addArticleID(this.state.articleID);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Article ID:
          <input type="number" defaultValue={this.state.articleID} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Get RDF graph" />
      </form>
    );
  }

};

const ArticleInputContainer = connect(
  (state) => {
    return {}
  },
  (dispatch, ownProps) => {
    return {
      "addArticleID": (articleID) => {
        dispatch(addArticleID(articleID));
      }
    }
  }
)(ArticleInput);

export default ArticleInputContainer


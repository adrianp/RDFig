export const initialize = () => {
  return {
    "type": "INITIALIZE"
  };
};

const thunkedAddArticleID = (articleID) => {
    return {
      "type": "ADD_ARTICLE_ID",
      articleID
    };
}

const thunkedRenderGraph = (nodes) => {
    return {
      "type": "RENDER_GRAPH",
     nodes
    };
}

export const addArticleID = (articleID) => {
  return (dispatch) => {
    dispatch(thunkedAddArticleID(articleID));
    fetch(`http://127.0.0.1:5000/rdf/${articleID}`)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      dispatch(thunkedRenderGraph(json));
    });
  }
};

export const addCustomFieldThunked = (customField, json) => {
  return {
    "type": "ADD_CUSTOM_FIELD",
    customField,
    "xml": json.xml,
    "nodes": json.nodes
  };
};

export const addCustomField = (articleID, customField) => {
  return (dispatch) => {
    fetch(`http://127.0.0.1:5000/add_field/${articleID}`, {
        "method": "post",
        "headers": {
          "Accept": "application/json",
          "Constent-Type": "application/json"
        },
        "body": window.JSON.stringify(customField)
        })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      dispatch(addCustomFieldThunked(customField, json));
    })
  }
};

export const addXSLTThunked = (new_xml) => {
  return {
    "type": "ADD_XSLT",
    new_xml
  };
};

export const addXSLT = (xml, xslt) => {
  return (dispatch) => {
    fetch(`http://127.0.0.1:5000/xslt/`, {
        "method": "post",
        "headers": {
          "Accept": "application/json",
          "Constent-Type": "application/json"
        },
        "body": window.JSON.stringify({xml, xslt})
        })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      dispatch(addXSLTThunked(json.xml));
    })
  }
}


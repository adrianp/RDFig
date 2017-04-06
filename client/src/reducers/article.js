const articleReducer = (state = {}, action) => {
  switch(action.type) {
    case "ADD_ARTICLE_ID":
      state.articleID = action.articleID;
      return state;
    case "ADD_CUSTOM_FIELD":
      state.customField = action.customField;
      state.xml = action.xml;
      return state;
    case "ADD_XSLT":
      state.new_xml = action.new_xml;
      return state;
    default:
      return state;
  }
};

export default articleReducer;


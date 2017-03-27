const uiReducer = (state = "displayArticleID", action) => {
  switch(action.type) {
    case "INITIALIZE":
      return "displayArticleID";
    case "ADD_ARTICLE_ID":
      return "displayCustomField";
    case "ADD_CUSTOM_FIELD":
      return "displayXSLT";
    case "ADD_XSLT":
      return "displayXSLT";
    default:
      return state;
  }
};

export default uiReducer;


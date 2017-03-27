export const initialize = () => {
  return {
    "type": "INITIALIZE"
  };
};

export const addArticleID = (articleID) => {
  return {
    "type": "ADD_ARTICLE_ID",
    articleID
  };
};

export const addCustomField = (customField) => {
  return {
    "type": "ADD_CUSTOM_FIELD",
    customField
  };
};

export const ADD_XSLT = (xslt) => {
  return {
    "type": "ADD_XSLT",
    xslt
  };
};


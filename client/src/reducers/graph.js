import renderGraph from "../graph"


const graphReducer = (state = [], action) => {
  switch(action.type) {
    case "RENDER_GRAPH":
      state = action.nodes || [];
      renderGraph(state);
      return state;
    case "ADD_CUSTOM_FIELD":
      state = action.nodes || [];
      renderGraph(state);
      return state;
    default:
      return state;
  }
};

export default graphReducer;


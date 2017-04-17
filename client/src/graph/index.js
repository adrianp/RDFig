const renderGraph = (rdf) => {

  document.getElementById("graphContainer").innerHTML = "";

  const data = {
    "nodes": {},
    "edges": []
  }

  let node_index = 0;
  let edges_index = 0;

  for (const node of rdf) {
    let sindex = -1;
    let oindex = -1

    // subject
    if (!data["nodes"].hasOwnProperty(node[0])) {
      data["nodes"][node[0]] = {
        "id": node_index,
        "label": node[0],
        x: Math.random(),
        y: Math.random(),
        "color": "#c7404d",
        size: 2,

      };
      sindex = node_index;
      node_index += 1;
    } else {
      sindex = data["nodes"][node[0]]["id"]
    }

    // object
    if (!data["nodes"].hasOwnProperty(node[2])) {
      data["nodes"][node[2]] = {
        "id": node_index,
        "label": node[2],
        x: Math.random(),
        y: Math.random(),
        size: 2,
        "color": "#c7404d"
      };
      oindex = node_index;
      node_index += 1;
    } else {
      oindex = data["nodes"][node[2]]["id"]
    }

    // predicate
    data["edges"].push({
      "id": edges_index,
      "source": sindex,
      "label": node[1],
      "target": oindex,
      "type": "curvedArrow",
      "color": "#a3cd3d",
      "count": edges_index
    });
    edges_index += 1;
  }
  data["nodes"] = Object.values(data["nodes"]);
  console.log(data);

  const graph = new window.sigma({
    "graph": data,
    "container": "graphContainer",
    defaultNodeColor: '#ec5148',
    "settings": {
      "minArrowSize": 8
    }
  })
  const config = {
    nodeMargin: 3.0,
    scaleNodes: 1.3
  };

  window.sigma.plugins.dragNodes(graph, graph.renderers[0]);
  graph.startForceAtlas2();
  window.setTimeout(() => {
    graph.killForceAtlas2();
  }, 3000);
}

export default renderGraph;


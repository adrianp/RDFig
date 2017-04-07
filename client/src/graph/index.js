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

  //graph.configNoverlap(config);
  //graph.startNoverlap();

  window.sigma.plugins.dragNodes(graph, graph.renderers[0]);
  graph.startForceAtlas2();
  window.setTimeout(() => {
    graph.killForceAtlas2();
  }, 3000);
  window.sigma.plugins.relativeSize();

}


const renderGraphD3 = (raw_nodes) => {


  const nv = window.nv;
  const d3 = window.d3;
  let nodes = {};
  let node_index = 0;
  const links = [];
  for (const node of raw_nodes) {
    let subject_index = 0;
    let predicate_index = 0;
    let object_index = 0;

    if (!nodes.hasOwnProperty(node[0])) {
      nodes[node[0]] = {"name": node[0], "group": 1, "index": node_index};
      subject_index = node_index;
      node_index += 1;
    } else {
      subject_index = nodes[node[0]]["index"];
    }

    if (!nodes.hasOwnProperty(node[1])) {
      nodes[node[1]] = {"name": node[1], "group": 3, "index": node_index};
      predicate_index = node_index;
      node_index += 1;
    } else {
      predicate_index = nodes[node[1]]["index"];

    }

    if (!nodes.hasOwnProperty(node[2])) {
      nodes[node[2]] = {"name": node[2], "group": 1, "index": node_index};
      object_index = node_index;
      node_index += 1;
    } else {
      object_index = nodes[node[2]]["index"];
    }

    links.push({"source": subject_index, "target": predicate_index});
    links.push({"source": predicate_index, "target": object_index});
  }

  nodes = Object.values(nodes).sort((a, b) => a.index - b.index);
  const all_data = {nodes, links};


  nv.addGraph({
    generate: function() {
      var width = nv.utils.windowSize().width - 40,
      height = nv.utils.windowSize().height - 40;
      var d3Colors = d3.scale.category20();

      var chart = nv.models.forceDirectedGraph()
        .width(width)
        .height(height)
        .margin({top: 20, right: 20, bottom: 20, left: 20})
        .color(function(d) { return d3Colors(d.group) })
        .nodeExtras(function(node) {
          node
            .append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function(d) { return d.name });
        })

      chart.dispatch.on('renderEnd', function(){});
      d3.select('#graph')
        .attr('width', width)
        .attr('height', height)
        .datum(all_data)  // all_data is set below
        .call(chart);
      return chart;
    },

    callback: function(graph) {
      window.onresize = function() {
        var width = nv.utils.windowSize().width - 0,
        height = nv.utils.windowSize().height - 40,
        margin = graph.margin();
        if (width < margin.left + margin.right + 20)
          width = margin.left + margin.right + 20;
        if (height < margin.top + margin.bottom + 20)
          height = margin.top + margin.bottom + 20;
        graph.width(width).height(height);
        d3.select('#test1')
          .attr('width', width)
          .attr('height', height)
          .call(graph);
      };
    }
  });
};

export default renderGraph;


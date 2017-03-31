const renderGraph = (raw_nodes) => {


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

      chart.dispatch.on('renderEnd', function(){
        console.log('render complete');
      });
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


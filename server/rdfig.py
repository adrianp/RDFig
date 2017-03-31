from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import rdflib
import requests
import xml.etree.ElementTree as ET

app = Flask(__name__)
CORS(app)

def get_rdf(article_id):
    r = requests.get("https://api.figshare.com/v2/oai?verb=GetRecord&metadataPrefix=rdf&identifier=oai:figshare.com:article/{}".format(article_id))

    root = ET.fromstring(r.text)
    metadata = root.find("{http://www.openarchives.org/OAI/2.0/}GetRecord").find('{http://www.openarchives.org/OAI/2.0/}record').find('{http://www.openarchives.org/OAI/2.0/}metadata').find('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}RDF')
    metadata_string = ET.tostring(metadata)

    g=rdflib.Graph()
    g.parse(data=metadata_string)

    nodes = []
    for s,p,o in g:
        nodes.append([s, p, o])

    return nodes, g


@app.route("/rdf/<article_id>")
def rdf(article_id):
    return jsonify(get_rdf(article_id)[0])


@app.route("/add_field/<article_id>", methods=["POST"])
def add_field(article_id):
    field = json.loads(request.data)
    g = get_rdf(article_id)[1]
    ns = rdflib.Namespace(field["fieldOntology"])

    query =  g.query("SELECT ?a WHERE {?a dc:rights ?b}")
    subject = None
    for row in query:
        subject = row[0]
    object = rdflib.Literal(field["fieldValue"])
    g.add((subject, getattr(ns, field["fieldName"]), object))
    nodes = []
    for s,p,o in g:
        nodes.append([s, p, o])
    return jsonify({"nodes": nodes, "xml": g.serialize()})


@app.route("/xslt/", methods=["POST"])
def xslt():
    return ""


if __name__ == "__main__":
    app.run(debug=True)


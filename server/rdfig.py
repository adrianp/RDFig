from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import rdflib
import requests
import xml.etree.ElementTree as ET
import lxml.etree as LET
from StringIO import StringIO
from io import BytesIO

from utils import oai_root_path

app = Flask(__name__)
CORS(app)

def get_rdf(article_id):
    r = requests.get("https://api.figshare.com/v2/oai?verb=GetRecord&metadataPrefix=rdf&identifier=oai:figshare.com:article/{}".format(article_id))

    root = ET.fromstring(r.text.encode("utf-8"))
    metadata = root.find(oai_root_path)
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
    data = json.loads(request.data)

    data["xml"] = data["xml"].replace('encoding="UTF-8"', '')
    xml = LET.parse(StringIO(data["xml"]))
    xsl = LET.parse(StringIO(data["xslt"]))

    transform = LET.XSLT(xsl)
    result = transform(xml)
    return jsonify({"xml": LET.tostring(result, pretty_print=True)})


if __name__ == "__main__":
    app.run(debug=True)


from flask import Flask, jsonify
import rdflib
import requests
import xml.etree.ElementTree as ET


app = Flask(__name__)


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

    return nodes


@app.route("/rdf/<article_id>")
def rdf(article_id):
    return jsonify(get_rdf(article_id))


if __name__ == "__main__":
    app.run()


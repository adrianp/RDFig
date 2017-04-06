export default `<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
  xmlns:ns1="http://purl.org/ontology/bibo/"
  exclude-result-prefixes="rdf rdfs ns1">

  <xsl:template match="/">
    <oai_dc:dc xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/">
      <dc:title><xsl:value-of select="rdf:RDF/rdf:Description/rdfs:label" /></dc:title>
      <dc:spatial><xsl:value-of select="rdf:RDF/rdf:Description/dc:spatial" /></dc:spatial>
      <dc:identifier><xsl:value-of select="rdf:RDF/rdf:Description/ns1:doi" /></dc:identifier>
    </oai_dc:dc>
  </xsl:template>

</xsl:stylesheet>
`;

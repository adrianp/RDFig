export default `<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#">

  <xsl:template match="/">
    <xml xmlns:dc="http://purl.org/dc/elements/1.1/">
      <dc:title><xsl:value-of select="rdf:RDF/rdf:Description/rdfs:label" /></dc:title>
      <dc:spatial><xsl:value-of select="rdf:RDF/rdf:Description/dc:spatial" /></dc:spatial>
    </xml>
  </xsl:template>
</xsl:stylesheet>
`;

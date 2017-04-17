export default `<?xml version="1.0"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
  xmlns:ns1="http://purl.org/ontology/bibo/"
  xmlns:ns2="http://purl.org/ontology/bibo/"
  xmlns:ns5="http://www.w3.org/2006/vcard/ns#"
  exclude-result-prefixes="rdf rdfs ns1">

  <xsl:template match="/">
    <oai_dc:dc xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/">
      <dc:title><xsl:value-of select="rdf:RDF/rdf:Description/rdfs:label" /></dc:title>
      <xsl:for-each select="rdf:RDF/rdf:Description">
        <xsl:for-each select="ns5:hasName">
          <dc:creator><xsl:value-of select="./@rdf:resource" /></dc:creator>
        </xsl:for-each>
      </xsl:for-each>
      <xsl:for-each select="rdf:RDF/rdf:Description[@rdf:about='https://figshare.com/articles/Hacking_the_figshare_API_to_Create_Enhanced_Metadata_Records/3219238']">
        <xsl:for-each select="ns2:freetextKeyword">
          <dc:subject><xsl:value-of select="." /></dc:subject>
        </xsl:for-each>
      </xsl:for-each>
      <dc:description><xsl:value-of select="rdf:RDF/rdf:Description/ns2:abstract" /></dc:description>
      <dc:identifier><xsl:value-of select="rdf:RDF/rdf:Description/ns1:doi" /></dc:identifier>
      <dc:rights><xsl:value-of select="rdf:RDF/rdf:Description/dc:rights" /></dc:rights>
      <dc:spatial><xsl:value-of select="rdf:RDF/rdf:Description/dc:spatial" /></dc:spatial>
    </oai_dc:dc>
  </xsl:template> 
</xsl:stylesheet>
`;

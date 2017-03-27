import rdflib

g=rdflib.Graph()
g.parse('test.xml')

for s,p,o in g:
    print "SUBJECT: ", s
    print "PREDICTE: ", p
    print "OBJECT: ", o
    print "\n"

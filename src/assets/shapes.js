import { turtle } from '@tpluscode/rdf-string'

export const triples = turtle`
          @prefix sh: <http://www.w3.org/ns/shacl#> .
          @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
          @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
          @prefix dash: <http://datashapes.org/dash#> .
          @prefix dcat: <http://www.w3.org/ns/dcat#> .
          @prefix dct: <http://purl.org/dc/terms/> .
          @prefix ex: <http://example.com/> .
          @prefix schema: <http://schema.org/> .
          
          ex:HeaderShape
            a sh:NodeShape ;
            sh:targetClass dcat:Dataset ;
            rdfs:label "Header shape" ;
            sh:property
              ex:DctTitleProperty ,
              ex:DctDescProperty ,
              ex:DctTypeProperty .
          
          # description
          ex:DctDescProperty
              sh:path dct:description ;
              sh:name "Description" ;
              sh:datatype xsd:string ;
              dash:singleLine true ;
              sh:maxCount 1 ;
              sh:minCount 1 .
          
          # title
          ex:DctTitleProperty
              sh:path dct:title ;
              sh:name "Title" ;
              sh:datatype xsd:string ;
              dash:singleLine true ;
              sh:maxCount 1 ;
              sh:minCount 1 .
          
          # type
          ex:DctTypeProperty
              sh:path dct:type ;
              sh:name "Dct type" ;
              sh:datatype xsd:anyURI ;
              sh:in ("http://data.europa.eu/dr8/PublicPolicy" "http://data.europa.eu/dr8/PublicPolicyImplementationApproach") ;
              sh:maxCount 1 .

          ex:SoftwareShape
            a sh:NodeShape ;
            sh:targetClass ex:SoftwareAsset ;
            rdfs:label "A piece of software" ;
            sh:property
              ex:DctTitleProperty ,
              ex:DctDescProperty ,
              ex:SchemaNameProperty ,
              ex:SchemaDatePublished .

          # name
          ex:SchemaNameProperty
              sh:path schema:name ;
              sh:name "Name" ;
              sh:datatype xsd:string ;
              dash:singleLine true ;
              sh:maxCount 1 ;
              sh:minCount 1 .

          # name
          ex:SchemaDatePublished
              sh:path schema:datePublished ;
              sh:name "Date published" ;
              sh:datatype xsd:date ;
              sh:maxCount 1 ;
              sh:minCount 1 .

          # owners
          ex:OwnersProperty
            a sh:PropertyShape ;
            sh:path ex:owners ;
            sh:name "Owners" ;
            dash:viewer dash:DetailsViewer ;
            sh:node ex:OwnerShape ;
            sh:class ex:Person ;
            sh:minCount 1 .

          # contact
          ex:ContactProperty
            a sh:PropertyShape ;
            sh:path ex:contact ;
            sh:name "Contact" ;
            sh:datatype xsd:string ;
            sh:maxCount 1 ;
            sh:minCount 1 .

          ex:OwnerShape
            a sh:NodeShape ;
            sh:targetClass ex:Person ;
            rdfs:label "The person responsible for a ML model" ;
            sh:property
              ex:SchemaNameProperty ,
              ex:ContactProperty .
        `


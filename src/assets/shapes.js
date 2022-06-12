import { turtle } from '@tpluscode/rdf-string'

export const headerShape = turtle`
          @prefix sh: <http://www.w3.org/ns/shacl#> .
          @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
          @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
          @prefix dash: <http://datashapes.org/dash#> .
          @prefix dcat: <http://www.w3.org/ns/dcat#> .
          @prefix dct: <http://purl.org/dc/terms/> .
          @prefix cfrl: <http://www.cefriel.com/shacl-forms#> .
          @prefix schema: <http://schema.org/> .
          
          cfrl:HeaderShape
            a sh:NodeShape ;
            sh:targetClass dcat:Dataset ;
            rdfs:label "Header shape" ;
            sh:property
              cfrl:DctTitleProperty ,
              cfrl:DctDescProperty ,
              cfrl:DctTypeProperty .
          
          # description
          cfrl:DctDescProperty
              sh:path dct:description ;
              sh:name "Description" ;
              sh:datatype xsd:string ;
              dash:singleLine true ;
              sh:maxCount 1 ;
              sh:minCount 1 .
          
          # title
          cfrl:DctTitleProperty
              sh:path dct:title ;
              sh:name "Title" ;
              sh:datatype xsd:string ;
              dash:singleLine true ;
              sh:maxCount 1 ;
              sh:minCount 1 .
          
          # type
          cfrl:DctTypeProperty
              sh:path dct:type ;
              sh:name "Dct type" ;
              sh:datatype xsd:anyURI ;
              sh:in ("http://data.europa.eu/dr8/PublicPolicy" "http://data.europa.eu/dr8/PublicPolicyImplementationApproach") ;
              sh:maxCount 1 .
        `

export const swShape = turtle`
        @prefix sh: <http://www.w3.org/ns/shacl#> .
        @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
        @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
        @prefix dash: <http://datashapes.org/dash#> .
        @prefix dcat: <http://www.w3.org/ns/dcat#> .
        @prefix dct: <http://purl.org/dc/terms/> .
        @prefix cfrl: <http://www.cefriel.com/shacl-forms#> .
        @prefix schema: <http://schema.org/> .

        cfrl:SoftwareShape
          a sh:NodeShape ;
          sh:targetClass cfrl:SoftwareAsset ;
          rdfs:label "A piece of software" ;
          sh:property
            cfrl:SchemaNameProperty ,
            cfrl:SchemaDatePublished .

        # name
        cfrl:SchemaNameProperty
            sh:path schema:name ;
            sh:name "Name" ;
            sh:datatype xsd:string ;
            dash:singleLine true ;
            sh:maxCount 1 ;
            sh:minCount 1 .

        # name
        cfrl:SchemaDatePublished
            sh:path schema:datePublished ;
            sh:name "Date published" ;
            sh:datatype xsd:date ;
            sh:maxCount 1 ;
            sh:minCount 1 .

        # owners
        cfrl:OwnersProperty
          a sh:PropertyShape ;
          sh:path cfrl:owners ;
          sh:name "Owners" ;
          dash:viewer dash:DetailsViewer ;
          sh:node cfrl:OwnerShape ;
          sh:class cfrl:Person ;
          sh:minCount 1 .

        # contact
        cfrl:ContactProperty
          a sh:PropertyShape ;
          sh:path cfrl:contact ;
          sh:name "Contact" ;
          sh:datatype xsd:string ;
          sh:maxCount 1 ;
          sh:minCount 1 .

        cfrl:OwnerShape
          a sh:NodeShape ;
          sh:targetClass cfrl:Person ;
          rdfs:label "The person responsible for a ML model" ;
          sh:property
            cfrl:SchemaNameProperty ,
            cfrl:ContactProperty .
      `


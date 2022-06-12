import { turtle } from '@tpluscode/rdf-string'

export const exampleSwResourceFlat = turtle`
  @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
  @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
  @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
  @prefix schema: <http://schema.org/> .
  @prefix foaf: <http://xmlns.com/foaf/0.1/> .
  @prefix vcard: <http://www.w3.org/2006/vcard/ns#> .
  @prefix cfrl: <http://www.cefriel.com/shacl-forms#> .

  cfrl:id13131341
    <http://purl.org/dc/terms/title> "internalAssetNameId122131212" ;
    <http://purl.org/dc/terms/description> "This is a sw that does x " ;
    <http://purl.org/dc/terms/type> "http://example/software" ;
    schema:name "MagicDashboardv2.1.4" ;
    schema:datePublished "2022-06-01"^^xsd:date .
`

export const exampleSwResource = turtle`
  @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
  @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
  @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
  @prefix schema: <http://schema.org/> .
  @prefix foaf: <http://xmlns.com/foaf/0.1/> .
  @prefix vcard: <http://www.w3.org/2006/vcard/ns#> .
  @prefix cfrl: <http://www.cefriel.com/shacl-forms#> .

  
  cfrl:id13131341
    cfrl:body _:thisBody ;
    cfrl:header _:thisHeader .

  _:thisBody
    <http://purl.org/dc/terms/title> "internalAssetNameId122131212" ;
    <http://purl.org/dc/terms/description> "This is a sw that does x" ;
    <http://purl.org/dc/terms/type> "http://example/software" .

  _:thisHeader
    schema:name "MagicDashboardv2.1.4" ;
    schema:datePublished "2022-06-01"^^xsd:date .
`
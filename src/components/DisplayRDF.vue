<template>
  <rdf-editor id="resourceEditor" 
    prefixes="sh,dash,rdfs"
    .value="rdfdata"
    format="text/turtle">
  </rdf-editor>
</template>

<script lang="js">
//import $rdf from 'rdf-ext'  
import '@hydrofoil/shaperone-wc/shaperone-form'
import clownface, { AnyPointer, GraphPointer } from 'clownface'
import $rdf from 'rdf-ext'
import { dataset, blankNode } from '@rdf-esm/dataset'
import { sh, rdf } from '@tpluscode/rdf-ns-builders'
import {headerShape, swShape} from '../assets/shapes'
import { generateQuads } from '../quadsGenerator'
import {ns} from '../namespaces'
import fetch from '@rdfjs/fetch'
import { ref } from 'vue'
import '@rdfjs-elements/rdf-editor'

export default {
    name: 'display-rdf',
    props: {
      rdfdata: String
    },
    mounted() {
       
    }
}
</script>

<style scoped>
  .divtext {
    border: ridge 2px;
    padding: 2px;
    width: 100%;
    min-height: 5em;  
    overflow: auto;
}
</style>

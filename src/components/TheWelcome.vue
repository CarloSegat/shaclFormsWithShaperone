<template>
  <span>Chill and generate forms with shacl</span>
  <custom-f
    .resource="resource"
    .headerShape="headerShape"
    .bodyShape="bodyShape"
  ></custom-f>
</template>


<script lang="ts">
//import $rdf from 'rdf-ext'  
import '@hydrofoil/shaperone-wc/shaperone-form'
import clownface, { AnyPointer, GraphPointer } from 'clownface'
import $rdf from 'rdf-ext'
import { dataset, blankNode } from '@rdf-esm/dataset'
import { sh, rdf } from '@tpluscode/rdf-ns-builders'
import {headerShape, swShape} from '../assets/shapes'
import { generateQuads } from '../quadsGenerator'
import {ns} from '../namespaces'


export default {
    name: 'TheWelcome',
    data(){
      return {
        resource: null as any,
        shapes: null as any,
        headerShape: null as any,
        bodyShape: null as any
      }
    },
    async beforeCreate() {
      let strShapes = swShape.toString();
      let quads = await generateQuads(strShapes)
      // console.log("quads: ", quads);
      let ptr = clownface({ dataset: $rdf.dataset(quads) })
      this.bodyShape = ptr.namedNode(ns.cfrl.SoftwareShape)

      strShapes = headerShape.toString();
      quads = await generateQuads(strShapes)
      // console.log("quads: ", quads);
      ptr = clownface({ dataset: $rdf.dataset(quads) })
      this.headerShape = ptr.namedNode(ns.cfrl.HeaderShape)
      
      this.resource = clownface({dataset: dataset(), })
        .namedNode("http://hello/world")
        .addOut(ns.cfrl.body, ns.cfrl.testBody)
        .addOut(ns.cfrl.header, ns.cfrl.testHeader)
  }
}
</script>

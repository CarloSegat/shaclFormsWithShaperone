<template>
  <custom-f
    .headerShape="headerShape"
    .bodyShape="bodyShape"
    @cefriel-form-submitted="tempCallback"
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
import fetch from '@rdfjs/fetch'
import { onMounted } from '@vue/runtime-core'

export default {
    name: 'create-new',
    methods: {
      tempCallback: function(e: any){
        // console.log("emitted: ",);
        this.$emit('form-submitted', e.detail['data'], 'sw-creation')
      }
    },
    data(){
      return {
        resource: null as any,
        shapes: null as any,
        headerShape: null as any,
        bodyShape: null as any
      }
    },
    async beforeCreate() {
      // in create new I don't need to 
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


      const res = await fetch('http://localhost:3001/shape/swShape')
      const resok = await fetch('https://zazuko.github.io/tbbt-ld/dist/tbbt.nq')
      console.log("res:", res)
      // console.log("res:", resok)
      const dataset = await res.dataset()

      for (const quad of dataset) {
        console.log(`${quad.subject.value} ${quad.predicate.value} ${quad.object.value}`)
      }
  },
}
</script>

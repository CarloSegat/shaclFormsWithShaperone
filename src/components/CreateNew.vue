<template>
  <custom-f
    .headerShape="headerShape"
    .bodyShape="bodyShape"
    .instancesURL="['http://localhost:3001/rdf/assetTypes']"
    @cefriel-form-submitted="emitSubmissionEvent"
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
import { fetchShape, generateQuads } from '../quadsGenerator'
import {ns} from '../namespaces'
import { onMounted } from '@vue/runtime-core'

export default {
    name: 'create-new',
    methods: {
      emitSubmissionEvent: function(e: any){
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
      // let strShapes = swShape.toString();
      // let quads = await generateQuads(strShapes)
      // let ptr = clownface({ dataset: $rdf.dataset(quads) })
      const sw = await fetchShape("swShape");
      this.bodyShape = sw.namedNode(ns.cfrl.SoftwareShape)

      let strShapes = headerShape.toString();
      let quads = await generateQuads(strShapes)
      // console.log("quads: ", quads);
      let ptr = clownface({ dataset: $rdf.dataset(quads) })
      this.headerShape = ptr.namedNode(ns.cfrl.HeaderShape)
  },
}
</script>

<template>
  <span>fniorwd wefjnoefjnk</span>
  <shaperone-form
    :shapes.prop="shape"
    :resource.prop="resource"
  ></shaperone-form>
</template>


<script lang="ts">
//import $rdf from 'rdf-ext'  
import '@hydrofoil/shaperone-wc/shaperone-form'
import clownface, { AnyPointer, GraphPointer } from 'clownface'
import $rdf from 'rdf-ext'
import stringToStream from 'string-to-stream'
import { dataset, blankNode } from '@rdf-esm/dataset'
import { sh, rdf } from '@tpluscode/rdf-ns-builders'
import {triples} from '../assets/shapes'

export default {
    name: 'TheWelcome',
    data(){
      return {
        ptr: null as any,
        resource: null as any,
        shapes: null as any,
        shape: null as any
      }
    },
    async beforeCreate() {
      const { parsers } = await import('@rdfjs-elements/formats-pretty')

    let strShapes = triples.toString();

      const inputStream = stringToStream(strShapes)
      const quads = []
      const prefixes = {}

      const quadStream = parsers.import("text/turtle", inputStream)
      if (!quadStream) {
        console.log("quadStream was null, something bad happened");
      }
      if(quadStream !== null){
        for await (const quad of quadStream) {
          quads.push(quad)
        }
      }
  
    console.log("quads: ", quads);
    this.ptr = clownface({ dataset: $rdf.dataset(quads) })
    this.shapes = this.ptr.has(rdf.type, [sh.Shape, sh.NodeShape]).toArray()
    console.log("this.shapes.toArray()", this.shapes)
    this.shape = this.shapes[1]
    console.log("terms.length: ", this.ptr.terms.length);
    console.log("term: ", this.ptr.term);
    console.log("value: ", this.ptr.value);
    console.log("values.length: ", this.ptr.values.length);
    //let pointer = clownface({ dataset: $rdf.dataset(quads) })

    this.resource = clownface({dataset: dataset(), }).blankNode()
  }
}
</script>

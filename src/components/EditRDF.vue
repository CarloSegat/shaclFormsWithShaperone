<template>
  <custom-f
    .resource="resource"
    .headerShape="headerShape"
    .bodyShape="bodyShape"
    .instancesURL="['http://localhost:3001/rdf/assetTypes']"
    @cefriel-form-submitted="emitSubmissionEvent"
  ></custom-f>
</template>

<script lang="ts">
import '@hydrofoil/shaperone-wc/shaperone-form'
import { fetchRDFWithURL, fetchShape } from '../quadsGenerator'
import {ns} from '../namespaces'
import clownface, { AnyPointer, GraphPointer } from 'clownface'
import { turtle } from '@tpluscode/rdf-string'

export default {
    name: 'edit-rdf',
    methods: {
      emitSubmissionEvent: function(e: any){
        this.$emit('form-submitted', e.detail['data'], 'sw-edit')
      }
    },
    data(){
      return {
        resource: {} as AnyPointer,
        headerShape: null as any,
        bodyShape: null as any
      }
    },
    updated() {
      const sss = turtle`${this.resource?.dataset}`.toString();
      this.emitSubmissionEvent({detail: {data: sss}});
    },
    async beforeCreate() {
      const swShape = await fetchShape("swShape");
      this.bodyShape = swShape.namedNode(ns.cfrl.SoftwareShape)

      let headerShape = await fetchShape("headerShape");
      this.headerShape = headerShape.namedNode(ns.cfrl.HeaderShape)

      this.resource = await fetchRDFWithURL("http://localhost:3001/rdf/swElementExample")
  },
}
</script>

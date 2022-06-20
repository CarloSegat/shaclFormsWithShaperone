<template>
  <custom-f
    .headerShape="headerShape"
    .bodyShape="bodyShape"
    .instancesURL="['http://localhost:3001/rdf/assetTypes']"
    @cefriel-form-submitted="emitSubmissionEvent"
  ></custom-f>
</template>

<script lang="ts">
import '@hydrofoil/shaperone-wc/shaperone-form'
import { fetchShape } from '../quadsGenerator'
import {ns} from '../namespaces'

export default {
    name: 'create-new',
    methods: {
      emitSubmissionEvent: function(e: any){
        console.log("ehi yo  yo yo yoy yo", e.detail['data'], this.outputKey);
        
        this.$emit('form-submitted', e.detail['data'], this.outputKey)
      }
    },
    props: {
      headerShape: null as any,
      bodyShape: null as any,
      outputKey: null as any,
    },
}
</script>

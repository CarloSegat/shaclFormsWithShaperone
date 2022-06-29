<template>
  <custom-f
    .headerShape="headerShape"
    .bodyShape="bodyShape"
    @cefriel-form-submitted="emitSubmissionEvent"
  ></custom-f>
</template>

<script lang="ts">
//  .instancesURL="['http://localhost:3001/rdf/assetTypes']"

import '@hydrofoil/shaperone-wc/shaperone-form'
import { fetchShape } from '../quadsGenerator'
import {ns} from '../namespaces'
import AnyPointer from 'clownface'

export default {
    name: 'vue-form-wrapper',
    methods: {
      emitSubmissionEvent: function(e: any){
        this.$emit('form-submitted', e.detail['data'])
      }
    },
    props: {
      /**
       * The size of the button
       * @values small, normal, large
       */
      headerShape: {
        type: AnyPointer,
        default: null
      },
      bodyShape: null as any,
      resource: null as any,
      instancesURL: null as any,
    },
}
</script>

<template>
  <custom-f
    .readonly="true"
    .resource="resource"
    .headerShape="headerShape"
    .bodyShape="bodyShape"
    .instancesURL="['http://localhost:3001/rdf/assetTypes']"
  ></custom-f>
</template>

<script lang="ts">
import '@hydrofoil/shaperone-wc/shaperone-form'
import { fetchRDFWithURL, fetchShape } from '../quadsGenerator'
import {ns} from '../namespaces'

export default {
    name: 'visualise-rdf',
    props: {
      headerShape: null as any,
      bodyShape: null as any,
      resource: null as any,
      dataKeyy: null as string
    }
}
</script>

<template>
  <div class="grid-container">
    <div class="item-grid-left">
      <h2>Software Element - Creation & Editing</h2>
      <div style="padding: 0.25rem">
        <CreateNew
          @form-submitted="e => setDataFromForm(e, 'sw-creation')"
          :headerShape="headerShape"
          :bodyShape="bodyShape"
        />
      </div>
    </div>
    <div class="item-grid-right">
      <h2>RDF Output</h2>
      <div style="padding: 0.25rem">
        <DisplayRDF v-bind:rdfdata="dataMap['sw-creation']"/>
      </div>
    </div>  

  </div>
</template>

<script lang="ts">
//import $rdf from 'rdf-ext'  
import CreateNew from '../components/VueFormWrapper.vue'
import DisplayRDF from '../components/DisplayRDF.vue'
import { ns } from '@/namespaces'
import { fetchRDFWithURL, fetchShape } from '@/quadsGenerator'

export default {
    name: 'Sw',
    components: { CreateNew, DisplayRDF },
    data() {
      return {
        headerShape: null as any,
        bodyShape: null as any,
        resource: null as any,

        dataMap : {
          'sw-creation': "",
          'sw-edit': ""
        } as  { [k: string]: string },
      }
    },
    async created() {
      let swShape = await fetchShape("swShape");
      this.bodyShape = swShape.namedNode(ns.cfrl.SoftwareShape)

      let headerShape = await fetchShape("headerShape");
      this.headerShape = headerShape.namedNode(ns.cfrl.HeaderShape)

      this.resource = (await fetchRDFWithURL("http://localhost:3001/rdf/swElementExample"))
        .namedNode(ns.cfrl.Mario)
    },
    methods: {

      setDataFromForm(data: string, key: string) {
        console.log("jksdhdfgidfdf sdfsdfguosrfgu sdfgguio. key", key)
        console.log("data for: ", key, " is -> : ", data)
        this.dataMap[key] = data;
      }

    }
}
</script>

<style scoped>
@import '../assets/base.css';
  .grid-container {
    display: grid;
    gap: 0.75rem;
    row-gap: 1.25rem;
    grid-template-columns: 45vw 45vw;
  }

  .item-grid-left {
    grid-column-start: 1;
    grid-column-end: 1;
  }

</style>
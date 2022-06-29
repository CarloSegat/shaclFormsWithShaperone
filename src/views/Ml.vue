<template>

  <div class="grid-container">

    <!-- first row  -->
    <div class="item-grid-left">
      <h2>Machine Learning Model - Creation & Editing</h2>
      <div style="padding: 0.25rem">
         <CreateNew
          :headerShape="headerShape"
          :bodyShape="bodyShape"
           @form-submitted="e => setDataFromForm(e, 'ml')"/>
      </div>
    </div>
    <div class="item-grid-right">
      <h2>RDF Output</h2>
      <div style="padding: 0.25rem">
        <DisplayRDF v-bind:rdfdata="dataMap['ml']"/>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
//import $rdf from 'rdf-ext'  
import CreateNew from '../components/VueFormWrapper.vue'
import DisplayRDF from '../components/DisplayRDF.vue'
import { ns } from '@/namespaces'
import { fetchShape } from '@/quadsGenerator'
import { vcard, dash, rdf, rdfs } from '@tpluscode/rdf-ns-builders'


export default {
    name: 'Ml',
    components: { CreateNew, DisplayRDF },
    data() {
      return {
        headerShape: null as any,
        bodyShape: null as any,
        dataMap : {
          'ml': ""
        } as  { [k: string]: string },
      }
    },
    async created() {
      const mlShape = await fetchShape("mlShape");
      this.bodyShape = mlShape.namedNode(ns.cfrl.MLModelShape)
     
      let headerShape = await fetchShape("headerShape");
      this.headerShape = headerShape.namedNode(ns.cfrl.HeaderShape)
    },
    methods: {
      setDataFromForm: function(data: string, id: string){
        console.log("data for: ", id, " is: ", data)
        this.dataMap[id] = data;
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
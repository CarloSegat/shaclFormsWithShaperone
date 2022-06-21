<template>

  <div class="grid-container">

    <!-- first row  -->
    <div class="item-grid-left">
      <h2>Machine Learning Model - Creation & Editing</h2>
      <div style="padding: 0.25rem">
         <CreateNew
          :outputKey="'ml-creation'"
          :headerShape="headerShape"
          :bodyShape="bodyShape"
          @form-submitted="setDataFromForm"/>
      </div>
    </div>
    <div class="item-grid-right">
      <h2>RDF Output</h2>
      <div style="padding: 0.25rem">
        <DisplayRDF v-bind:rdfdata="dataMap['ml-creation']"/>
      </div>
    </div>


    <!-- 2nd row -->
  

    <!-- 3rd row -->
   

  </div>
</template>

<script lang="ts">
//import $rdf from 'rdf-ext'  
import CreateNew from '../components/CreateNew.vue'
import DisplayRDF from '../components/DisplayRDF.vue'
import EditRDF from '../components/EditRDF.vue'
import Visualisation from '../components/Visualisation.vue'
import { ns } from '@/namespaces'
import { fetchShape } from '@/quadsGenerator'
import { vcard, dash, rdf, rdfs } from '@tpluscode/rdf-ns-builders'


export default {
    name: 'Sw',
    components: { CreateNew, DisplayRDF, EditRDF, Visualisation },
    data() {
      return {
        headerShape: null as any,
        bodyShape: null as any,
        dataMap : {
          'ml-creation': "",
          'ml-edit': ""
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
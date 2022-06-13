<template>

  <div class="grid-container">

    <div class="item-grid-left">
      <h2>Software Element - Creation</h2>
      <div style="padding: 0.5rem">
         <CreateNew @form-submitted="setDataFromForm"/>
      </div>
    </div>

    <div class="item-grid-right">
      <h2>RDF Output</h2>
      <div style="padding: 0.5rem">
        <DisplayRDF v-bind:rdfdata="dataMap['sw-creation']"/>
      </div>
    </div>

    <div class="item-grid-left">
       <h2>Software Element - Edit</h2>
    </div>

    <div class="item-grid-left">
      <h2>Software Element - Visualisation</h2>
    </div>  

  </div>
</template>

<script lang="ts">
//import $rdf from 'rdf-ext'  
import CreateNew from '../components/CreateNew.vue'
import DisplayRDF from '../components/DisplayRDF.vue'

export default {
    name: 'Sw',
    components: {CreateNew, DisplayRDF},
    data() {
      return {
        dataMap : {'sw-creation': "No data yet"} as  { [k: string]: string },
      }
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
  .grid-container {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 45vw 45vw;
  }

  .item-grid-left {
    grid-column-start: 1;
    grid-column-end: 1;
  }

</style>
<template>

  <div class="grid-container">

    <!-- first row  -->
    <div class="item-grid-left">
      <h2>Software Element - Creation</h2>
      <div style="padding: 0.25rem">
         <CreateNew @form-submitted="setDataFromForm"/>
      </div>
    </div>
    <div class="item-grid-right">
      <h2>RDF Output</h2>
      <div style="padding: 0.25rem">
        <DisplayRDF v-bind:rdfdata="dataMap['sw-creation']"/>
      </div>
    </div>


    <!-- 2nd row -->
    <div class="item-grid-left">
       <h2>Software Element - Edit</h2>
       <div style="padding: 0.25rem">
         <EditRDF  @form-submitted="setDataFromForm"/>
      </div>
    </div>
    <div class="item-grid-right">
      <h2>RDF Output</h2>
      <div style="padding: 0.25rem">
        <DisplayRDF v-bind:rdfdata="dataMap['sw-edit']"/>
      </div>
    </div>


    <!-- 3rd row -->
    <div class="item-grid-left">
      <h2>Software Element - Visualisation</h2>
      <div style="padding: 0.25rem">
         <Visualisation  @form-submitted="setDataFromForm"/>
      </div>
    </div>
    <div class="item-grid-right">
      <h2>RDF Output</h2>
      <div style="padding: 0.25rem">
        The readonly-form output has been omitted as a readonly form cannot be submitted.
      </div>
    </div>  

  </div>
</template>

<script lang="ts">
//import $rdf from 'rdf-ext'  
import CreateNew from '../components/CreateNew.vue'
import DisplayRDF from '../components/DisplayRDF.vue'
import EditRDF from '../components/EditRDF.vue'
import Visualisation from '../components/Visualisation.vue'

export default {
    name: 'Sw',
    components: { CreateNew, DisplayRDF, EditRDF, Visualisation },
    data() {
      return {
        dataMap : {
          'sw-creation': "",
          'sw-edit': ""
        } as  { [k: string]: string },
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
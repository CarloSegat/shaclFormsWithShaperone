<template>

  <div class="grid-container">

    <!-- first row  -->
    <div class="item-grid-left">
      <h2>Software Element - Creation</h2>
      <div style="padding: 0.25rem">
         <CreateNew
          :outputKey="'sw-creation'"
          :headerShape="headerShapeCreation"
          :bodyShape="bodyShapeCreation"
          @form-submitted="setDataFromForm"/>
      </div>
    </div>
    <div class="item-grid-right">
      <h2>RDF Output</h2>
      <div style="padding: 0.25rem">
        <DisplayRDF v-bind:rdfdata="dataMap['sw-creation']"/>
      </div>
    </div>

    <!-- 3rd row -->
    <div class="item-grid-left">
      <h2>Software Element - Visualisation</h2>
      <div style="padding: 0.25rem">
         <Visualisation
          :outputKey="'sw-creation'"
          :headerShape="headerShapeVisualisation"
          :bodyShape="bodyShapeVisualisation"
          :resource="resourceVisualisation"
         />
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
import { ns } from '@/namespaces'
import { fetchRDFWithURL, fetchShape } from '@/quadsGenerator'

export default {
    name: 'Sw',
    components: { CreateNew, DisplayRDF, EditRDF, Visualisation },
    data() {
      return {
        headerShapeCreation: null as any,
        bodyShapeCreation: null as any,

        headerShapeEdit: null as any,
        bodyShapeEdit: null as any,
        resourceEdit: null as any,

        headerShapeVisualisation: null as any,
        bodyShapeVisualisation: null as any,
        resourceVisualisation: null as any,
        dataMap : {
          'sw-creation': "",
          'sw-edit': ""
        } as  { [k: string]: string },
      }
    },
    async created() {
      let swShape = await fetchShape("swShape");
      this.bodyShapeCreation = swShape.namedNode(ns.cfrl.SoftwareShape)
      swShape = await fetchShape("swShape");
      this.bodyShapeVisualisation = swShape.namedNode(ns.cfrl.SoftwareShape)
      swShape = await fetchShape("swShape");
      this.bodyShapeEdit = swShape.namedNode(ns.cfrl.SoftwareShape)

      console.log("this.bodyShapeCreation === this.bodyShapeEdit", this.bodyShapeCreation === this.bodyShapeEdit)

      let headerShape = await fetchShape("headerShape");
      this.headerShapeCreation = headerShape.namedNode(ns.cfrl.HeaderShape)
      headerShape = await fetchShape("headerShape");
      this.headerShapeVisualisation = headerShape.namedNode(ns.cfrl.HeaderShape)
      headerShape = await fetchShape("headerShape");
      this.headerShapeEdit = headerShape.namedNode(ns.cfrl.HeaderShape)

      this.resourceVisualisation = await (await fetchRDFWithURL("http://localhost:3001/rdf/swElementExample"))
      .namedNode(ns.cfrl.Mario)
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
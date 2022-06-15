<template>
  <main>
    <div style="margin-bottom: 1rem">

      <div class="navbarbox">
        <router-link to="/sw"><h1>Software Element Form</h1></router-link>
        <router-link to="/ml"><h1>Machine Learning Model Form</h1></router-link>
        <router-link to="/ml"><h1>Machine Learning Model Form</h1></router-link>
        <router-link to="/ml"><h1>Machine Learning Model Form</h1></router-link>
      </div>

      <h4>Select one of the <strong style="font-weight: bold;">models above</strong> to see the corresponding example.
      </h4>
      <h4>
        On the left there is the form generated from the shapes. On the right the RDF output.
      </h4>
    </div>
    <router-view></router-view>
  </main>
</template>

<style>
@import './assets/base.css';

#app {
  padding: 2rem;
  font-weight: normal;
}

.navbarbox {
  margin-bottom: 1rem;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>

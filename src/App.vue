<template>
  <main>
    
    <router-link to="/sw">Software Element Form</router-link>
    <router-link to="/ml">Machine Learning Model Form</router-link>
    
    <router-view></router-view>
  </main>
</template>

<style>
@import './assets/base.css';

#app {
  padding: 2rem;
  font-weight: normal;
}

a {
  margin-right: 1rem;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavbarVue from './components/Navbar.vue';
import Footbar from './components/Footbar.vue';
</script>
<template>
  <NavbarVue/>
  <Footbar/>
  <RouterView/>
</template>
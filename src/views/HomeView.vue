<script setup>
  import SliderVue from '../components/Slider.vue';
  import KategoriVue from '../components/Kategori.vue';
  import BookVue from '../components/Book.vue';
  import axios from 'axios';
  import { url } from '../api/Url';
  import { onMounted, ref } from 'vue';
  import Modal from '../components/Modal.vue';
</script>
<template>
  <main class="container mb-4">
    <SliderVue></SliderVue>
    <KategoriVue></KategoriVue>
    <BookVue></BookVue>
  </main>
</template>

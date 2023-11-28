<script setup>
import { defineComponent, ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import Loading from "./Loading.vue";
import "swiper/css";
import axios from "axios";
import { url,base } from "../api/Url";
import { onMounted } from "vue";

const datas = ref([]);
let loading = ref(false);
const fetchData = async () => {
  const response = await axios.get(url + "slider");
  loading.value = true;
  datas.value = response.data.data;
};
onMounted(() => {
  fetchData();
});

</script>
<template>
  <Loading v-if="loading == false"></Loading>
  <div class="row justify-content-center" v-else>
    <div class="col-lg-10 col-12">
        <div class="card border-0">
          <div class="card-body">
            <swiper auto class="text-center">
              <swiper-slide v-for="data in datas" :key="data.id">
                <img
                  alt="Silhouette of mountains"
                  :src="base + data.image"
              /></swiper-slide>
            </swiper>
          </div>
        </div>
    </div>
  </div>
</template>
     

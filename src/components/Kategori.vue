<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import Loading from '../components/Loading.vue'
    import { url,base } from '../api/Url';
    const datas = ref([])
    let loading = ref(false)
    const fetchData = async () => {
        const response = await axios.get(url + 'kategori')
        loading.value = true
        datas.value = response.data.data
    }
    onMounted(() => {
        fetchData()
    })
</script>
<template>
    <Loading v-if="loading == false"/>
    <div class="row  justify-content-center mt-4" v-else>
        <div class="col-lg-10 col-12">
            <div class="row">
                <div class="col-lg-4 col-12" v-if="datas.length == 0">
                    <div class="bg-danger p-4 rounded text-light fw-bold text-center">Data Kategori Kosong <span class="fa fa-frown"></span></div>
                </div> 
                
                <div class="col-lg-3 col-6 mt-2" v-for="data in datas" :key="data.id" v-else>
                    <div class="card border-0">
                        <div class="card-img-top text-center mt-4">
                            <img :src="base + data.gambar" width="55" alt="{{ data.slug }}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-center fw-light">{{ data.judul }} </h5>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-6 mt-2">
                    <div class="card border-0">
                        <div class="card-img-top text-center mt-4">
                            <img src="../assets/menu.png" width="55" alt="fiksi">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-center fw-light">Lainya</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
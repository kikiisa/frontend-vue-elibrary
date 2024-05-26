<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { base,url } from '../api/Url';
    import Loading from '../components/Loading.vue';
    const datas = ref([])
    
    let loading = ref(false)

    async function fetchData()
    {
        const response = await axios.get(`${url}` + 'kategori' + '?all=true')
        loading.value = true
        datas.value = response.data.data
        console.log(response);
    } 

    onMounted(() => {
        fetchData()
    });
</script>

<template>
    <main class="container">
        <h1 class="text-center">Semua Kategori</h1>
        <div class="row">
            <Loading v-if="loading == false"/>
            <div class="col-lg-3 col-6 mt-2" v-for="data in datas" :key="data.id" v-else>
                <div class="card border-0">
                    <div class="card-img-top text-center mt-4">
                        <img v-if="data.gambar != null" :src="base + data.gambar" width="55" alt="{{ data.slug }}">
                    </div>
                    <div class="card-body">
                        <router-link style="text-decoration: none;color: black;" :to="/kategori/ + data.slug">
                            <h5 class="card-title text-center fw-light">{{ data.judul }} </h5>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
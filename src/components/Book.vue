<script setup>
   import { base, url } from '../api/Url';
   import axios from 'axios';
   import { onMounted, reactive, ref } from 'vue';  
   import Loading from '../components/Loading.vue'
   import { debounce } from '../lib/Utils'
   import ModalVue from './Modal.vue';
   const loading = ref(false)
   const jenisResponse = ref('')
   const datas = ref([])
   let currentPage = ref(1)
   let totalPage = ref(0)
   const search = ref('')
   const idProps = ref(null)
   
    const searching = async () => 
    {
        await axios.get(`${url}search-buku/${search.value}?page=${currentPage.value}`)
        .then((response) => {
            jenisResponse.value = response.data.response;
            datas.value = response.data.data.data
            currentPage.value = response.data.data.current_page
            totalPage.value = response.data.data.last_page
            loading.value = true
        }).catch((error) => {
            console.log(error);
        })
    }
    const sendPrposId = (id) =>
    {
        idProps.value = id;
    }
   const searchData = debounce(searching,2000)
   const fetchData = async () => 
   {
    const response = await axios.get(url + 'buku-api?page=' + currentPage.value);
    datas.value = response.data.data.data
    currentPage.value = response.data.data.current_page
    totalPage.value = response.data.data.last_page
    loading.value = true
   }
   const paginationButton = (id) =>
   {
        if(id == 'next')
        {
            if (currentPage.value < totalPage.value) {
                currentPage.value++;
                jenisResponse.value == 'search' ? searching() : fetchData()
            }
        }else{
            if (currentPage.value > 1) {
                currentPage.value--;
                jenisResponse.value == 'search' ? searching() : fetchData()
            }
        }
   }
   onMounted(() => {
    fetchData()
   })
   
</script>
<template>
    <Loading v-if="loading == false"></Loading>
    <div class="row justify-content-center mt-4 book-wraper" v-else>
        <div class="col-lg-10 mb-2">
           <div class="form-group">
                <input type="text" v-model="search" placeholder="Cari Buku Disini" @keyup="searchData" class="form-control fs-5">
           </div>
           {{ idProps }}
        </div>
        <div class="col-lg-10 col-12 mt-2" v-if="datas.length == 0">
            <div class="bg-danger p-3 rounded fw-bold text-light text-center">Maaf Data Kosong <span class="fa fa-frown"></span></div>
        </div>
        <div class="col-lg-10 col-12 mt-2" v-for="data in datas" :key="data.id">
            <div class="row">
                <div class="col-lg-12">
                   <div class="bg-white p-3 rounded">
                        <div class="row">
                            <div class="col-lg-3">
                                <img class="cover-book mt-2" :src="base + data.cover" :alt="data.id_buku">              
                            </div>
                            <div class="col-lg-8 mt-2">
                                <h5 class="fw-bold">{{ data.judul }}</h5>
                                <p class="text-muted">Pengarang : <strong class="badge bg-primary">{{ data.pengarang }}</strong>, 
                                    <br>Tahun : <strong class="badge bg-success">{{ data.tahun_terbit }}</strong>
                                    <br>Kategori : <strong class="badge bg-info">{{ data.kategori.judul }}</strong></p>
                                <p>
                                    {{ data.deskripsi }}
                                </p>
                                <button type="button" class="btn btn-dark fw-bold" @click="sendPrposId(data.id)" data-bs-toggle="modal" data-bs-target="#exampleModal">Pinjam Buku</button>
                                
                                <button v-if="data.stock > 0" class="btn btn-outline-dark fw-bold ms-2">Stock Buku : {{ data.stock }}</button>
                                <button class="btn btn-danger ms-2" v-else>Sold Out</button>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center" v-if="totalPage > 1">
            <div class="col-lg-3 text-center mt-3">
                <button class="btn btn-dark"  :disabled="currentPage === 1"  @click="paginationButton('prev')"><span class="fa fa-arrow-left"></span> Prev</button>
                <button class="btn btn-dark ms-2" :disabled="currentPage === totalPage" @click="paginationButton('next')"> Next <span class="fa fa-arrow-right"></span></button>
            </div>
            <span class="text-center mt-2">Page {{ currentPage }} of {{ totalPage }}</span>
        </div>
    </div>
    <ModalVue :idprops="idProps"></ModalVue>
</template>
<style scoped>
.cover-book {
    /* Atur agar gambar menyesuaikan lebar maksimum div */
    max-width: 100%;
    /* Atur agar gambar responsive (sesuai aspek rasio) */
    height: auto;
    /* Untuk memastikan gambar tidak melebihi batas div */
    display: block;
    /* Atur margin menjadi nol agar tidak ada ruang tambahan */
    margin: 0 auto;
}
.form-control {
  height: 40px;
  background-color: white;
  height: 50px;
}
.form-control:focus {
  box-shadow: none;
  border-width: 3px;
  
  background-color: white;
  border-color: #374151;
}
.book-wraper{
    margin-bottom: 90px;
}
</style>
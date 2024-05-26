<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { url,base } from "../api/Url";
import Book from "../components/Book.vue";
const router = useRouter();
let slug = ref("");

let TitlePage = ref("");
let currentPage = ref(1);
const jenisResponse = ref("");
let totalPage = ref(0);
const datas = ref([]);
async function fetchData() {
  slug.value = router.currentRoute.value.params.slug;
  const response = await axios.get(url + "kategori/" + slug.value + "?page=" + currentPage.value);
  TitlePage.value = response.data.title;
  datas.value = response.data.data.data;
  currentPage.value = response.data.data.current_page;
  totalPage.value = response.data.data.last_page;

}

const paginationButton = (id) => {
  if (id == "next") {
    if (currentPage.value < totalPage.value) {
      currentPage.value++;
      jenisResponse.value == fetchData();
    }
  } else {
    if (currentPage.value > 1) {
      currentPage.value--;
      jenisResponse.value == fetchData();
    }
  }
};
onMounted(() => {
  fetchData();
  totalPage.value;
});
</script>

<template>
  <main class="container">
    <h1 class="text-center">
      Semua Kategori <strong>{{ TitlePage }}</strong>
    </h1>
    <div class="row justify-content-center mt-4 book-wraper">
      <div class="col-lg-10 col-12 mt-2" v-if="datas.length == 0">
        <div class="bg-danger p-3 rounded fw-bold text-light text-center">
          Maaf Data Kosong <span class="fa fa-frown"></span>
        </div>
      </div>
      <div class="col-lg-10 col-12">
        <div class="row mt-4">
          <div class="col-lg-4 mb-3" v-for="data in datas" :key="data.id">
            <div class="card">
              <div class="card-img-top">
                <img
                  class="cover-book text-center mt-3"
                  width="200"
                  :src="base + data.cover"
                  :alt="data.id_buku"
                />
              </div>
              <div class="card-body">
                <h5
                  class="card-title fw-bold"
                  style="
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ data.judul }}
                </h5>
                <p class="text-muted">
                  <strong class="badge bg-primary">{{ data.pengarang }}</strong>
                  <strong class="ms-2 badge bg-success"
                    >Tahun : {{ data.tahun_terbit }}</strong
                  >
                  <strong class="badge bg-info"
                    >Kategori : {{ data.kategori.judul }}</strong
                  >
                </p>
              </div>
              <div class="card-footer">
                <span v-if="data.stock > 0" class="badge bg-dark fw-bold ms-2">
                  Stock Buku : {{ data.stock }}
                </span>
                <span class="badge bg-danger ms-2" v-else>Sold Out</span>
                <RouterLink
                  style="text-decoration: none"
                  to="/"
                  class="badge bg-primary ms-2"
                  >Detail</RouterLink
                >
                <button
                  type="button"
                  class="badge ms-2 w-100 border-0 bg-primary mt-2 fw-bold"
                  @click="sendPrposId(data.id)"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Pinjam Buku
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center" v-if="totalPage > 1">
        <div class="col-lg-3 text-center mt-3">
          <button
            class="btn btn-dark"
            :disabled="currentPage === 1"
            @click="paginationButton('prev')"
          >
            <span class="fa fa-arrow-left"></span> Prev
          </button>
          <button
            class="btn btn-dark ms-2"
            :disabled="currentPage === totalPage"
            @click="paginationButton('next')"
          >
            Next <span class="fa fa-arrow-right"></span>
          </button>
        </div>
        <span class="text-center mt-2"
          >Page {{ currentPage }} of {{ totalPage }}</span
        >
      </div>
    </div>
  </main>
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

.book-wraper {
  margin-bottom: 90px;
}
</style>

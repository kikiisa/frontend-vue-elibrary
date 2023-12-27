<script setup>
import axios from "axios";
import { url } from "../api/Url";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { onMounted, ref } from "vue";
import LoadingVue from "../components/Loading.vue";
import { toastError, toastSuccess } from "../lib/Toast";
const router = useRouter();
const myTransaksi = ref([]);
const riwayatTransaksi = ref([]);
let formData = {
  email: Cookies.get("email"),
  user: Cookies.get("user"),
};
const logout = async () => {
  Cookies.remove("token");
  Cookies.remove("email");
  Cookies.remove("user");
  toastSuccess("Berhasil Logout");
  router.push("/login");
};

const verified = async () => {
  await axios
    .get(url + "user", {
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
    .then(async (response) => {
      const responses = await axios.get(
        url + `my-transaksi/${response.data.id}`
      );
      myTransaksi.value = responses.data.data;
      riwayatTransaksi.value = responses.data.riwayat;

      router.push("/account/dashboard");
    })
    .catch((error) => {
      if (error.request.status == 401) {
        toastError("Maaf Anda Harus Login");
        router.push("/login");
      }
    });
};
onMounted(async () => {
  verified();
});
</script>
<template>
  <main class="container mb-4">
    <div class="row justify-content-start mt-4">
      <div class="col-lg-3 mb-4">
        <div class="card">
          <div class="card-header bg-blue"></div>
          <div class="card-body">
            <div class="row mb-4 justify-content-center">
              <div class="col-lg-12 col-12">
                <div class="text-center">
                  <img
                    src="../assets/logo.png"
                    class="bg-primary rounded-circle mt-4"
                    width="100"
                    alt="profile"
                  />
                </div>
              </div>
              <div class="col-lg-12 col-12 text-center">
                <h5 class="fw-bold mt-4">{{ formData.user }}</h5>
                <p class="text-muted">{{ formData.email }}</p>
                <button @click="logout" class="w-100 btn btn-warning mb-2 fw-bold ms-2">
                  Edit Profile <i class="fa fa-user"></i>
                </button>
                <button @click="logout" class="w-100 btn btn-danger fw-bold ms-2">
                  Keluar <i class="fa fa-sign-out"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="card border-0">
          <div class="card-header bg-blue"></div>
          <div class="card-body">
            <h4 class="fw-light">Management Peminjaman</h4>
            <hr />
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Riwayat Pinjam Saat Ini
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                >
                  Riwayat Pinjam
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabindex="0"
              >
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nama Buku</th>
                      <th scope="col">Tanggal Pinjam</th>
                      <th scope="col">Tanggal Di Kembalikan</th>
                      <th scope="col">Status Peminjaman</th>
                    </tr>
                  </thead>
                  <tbody v-if="myTransaksi.length != 0">
                    <tr v-for="(datas, index) in myTransaksi" :key="datas.id">
                      <td>{{ (index += 1) }}</td>
                      <td>{{ datas.book.judul }}</td>
                      <td>{{ datas.pinjam }}</td>
                      <td>{{ datas.kembali }}</td>
                      <td>
                        <button
                          v-if="datas.status == 'proses'"
                          class="badge border-0 mb-2 w-100 bg-warning"
                          type="submit"
                        >
                          Proses
                        </button>

                        <button
                          v-else-if="datas.status == 'kembali'"
                          class="badge border-0 mb-2 w-100 bg-success"
                          type="submit"
                        >
                          Di Kembalikan
                        </button>

                        <button
                          v-else
                          class="badge border-0 mb-2 w-100 bg-info"
                        >
                          Di Pinjam
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="6" align="center">
                        <span class="bg-danger p-2 text-white rounded-4"
                          >Tidak ada data transaksi.</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="tab-pane fade"
                id="profile-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabindex="0"
              >
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nama Buku</th>
                      <th scope="col">Tanggal Pinjam</th>
                      <th scope="col">Tanggal Di Kembalikan</th>
                      <th scope="col">Status Peminjaman</th>
                    </tr>
                  </thead>
                  <tbody v-if="riwayatTransaksi.length != 0">
                    <tr
                      v-for="(rwyt, index) in riwayatTransaksi"
                      :key="rwyt.id"
                    >
                      <td>{{ (index += 1) }}</td>
                      <td>{{ rwyt.book.judul }}</td>
                      <td>{{ rwyt.pinjam }}</td>
                      <td>{{ rwyt.kembali }}</td>
                      <td>
                        <button
                          v-if="rwyt.status == 'proses'"
                          class="badge border-0 mb-2 w-100 bg-warning"
                          type="submit"
                        >
                          Proses
                        </button>

                        <button
                          v-else-if="rwyt.status == 'kembali'"
                          class="badge border-0 mb-2 w-100 bg-success"
                          type="submit"
                        >
                          Di Kembalikan
                        </button>

                        <button
                          v-else
                          class="badge border-0 mb-2 w-100 bg-info"
                        >
                          Di Pinjam
                        </button>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="6" align="center">
                        <span class="bg-danger p-2 text-white rounded-4"
                          >Tidak ada data transaksi.</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.bg-blue {
  background-color: #374151;
}
</style>
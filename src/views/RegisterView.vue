<script setup>
import { url } from "../api/Url";
import { reactive } from "vue";
import { toastError, toastSuccess } from "../lib/Toast";
import axios from "axios";
import router from "../router";
const sendForm = reactive({
  nim: "",
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const storeRegister = async () => {
  try {
    const response = await axios.post(url + "register", sendForm);
    console.log(response.data)
    if(response.request.status == 200)
    {
      sendForm.nim = "";
      sendForm.name = "";
      sendForm.email = "";
      sendForm.password = "";
      sendForm.password_confirmation = "";
      toastSuccess("Pendaftaran Berhasil !")
      router.push('/login')
    }else{
      toastError("Pendaftaran Gagal !")
    }
  } catch (error) {
    if (error.response.request.status == 422) {
      const errors = error.response.data;
      for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
          const fieldErrors = errors[field];
          fieldErrors.forEach((errorMessage) => {
            toastError(errorMessage);
            sendForm.password = "";
            sendForm.password_confirmation = "";
          });
        }
      }
    }
  }
};
</script>
<template>
  <main class="container mb-4">
    <div class="row justify-content-center mt-4">
      <div class="col-lg-6">
        <div class="card border-0">
          <form @submit.prevent="storeRegister">
            <div class="card-body">
              <h5 class="fw-light">REGISTRASI AKUN</h5>
              <hr />
              <div class="row">
                <div class="form-group mt-3 col-lg-6 col-6">
                  <label class="mb-2" for="username">Nim Mahasiswa</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nim Mahasiswa"
                    id="nim"
                    v-model="sendForm.nim"
                  />
                </div>
                <div class="form-group mt-3 col-lg-6 col-6">
                  <label class="mb-2" for="username">Nama Mahasiswa</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nama Lengkap"
                    id="nama"
                    v-model="sendForm.name"
                  />
                </div>
              </div>
              <div class="form-group mt-3">
                <label class="mb-2" for="username">Alamat Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Alamat Email"
                  id="email"
                  v-model="sendForm.email"
                />
              </div>
              <div class="row">
                <div class="form-group col-lg-6 col-6 mt-3">
                  <label class="mb-2" for="password">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    class="form-control"
                    id="password"
                    v-model="sendForm.password"
                  />
                </div>
                <div class="form-group col-lg-6 col-6 mt-3">
                  <label class="mb-2" for="password">Konfirmasi Password</label>
                  <input
                    type="password"
                    placeholder="Konfirmasi Password"
                    class="form-control"
                    id="confirm"
                    v-model="sendForm.password_confirmation"
                  />
                </div>
              </div>
              <button class="btn btn-dark bg-blue w-100 mt-4">MASUK</button>
            </div>
          </form>
        </div>
        <div class="text-center mb-4 mt-2">
          <p>
            Sudah Punya Akun ?
            <router-link to="/login">Login Sekarang </router-link>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
    <style scoped>
.bg-blue {
  background-color: #374151;
}

.form-control {
  height: 40px;
  border-width: 1px;
  background-color: #e5e7eb;
}
.form-control:focus {
  box-shadow: none;
  background-color: transparent;
  border-color: #e5e7eb;
}
</style>
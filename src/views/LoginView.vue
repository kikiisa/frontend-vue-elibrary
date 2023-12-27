<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { url } from "../api/Url";
import {toastError,toastSuccess} from "../lib/Toast"
import { useRouter } from "vue-router";
import Cookies from 'js-cookie'
const router = useRouter();
const dataLogin = reactive({
  email: "",
  password: "",
});
const sendLogin = async () => {
  try {
    const response = await axios.post(url + "login", dataLogin);
    let {token,user} = response.data
    Cookies.set("token",token)
    Cookies.set("user",user.name)
    Cookies.set("email",user.email)
    router.push('/account/dashboard')
    toastSuccess(`Login Berhasil, Selamat Datang ${user.name}`)
  } catch (error) {
    if(error.request.status == 401)
    {
      toastError("Username Dan Password Tidak Diketahui")
    }else{
        const errors = error.response.data;
        for (const field in errors) {
          if (errors.hasOwnProperty(field)) {
            const fieldErrors = errors[field];
            fieldErrors.forEach((errorMessage) => {
                toastError(errorMessage)
            });
          }
        }
    }
    dataLogin.password = "";
  }
};
onMounted(async () => {
  await axios.get(url + "user", {
      headers: {
          'Authorization': 'Bearer ' + Cookies.get('token')
      }
  }).then((response) => {   
        
        router.push('/account/dashboard')
  }).catch((error) => {
      if (error.request.status == 401) {
         router.push('/login')
      }
  })
})
</script>
<template>
  <main class="container mb-4">
    <div class="row justify-content-center mt-4 py-4">
      <div class="col-lg-6">
        <div class="card border-0">
          <div class="card-body">
            <h5 class="fw-light">MASUK AKUN</h5>
            <hr />
            <form @submit.prevent="sendLogin">
              <div class="form-group mt-3">
                <label class="mb-2" for="email">Alamat Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Alamat Email"
                  id="email"
                  v-model="dataLogin.email"
                />
              </div>
              <div class="form-group mt-3">
                <label class="mb-2" for="password">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  class="form-control"
                  id="password"
                  v-model="dataLogin.password"
                />
              </div>
              <button class="btn btn-dark bg-blue w-100 mt-4">MASUK</button>
            </form>
          </div>
        </div>
        <div class="text-center mt-4">
          <p>
            Belum Punya Akun ?
            <router-link to="/registrasi">Daftar Sekarang </router-link>
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
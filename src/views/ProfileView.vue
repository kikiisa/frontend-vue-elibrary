<script setup>
import axios from "axios";
import { url } from "../api/Url";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { onMounted, reactive, ref } from "vue";
import { toastError, toastSuccess } from "../lib/Toast";
const profile = reactive({});
const router = useRouter();
let formData = {
  email: Cookies.get("email"),
  user: Cookies.get("user"),
};
const formProfile = reactive({
  id: "",
  nim: "",
  name: "",
  email: "",
  phone: "",
  status: "",
});

const passwordSend = reactive({
  old: "",
  new: "",
  confirm: "",
});

const updatePassword = async () => {
  try {
    const send = await axios.put(url + "ubah-password", {
      id: formProfile.id,
      old: passwordSend.old,
      new: passwordSend.new,
      konfirmasi: passwordSend.confirm,
    });
    if(send.status == 200)
    {
      passwordSend.old = ""
      passwordSend.confirm = ""
      passwordSend.new = ""
      toastSuccess("Berhasil Mengubah Password");
    }else{
      toastError("Terjadi Kesalahan");
    }
    
  } catch (error) {
    passwordSend.old = ""
    passwordSend.confirm = ""
    passwordSend.new = ""
    const errors = error.response.data;
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        const fieldErrors = errors[field];
        fieldErrors.forEach((errorMessage) => {
          toastError(errorMessage);
        });
      }
    } 
  }
  // console.table(Cookies.get("email"))
};
const verified = async () => {
  await axios
    .get(url + "user", {
      headers: {
        Authorization: "Bearer " + Cookies.get("token"),
      },
    })
    .then(async (response) => {
      const { nim, name, email, phone, status, id } = response.data;
      formProfile.id = id;
      formProfile.nim = nim;
      formProfile.name = name;
      formProfile.email = email;
      formProfile.phone = phone;
      formProfile.status = status;
      router.push("/account/profile");
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
    <div class="row">
      <div class="col-lg-3 mb-2">
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
                <span
                  v-if="formProfile.status == 'active'"
                  class="badge border-0 mb-2 bg-success"
                  type="submit"
                >
                  Aktif
                </span>
                <span v-else class="badge border-0 mb-2 bg-danger">
                  Tidak Aktif
                </span>
                <br />
                <button @click="logout" class="btn btn-danger fw-bold ms-2">
                  Keluar <i class="fa fa-sign-out"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-8" style="margin-bottom: 60px">
        <div class="row justify-content-start">
          <div class="col-lg-12">
            <div class="card border-0">
              <div class="card-header bg-blue"></div>
              <div class="card-body">
                <h4 class="fw-light">Profile</h4>
                <hr />
                <form>
                  <div class="row">
                    <div class="form-group">
                      <label for="nim">NIM</label>
                      <input
                        id="nim"
                        type="text"
                        placeholder="NIM"
                        v-model="formProfile.nim"
                        class="form-control"
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="name">Nama Lengkap</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="NAMA LENGKAP"
                        v-model="formProfile.name"
                        class="form-control"
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="EMAIL"
                        v-model="formProfile.email"
                        class="form-control"
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="phone">Nomor Telepon</label>
                      <input
                        id="phone"
                        type="phone"
                        placeholder="NOMOR TELEPHONE"
                        v-model="formProfile.phone"
                        class="form-control"
                        disabled
                      />
                    </div>
                  </div>
                </form>
                <br />
              </div>
            </div>
          </div>
          <div class="col-lg-12 mt-3">
            <div class="card">
              <div class="card-header bg-blue"></div>
              <div class="card-body">
                <h4 class="fw-light">Ubah Password</h4>
                <hr />
                <form @submit.prevent="updatePassword">
                  <div class="form-group">
                    <label for="old">Password Lama</label>
                    <input
                      type="password"
                      v-model="passwordSend.old"
                      id="old"
                      placeholder="******"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="new">Password Baru</label>
                    <input
                      type="password"
                      v-model="passwordSend.new"
                      id="new"
                      placeholder="******"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="confirm">Konfirmasi Password</label>
                    <input
                      type="password"
                      v-model="passwordSend.confirm"
                      id="confirm"
                      placeholder="******"
                      class="form-control"
                    />
                  </div>
                  <button class="btn btn-dark fw-bold mt-3">Ubah</button>
                </form>
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

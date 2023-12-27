<script>
import axios from "axios";
import { url } from "../api/Url";
import { ref, reactive } from "vue";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";
import { toastError, toastSuccess } from "../lib/Toast";
export default {
  props: {
    idprops: Number,
  },
  setup() {
    
    const router = useRouter();
    const datas = ref([]);
    const idUser = ref("");
    const formSend = reactive({
      idBook: "",
      idUser: "",
      judul: "",
      kategori: "",
      keterangan: "",
      pengembalian: "",
    });
    const submitForm = async () => {
      const backdrop = document.querySelector('.modal-backdrop');
      const modal = ref(document.querySelector(".modal"))
      const myModal = new bootstrap.Modal(modal.value)
      await axios
        .get(url + "user", {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        })
        .then(async (responses) => {
          formSend.idUser = responses.data.id;
          await axios
            .post(`${url}buku-api`, formSend)
            .then((response) => {
              const res = response.data;
              if(res.success == true)
              {
                formSend.keterangan = "";
                formSend.pengembalian = "";
                router.push('/account/dashboard')
                toastSuccess(res.response)
                backdrop.parentNode.removeChild(backdrop);
                myModal._hideModal()
              }else{
                toastError(res.response)
                backdrop.parentNode.removeChild(backdrop);
                myModal._hideModal()
              }
            })
            .catch((errorr) => {
              errorr.request.status == 422 ? toastError('Periksa Kembali Form Anda') : toastSuccess('')
              

             
            });
        })
        .catch((error) => {
          if (error.request.status == 401) {
            toastError("Maaf Anda Harus Login");
          }
        });
    };
    return { datas, formSend, submitForm,idUser };
  },
  watch: {
    async idprops(newVal) {
      const response = await axios.get(`${url}buku-api/${newVal}`);
      this.datas = response.data;
      this.formSend.idBook = this.datas.id;
      this.formSend.judul = this.datas.judul;
      this.formSend.kategori = this.datas.kategori.judul;
    },
  },
};
</script>
<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Pinjam Buku</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="modal-body">
            <div class="form-group">
              <label for="">Judul Buku</label>
              <input
                type="text"
                v-model="formSend.judul"
                disabled
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="">Kategori Buku</label>
              <input
                type="text"
                v-model="formSend.kategori"
                disabled
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="pengembalian">Tanggal Pengembalian</label>
              <input
                
                type="date"
                v-model="formSend.pengembalian"
                id="pengembalian"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="ketrangan">Keterangan</label>
              <textarea
                
                name="keterangan"
                v-model="formSend.keterangan"
                class="form-control"
                id=""
                cols="30"
                rows="10"
                placeholder="Keterangan"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-dark fw-bold">
              Tambahkan
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
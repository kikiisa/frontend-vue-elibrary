<template>
    <main class="container mb-4">
      <div class="row justify-content-center mt-4">
        <div class="col-lg-6">
          <div class="card border-0">
            <div class="card-body">
              <h5 class="fw-light">REGISTRASI AKUN</h5>
              <hr>
              <div class="row">
                  <div class="form-group mt-3 col-lg-6">
                    <label class="mb-2" for="username">Nim Mahasiswa</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nim Mahasiswa"
                      id="nim"
                    />
                  </div>
                  <div class="form-group mt-3 col-lg-6">
                    <label class="mb-2" for="username">Nama Mahasiswa</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Nama Lengkap"
                      id="nama"
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
                />
              </div>
              <div class="row">
                  <div class="form-group col-lg-6 mt-3">
                    <label class="mb-2" for="password">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      class="form-control"
                      id="password"
                    />
                  </div>
                  <div class="form-group col-lg-6 mt-3">
                    <label class="mb-2" for="password">Konfirmasi Password</label>
                    <input
                      type="password"
                      placeholder="Konfirmasi Password"
                      class="form-control"
                      id="confirm"
                    />
                  </div>
                </div>
                <button class="btn btn-dark bg-blue w-100 mt-4">MASUK</button>
            </div>
          </div>
          <div class="text-center mb-4 mt-2">
              <p>Sudah Punya Akun ? <router-link to="/login">Login Sekarang </router-link></p>
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
    background-color: #E5E7EB;
  }
  .form-control:focus {
    box-shadow: none;
    background-color: transparent;
    border-color: #E5E7EB;
  }
  </style>
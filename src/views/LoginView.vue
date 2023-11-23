<template>
  <main class="container mb-4">
    <div class="row justify-content-center mt-4 py-4">
      <div class="col-lg-6">
        <div class="card border-0">
          <div class="card-body">
            <h5 class="fw-light">MASUK AKUN</h5>
            <hr>
            <div class="form-group mt-3">
              <label class="mb-2" for="username">Alamat Email</label>
              <input
                type="email"
                class="form-control"
                placeholder="Alamat Email"
                id="username"
              />
            </div>
            <div class="form-group mt-3">
              <label class="mb-2" for="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                class="form-control"
                id="password"
              />
            </div>
            <button class="btn btn-dark bg-blue w-100 mt-4">MASUK</button>
          </div>
        </div>
        <div class="text-center mt-4">
            <p>Belum Punya Akun ? <router-link to="/registrasi">Daftar Sekarang </router-link></p>
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
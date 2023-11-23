<template>
  <main class="container mb-4">
    <div class="row justify-content-start mt-4">
      <div class="col-lg-4 mb-4">
        <div class="card">
          <div class="card-header bg-blue"></div>
          <div class="card-body">
            <div class="row mb-4">
              <div class="col-lg-4 col-3">
                <img
                  src="../assets/logo.png"
                  class="bg-primary rounded-circle mt-4"
                  width="100"
                  alt=""
                  srcset=""
                />
              </div>
              <div class="col-lg-8 col-8">
                <h5 class="fw-bold mt-4">Mohamad Rizky Isa</h5>
                <p class="text-muted">kikiisa89@gmail.com</p>
                <button class="btn btn-success fw-bold">Aktif</button>
                <button class="btn btn-danger fw-bold ms-2">
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
                  Buku Yang Di Pinjam Saat Ini
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
                  Riwayat Peminjaman
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
                      <th scope="col">Aksi</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    
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
                ...
              </div>
              <div
                class="tab-pane fade"
                id="contact-tab-pane"
                role="tabpanel"
                aria-labelledby="contact-tab"
                tabindex="0"
              >
                ...
              </div>
              <div
                class="tab-pane fade"
                id="disabled-tab-pane"
                role="tabpanel"
                aria-labelledby="disabled-tab"
                tabindex="0"
              >
                ...
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
<script setup>

</script>
<template>
  <footer class="fixed-bottom bg-white">
    <nav class="navbar navbar-expand-lg bg-transparent">
      <div class="container d-flex justify-content-center">
        <div class="col-lg-1 col-3 text-center">
          <a href="http://" class="nav-item">
            <i class="fa fa-info fa-2x fs-4"></i><br />
            <small>Info</small>
          </a>
        </div>
        <div class="col-lg-1 col-3 text-center">
          <router-link to="/" class="nav-item">
            <i class="fa fa-home fa-2x fs-4"></i><br />
            <small>Beranda</small>
          </router-link>
        </div>
        <div class="col-lg-1 col-3 text-center">
          <router-link
            to="/login"
            class="nav-item"
          >
            <i class="fa fa-user fa-2x fs-4"></i><br />
            <small>Akun</small>
          </router-link>
        </div>
      </div>
    </nav>
  </footer>
</template>
<style scoped>
a {
  text-decoration: none;
  color: black;
}
i {
  color: #374151;
}
</style>
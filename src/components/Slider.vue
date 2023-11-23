<template>
  <div class="row justify-content-center">
    <div class="col-lg-10 col-12">
        <div class="card border-0 mt-4">
          <div class="card-body">
            <swiper auto class="text-center">
              <swiper-slide>
                <img
                  alt="Silhouette of mountains"
                  src="https://geek-store.my.id/storage/sliders/L9NQoDEGsWn5Cdy0jWslRKeKwtmFJtpYHsOBhDIZ.png"
              /></swiper-slide>
              <swiper-slide>
                <img
                  alt="Silhouette of mountains"
                  src="https://geek-store.my.id/storage/sliders/oE7crtPUudYLhZAR0wgLwj1Hh1A9kT0r0iAbjPkk.png"
              /></swiper-slide>
            </swiper>
          </div>
        </div>
    </div>
  </div>
</template>
     
<script>
import { defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
});
</script>
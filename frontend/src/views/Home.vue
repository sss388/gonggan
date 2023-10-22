<template>
  <section id="tranding" style="margin: 0px 50px;">
    <!-- 이미지 슬라이드 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(image, index) in images" :key="index">
          <v-img :src="image"></v-img>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>

    <!-- 인기상품 -->
    <div class="container">
      <h3 class="text-center section-heading">인기상품</h3>
    </div>
    <div class="container">
      <div class="swiper tranding-slider">
        <div class="swiper-wrapper">
          <!-- Slide-start -->
          <div class="swiper-slide tranding-slide" v-for="(product, index) in products" :key="index">
            <div class="tranding-slide-img">
              <img :src="product.imageUrl" :alt="'Tranding Product ' + (index + 1)" />
            </div>
            <div class="tranding-slide-content">
              <div class="tranding-slide-content-bottom">
                <h2 class="food-name">{{ product.name }}</h2>
              </div>
            </div>
          </div>
        </div>

        <!-- 슬라이드 제어 버튼 추가 -->
        <div class="swiper-button-prev slider-arrow">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        <div class="swiper-button-next slider-arrow">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </div>

        <!-- 페이지 표시 추가 -->
        <div class="swiper-pagination"></div>
      </div>

      <div class="justify-center flex">
        <router-link to="Shop" class="bg-gray-600 text-white w-[100px] h-[40px] flex items-center justify-center rounded-[3px]" >쇼핑하러가기</router-link>
      </div>

    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Swiper, { SwiperOptions } from 'swiper';
import 'swiper/swiper-bundle.min.css';

export default defineComponent({
  data() {
    return {
      images: ['../src/assets/mainpage_img1.PNG', '../src/assets/mainpage_img2.PNG', '../src/assets/mainpage_img3.PNG'],
      products: [
        {
          imageUrl: '../src/assets/today0.png',
          name: '신규컬러 입고! 공기청정기',
        },
        {
          imageUrl: '../src/assets/best.png',
          name: '오리신발 신상주의!!',
        },
        {
          imageUrl: '../src/assets/today01.png',
            name: '어느집이나 잘 어울리는 쇼파',
        },
        {
          imageUrl: '../src/assets/today02.png',
            name: '집안 분위기를 변화시켜볼까요',
        },
        {
          imageUrl: '../src/assets/today6.png',
            name: '방향제 추천해요',
        },
        {
          imageUrl: '../src/assets/today4.png',
            name: '대형 곰인형',
        },
        {
          imageUrl: '../src/assets/best2.png',
            name: '수납 짱짱 가방',
        }
      ],
    };
  },

  mounted() {
    // 첫번째 Swiper 초기화
    new Swiper('.swiper-container', {
      loop: true,
      // autoplay: {
      //   delay: 3000,
      // },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    // 두번째 Swiper 초기화
    const trandingSliderOptions: SwiperOptions = {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };

    const trandingSwiper = new Swiper('.tranding-slider', trandingSliderOptions);

  },
});
</script>



<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap");
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style-type: none;
  text-decoration: none;
}

:root {
  --primary: #ec994b;
  --white: #ffffff;
  --bg: #f5f5f5;
}

html {
  font-size: 62.5%;
  font-family: "Montserrat", sans-serif;
  scroll-behavior: smooth;
}

@media (min-width: 1440px) {
  html {
    zoom: 1.5;
  }
}

@media (min-width: 2560px) {
  html {
    zoom: 1.7;
  }
}

@media (min-width: 3860px) {
  html {
    zoom: 2.5;
  }
}

::-webkit-scrollbar {
  width: 1.3rem;
}

::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  background: #797979;
  transition: all 0.5s ease-in-out;
}

::-webkit-scrollbar-thumb:hover {
  background: #222224;
}

::-webkit-scrollbar-track {
  background: #f9f9f9;
}

body {
  font-size: 1.6rem;
  background: var(--bg);
}

.container {
  max-width: 124rem;
  margin: 0 auto;
}

.text-center {
  text-align: center;
}

.section-heading {
  font-size: 2rem;
  color: var(--primary);
  padding: 1rem 0;
}

#tranding {
  padding: 4rem 0;
}

@media (max-width:1440px) {
  #tranding {
    padding: 7rem 0;
  }
}

#tranding .tranding-slider {
  height: 47rem;
  padding: 1rem 0;
  position: relative;
}

@media (max-width:500px) {
  #tranding .tranding-slider {
    height: 45rem;
  }
}

.tranding-slide {
  width: 37rem;
  height: 42rem;
  position: relative;
  margin-left: 10px;
}

@media (max-width:500px) {
  .tranding-slide {
    width: 28rem !important;
    height: 36rem !important;
  }
  .tranding-slide .tranding-slide-img img {
    width: 28rem !important;
    height: 36rem !important;
  }
}

.tranding-slide .tranding-slide-img img {
  width: 37rem;
  height: 42rem;
  border-radius: 2rem;
  object-fit: cover;
}

.tranding-slide .tranding-slide-content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.tranding-slide-content .food-price {
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: var(--white);
}

.tranding-slide-content .tranding-slide-content-bottom {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  color: var(--white);
}

.food-rating {
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
}

.rating ion-icon {
  color: var(--primary);
}

.tranding-slider-control {
  left: 58% !important;
  transform: translateX(-58%) !important;
}

@media (max-width:990px) {
  .tranding-slider-control {
    left: 70% !important;
    transform: translateX(-70%) !important;
  }
}

@media (max-width:450px) {
  .tranding-slider-control  {
    left: 80% !important;
    transform: translateX(-80%) !important;
  }
}

@media (max-width:990px) {
  .tranding-slider-control {
    left: 30% !important;
    transform: translateX(-30%) !important;
  }
}

@media (max-width:450px) {
  .tranding-slider-control .swiper-button-prev {
    left: 20% !important;
    transform: translateX(-20%) !important;
  }
}

.tranding-slider-control .slider-arrow {
  background: var(--white);
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  left: 42%;
  transform: translateX(-42%);
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}

.tranding-slider-control .slider-arrow ion-icon {
  font-size: 2rem;
  color: #222224;
}

.tranding-slider-control .slider-arrow::after {
  content: '';
}

.tranding-slider-control .swiper-pagination {
  position: relative;
  width: 15rem;
  bottom: 1rem;
}

.tranding-slider-control .swiper-pagination .swiper-pagination-bullet {
  filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
}

.tranding-slider-control .swiper-pagination .swiper-pagination-bullet-active {
  background: var(--primary);
}
</style>

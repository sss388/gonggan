<template>
  <div class="justify-center flex">
    <div class="min-w-[800px] max-w-screen-xl">
      <header>
        <router-link :to="{ path: '/Shop', query: { category: 'season' } }">
          Category
        </router-link>



        <router-link to="Shoppingdetails" class="bg-gray-500 text-white px-8 py-10 rounded hover:bg-gray-600"
                style="float: right; margin-top: -50px;">돼지</router-link>

        <div class="flex gap-10 justify-center my-14">
          <!-- BEST -->
          <div class="text-center">
            <router-link :to="{ path: '/Shop', query: { category: 'best' } }">
              <div class="text-center">
                <font-awesome-icon
                  :icon="['far', 'thumbs-up']"
                  style="color: #f7f7f8;"
                  class="w-10 h-10 bg-orange-400 p-3 rounded-full shadow-2xl hover:bg-orange-200 block"
                />
                <div class="mt-2 font-bold">BEST 상품</div>
              </div>
            </router-link>
          </div>


          <!-- 오늘의딜 todaydeal -->
          <div class="text-center">
            <router-link :to="{ path: '/Shop', query: { category: 'todaydeal' } }">
              <div class="text-center">
                <font-awesome-icon
                  :icon="['far', 'clock']"
                  style="color: #f7f7f8;"
                  class="w-10 h-10 bg-sky-300 p-3 rounded-full hover:bg-sky-200"
                />
                <div class="mt-1 font-bold">오늘의 딜</div>
              </div>
            </router-link>
          </div>

          <!-- 할인꿀템 discount -->
          <div class="text-center">
            <router-link :to="{ path: '/Shop', query: { category: 'discount' } }">
              <div class="text-center">
                <font-awesome-icon
                  :icon="['fas', 'comment-dollar']"
                  style="color: #f7f7f8;"
                  class="w-10 h-10 bg-yellow-300 p-3 rounded-full hover:bg-yellow-200"
                />
                <div class="mt-1 font-bold">할인꿀템</div>
              </div>
            </router-link>
          </div>



          <!-- 프리미엄 premium -->
          <div class="text-center">
            <router-link :to="{ path: '/Shop', query: { category: 'premium' } }">
              <div class="text-center">
                <font-awesome-icon
                  :icon="['fas', 'bottle-droplet']"
                  style="color: #f7f7f8;"
                  class="w-10 h-10 bg-red-500 p-3 rounded-full hover:bg-red-400"
                />
                <div class="mt-1 font-bold">프리미엄</div>
              </div>
            </router-link>
          </div>

          <!-- 저가상품 lowPrice -->
          <div class="text-center">
            <router-link :to="{ path: '/Shop', query: { category: 'lowprice' } }">
              <div class="text-center">
                <font-awesome-icon
                  :icon="['fas', 'magnifying-glass-minus']"
                  style="color: #f7f7f8;"
                  class="w-10 h-10 bg-green-400 p-3 rounded-full hover:bg-green-300"
                />
                <div class="mt-1 font-bold">저가상품</div>
              </div>
            </router-link>
          </div>


          <!-- 일반상품 general -->
          <div class="text-center">
            <router-link :to="{ path: '/Shop', query: { category: 'general' } }">
              <div class="text-center">
                <font-awesome-icon
                  :icon="['fab', 'shopify']"
                  style="color: #f7f7f8;"
                  class="w-10 h-10 bg-gray-500 p-3 rounded-full hover:bg-gray-300"
                />
                <div class="mt-1 font-bold">일반상품</div>
              </div>
            </router-link>
          </div>


        </div>
      </header>

      <br>

      <div class="mt-12 mb-64">
        <v-card-text class="text-3xl text-black-darken-1 font-bold" >오늘의 딜</v-card-text>
        <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-7">

          <div class="transform transition duration-500 hover:scale-105 " v-for="(idx) in 4" :key="idx">
            <button class="bg-red-500 text-white rounded text-xs py-1 px-2 mb-4">
              남은 시간: {{ countdown }}
            </button>
            <v-img src="@/assets/today4.png"  class="w-full  rounded-lg h-72" cover/>
            <br>
            <p class="text-[#828C94] font-normal  text-xl  leading-none tracking-tighter">
              헬로우슬립
            </p>
            <br>
            <p class="text-[#424242] font-normal text-base leading-5 tracking-tighter">
              나만의 애착인형 폭신폭신
            </p>
            <br>
            <div class="flex items-center space-x-6">
              <p class="text-blue-500 font-bold text-3xl leading-relaxed tracking-tighter font-noto-sans">
                28%
              </p>
              <p class="text-black font-bold text-3xl leading-6 tracking-tighter font-noto-sans">
                185,000
              </p>
            </div>

            <div class="flex items-center space-x-2">
              <font-awesome-icon :icon="['fas', 'star']" style="color: #56a6fb;" class="text-sm" />
              <p class="text-[#424242] font-sans text-sm leading-4 tracking-tighter">4.9</p>
              <p class="text-[#9E9E9E] font-noto-sans text-sm font-2xl leading-4 tracking-tighter">
                리뷰 17,770
              </p>
            </div>
            <br>
            <div class="d-flex">
              <button class="bg-gray-200 text-gray-700 rounded-md px-1 py-0.5 mr-2 text-sm shadow-lg border border-gray-600">무료배송</button>
              <button class="bg-orange-600 text-white rounded-md px-1 py-0.5 text-sm shadow-lg border border-orange-800">특가</button>
            </div>
          </div>

        </div>
      </div>

      <div class="mt-12 mb-32">
        <v-card-text class="text-3xl text-black-darken-1 font-bold">인기 상품</v-card-text>
        <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-7">

          <div class="transform transition duration-500 hover:scale-105 " v-for="(idx) in 4" :key="idx">
            <button class="bg-red-500 text-white rounded text-xs py-1 px-2 mb-4">
              남은 시간: {{ countdown }}
            </button>
            <v-img src="@/assets/best1.png"  class="w-full rounded-lg h-72" cover/>
            <p class="text-[#828C94] font-normal  text-xl  leading-none tracking-tighter">
              우주몽
            </p>
            <br>
            <p class="text-[#424242] font-normal text-base leading-5 tracking-tighter">
              [우주 달 토끼가습기] 탁월한 효과
            </p>
            <br>
            <div class="flex items-center space-x-6">
              <p class="text-blue-500 font-bold text-3xl leading-relaxed tracking-tighter font-noto-sans">
                7%
              </p>
              <p class="text-black font-bold text-3xl leading-6 tracking-tighter font-noto-sans">
                19,000
              </p>
            </div>

            <div class="flex items-center space-x-2">
              <font-awesome-icon :icon="['fas', 'star']" style="color: #56a6fb;" class="text-sm" />
              <p class="text-[#424242] font-sans text-sm leading-4 tracking-tighter">4.9</p>
              <p class="text-[#9E9E9E] font-noto-sans text-sm font-2xl leading-4 tracking-tighter">
                리뷰 14,050
              </p>
            </div>
            <br>
            <div class="d-flex">
              <button class="bg-gray-200 text-gray-700 rounded-md px-1 py-0.5 mr-2 text-sm shadow-lg border border-gray-600">무료배송</button>
              <button class="bg-orange-600 text-white rounded-md px-1 py-0.5 text-sm shadow-lg border border-orange-800">특가</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>










  <!--  그리고 백엔드 고려해서 오늘의 딜, 인기 상품 한 개씩만 뜨게 해주면 됨 <br>-->
  <!--  ( 상품 누르면 빈 페이지 연결되게 라우터 설정 )-->


</template>

<script lang="ts" setup>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {
  faClock,
  faThumbsUp,


} from "@fortawesome/free-regular-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faBottleDroplet, faCommentDollar, faMagnifyingGlassMinus, faStar,} from "@fortawesome/free-solid-svg-icons";


library.add(faClock);
library.add(faBottleDroplet)
library.add(faMagnifyingGlassMinus)
library.add(faCommentDollar)
library.add(faThumbsUp)
library.add(faStar)
library.add(faShopify)

// 타이머설정..
import { ref } from 'vue';

// 데이터 초기값 설정
const countdown = ref('0'); // 문자열로 초기화

// 타이머 시작 메서드
function startCountdown() {
  const targetTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24시간 후

  const interval = 1000; // 1초 간격으로 업데이트

  const timer = setInterval(() => {
    const currentTime = new Date().getTime();
    const remainingTime = targetTime - currentTime;

    if (remainingTime <= 0) {
      clearInterval(timer);
      countdown.value = '0'; // 문자열로 설정
    } else {
      // 시간, 분, 초 계산
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      // 남은 시간을 형식에 맞게 표시
      countdown.value = `${hours}:${minutes}:${seconds}`;
    }
  }, interval);
}

// 컴포넌트가 마운트될 때 타이머 시작
import { onMounted } from 'vue';
import {faShopify} from "@fortawesome/free-brands-svg-icons";
onMounted(() => {
  startCountdown();
});




</script>

<style scoped>

</style>

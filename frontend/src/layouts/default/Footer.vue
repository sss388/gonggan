<template>
  <footer class="bg-gray-200 text-left px-4 py-4 flex flex-col space-y-8">
    <div class="text-black -mb-5">
      <h5 class="font-bold">고객센터</h5>
      <p>02-123-4567(유료)</p>
      <p class="mb-3">
        평일 오전9시 ~ 오후6시<br>
        주말, 공휴일: 직접배송, 이사/시공/제품설치 문의 상담 가능
      </p>
    </div>

    <div>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <font-awesome-icon
          :icon="['fab', 'square-facebook']"
          class="w-10 h-10 mr-5 -my-2 text-gray-400 hover:text-blue-700"
        />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        <font-awesome-icon
          :icon="['fab', 'square-instagram']"
          class="w-10 h-10 mr-5 -my-2  text-gray-400 hover:text-pink-500"
        />
      </a>
      <a href="https://twitter.com/?lang=ko" target="_blank" rel="noopener noreferrer">
        <font-awesome-icon
          :icon="['fab', 'square-twitter']"
          class="w-10 h-10 mr-5 -my-2 text-gray-400 hover:text-blue-400"
        />
      </a>
      <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
        <font-awesome-icon
          :icon="['fab', 'youtube']"
          class="w-10 h-10 mr-5 -my-2 text-gray-400 hover:text-red-600"
        />
      </a>
    </div>

    <div>
      <router-link to="/SiteIntroduction" class="bg-transparent border-none outline-none focus:outline-none hover:bg-gray-200 mr-10">
        공간 소개
      </router-link>
      <router-link to="/Privacypolicy" class="bg-transparent border-none outline-none focus:outline-none hover:bg-gray-200 mr-10">개인정보 처리방침</router-link>
      <router-link to="/Notice" class="bg-transparent border-none outline-none focus:outline-none hover:bg-gray-200 mr-10">공지사항</router-link>
      <router-link to="/Inquiry" class="bg-transparent border-none outline-none focus:outline-none hover:bg-gray-200">문의하기</router-link>
    </div>

    <div>
      <p class="mb-3">공간 | 대표 : 신성식 | 사업자 등록번호 : 123-456-78910</p>
      <p class="text-xs">Copyright 2023 GongGan, Co., Ltd. All rights reserved.</p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faSquareFacebook);
library.add(faSquareInstagram);
library.add(faSquareTwitter);
library.add(faYoutube);
</script>

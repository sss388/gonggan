<template>
  <v-main>
    <div class="font-bold text-xl ml-3">
      마이페이지
    </div>
    <v-divider class="border-opacity-100 my-3"/>
    <div class="flex">
      <SideMenu />
      <router-view />
    </div>
  </v-main>
</template>

<script lang="ts" setup>
import SideMenu from "@/layouts/myPage/SideMenu.vue";
</script>

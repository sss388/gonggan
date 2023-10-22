<template>
  <v-main>
    <div class="font-bold text-xl ml-3 mt-5">
      관리자 페이지
    </div>
    <v-divider class="border-opacity-100 my-3"/>
    <div class="flex">
      <SideMenu />
      <div class="my-8 ml-3">
        <router-view />
      </div>
    </div>
  </v-main>
</template>

<script lang="ts" setup>
import SideMenu from "@/layouts/admin/SideMenu.vue";
</script>

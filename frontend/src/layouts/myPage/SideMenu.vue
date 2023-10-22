<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        floating
        permanent
      >
        <v-list
          density="compact"
          nav
        >
          <v-list-item :to="{name: 'MyInfo'}" prepend-icon="mdi-account-edit" title="내 정보수정" value="editInfo"/>
          <v-list-item :to="{name: 'PasswordChange'}" prepend-icon="mdi-lock" title="비밀번호 변경" value="editPassword"/>
          <v-list-item :to="{name: 'DeliveryChk'}" prepend-icon="mdi-truck-delivery" title="배송 확인" value="deliveryChk"/>
          <v-list-item :to="{name: 'FavoriteList'}" prepend-icon="mdi-heart-multiple" title="찜 목록" value="favoriteList"/>
          <v-list-item :to="{name: 'BoughtList'}" prepend-icon="mdi-credit-card-check-outline" title="결제내역" value="boughtList"/>
          <v-list-item :to="{name: 'MyWriting'}" prepend-icon="mdi-book-open-outline" title="내가 쓴 글" value="myWriting"/>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 500px"></v-main>
    </v-layout>
  </v-card>
</template>
<script lang="ts" setup>
</script>

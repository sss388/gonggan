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
          <v-list-item :to="{name: 'AdminInfo'}" prepend-icon="mdi-account-edit" title="내 정보수정" value="editInfo"/>
          <v-list-item :to="{name: 'AdminPasswordChange'}" prepend-icon="mdi-lock" title="비밀번호 변경" value="editPassword"/>
          <v-list-item :to="{name: 'UserManage'}" prepend-icon="mdi-account-details" title="유저 관리" value="userManage"/>
          <v-list-item :to="{name: 'ShoppingManage'}" prepend-icon="mdi-shopping-outline" title="쇼핑글 관리" value="shoppingManage"/>
          <v-list-item :to="{name: 'WritingManage'}" prepend-icon="mdi-file-document-multiple-outline" title="글 관리" value="writingManage"/>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 500px"></v-main>
    </v-layout>
  </v-card>
</template>
<script lang="ts" setup>
</script>

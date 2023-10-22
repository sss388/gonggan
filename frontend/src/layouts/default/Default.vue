<template>
  <v-app>
    <default-bar  />

    <default-view class="my-8" />

    <RemoteController />

    <v-snackbar
      v-model="store.getters.getToast.show"
      elevation="24"
      :color="store.getters.getToast.color"
    >
      <v-icon icon="mdi-checkbox-marked-circle"
              v-if="store.getters.getToast.color === 'green'"
      />
      <v-icon icon="mdi-cancel"
              v-if="store.getters.getToast.color === 'red'"
      ></v-icon>
      &nbsp {{store.getters.getToast.message}}
    </v-snackbar>

    <Footer />
  </v-app>

</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from "@/layouts/default/View.vue";
import RemoteController from "@/components/RemoteController.vue";
import Footer from "@/layouts/default/Footer.vue";
import {useStore} from "vuex";

const store = useStore();
store.dispatch('fetchCurrentUser');

</script>

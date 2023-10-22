<template>
  <v-app>
    <default-bar  />

    <default-view class="min-w-[800px] max-w-screen-xl h-min-[500px]"/>

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

import Footer from "@/layouts/default/Footer.vue";
import DefaultView from "@/layouts/admin/View.vue";
import DefaultBar from "@/layouts/default/AppBar.vue";
import RemoteController from "@/components/RemoteController.vue";
import {useStore} from "vuex";

const store = useStore();
store.dispatch('fetchCurrentUser');

</script>

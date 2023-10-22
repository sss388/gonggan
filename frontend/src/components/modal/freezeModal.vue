<template>
  <v-card class="p-10 outline outline-[3px] outline-[#27374D]" >
    <v-card-title>정지할 기간</v-card-title>
    <v-card-item>
      <v-text-field type="number" variant="outlined" density="compact"
                    v-model="days"
      />
      <v-btn color="blue-grey-darken-4" block @click="freezeAccount">정지 하기</v-btn>
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {ref} from "vue";
import axios from "axios";

const store = useStore();
const days = ref(1);

const freezeAccount = async () => {
  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/freezeAccount`, {
    userId: store.getters.getFreezeModalState.target,
    days: days.value,
  }).then((res) => {
    console.log(res.data);
  })
}
</script>

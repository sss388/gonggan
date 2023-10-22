<template>
  <div class="ml-3">
    <div class="p-4 min-w-[800px] max-w-screen-xl">
        <div class="font-bold text-2xl mb-8">
          내가 쓴 글
        </div>
        <v-sheet min-height="500px">
          <v-table class="mt-2">
            <thead>
              <tr class="bg-blue-lighten-1">
                <th class="text-center text-white" width="80%">제목</th>
                <th class="text-center text-white">작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in boardList" :key="idx">
                <td class="text-center">{{ item.title }}</td>
                <td class="text-center">{{ formatDate(item.createdAt) }}</td>
              </tr>
            </tbody>
          </v-table>

          <v-pagination
            v-model="page"
            :length="pageLen"
            rounded="circle"
            class="mt-5"
          />
        </v-sheet>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, reactive, ref, watch} from "vue";
import axios from "axios";

interface Board {
  id: number;
  title: string;
  createdAt: Date;
}

const pageLen = ref(1);
const page = ref(1);

const boardList = reactive<Board[]>([]);

watch(page, async (newPage) => {
  const jwt = sessionStorage.getItem('jwt');

  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/boards?page=`+newPage, {
    headers: {Authorization: `Bearer ${jwt}`},
  }).then((res) => {
    boardList.length = 0;
    boardList.push(...res.data);
  })
})

const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const second = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

onMounted(async () => {
  const jwt = sessionStorage.getItem('jwt');
  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/boardCount`, {
    headers: {Authorization: `Bearer ${jwt}`},
  }).then((res) => {
    pageLen.value = Math.ceil(res.data/10);
  });

  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/boards`, {
    headers: {Authorization: `Bearer ${jwt}`},
  }).then((res) => {
    boardList.push(...res.data);
  })
})

</script>

<template>
  <div class="w-full">
    <div class="font-bold text-2xl mb-8">
      유저 관리
    </div>
    <v-sheet min-height="500px">
      <v-table class="mt-2" >
        <thead>
          <tr class="bg-blue-lighten-1">
            <th class="text-center text-white">UUID</th>
            <th class="text-center text-white">유저명</th>
            <th class="text-center text-white">이메일</th>
            <th class="text-center text-white">역할</th>
            <th class="text-center text-white">계정 정지</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in users" :key="idx" v-if="users.length !== 0">
            <td class="text-center">{{item.id}}</td>
            <td class="text-center">{{item.name}}</td>
            <td class="text-center">{{item.email}}</td>
            <td class="text-center">{{item.role}}</td>
            <td class="text-center">
              <v-btn color="blue-grey-darken-4"
                     :disabled="item.role !== 'user'"
                     @click="handleFreezeBtn(item.id)"
                     v-if="!item.releaseAt || releaseChk(item.releaseAt)"
              >
                계정 정지
              </v-btn>
              <v-btn color="blue-grey-darken-4"
                     v-else @click="releaseAccount(item.id)"
              >
                정지 해제
              </v-btn>
            </td>
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
</template>

<script lang="ts" setup>
import {computed, onMounted, reactive, ref, UnwrapRef, watch} from "vue";
import axios from "axios";
import {useStore} from "vuex";

const pageLen = ref(1);
const page = ref(1);
const store = useStore();

watch(page, async(newPage) => {
  await axios.get('http://localhost:3001/admin/users?page='+newPage)
    .then((res) => {
      users.length = 0;
      users.push(...res.data);
    })
})

interface User {
  id: string;
  name: string,
  email: string;
  role: string;
  check: false;
  releaseAt: Date | null;
}

const users = reactive<User[]>([]);

const handleFreezeBtn = (userId: string) => {
  store.commit('setFreezeModalState', {
    target: userId,
    isShow: true,
  });
}

const releaseAccount = async (userId: string) => {
  await axios.put('http://localhost:3001/admin/releaseAccount',
    {userId}
  ).then((res) => {
    for (const item of users) {
      if(item.id === userId) {
        item.releaseAt = null;
      }
    }
  })
}

const releaseChk = (_date: Date | string): boolean => {
  const today = new Date();
  const date = new Date(_date);

  return date < today;
}

onMounted(async () => {
  await axios.get('http://localhost:3001/admin/users')
    .then((res) => {
      users.push(...res.data);
      pageLen.value = Math.ceil(users.length/10);
    })
})
</script>

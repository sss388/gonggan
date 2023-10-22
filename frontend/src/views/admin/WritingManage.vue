<template>
  <div class="font-bold text-2xl mb-8">
    글 관리
  </div>
  <v-sheet min-height="500px" min-width="800px">
    <v-table class="mt-2">
      <thead>
        <tr class="bg-blue-lighten-1">
          <th class="text-center text-white">번호</th>
          <th class="text-center text-white">제목</th>
          <th class="text-center text-white">작성자</th>
          <th class="text-center text-white">종류</th>
          <th class="text-center text-white">관리</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in BoardList" :key="idx" v-if="BoardList.length !== 0">
          <td class="text-center">{{item.id}}</td>
          <td class="text-center">{{item.title}}</td>
          <td class="text-center">{{item.user.name}}</td>
          <td class="text-center">{{item.kind}}</td>
          <td class="text-center">
            <v-btn variant="outlined" v-if="item.status === 'Y'"
                   @click="toggleStatus(item)"
            >
              삭제하기
            </v-btn>
            <v-btn variant="outlined" v-if="item.status === 'N'"
                   @click="toggleStatus(item)"
            >
              삭제취소
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="justify-center flex w-full mt-10 gap-1 -mb-8">
      <div class="w-[200px]">
        <v-text-field variant="outlined" density="compact"  @keydown.enter="searchBoard"
                      append-inner-icon="mdi-magnify" v-model="inputSearch.keyword"
                      @click:append-inner="searchBoard"
        />
      </div>
      <div class="w-[150px]">
        <v-select variant="outlined" density="compact"
                  :items="['제목', '작성자', '종류']" v-model="inputSearch.category"
        />
      </div>
    </div>

    <v-pagination
      v-model="page"
      :length="pageLen"
      rounded="circle"
      class="mt-5"
    />
  </v-sheet>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {watch} from "vue";

interface Board {
  id: number;
  kind: string;
  title: string;
  status: string;
  user: {
    name: string;
  }
}

interface Search{
  keyword: string
  category: string;
}

const BoardList = reactive<Board[]>([]);
const pageLen = ref(1);
const page = ref(1);

const inputSearch = reactive<Search>({
  keyword: "",
  category: "제목",
})
const search = reactive<Search>({
  keyword: "",
  category: "제목",
})

const toggleStatus = async (item: Board) => {
  if (item.status === 'Y') {
    item.status = 'N';
  } else if (item.status === 'N') {
    item.status = 'Y';
  }
  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/setBoardStatus`, {
    id: item.id,
    status: item.status,
  })
}

const searchBoard = async () => {
  search.keyword = inputSearch.keyword;
  search.category = inputSearch.category;

  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/boardCount?keyword=${search.keyword}&category=${search.category}`)
    .then((res) => {
      pageLen.value = Math.ceil(res.data/10);
    })

  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/board?keyword=${search.keyword}&category=${search.category}`)
    .then((res) => {
      BoardList.length = 0;
      BoardList.push(...res.data);
      page.value = 1;
    })
}

watch(page, async(newPage) => {
  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/board?keyword=${search.keyword}&category=${search.category}&page=${newPage}`)
    .then((res) => {
      BoardList.length = 0;
      BoardList.push(...res.data);
    })
})

onMounted(async () => {
  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/board`)
    .then((res) => {
      BoardList.push(...res.data);
    })

  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/boardCount`)
    .then((res) => {
      pageLen.value = Math.ceil(res.data/10);
    })
})

</script>

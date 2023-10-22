<template>
  <div class="font-bold text-2xl mb-8">
    쇼핑글 관리
  </div>
  <div>
    <router-link to="ProductForm" class="bg-gray-500 text-white py-1 px-4 ml-5 mt-2 rounded hover:bg-gray-600">상품등록</router-link>
  </div>
  <v-sheet min-height="500px" min-width="800px">
    <v-table class="mt-2" >
      <thead>
        <tr class="bg-blue-lighten-1">
          <th class="text-center text-white">번호</th>
          <th class="text-center text-white">제목</th>
          <th class="text-center text-white">카테고리</th>
          <th class="text-center text-white">할인율</th>
          <th class="text-center text-white">관리</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(item, idx) in shoppingList" :key="idx" v-if="shoppingList.length !== 0">
        <td class="text-center">{{item.id}}</td>
        <td class="text-center">{{item.title}}</td>
        <td class="text-center">{{item.category}}</td>
        <td class="text-center">
          <div class="cursor-pointer hover:text-red-500" @click="handleDiscount(item.id, item.discount)">
            {{item.discount}}%
          </div>
        </td>
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
        <v-text-field variant="outlined" density="compact" @keydown.enter="searchShopping"
                      append-inner-icon="mdi-magnify" v-model="inputSearch.keyword"
                      @click:append-inner="searchShopping"
        />
      </div>
      <div class="w-[150px]">
        <v-select variant="outlined" density="compact"
          :items="['제목', '작성자', '카테고리']" v-model="inputSearch.category"
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

  <v-dialog
    v-model="discount.isShow"
    width="400px"
  >
    <v-card>
      <v-card-title>
        할인율
      </v-card-title>
      <v-card-item>
        <v-slider
          v-model="discount.newDiscount" thumb-color="blue" track-color="blue"
          thumb-label="always" :step="1" min="0" max="100"
          class="py-10 px-4"
        />
      </v-card-item>
      <v-card-actions>
        <v-btn color="primary" @click="updateDiscount">할인 적용</v-btn>
        <v-btn color="red" @click="discount.isShow = false">닫기</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {ref, watch} from "vue";

interface Shopping{
  id: number;
  title: string;
  category: string;
  discount: number;
  status: string;
}

interface Discount{
  isShow: boolean;
  targetId: number;
  newDiscount: number;
}

interface Search{
  keyword: string
  category: string;
}

const shoppingList = reactive<Shopping[]>([])
const discount = reactive<Discount>({
  isShow: false,
  targetId: 0,
  newDiscount: 0,
});

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

const handleDiscount = (id: number, currentDiscount: number) => {
  discount.isShow = true;
  discount.targetId = id;
  discount.newDiscount = currentDiscount;
}

const updateDiscount = async () => {
  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/setDiscount`, {
    id: discount.targetId,
    discount: discount.newDiscount,
  }).then((res) => {
    for(const item of shoppingList) {
      if(item.id === discount.targetId){
        item.discount = discount.newDiscount;
        discount.isShow = false;
        break;
      }
    }
  })
}

const toggleStatus = async (item: Shopping) => {
  if (item.status === 'Y') {
    item.status = 'N';
  } else if (item.status === 'N') {
    item.status = 'Y';
  }
  await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/setShoppingStatus`, {
    id: item.id,
    status: item.status,
  })
}

const searchShopping = async () => {
  search.keyword = inputSearch.keyword;
  search.category = inputSearch.category;

  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/shoppingCount?keyword=${search.keyword}&category=${search.category}`)
    .then((res) => {
      pageLen.value = Math.ceil(res.data/10);
    })

  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/shopping?` +
    `keyword=${search.keyword}&category=${search.category}`)
    .then((res) => {
      shoppingList.length = 0;
      shoppingList.push(...res.data);
      page.value = 1;
    })
}

watch(page, async(newPage) => {
  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/shopping?`
  + `page=${newPage}&keyword=${search.keyword}&category=${search.category}`)
    .then((res) => {
      shoppingList.length = 0;
      shoppingList.push(...res.data);
    })
})

onMounted(async () => {
  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/shoppingCount`)
    .then((res) => {
      pageLen.value = Math.ceil(res.data/10);
    })

  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/shopping`)
    .then((res) => {
      shoppingList.push(...res.data);
    })

})
</script>

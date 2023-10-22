<template>
  <div class="ml-3">
    <div class="p-4 min-w-[800px]">
      <div class="mb-8">
        <div class="font-bold text-2xl mb-8">
          결제내역
        </div>

        <div class="flex mb-6">
          <div>
            <div class="font-bold mb-1">주문일자</div>
            <input type="date" class="p-2 ring-1 ring-[#aaa] rounded-sm w-[150px] focus:ring-black focus:ring-2"
                   style="outline: none;" v-model="startDate" :disabled="!endDate"
                   :max="endDate ? endDate.getTime() : undefined"
            />
            ~
            <input type="date" class="p-2 ring-1 ring-[#aaa] rounded-sm w-[150px] focus:ring-black focus:ring-2"
                   style="outline: none;" v-model="endDate" :max="today()"
                   :min="startDate ? startDate.getTime() : undefined"
            />
          </div>
          <div class="ml-6">
            <div class="font-bold mb-1">결제수단</div>
            <v-autocomplete v-model="method" class="w-[150px]" density="compact"
                            variant="outlined" :items="methods" :filter-keys="methods" />
          </div>
          <div class="items-center flex ml-6">
            <v-btn color="blue" class="font-bold" @click="handleFilter()">검색</v-btn>
          </div>
        </div>

        <v-sheet min-height="500px">
          <b>결제내역 <span class="text-blue-500">{{totalCount}}</span>건</b>
          <v-table class="mt-2">
            <thead>
            <tr class="bg-blue-lighten-1">
              <th class="text-center text-white">주문 일시</th>
              <th class="text-center text-white">결제 일시</th>
              <th class="text-center text-white">주문 번호</th>
              <th class="text-center text-white">결제 상태</th>
              <th class="text-center text-white">결제액</th>
              <th class="text-center text-white">결제수단</th>
              <th class="text-center text-white">구매 상품</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,idx) in boughtList" :key="idx" v-if="boughtList">
              <td>{{formatDate(item.orderDate)}}</td>
              <td>{{formatDate(item.paymentDate)}}</td>
              <td>{{item.id}}</td>
              <td>{{item.paymentStatus}}</td>
              <td>{{item.price}}</td>
              <td>{{item.method}}</td>
              <td>{{item.shopping.title}}</td>
            </tr>
            <tr v-else>
              <td colspan="7">
                결제내역이 없습니다!
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import {onMounted, reactive, ref, watch} from "vue";

interface BoughtItem {
  id: number;
  price: number;
  amount: number;
  orderDate: Date;
  paymentDate: Date;
  paymentStatus: string;
  method: string;
  shopping: {
    title: string,
  }
}

const loading = ref(false);
const pageLen = ref(1);
const page = ref(1);

const startDate = ref<Date>();
const endDate = ref<Date>();

const method = ref<string>('전체');
const methods = [
  '전체', '카드', '가상계좌', '간편결제'
];

const filter = reactive<{
  startDate: Date | undefined,
  endDate: Date | undefined,
  method: String,
}>({
  startDate: undefined,
  endDate: undefined,
  method: '',
});

const totalCount = ref(0);

const boughtList = reactive<BoughtItem[]>([]);

const today = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

watch(page, async(newPage) => {
  loading.value = true;

  const jwt = sessionStorage.getItem('jwt');

  if (!filter.method) {
    await axios.get(`http://localhost:3001/user/boughtItemList?page=${newPage}`, {
      headers: {Authorization: `Bearer ${jwt}`},
    }).then((res) => {
      boughtList.length = 0;
      boughtList.push(...res.data);
    })
  } else {
    await axios.get(`http://localhost:3001/user/boughtItemList?startdate=${filter.startDate}&enddate=${filter.endDate}&method=${filter.method}&page=${newPage}`, {
      headers: {Authorization: `Bearer ${jwt}`},
    }).then((res) => {
      boughtList.length = 0;
      boughtList.push(...res.data);
    })
  }

  loading.value = false;
}, {immediate: true});

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
  loading.value = true;

  const jwt = sessionStorage.getItem('jwt');

  await axios.get('http://localhost:3001/user/boughtItemCount', {
    headers: {Authorization: `Bearer ${jwt}`},
  }).then((res) => {
    totalCount.value = res.data;
    pageLen.value = Math.ceil(res.data/10);
  })

  loading.value = false;
})

const handleFilter = async () => {

  const jwt = sessionStorage.getItem('jwt');

  await axios.get(`http://localhost:3001/user/boughtItemCount?startdate=${startDate.value}&enddate=${endDate.value}&method=${method.value}`, {
    headers: {Authorization: `Bearer ${jwt}`},
  }).then((res) => {
    totalCount.value = res.data;
    pageLen.value = Math.ceil(res.data/10);
  })

  await axios.get(`http://localhost:3001/user/boughtItemList?startdate=${startDate.value}&enddate=${endDate.value}&method=${method.value}`, {
    headers: {Authorization: `Bearer ${jwt}`},
  }).then((res) => {
    filter.method = method.value;
    filter.endDate = endDate.value;
    filter.startDate = startDate.value;

    boughtList.length = 0;
    boughtList.push(...res.data);
  })

}
</script>

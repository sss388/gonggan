<template>
  <div class="ml-3">
    <div class="p-4 min-w-[800px]">
      <div class="font-bold text-2xl mb-10">
        <div class="mb-8">
          배송 확인
        </div>
        <v-sheet min-height="500px">
          <v-card v-if="boughtList.length !== 0" v-for="(item, idx) in boughtList" :key="idx" class="mb-3">
            <v-card-item>
              <div class="flex gap-3">
                <div class="mb-1">
                  <AdvancedImage v-if="item.shopping.product.image" :cldImg="cldImg(item.shopping.product.image)"
                                 class="rounded-lg"/>
                  <v-img v-else src="@/assets/ItemSample.png" cover
                         class="w-[150px] h-[150px] shadow-lg rounded-lg"/>
                </div>
                <div class="font-normal text-xl w-full">
                  <p class="mb-5">{{item.shopping.title}}</p>
                  <table>
                    <tr>
                      <td width="200px">구입일</td>
                      <td>{{formatDate(item.orderDate)}}</td>
                    </tr>
                    <tr>
                      <td>도착 예정일</td>
                      <td>{{formatDate(item.deliveryDate)}}</td>
                    </tr>
                    <tr>
                      <td>배송 상태</td>
                      <td>{{item.deliveryStatus}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </v-card-item>
          </v-card>

          <div v-else class="justify-center items-center min-h-[500px] flex">
            구입한 상품이 없습니다!
          </div>

          <v-pagination
            v-model="page"
            :length="pageLen"
            rounded="circle"
          />
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, reactive, ref, watch} from "vue";
import axios from "axios";
import {AdvancedImage} from "@cloudinary/vue";
import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";

interface BoughtItem {
  price: number;
  amount: number;
  orderDate: Date;
  deliveryDate: Date;
  deliveryStatus: string;
  shopping: {
    id: number,
    title: string,
    product: {
      image: string,
    }
  }
}

const loading = ref(false);
const pageLen = ref(1);
const page = ref(1);

const boughtList = reactive<BoughtItem[]>([]);

const cldImg = (image: string) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
    },
  });

  return cld.image(image).resize(fill().width(150).height(150));
}

watch(page, async(newPage) => {
  loading.value = true;

  const jwt = sessionStorage.getItem('jwt');
  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/boughtItemList?page=${newPage}`, {
    headers: {Authorization: `Bearer ${jwt}`},
  }).then((res) => {
    boughtList.length = 0;
    boughtList.push(...res.data);
    console.log(res.data)
  })
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

  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/boughtItemCount`, {
    headers: {Authorization: `Bearer ${jwt}`},
  }).then((res) => {
    pageLen.value = Math.ceil(res.data/10);
  })

  loading.value = false;
})
</script>

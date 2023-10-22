<template>
  <div class="ml-3">
    <div class="p-4 min-w-[800px]">
      <div class="mb-10">
        <div class="font-bold text-2xl mb-8">
          찜 목록
        </div>
        <v-sheet min-height="500px">
          <div class="grid grid-cols-3">
            <div v-for="(item, idx) in favorite" :key="idx" class="relative">
              <AdvancedImage v-if="item.shopping.product.image" :cldImg="cldImg(item.shopping.product.image)"
                             class="rounded-lg"/>
              <v-img v-else src="@/assets/ItemSample.png"
                     cover class="w-[200px] h-[200px] shadow-lg rounded-lg"
              />
              <v-btn icon="mdi-heart" elevation="0" variant="text" color="red"
                     :loading="loading" class="absolute bottom-0 left-[150px]"
                     size="large" @click="delFavorite(item.id)"
              />
            </div>
          </div>
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useStore} from "vuex";
import {AdvancedImage} from "@cloudinary/vue";
import {Cloudinary} from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";

interface Favorite {
  id: number;
  shoppingId: number;
  shopping: {
    product: {
      image: string,
    }
  }
}

const loading = ref(false);
const store = useStore();
const favorite = reactive<Favorite[]>([]);

const cldImg = (image: string) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_NAME,
    },
  });

  return cld.image(image).resize(fill().width(200).height(200));
}

const delFavorite = async (id: number) => {
  loading.value = true;

  const jwt = sessionStorage.getItem('jwt');
  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/deleteFavorite?id=` + id, {
    headers: {Authorization: `Bearer ${jwt}`},
  }).then((res) => {
    favorite.splice(
      favorite.findIndex((item) => item.id ===id),1
    )

    store.commit('setToast', {
      show: true,
      message: "찜 목록에서 삭제했습니다!",
      color: "green"
    })
  })

  loading.value = false;
}

onMounted(async () => {
  loading.value = true;

  const jwt = sessionStorage.getItem('jwt');

  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/favoriteList`,{
    headers: {Authorization: `Bearer ${jwt}`},
  }).then((res) => {
    console.log(res.data);
    favorite.push(...res.data);
  })

  loading.value = false;
})
</script>

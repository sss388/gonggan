<template>
  <div class="justify-center flex">
    <div class="p-2 w-screen min-w-[800px] max-w-screen-xl">
      <div class="flex flex-col space-y-4">
        <v-img src="@/assets/ItemSample.png" width="300px" height="300px" cover
               class="rounded-lg" v-if="!product.imageUrl"
        />
        <v-img :src="product.imageUrl" width="300px" height="300px" cover
               class="rounded-lg" v-else-if="product.uploadImage !== null"
        />
<!--        <AdvancedImage :cldImg="store.getters.getMyAvatar"-->
<!--                       class="rounded-lg" v-else/>-->

        <v-btn class="w-[100px] p-3 text-md text-white rounded-lg items-center
                    flex mb-3" color="#27374D" type="button" @click="($refs.fileInput as HTMLInputElement).click()"
        >
          사진 변경
        </v-btn>
        <v-file-input
          accept="image/png, image/jpeg, image/bmp"
          class="hidden" ref="fileInput" @change="previewImage"
          v-model="product.uploadImage"
        />

          <v-autocomplete label="유형" id="category" variant="outlined" v-model="product.category" :items="categories"
                          class="w-full px-3 py-2 rounded-md outline-none"></v-autocomplete>

        <v-text-field label="글제목" variant="outlined" class="w-full px-2 py-1 rounded-md outline-none" v-model="product.title" />
        <v-text-field label="상품명" variant="outlined" class="w-full px-3 py-2 rounded-md outline-none" v-model="product.name" />
        <v-text-field label="가격" variant="outlined" class="w-full px-3 py-2 rounded-md outline-none" v-model.number="product.price" />
        <v-text-field label="상품재고" variant="outlined" class="w-full px-3 py-2 rounded-md outline-none" v-model.number="product.qty"/>
        <v-text-field label="할인율" variant="outlined" class="w-full px-3 py-2 rounded-md outline-none" v-model.number="product.discount" type="number"/>
        <v-text-field label="예상배송일" variant="outlined" class="w-full px-3 py-2 rounded-md outline-none" v-model.number="product.deliveryDay" type="number"/>
        <myEditor v-model="product.content" :editor="editor" />

        <v-btn color="#27374D" class="text-white bg-blue-lighter hover:bg-blue-dark py-1 px-4 rounded"
               @click="createProductWithImage()"
        >
          등록
        </v-btn>
      </div>
    </div>
  </div>
</template>



<script lang="ts" setup>
import {reactive, ref} from 'vue';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import CKEditor from "@ckeditor/ckeditor5-vue";
import {AdvancedImage} from "@cloudinary/vue";
import store from "@/store";
import axios from "axios";


const myEditor = CKEditor.component;
const editor = Editor;

const categories = ref([
  "가구", "조명", "데코", "생활용품"
]);

interface Product {
  title: string;
  name: string;
  price: number;
  qty: number;
  content: string;
  imageUrl: string;
  uploadImage: [];
  category: string;
  deliveryDay: number;
  discount: number;
}

const product = reactive<Product>({
  title: '',
  name: '',
  price: 0,
  qty: 0,
  content: '<p></p>',
  imageUrl: '',
  uploadImage: [],
  category: '',
  deliveryDay: 0,
  discount: 0,
});

const previewImage = () => {
  if(product.uploadImage !== null){
    const file = product.uploadImage[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (typeof dataUrl === "string") {
        product.imageUrl = dataUrl;
      }
    };
    reader.readAsDataURL(file);
  }
}

const createProductWithImage = async () => {
  try {
    const productId: number = 1;
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('name', product.name);
    formData.append('price', String(product.price));
    formData.append('qty', String(product.qty));
    formData.append('content', product.content);
    formData.append('productId', String(productId));
    formData.append('category', product.category);
    formData.append('deliveryDay', String(product.deliveryDay));
    formData.append('discount', String(product.discount));
    if (product.uploadImage[0]) {
      formData.append('file', product.uploadImage[0]);
    }

    const response = await axios.post('http://localhost:3001/shop/createProductWithImage', formData);

    console.log('상품 생성 결과:', response.data);

    window.alert('상품이 등록되었습니다!');

    location.reload();
  } catch (error) {
    console.error('상품 생성 중 오류 발생:', error);
  }
};
</script>

<template>
  <div class="justify-center flex">
    <div class="p-2 w-screen min-w-[800px] max-w-screen-xl">
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <v-form @submit.prevent="sendEmail" class="w-full max-w-lg p-8 bg-white rounded shadow-md outline outline-[3px] outline-[#27374D]">
      <h2 class="text-2xl font-bold mb-6 text-blue-grey-darken-1 text-center">이메일 문의</h2>

      <div class="mb-4">
        <v-autocomplete label="유형" id="category" variant="outlined" v-model="selectedCategory" :items="categories"
                        class="w-full px-3 py-2 rounded-md outline-none"></v-autocomplete>
      </div>

      <div class="mb-4">
        <v-text-field label="이름" id="name" variant="outlined" v-model="form.name" type="text"
                      class="w-full px-3 py-2 rounded-md outline-none"
                      readonly
        />
      </div>

      <div class="mb-4">
        <v-text-field label="이메일" id="email" variant="outlined" v-model="form.email" type="text"
                      class="w-full px-3 py-2 rounded-md outline-none"
                      readonly
        />
      </div>

      <div class="mb-6">
        <v-textarea id="message" label="내용" variant="outlined" v-model="form.message"
                    placeholder="내용을 입력하세요."
                    rows="5"
                    class="w-full px-3 py-2 rounded-md outline-none"
        />
      </div>

      <div class="flex justify-end">
        <v-btn @click="cancelForm" type="submit" color="#27374D" class="
            w-28
            text-white
            font-bold
            bg-blue-lighter hover:bg-blue-dark
            rounded-md cursor-pointer transition-colors duration-normal ease-in-out
          ">
          취소
        </v-btn>

        <v-btn @click.prevent="sendEmail" type="submit" color="#27374D" class="
            w-28
            ml-4
            text-white
            font-bold
            bg-blue-lighter hover:bg-blue-dark
            rounded-md cursor-pointer transition-colors duration-normal ease-in-out
          ">
          전송
        </v-btn>
      </div>
    </v-form>
  </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import router from "@/router";
import emailjs, {send} from 'emailjs-com';
import * as process from "process";

interface Form {
  name: string;
  email: string;
  message: string;
}

export default defineComponent({
  methods: {send},
  setup() {
    const form = ref<Form>({
      name: '',
      email: '',
      message: ''
    });

    const categories = ref([
      "상품문의", "결제문의", "계정문의", "기타문의"
    ]);

    const selectedCategory = ref<string>('');

    onMounted(async () => {
      const jwt = sessionStorage.getItem('jwt');

      await axios.get('http://localhost:3001/user/me', {
        headers: { Authorization: `Bearer ${jwt}` },
      }).then((res) => {
        form.value.name = res.data.name;
        form.value.email = res.data.email;
      });
    });

    const sendEmail = () => {
      const emailData = {
        to_email_address: 'a01030119132@gmail.com',
        category: selectedCategory.value,
        name: form.value.name,
        email: form.value.email,
        message: form.value.message
      };

      // EmailJS를 사용하여 이메일 전송
      emailjs.send(
        process.env.EMAIL_JS_KKH_SERVICE_ID,
        'template_xrtwdrt',
        emailData,
        'sgJgSZrBjTWzEU2Om'
      )
        .then(() => {
          alert('이메일이 성공적으로 전송되었습니다.');
          resetForm();
        })
        .catch((error) => {
          console.error(error);
          alert('이메일 전송 중 오류가 발생했습니다.');
        });
    };

    const resetForm = () => {
      selectedCategory.value= '';
      form.value.message= '';
    };

    const cancelForm = () => {
      router.back();
    };

    return { form, categories, selectedCategory, sendEmail, cancelForm };
  },
});
</script>

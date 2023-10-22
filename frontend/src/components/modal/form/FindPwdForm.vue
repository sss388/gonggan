<template>
  <v-form class="w-3/4 m-2" @submit.prevent="sendMail">
    <v-alert v-model="isEmptyEmail" text="가입한 이메일이 없습니다." type="error"
      class="mb-5" closable />
    <div class="text-center mb-5">
      비밀번호 재설정 링크를 보내드립니다.
    </div>
    <v-text-field
      label="이메일"
      variant="outlined"
      type="email"
      v-model="email"
      :rules="[isValidEmail]"
    />
    <v-btn block color="#27374D" class="p-7 text-lg text-white rounded-lg" type="submit"
      :disabled="loading"
      :loading="loading"
    >
      비밀번호 재설정하기
    </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import * as emailjs from "emailjs-com";
import axios from "axios";
import * as process from "process";

const email = ref('');
const loading = ref(false);
const isEmptyEmail = ref(false);

const emit = defineEmits(['updateState']);

const updateState = (newState: string) => {
  emit('updateState', newState);
}

const isValidEmail = (value: string) => {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!value) return false;

  return pattern.test(value) ? true : false;
}

const sendMail = async () => {
  loading.value = true;

  if (isValidEmail(email.value)) {
    await axios.post(`${process.env.VUE_APP_BACKEND_ADDRESS}/auth/sendResetPwdMail`,
      { email: email.value },
    ).then((res) => {
      console.log(res.data);
    }).catch(() => {
      console.log("empty");
      isEmptyEmail.value = true;
    });
    let templateParams = {
      to_email: email.value,
      message: "This is a test message",
    };

    emailjs.send(process.env.VUE_APP_EMAIL_JS_SSS_SERVICE_ID, 'template_pxw6yus', templateParams, 'vtzT9TcXkuy5z0nbm')
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });
  }

  loading.value = false;
}
</script>

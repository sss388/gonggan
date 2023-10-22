<template>
  <div class="h-full justify-center flex items-center">
    <div v-if="!targetUser">
      <label class="text-black font-bold text-2xl">
        만료된 링크 입니다.
      </label>
    </div>
    <div v-else class="w-[95%]">
      <v-form validate-on="submit" @submit.prevent="changePwd()">
        <v-text-field label="새로운 비밀번호"
                      variant="outlined"
                      type="password"
                      v-model="changePwdForm.password1"
                      :rules="[isValidPassword]"
                      :loading="loading"
                      :disabled="loading"
                      class="mb-3 w-25"
        />
        <v-text-field label="다시 한번 입력해주세요."
                      variant="outlined"
                      type="password"
                      v-model="changePwdForm.password2"
                      :rules="[isValidPassword2]"
                      :loading="loading"
                      :disabled="loading"
                      class="w-25 mb-3"
        />
        <v-btn color="#27374D"
               class="w-25 p-7 text-lg text-white rounded-lg items-center flex"
               type="submit"
               :loading="loading"
               :disabled="loading"
        >
          비밀번호 변경
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
  import axios from "axios";
import {useStore} from "vuex";

const loading = ref(false);
const targetUser = ref('');
const changePwdForm = reactive({
  password1: '',
  password2: ''
})

const route = useRoute();
const router = useRouter();
const store = useStore();

const token = route.query.token;

const isValidPassword = (value: string) => {
  if(!value) return "새로운 비밀번호를 입력해주세요.";
  const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return pattern.test(value) ? true : "8자이상 숫자, 영문자 포함해야 합니다.";
}

const isValidPassword2 = (value: string) => {
  if(!value) return "한번 더 입력해주세요.";
  return value === changePwdForm.password1 ? true : "비밀번호가 다릅니다.";
}

const changePwd = async () => {
  loading.value = true;

  if (isValidPassword(changePwdForm.password1)
    && isValidPassword2(changePwdForm.password2)) {
    await axios.put('http://localhost:3001/auth/resetPwd', {
      userId: targetUser.value,
      password: changePwdForm.password1
    }).then((res) => {
      store.commit('setToast', {
        show: true,
        message: "패스워드를 변경했습니다!",
        color: "green"
      })
      router.push('/');
    })
    .catch((err) => {
      store.commit('setToast', {
        show: true,
        message: "패스워드를 변경에 실패했습니다!",
        color: "red"
      })
    })
  }
  loading.value = false;
}

onMounted(async () => {
  const isValidToken = ref(false);

  if (token){
    await axios.get(`http://localhost:3001/auth/resetPwd?token=${token}`
    ).then((res) => {
      isValidToken.value = true;
      targetUser.value = res.data;
    }).catch((err) => {
      if (err.response.data.message === 'token not found') {
        store.commit('setToast', {
          show: true,
          message: "올바른 링크가 아닙니다!",
          color: "red"
        })
        router.push('/');
      }
    })
  }
})
</script>

<template>
  <div class="ml-3">
    <div class="p-4 w-[800px] min-h-[250px]">
      <div class="font-bold text-2xl mb-10">
        비밀번호 변경
      </div>
      <v-form validate-on="submit" @submit.prevent="changePwd()">
        <v-text-field label="현재 비밀번호"
                      variant="outlined"
                      type="password"
                      v-model="pwdForm.preventPwd"
                      :rules="[isValidPreventPassword]"
                      class="mb-2 w-[300px]"
        />

        <v-divider class="border-opacity-100 mb-6"/>

        <v-text-field label="새로운 비밀번호"
                      variant="outlined"
                      type="password"
                      v-model="pwdForm.newPwd"
                      :rules="[isValidNewPassword]"
                      class="mb-2 w-[300px]"
        />
        <v-text-field label="다시 한번 입력"
                      variant="outlined"
                      type="password"
                      v-model="pwdForm.newPwd2"
                      :rules="[isValidNewPassword2]"
                      class="mb-2 w-[300px]"
        />

        <v-btn type="submit" class="w-[300px] mt-5 p-7 text-lg text-white rounded-lg
           items-center flex" color="#27374D" :loading="loading"
        >
          비밀번호 변경
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {useStore} from "vuex";
import axios from "axios";
import {useRouter} from "vue-router";

const loading = ref(false);
const store = useStore();
const router = useRouter();

const pwdForm = reactive({
  preventPwd: "",
  newPwd: "",
  newPwd2: "",
})

const changePwd = async () => {
  loading.value = true;

  const jwt = sessionStorage.getItem('jwt');

  if(isValidPreventPassword(pwdForm.preventPwd)
    && isValidNewPassword(pwdForm.newPwd)
    && isValidNewPassword2(pwdForm.newPwd2)
  ){
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/auth/changePwd`, {
      userId: store.getters.getCurrentUser.id,
      preventPwd: pwdForm.preventPwd,
      newPwd: pwdForm.newPwd
    }).then((res) => {
      store.commit('setToast', {
        show: true,
        message: "패스워드를 변경했습니다!",
        color: "green"
      })
      router.push('/myPage/pwdChange');
    })
  }

  loading.value = false;
}

const isValidPreventPassword = (value: string) => {
  if(!value) return "비밀번호를 입력해주세요.";
  const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return pattern.test(value) ? true : "8자이상 숫자, 영문자 포함해야 합니다.";
}

const isValidNewPassword = (value: string) => {
  if(!value) return "새로운 비밀번호를 입력해주세요.";
  const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return pattern.test(value) ? true : "8자이상 숫자, 영문자 포함해야 합니다.";
}

const isValidNewPassword2 = (value: string) => {
  if(!value) return "한번 더 입력해주세요.";
  return value === pwdForm.newPwd ? true : "비밀번호가 다릅니다.";
}
</script>

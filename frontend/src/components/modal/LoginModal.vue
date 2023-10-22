<template>
  <v-card class="p-10 outline outline-[3px] outline-[#27374D]" >
    <div class="flex justify-center">
      <!-- 로그인 -->
      <v-form v-if="state === 'login'" class="w-[75%] m-2" validate-on="lazy submit" @submit.prevent="login()">
        <v-alert v-if="loginFail" closable text="로그인에 실패했습니다." type="error"
             class="mb-5"></v-alert>
        <v-text-field label="이메일" variant="outlined" type="email" class="mb-1.5"
            v-model="loginForm.email" :rules="[isValidEmail]"/>

        <v-text-field label="비밀번호" variant="outlined" type="password" class="mb-3"
                      v-model="loginForm.password" :rules="[isValidPassword]"/>

        <v-btn block color="#27374D" class="p-7 text-lg text-white rounded-lg" type="submit"
               :loading="loading"
               :disabled="loading"
        >
          로그인
        </v-btn>
        <div class="flex gap-4 justify-center pt-5">
          <v-btn variant="text" @click="state = 'findpwd'"> 비밀번호 재설정 </v-btn>
          <v-btn variant="text" @click="toggleState"> 회원가입 </v-btn>
        </div>
        <div class="opacity-75 flex flex-col justify-center text-sm pt-8 text-center">
          SNS 계정으로 간편 로그인/회원가입
          <div class="d-flex justify-center pt-4 gap-10">
            <!-- 카카오 로그인   -->
            <v-img src="https://cdn.icon-icons.com/icons2/2429/PNG/512/kakaotalk_logo_icon_147272.png"
               class="cursor-pointer" max-width="60px" @click="loginwithKakao"/>
            <v-img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbU1uVm%2FbtqGsLHK8Ha%2Fndkom6FPH3Ld5BXtGd7pt0%2Fimg.png"
               class="cursor-pointer" max-width="60px"/>
          </div>
        </div>
      </v-form>

      <!-- 회원 가입 -->
      <v-form v-else-if="state === 'signup'" class="w-[95%]" validate-on="submit lazy" @submit.prevent="signUp()">
        <div class="opacity-75 flex flex-col justify-center text-sm py-8 text-center">
          SNS 계정으로 간편 로그인/회원가입
          <div class="d-flex justify-center pt-4 gap-10">
            <v-img src="https://cdn.icon-icons.com/icons2/2429/PNG/512/kakaotalk_logo_icon_147272.png"
                   class="cursor-pointer" max-width="60px"/>
            <v-img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbU1uVm%2FbtqGsLHK8Ha%2Fndkom6FPH3Ld5BXtGd7pt0%2Fimg.png"
                   class="cursor-pointer" max-width="60px"/>
          </div>
        </div>
        <hr class="pb-8">
        <div class="label_style">이메일</div>
        <div class="flex gap-1">
          <v-text-field variant="outlined" type="text" placeholder="이메일" v-model="signupForm.email"
                        class="placeholder:font-bold" :rules="[isValidEmail]"/>
          <div class="h-full pt-3 text-lg">@</div>
          <v-autocomplete class="w-[15%]" v-model="signupForm.email2"
                          placeholder="선택해주세요." variant="outlined" :items="emails"/>
        </div>

        <div class="label_style">비밀번호</div>
        <div class="text-sm opacity-50 pb-1">영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</div>
        <v-text-field variant="outlined" type="password" placeholder="비밀번호"
                      v-model="signupForm.password"
                      :rules="[isValidPassword]" />
        <div class="label_style" >비밀번호 확인</div>
        <v-text-field variant="outlined" type="password" placeholder="비밀번호 확인"
                      :rules="[isValidPassword2]"
                      v-model="signupForm.password2"/>

        <div class="label_style">닉네임</div>
        <div class="text-sm opacity-50 pb-1">다른 유저와 겹치지 않도록 입력해주세요.(2~15자)</div>
        <v-text-field variant="outlined" type="text" placeholder="별명 (2~15자)"
                      :rules="[isValidNickname]" v-model="signupForm.nickname"/>

        <div class="label_style pt-10">약관동의</div>
        <div class="ring-2 ring-gray-300 rounded-lg p-2"
             :class="notChk ? 'ring-red-700' : ''">
          <v-checkbox v-model="allCheck">
            <template v-slot:label>
              <span class="text-black font-bold">전체동의</span>
            </template>
          </v-checkbox>
          <hr class="-mt-4 mb-3">
          <div class="-mb-2">
            <v-checkbox v-model="checks.ageChk">
              <template v-slot:label>
                만 14세 이상입니다. &nbsp <span class="text-blue-400">(필수)</span>
              </template>
            </v-checkbox>
            <v-checkbox class="-mt-10" v-model="checks.termChk">
              <template v-slot:label>
                이용약관 &nbsp <span class="text-blue-400">(필수)</span>
              </template>
            </v-checkbox>
            <v-checkbox class="-mt-10" v-model="checks.perChk">
              <template v-slot:label>
                개인정보수집 및 이용동의 &nbsp <span class="text-blue-400">(필수)</span>
              </template>
            </v-checkbox>
          </div>
        </div>

        <v-btn block color="#27374D" type="submit"
               class="my-5 p-7 text-lg text-white rounded-lg inValidChks"
               :loading="loading"
        >
          회원가입
        </v-btn>

        <div class="text-center">
          이미 아이디가 있으신가요?
          <b @click="toggleState" class="cursor-pointer underline">
            로그인
          </b>
        </div>
      </v-form>

      <FindPwdForm v-else-if="state === 'findpwd'" @updateState="state = $event"/>

    </div>
  </v-card>
</template>
<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {types} from "sass";
import Boolean = types.Boolean;
import axios from "axios";
import {useStore} from "vuex";
import FindPwdForm from "@/components/modal/form/FindPwdForm.vue";
import * as process from "process";

const state = ref('login');
const emails = [
  "naver.com", "gmail.com", "daum.net"
];
const notChk = ref(false);
const loginFail = ref(false);
const loading = ref(false);
const store = useStore();

// 카카오로그인
const { Kakao } = window;
const loginwithKakao = () => {
  Kakao.Auth.authorize({
    redirectUri: `process.env.REACT_APP_FRONTEND_BASE_URL/login/kakao`,
    scope: "profile_nickname, account_email, profile_image"
  });
};

// 카카오 로그인 성공 후 호출되는 함수
const handleKakaoLoginSuccess = () => {
  Kakao.API.request({
    url: "/v2/user/me",
    success: (res) => {
      const kakao_account = res.kakao_account;
      const nickname = kakao_account.profile.nickname;
      const email = kakao_account.email;
      const profileImage = kakao_account.profile.profile_image;

      // 로그인 처리 구현
      alert("로그인 성공!");
      // 여기에서 nickname, email, profileImage를 사용하여 원하는 작업 수행
    },
    fail: (error) => {
      console.error(error);
    },
  });
};

const checks = reactive({
  ageChk: false,
  termChk: false,
  perChk: false,
});

const allCheck = computed({
  get: () => checks.ageChk && checks.termChk && checks.perChk,
  set: (value: boolean) => {
    checks.ageChk = value;
    checks.termChk = value;
    checks.perChk = value;
  },
})

const loginForm = reactive({
  email: "",
  password: "",
})

const isValidEmail = (value: string) => {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (state.value === 'login') {
    if(!value) return '이메일을 입력하세요.';
    return pattern.test(value) ? true : '잘못된 이메일입니다.';
  } else if (state.value === 'signup') {
    if(!value && !signupForm.email2 ) return '이메일을 입력하세요.';
    const email = value + "@" + signupForm.email2;
    return pattern.test(email) ? true : '잘못된 이메일입니다.';
  }
  return false;
}

const isValidPassword = (value: string) => {
  if(!value) return false;
  const pattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  return pattern.test(value) ? true : false;
}

const isValidPassword2 = (value: string) => {
  if(!value) return false;
  return value === signupForm.password ? true : false;
}

const isValidNickname = (value: string) => {
  if(!value) return '닉네임을 입력하세요.'
  if(value.length < 2) return '닉네임이 너무 짧습니다.'
  else if(value.length > 15) return '닉네임이 너무 깁니다.'
  return true;
}

const signupForm = reactive({
  email: "",
  email2: "",
  password: "",
  password2: "",
  nickname: "",
});

const toggleState = () => {
  if (state.value === 'login' ) {
    Object.assign(loginForm, {
      email: "",
      password: "",
    });
    state.value = 'signup';
  } else if (state.value === 'signup') {
    Object.assign(signupForm, {
        email: "",
        email2: "",
        password: "",
        password2: "",
        nickname: "",
      }
    );
    notChk.value = false;
    state.value = 'login';
  }
}
const login = async () => {
  loading.value = true;

  if (isValidEmail(loginForm.email) === true &&
    loginForm.password.length >= 8) {

    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, {
      email: loginForm.email,
      password: loginForm.password
    }).then((res) => {
      sessionStorage.setItem("jwt", res.data.access_token);
      store.dispatch('fetchCurrentUser');
      store.commit('setLoginModalState', false);
    }).catch((err) => {
      console.log(err);
      loginFail.value = true;
    })
  }

  loading.value = false;
}
const signUp = async () => {
  loading.value = true;

  if (allCheck.value !== true) notChk.value = true;
  else notChk.value = false;

  if (isValidEmail(signupForm.email) === true &&
    isValidNickname(signupForm.nickname) === true &&
    notChk.value === false
  ) {
    await axios.post( `${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
      name: signupForm.nickname,
      email: signupForm.email + "@" + signupForm.email2,
      password: signupForm.password
    }).then((res) => {
      sessionStorage.setItem("jwt", res.data.access_token);

      store.dispatch('fetchCurrentUser');
      store.commit('setLoginModalState', false);
    })
  }

  loading.value = false;
}

</script>

<style scoped>
.label_style {
  @apply font-bold font-black text-lg mb-2;
}
</style>

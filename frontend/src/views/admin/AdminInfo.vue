<template>
  <div class="ml-3">
    <div class="p-4 w-[800px]">
      <div class="font-bold text-2xl mb-10">
        내 정보수정
      </div>
      <v-form validate-on="submit" @submit.prevent="changeInfo()"
      >
        <table class="w-[90%]">
          <tr>
            <th class="h-full" width="w-[100px]">
              프로필 사진
            </th>
            <td>
              <v-img src="@/assets/ProfileImg.jpg" width="100px" height="100px" cover
                     class="rounded-lg" v-if="!userForm.image"
              />
              <v-img :src="userForm.image" width="100px" height="100px" cover
                     class="rounded-lg" v-else-if="userForm.uploadImage !== null"
              />
              <AdvancedImage :cldImg="store.getters.getMyAvatar"
                     class="rounded-lg" v-else/>

              <v-btn class="w-[100px] p-3 text-md text-white rounded-lg items-center
                flex mb-3" color="#27374D" type="button" @click="($refs.fileInput as HTMLInputElement).click()"
              >
                사진 변경
              </v-btn>
              <v-file-input
                :rules="[avatarRule]"
                accept="image/png, image/jpeg, image/bmp"
                class="hidden" ref="fileInput" @change="previewImage"
                v-model="userForm.uploadImage"
              />
            </td>
          </tr>
          <tr>
            <th class="h-full pb-5">
              <label for="email">
                이메일
              </label>
            </th>
            <td>
              <v-text-field id="email" variant="outlined" type="email"
                class="w-[300px]" :readonly="true"
              >
                {{userForm.email}}
              </v-text-field>
            </td>
          </tr>
          <tr>
            <th class="h-full pb-5">
              <label for="name">
                이름
              </label>
            </th>
            <td>
              <v-text-field id="name" variant="outlined" type="email"
                class="w-[300px]" v-model="userForm.name"
              />
            </td>
          </tr>
          <tr>
            <th class="h-full">
              <label>
                비밀번호
              </label>
            </th>
            <td>
              <v-btn class="w-[300px] p-7 text-lg text-white rounded-lg items-center flex"
                     color="#27374D" type="button"
              >
                <router-link to="/myPage/pwdChange">비밀번호 변경하기</router-link>
              </v-btn>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <v-divider class="border-opacity-100 my-6"/>
              <v-btn class="w-[300px] mt-5 p-7 text-lg text-white rounded-lg items-center flex"
                 type="submit" color="#27374D" :loading="loading"
              >
                내 정보 변경
              </v-btn>
            </td>
          </tr>
        </table>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useStore} from "vuex";
import {onMounted, reactive, ref} from "vue";
import axios from "axios";
import { AdvancedImage } from '@cloudinary/vue';

const store = useStore();
const loading = ref(false);

const userForm = reactive({
  name: "",
  email: "",
  uploadImage: [],
  image: "",
});

const previewImage = () => {
  if(userForm.uploadImage !== null){
    const file = userForm.uploadImage[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (typeof dataUrl === "string") {
        userForm.image = dataUrl;
      }
    };
    reader.readAsDataURL(file);
  }
}

const changeInfo = async () => {
  loading.value = true;

  const jwt = sessionStorage.getItem('jwt');

  await axios.put('http://localhost:3001/user/changeInfo', {
    id: store.getters.getCurrentUser.id,
    name: userForm.name,
  },{
    headers: {Authorization: `Bearer ${jwt}`},
  }).then(() => {
    store.commit('setToast', {
      show: true,
      message: "회원정보를 변경했습니다!",
      color: "green"
    })
  })

  if(userForm.uploadImage !== null){
    const file = userForm.uploadImage[0];
    if (file){
      const formData = new FormData();
      formData.append('file', file);

      await axios.put('http://localhost:3001/user/changeAvatar', formData, {
        headers: {Authorization: `Bearer ${jwt}`},
      }).then((res) => {
        store.commit('setAvatar', res.data);
      });
    }
  }


  loading.value = false;
}

const avatarRule = (value: Array<File>) => {
  return value[0].size < 2000000 || false;
}

onMounted(async () => {
  const jwt = sessionStorage.getItem('jwt');

  await axios.get('http://localhost:3001/user/me', {
      headers: {Authorization: `Bearer ${jwt}`},
    }).then((res) => {
    userForm.name = res.data.name;
    userForm.email = res.data.email;
    userForm.image = res.data.image;
    if(!userForm.image){
      store.commit('setAvatar', res.data.image);
    }
  })
})

</script>

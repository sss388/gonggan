<template>
  <v-app-bar class="flex justify-center border-b-2 solid" flat>
    <div class="ml-10"/>

    <div>
      <v-app-bar-title class="mr-20">

        <router-link to="/"><img class="text-2xl" src="../../../public/logo.png" height="50" width="150"/></router-link>
      </v-app-bar-title>
    </div>



          <v-app-bar-title class="font-semibold hover:text-sky-700">
            <router-link to="/weeklyBest">주간베스트</router-link>
          </v-app-bar-title>

          <v-app-bar-title class="font-semibold hover:text-sky-700">
            <router-link to="/CommunityMain">커뮤니티</router-link>
          </v-app-bar-title>

          <v-app-bar-title class="font-semibold hover:text-sky-700">
            <router-link to="/Shop">쇼핑</router-link>
          </v-app-bar-title>

          <v-app-bar-title class="font-semibold hover:text-sky-700">
            <router-link to="/EventMain">이벤트</router-link>
          </v-app-bar-title>




    <template v-slot:append>
      <v-btn v-if="store.getters.getCurrentUser.id === ''" icon @click="openLoginModal">
        <UserIcon class="w-8 h-8"/>
      </v-btn>

      <div v-else class="flex">
        <v-btn icon>
          <v-menu>
            <template v-slot:activator="{ props }">
              <PlusCircleIcon class="w-8 h-8" v-bind="props" />
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in (store.getters.getCurrentUser.role === 'user' ? myPageItems : adminPageItems)" :key="index"
                @click="item.action()"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
    </template>

    <v-dialog v-model="store.state.loginModalState" max-width="500px" min-width="400px">
      <LoginModal/>
    </v-dialog>
    <v-dialog v-model="store.state.freezeModalState.isShow" max-width="500px" min-width="400px">
      <freeze-modal />
    </v-dialog>
  </v-app-bar>

  <!-- 푸터 추가 -->
</template>

<script lang="ts" setup>
import {PlusCircleIcon, UserIcon} from "@heroicons/vue/24/outline";
import LoginModal from "@/components/modal/LoginModal.vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import Cart from "@/views/Cart.vue";
import FreezeModal from "@/components/modal/freezeModal.vue";
//
const store = useStore();
const router = useRouter();

const myPageItems = [
  {
    title: '회원정보 수정',
    action: () => {
      router.push('/myPage/myInfo')
    }
  },
  {
    title: '비밀번호 변경',
    action: () => {
      router.push('/myPage/pwdChange')
    }
  },
  {
    title: '배송 확인',
    action: () => {
      router.push({name: "DeliveryChk"})
    }
  },
  {
    title: '찜 목록',
    action: () => {
      router.push({name: "FavoriteList"})
    }
  },
  {
    title: '결제 내역',
    action: () => {
      router.push({name: "BoughtList"})
    }
  },
  {
    title: '내가 쓴 글',
    action: () => {
      router.push({name: "MyWriting"})
    }
  },
  {
    title: '로그아웃',
    action: () => {
      router.push({name: "Home"});

      store.commit('setToast', {
        show: true,
        message: "로그아웃 되었습니다!",
        color: "green"
      })

      sessionStorage.removeItem("jwt");
      store.commit('setCurrentUser', { id: "" })
    }
  },
];

const adminPageItems = [
  {
    title: '회원정보 수정',
    action: () => {
      router.push({name: "AdminInfo"});
    }
  },
  {
    title: '비밀번호 변경',
    action: () => {
      router.push({name: "AdminPasswordChange"});
    }
  },
  {
    title: '유저 관리',
    action: () => {
      router.push({name: "UserManage"})
    }
  },
  {
    title: '쇼핑글 관리',
    action: () => {
      router.push({name: "ShoppingManage"})
    }
  },
  {
    title: '글 관리',
    action: () => {
      router.push({name: "WritingManage"})
    }
  },
  {
    title: '로그아웃',
    action: () => {
      router.push({name: "Home"});
      store.commit('setToast', {
        show: true,
        message: "로그아웃 되었습니다!",
        color: "green"
      })

      sessionStorage.removeItem("jwt");
      store.commit('setCurrentUser', { id: "" })
      router.push({name: "home"})
    }
  },
];

const openLoginModal = () => {
  store.commit('setLoginModalState', true);
}

</script>


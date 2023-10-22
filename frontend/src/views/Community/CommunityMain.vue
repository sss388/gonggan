<template>
  <div>
    <v-content class="text-center">
      <v-container class="flow-root justify-center pb-100">
        <p class="text-3xl mb-5">커뮤니티</p>
        <div class="text-left">
          <a href="">인기순</a>
          <a href="">최신순</a>
          <a href="">추천순</a>
        </div>
        <br />

        <!-- 글쓰기 버튼 -->
        <router-link to="/CommunityWrite">
          <button
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            style="float: right; margin-top: -50px;"
          >
            글쓰기
          </button>
        </router-link>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          <!-- 게시물 목록을 순회하며 표시 -->
          <div v-for="post in posts" :key="post.id" class="ring-1 p-2">
            <router-link :to="'/CommunityDetail/' + post.id">
              <h2 class="text-xl">{{ post.title }}</h2>
            </router-link>
            <p>작성자: {{ post.userId }}</p>
            <p>작성일: {{ post.createdAt }}</p>
            <p>글종류: {{ post.kind }}</p>
          </div>
        </div>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    await this.loadPosts();
  },
  methods: {
    async loadPosts() {
      try {
        const response = await axios.get('http://localhost:3001/community');
        this.posts = response.data;
      } catch (error) {
        console.error('게시물을 불러오지 못했습니다:', error);
      }
    },
  },
};
</script>

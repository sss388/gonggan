<template>
  <div>
    <h1 className="text-3xl">제목 : {{ post.title }}</h1>
    <p>작성자: {{ post.userId }}</p>
    <p>글종류: {{ post.kind }}</p>
    <div v-html="post.content"></div>
    <router-link to="/CommunityMain">
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        목록으로 돌아가기
      </button>
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['post'],

  // created 메서드 수정
  async created() {
    const postId = this.$route.params.id;
    try {
      const response = await axios.get(`http://localhost:3000/community/${postId}`);
      this.post = response.data;
    } catch (error) {
      console.error('게시물을 불러오지 못했습니다:', error);
    }
  },
};
</script>

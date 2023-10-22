<template>
  <div>
    <h1 class="text-3xl mb-5">{{ isEditing ? '게시물 수정' : '게시물 작성' }}</h1>
    <form @submit.prevent="submitForm" class="mt-5">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">제목:</label>
        <input v-model="formData.title" id="title" type="text" class="w-full px-3 py-2 border rounded-md">
      </div>
      <div class="mb-4">
        <label for="userId" class="block text-gray-700 text-sm font-bold mb-2">작성자:</label>
        <input v-model="formData.userId" id="userId" type="text" class="w-full px-3 py-2 border rounded-md">
      </div>
      <div class="mb-4">
        <label for="kind" class="block text-gray-700 text-sm font-bold mb-2">글종류:</label>
        <select v-model="formData.kind" id="kind" class="w-full px-3 py-2 border rounded-md">
          <option value="나의 상품 자랑하기">나의 상품 자랑하기</option>
          <option value="대박 꿀탬공유">대박 꿀탬공유</option>
          <option value="자유로운소통">자유로운소통</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="content" class="block text-gray-700 text-sm font-bold mb-2">글내용:</label>
        <div class="justify-center flex">
          <div class="w-1/2">
            <textarea v-model="formData.content" id="content" class="w-full px-3 py-2 border rounded-md"></textarea>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <router-link to="/CommunityMain">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">취소</button>
        </router-link>
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          {{ isEditing ? '수정 완료' : '작성 완료' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        title: '',
        userId: '',
        kind: '나의 상품 자랑하기',
        content: '',
      },
      isEditing: false,
    };
  },
  methods: {
    async submitForm() {
      try {
        if (this.isEditing) {
          // 게시물 수정
          await axios.put(`http://localhost:3001/community/${this.$route.params.id}`, this.formData);
        } else {
          // 게시물 작성
          await axios.post('http://localhost:3001/community', this.formData);
        }
        this.$router.push('/CommunityMain');
      } catch (error) {
        console.error('게시물 작성 또는 수정 오류:', error);
      }
    },
  },
};
</script>

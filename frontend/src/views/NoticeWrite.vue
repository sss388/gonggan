<template class="mt-96">
  <br><br>
  <div class="justify-center flex">
    <h3 style="color: #526D82; font-size: 40px">
      <i className="fa-solid fa-comments"></i>&nbsp;공지사항 글쓰기
    </h3><br><br><br><br><br><br><br><br>
  </div>
  <div class="justify-center flex">
    <div class="w-1/2">
      <div class="mb-4">
        <label for="title" class="block text-gray-700 text-sm font-bold mb-2">제목 :</label>
        <input id="title" type="text" class="px-3 py-2 border rounded-md w-full">
      </div>
      <myEditor :editor="editor" v-model="editorData" />
    </div>
  </div>
  <div class="justify-center flex">
    <v-btn @click="update">등록</v-btn>
    <router-link to="/EventMain">
      <v-btn @click="resetForm">취소</v-btn>
    </router-link>
  </div>
</template>


<script lang="ts" setup>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import {ref, onMounted} from "vue";
import axios from "axios";
import Editor from 'ckeditor5-custom-build/build/ckeditor'

const myEditor = CKEditor.component;
const editor = Editor;
const editorData = ref('<p></p>');

const update = async () => {
  await axios.put('http://localhost:3001/testUpdate', {
    content: editorData.value,
  });
}

function resetForm() {
  this.title = ''; // 제목 초기화
  this.content = ''; // 내용 초기화
}



onMounted(async () => {
  await axios.get('http://localhost:3001/testGet')
    .then((res) => {
      editorData.value = res.data;
    })
})


</script>

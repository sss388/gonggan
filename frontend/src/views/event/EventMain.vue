<template>
  <div className="board-container">
    <h3 style="color: #526D82; font-size: 40px">
      <i className="fa-solid fa-comments"></i>&nbsp;이벤트
    </h3><br><br>

    <table className="board" style="justify-content: space-between; width: 100%; border: 1px solid #ddd;">
      <thead>
      <!-- 테이블 헤더 -->
      <tr>
        <th>글번호</th>
        <th width="70%">제목</th>
        <th>작성자</th>
        <th>등록일</th>
      </tr>
      </thead>

      <tbody>
      <!-- 게시글 목록 -->
      <!-- 'list'는 게시글 항목을 담고 있는 데이터 속성이라고 가정합니다. -->
      <!-- 'v-for' 지시문을 사용하여 리스트를 반복합니다. -->
      <!-- 'board'는 리스트의 각 항목을 나타냅니다. -->
      <!-- '${}' 표현식은 Vue 템플릿 구문에서 '{{}}'로 대체됩니다. -->

      <!-- 이벤트 처리를 위해 인라인 JavaScript 함수 호출 대신 메서드나 계산된 속성에서 처리하도록 이동합니다. -->

      <!-- JSTL 조건부 렌더링 '<c:if>' 대신 'v-if' 지시문을 사용합니다. -->

      <!-- 루프 내 각 항목에 고유한 키를 제공하기 위해 ':key' 지시문을 사용합니다. -->

      <tr v-for="board in list" :key="board.no">
        <td>{{ board.rowNum }}</td>

        <!-- 게시글 상세 페이지로 이동하는 링크입니다. -->
        <!-- '${path}/community/freeBoarddetailpage?no=${board.no}'와 같은 형식으로 href 값을 설정합니다. -->
        <!-- '{{}}' 구문으로 변수 값을 바인딩합니다. -->
        <!--<td><a :href="'${path}/community/freeBoarddetailpage?no=' + board.no">{{ board.title }}</a></td>-->

        <!--<router-link to="'/community/freeBoarddetailpage?no=' + board.no">{{ board.title }}</router-link>-->


        <!--<td>{{ board.userName }}</td>-->


      </tr>

      </tbody>

    </table>


    <!--<div style="text-align: right;">-->
    <!--<button class= "create_button" id= "create_write" @click= "createWrite()">글쓰기</button>-->

    <!--<router-link to="/write-board-page" class= "create_button">글쓰기</router-link>-->


  </div>
  <br><br><br><br><br><br><br><br><br><br><br><br>

  <div class="justify-center flex">
    <!-- 글쓰기 버튼 -->
    <router-link to="/EventWrite">
      <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              style="float: right; margin-top: -50px;">글쓰기</button>
    </router-link>
  </div>

</template>

<script>


export default {
  data() {
    return {
      // 데이터 속성 정의


    };
  },
  methods: {
    // 메서드 정의, deleteBoard()와 createWrite() 포함


  },
  props: {
    loginMember: {
      type: Object,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    path: {
      type: String,
      required: true,
    }
  }

};

</script>

<style scoped>

/* 스타일 정의 */

.board-container {
  width: 100%;
  min-width: 800px;
  max-width: 1280px;
  margin: auto;
  text-align: center;
}

.title {
  width: 50%;
}

.board th, .board td {
  padding: .5rem 0;
}

.board td {
  opacity: .8;
}

.board tr:not(:last-child) {
  border-bottom: solid #ddd;

}

.board tr:not(:first-child) {
  cursor: pointer;

}

.board tr:not(:first-child):hover {
  background-color: #D2DAFF;

}

.board {
  border-collapse: collapse;
  border: solid #000;

}

.pagenation {

  font-size: 20px;
  border: none;
  background: none;
  color: grey;
  opacity: .6;
  cursor: pointer;

}

.pagenation[disabled] {

  color: #AAC4FF;
  opacity: 1;
  text-decoration: underline;
}

.pagenation_direct {
  font-size: 20px;
  border: none;
  background: none;
  color: #AAC4FF;
  cursor: pointer;
}

.create_button {
  font-size: 20px;
  border: none;
  background: none;
  cursor: pointer;
  background-color: #AAC4FF;
  padding: .75rem 1.5rem;
  border-radius: 10px;
  color: white;
  margin-right: 5%;
  transition: .1s ease;
}

.create_button:hover {

  background-color: #668FD8;

}


.delete:hover {

  color: red;


}


section#board-list-container {
  width: 600px;
  margin: auto;
  text-align: center;
}

section#board-list-container h2 {
  margin: 10px 0;
}

table#tbl-board {
  width: 100%;
  margin: auto;
  border: solid black;
  border-collapse: collapse;
  clear: both;
}

table#tbl-board th,
table#tbl-board td {
  border: solid;
  padding: .5rem 0;
  text-align: center;
}

</style>

<template>
<div class="mt-20 mb-40">
  <p class="text-4xl text-center font-bold">주간 베스트</p>
</div>


  <div>
    <div class="text-left ml-40">
      <v-btn><a href="">인기순 </a></v-btn>
      <v-btn><a href="">최신순 </a></v-btn>
      <v-btn><a href="">조회순 </a></v-btn>
    </div>

    <br>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 ma-16">
      <div v-for="(item, index) in visibleItems" :key="index" class="ring-1 p-2">
        <div class="w-auto m-auto">
          <img src="../assets/weeklyBest.jpg" alt="" class="w-80 h-44">
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
      <div class="mt-5 mb-32 text-center">
    <v-btn v-if="visibleRows < totalRows" @click="showMoreRows" >더보기</v-btn>
      </div>
  </div>




</template>

<script lang="ts">
export default {
  name: "weeklyBest",
  data() {
    return {
      items: Array.from({ length: 25 }, (_, index) => ({
        description: `즐거운 우리집 ${index + 1}`,
      })),
      visibleItems: [],
      itemsPerRow: 5,    // 한 줄에 보여줄 항목 개수
      totalRows: 3,      // 총 보여줄 줄 수
      visibleRows: 1,    // 현재 보여지는 줄 수
    };
  },
  methods: {
    showMoreRows() {
      this.visibleRows += 1;
      this.visibleItems = this.items.slice(0, this.visibleRows * this.itemsPerRow);
    },
  },
  created() {
    this.showMoreRows();
  },
};
</script>



<script setup>
</script>

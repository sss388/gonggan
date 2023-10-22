<template>
  <div class="justify-center flex">
    <div class="p-2 w-screen min-w-[800px] max-w-screen-xl">
      <div class="container mx-auto my-10">
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/2 p-2">
            <img src="@/assets/ItemSample.png" alt="Product Image"  class="w-75 h-75" />
          </div>

          <div class="w-[500px] md:w-1/3 p-2">
            <h1 class="text-xl font-bold mb-2">{{ productDetails.name }}</h1>
            <p>{{ productDetails.price }}</p>
            <p>배송 <span class="font-bold">무료배송</span></p>
            <p class="ml-5">지금 주문시 <span class="font-bold">내일출발</span></p>
            <p>일반택배</p>
            <p>제주도/도서산간 지역 7,000원</p>
            <p>{{ productDetails.deliveryDay }}</p>
            <v-btn color="#27374D" class="text-white bg-blue-lighter hover:bg-blue-dark w-32 py-1 px-4 mr-5 rounded">장바구니</v-btn>
            <v-btn color="#27374D" class="text-white bg-blue-lighter hover:bg-blue-dark w-32 py-1 px-4 rounded">바로구매</v-btn>
          </div>
        </div>

        <div class="container mx-auto text-center flex justify-between">
          <button
            v-for="(tab, index) in tabs"
            :key="'tab' + index"
            @click.prevent="activeTab = index"
            :class="{
                      'border-b border-black': activeTab === index,
                      'bg-gray-800 text-white': activeTab === index,
                      'bg-gray-500 hover:bg-gray-700 text-white': activeTab !== index
                    }"
            class="py-4 px-6 focus:outline-none  inline-block w-full text-center"
          >
            {{ tab }}
          </button>
        </div>

        <p v-if="activeTab === 0" class="container mx-auto">상품 설명</p>

        <p v-if="activeTab === 1" class="container mx-auto">
          <form @submit.prevent="submitReview">
            <div class="mb-4">
              <label for="rating" class="text-sm font-bold">평점:</label>
              <div class="flex items-center" style="flex-direction: row;">
                <v-rating
                  hover
                  :length="5"
                  :size="32"
                  active-color="#27374D"
                />
              </div>
            </div>
            <div class="mb-4">
              <label for="reviewContent" class="text-sm font-bold">리뷰 내용:</label>
              <textarea v-model="newReview.content" id="reviewContent" name="reviewContent" class="w-30" required></textarea>
            </div>
            <v-btn type="submit" color="#27374D" class="text-white bg-blue-lighter hover:bg-blue-dark w-32 py-1 px-4 mr-5 rounded">리뷰 작성</v-btn>
          </form>
        </p>

        <p v-if="activeTab === 2" class="container mx-auto text-xl">
          <v-card-text class="font-bold text-2xl">※반품/교환 사유에 따른 요청 가능 기간</v-card-text>
          <span class="text-gray-400">반품 시 먼저 판매자와 연락하셔서 반품사유, 택배사, 배송비, 반품지 주소 등을 협의하신 후 반품상품을 발송해 주시기 바랍니다.</span>
          <br><br>
          1. 구매자 단순 변심은 상품 수령 후 7일 이내 <span class="text-gray-400 text-sm">(구매자 반품배송비 부담)</span><br>
          2. 표시/광고와 상이, 계약내용과 다르게 이행된 경우 상품 수령 후 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날로부터 30일 이내.
          둘 중 하나 경과 시 반품/교환 불가 <span class="text-gray-400 text-sm">(판매자 반품배송비 부담)</span><br>

          <v-card-text class="font-bold text-2xl">※반품/교환 불가능 사유</v-card-text>
          <span class="text-gray-400">아래와 같은 경우 반품/교환이 불가능합니다.</span>
          <br><br>
          1. 반품요청기간이 지난 경우<br>
          2. 구매자의 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우 <span class="text-gray-400 text-sm">(단, 상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외)</span><br>
          3. 포장을 개봉하였으나 포장이 훼손되어 상품가치가 현저히 상실된 경우 <span class="text-gray-400 text-sm">(예: 식품, 화장품)</span><br>
          4. 구매자의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우 <span class="text-gray-400 text-sm">(라벨이 떨어진 의류 또는 태그가 떨어진 명품관 상품인 경우)</span><br>
          5. 시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우 <span class="text-gray-400 text-sm">(예: 식품, 화장품)</span><br>
          6. 고객주문 확인 후 상품제작에 들어가는 주문제작상품<br>
          7. 복제가 가능한 상품 등의 포장을 훼손한 경우 <span class="text-gray-400 text-sm">(CD/DVD/GAME/도서의 경우 포장 개봉 시)</span><br>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from "axios";

export default defineComponent({
  setup() {
    const tabs = ['설명', '리뷰', '배송/환불'];
    const activeTab = ref(0);
    const newReview = ref({
      rating: 0,
      content: '',
    });

    const reviews = ref([]);

    const submitReview = async () => {
      try {
        const response = await axios.post('/api/reviews', {
          productId: this.$route.params.productId,
          rating: newReview.value.rating,
          content: newReview.value.content,
        });
        reviews.value.push(response.data);
        newReview.value.rating = 0;
        newReview.value.content = '';
      } catch (error) {
        console.error('리뷰 작성 중 오류 발생:', error);
      }
    };

    return { tabs, activeTab, newReview, reviews, submitReview };
  },
  name: 'Shoppingdetails',

  data() {
    return {
      productDetails: {
        name: '',
        price: 0,
        deliveryDay: 0,
      },
    };
  },
  methods: {
    async fetchProductDetails() {
      try {
        const productId = this.$route.params.productId;
        const response = await axios.get(`/api/shop/${productId}`);
        this.productDetails = response.data;
      } catch (error) {
        console.error('상품 정보를 가져오는 중 오류 발생:', error);
      }
    },
  },

  mounted() {
    this.fetchProductDetails();
  },
});
</script>

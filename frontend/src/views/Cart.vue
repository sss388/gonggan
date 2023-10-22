<template>
  <div class="justify-center flex">
    <div class="p-2 w-screen min-w-[800px] max-w-screen-xl min-h-[500px] px-6"
         v-if="cartItemList.length > 0">
      <div class="font-bold text-2xl mb-8">
        장바구니
      </div>
      <div class="justify-between flex">
        <div class="flex items-center">
          <v-checkbox-btn v-model="isAllCheck" @click="allCheck(!isAllCheck)"/>
          <div>전체선택</div>
        </div>
        <div>
          <v-btn variant="text" @click="delCheckedItems" >선택 삭제</v-btn>
        </div>
      </div>

      <v-divider class="border-opacity-100"/>

      <!-- 상품정보 -->
      <v-card v-for="(item, idx) in cartItemList" :key="idx" class="mb-3">
        <div class="flex">
          <div class="flex items-center">
            <v-checkbox-btn v-model="item.check"/>
            <div class="text-sm font-bold">
              {{calArriveDate(item.product.deliveryDay)}} 도착 예정
            </div>
          </div>
        </div>

        <!-- 상품 이미지 + 이름 -->
        <div class="flex mb-4">
          <div class="ml-[2.5%]">
            <v-img src="@/assets/ItemSample.png" cover
                   class="w-[100px] h-[100px] shadow-lg rounded-lg"/>
          </div>

          <div class="text-xl font-bold ml-3">
            {{item.product.name}}
          </div>
        </div>

        <div class="bg-gray-200 py-3">
          <div class="flex justify-space-between">
            <v-card class="ml-5 items-center flex">
              <v-btn icon="mdi-minus" variant="text" @click="handleQty(item, '-')" density="compact"
                     :loading="loadingQty"/>
              <div class="text-lg px-2 font-bold pb-0.5">{{item.qty}}</div>
              <v-btn icon="mdi-plus" variant="text" @click="handleQty(item, '+')" density="compact"
                     :loading="loadingQty"/>
            </v-card>

            <div class="font-bold mr-5 text-xl">
              {{formattedPrice(item.product.price * item.qty * (100 - item.product.Shopping.discount)/100 )}}원
            </div>
          </div>
        </div>
      </v-card>

      <div>
        <div class="my-5 text-2xl font-bold">예상 결제금액</div>
        <div>
          <div class="flex justify-space-between">
            <div class="font-semibold">총 상품 금액</div>
            <div>{{totalPriceWithoutDiscount}}원</div>
          </div>

          <div class="flex justify-space-between">
            <div class="font-semibold">상품 할인</div>
            <div>{{totalDiscount}}원</div>
          </div>

          <div class="flex justify-space-between">
            <div class="font-semibold">배송비</div>
            <div>무료</div>
          </div>
        </div>
        <div>
          <div class="flex justify-space-between items-center">
            <div class="my-5">총 {{cartItemList.length}}개 주문 금액</div>
            <div class="font-bold text-2xl">{{totalPrice}}원</div>
          </div>
        </div>
        <div class="justify-center flex">
          <v-btn color="blue-grey-lighten-1" size="large" @click="goToPayment">{{totalPrice}}원 결제하기</v-btn>
        </div>
      </div>
    </div>

    <div class="justify-center flex items-center h-full min-h-[500px]" v-else>
      <div>
        <v-img src="@/assets/sad.png" class="w-[200px] h-[200px]" cover/>
        <div class="text-center font-bold text-xl">상품이 없어요</div>
        <div class="justify-center flex mt-2">
          <v-btn variant="tonal" size="large" @click="router.push('shop')">상품 담으러 가기</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {computed, onMounted, reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {useStore} from "vuex";

// CartItem 인터페이스 정의
interface CartItem {
  cartId: number;
  id: number;
  qty: number;
  check: boolean;
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    deliveryDay: number;
    qty: number;
    Shopping: {
      discount: number;
    };
  };
}

const cartItemList = reactive<CartItem[]>([]);
const router = useRouter();
const loadingQty = ref(false);

const isAllCheck = computed(() => {
  for (const item of cartItemList) {
    if(!item.check){
      return false;
    }
  } return true;
});

const totalPriceWithoutDiscount = computed(() => {
  return formattedPrice(cartItemList.reduce((total, item) => {
    if(item.check === true) {
      return total + item.product.price * item.qty;
    }
    return total;
  }, 0));
});

const totalPrice = computed(() => {
  return formattedPrice(cartItemList.reduce((total, item) => {
    if(item.check === true) {
      return total + item.product.price * item.qty * (100 - item.product.Shopping.discount) / 100;
    }
    return total;
  }, 0)); // 초기값 0을 이 위치에 넣어야 합니다.
});

const totalDiscount = computed(() => {
  return formattedPrice(cartItemList.reduce((total, item) => {
    if(item.check === true){
      return total + item.product.price * item.product.Shopping.discount/100 * item.qty;
    }
    return total;
  }, 0)); // 초기값 0을 이 위치에 넣어야 합니다.
});

const allCheck = (check: boolean) => {
  for (const item of cartItemList) {
    item.check = check;
  }
}

const formattedPrice = (price: number) => {
  const formatted = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
  return formatted.replace('₩', '');
};

const calArriveDate = (deliveryDay: number) => {
  let date = new Date();
  date.setDate(date.getDate() + deliveryDay);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${date.getMonth() + 1}/${date.getDate()} (${dayOfWeek})`;
}

const handleQty = async (item: CartItem, oper: String) => {
  loadingQty.value = true;

  if (oper === '+') {
    if (item.product.qty > item.qty)
      item.qty++;
  } else {
    if (item.qty > 1)
      item.qty--;
  }

  const jwt = sessionStorage.getItem('jwt');

  await axios.post('http://localhost:3001/user/setCartItemQty',
    {
      itemId: item.id,
      qty: item.qty
    },
    {headers: {Authorization: `Bearer ${jwt}`},
  })

  loadingQty.value = false;
}

const delCheckedItems = async () => {
  const jwt = sessionStorage.getItem('jwt');

  for (let i = cartItemList.length - 1; i >= 0; i--) {
    if (cartItemList[i].check) {
      await axios.delete('http://localhost:3001/user/delCartItem?itemId=' + cartItemList[i].id, {
        headers: {Authorization: `Bearer ${jwt}`}
      });
      cartItemList.splice(i, 1);
    }
  }
}

onMounted(async () => {

  const jwt = sessionStorage.getItem('jwt');

  await axios.get('http://localhost:3001/user/cart',{
    headers: {Authorization: `Bearer ${jwt}`},
  }).then((res) => {
    console.log(res.data);
    cartItemList.push(...res.data);
  })

  allCheck(true);
})

const store = useStore();

const goToPayment = () => {
  const selectedItems = cartItemList.filter(item => item.check);

  if (selectedItems.length === 0) {
    alert("상품을 선택해주세요.");
  } else {
    const cartId = selectedItems[0].cartId;
    let selectedCartItemsId = "";

    selectedItems.forEach(item => {
      selectedCartItemsId += ("," + item.id);
    });

    // 라우터를 통해 payment.vue로 이동하면서 선택된 상품 정보를 query parameter로 전달
    router.push({ name: 'payment', query: { cartId, selectedItems: JSON.stringify(selectedItems) } });
  }
};

</script>

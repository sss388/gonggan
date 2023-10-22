<template>
  <div class="justify-center flex">
    <section  class="p-2 w-screen min-w-[800px] max-w-screen-xl min-h-[500px] px-6">
      <p class="text-2xl font-bold mb-4">Order/Payment</p>

      <!-- 회원정보 -->
      <div>
        <p class="border-b border-gray-300 text-lg font-semibold mb-2">회원정보</p>
        <table>
          <tr>
            <th>이름 :</th>
            <td>{{ user.name }}</td>
          </tr>
          <tr>
            <th>이메일 :</th>
            <td>{{ user.email }}</td>
          </tr>
        </table>
      </div>

      <!-- 배송정보 -->
      <div>
        <p class="border-b border-gray-300 text-lg font-semibold mb-2 mt-4">배송지</p>
        <!-- 배송 정보 목록 -->
        <div v-if="deliveries.length > 0">
          <ul>
            <li v-for="delivery in deliveries" :key="delivery.id">
              <div>
                <strong>배송지명:</strong> {{ delivery.name }}
              </div>
              <div>
                <strong>수령인:</strong> {{ delivery.recipient }}
              </div>
              <div>
                <strong>연락처:</strong> {{ delivery.phone }}
              </div>
              <div>
                <strong>주소:</strong> {{ delivery.address }}
              </div>
              <div>
                <strong>요청사항:</strong> {{ delivery.request }}
              </div>
            </li>
          </ul>
        </div>

        <div v-else>
          <h2>현재 등록된 배송지가 없습니다. 배송지를 추가해주세요.</h2>
        </div>

        <!-- 배송 정보 추가 버튼 -->
        <div>
          <v-btn color="blue-grey-lighten-1" size="small" @click="openDeliveryModal">배송지 추가</v-btn>
        </div>

        <!-- 배송지 추가 모달창 -->
        <div v-if="showDeliveryModal" class="modal">
          <div class="modal-content">
            <h2>주소 추가</h2>
            <form @submit.prevent="addDeliveryInfo">
              <div>
                <label for="name">배송지명</label><br>
                <input type="text" id="name" v-model="newDelivery.name" placeholder="배송지명" required />
              </div>
              <div>
                <label for="recipient">수령인</label><br>
                <input type="text" id="recipient" v-model="newDelivery.recipient" placeholder=" 수령인" required />
              </div>
              <div>
                <label for="phone">연락처</label><br>
                <input type="text" id="phone" v-model="newDelivery.phone" placeholder=" 연락처" required />
              </div>
              <div>
                <label for="address">주소</label><br>
                <div class="address">
                  <input type="text" name="postcode" id="postcode" v-model="postcode" placeholder=" 우편번호" size="5" readonly>
                  <v-btn color="blue-grey-lighten-1" class="ml-1" size="32" id="postcode_button" @click="openPostcode">검색</v-btn>
                  <br>
                  <input type="text" name="address1" id="address1" v-model="address1" placeholder=" 기본 주소" readonly>
                  <br>
                  <input type="text" name="address2" id="address2" placeholder=" 나머지주소(선택입력가능)">
                </div>
              </div>
              <div>
                <label for="request">요청사항</label><br>
                <select v-model="newDelivery.request" @change="handleDeliveryRequestChange">
                  <option value=""> 배송 시 요청사항을 선택해주세요.</option>
                  <option value="부재 시 경비실에 맡겨주세요."> 부재 시 경비실에 맡겨주세요.</option>
                  <option value="부재 시 택배함에 넣어주세요."> 부재 시 택배함에 넣어주세요.</option>
                  <option value="부재 시 집 앞에 놔주세요."> 부재 시 집 앞에 놔주세요.</option>
                  <option value="배송 전 연락 바랍니다."> 배송 전 연락 바랍니다.</option>
                  <option value="직접입력">직접입력</option>
                </select>
              </div>

              <!-- 직접입력 textarea -->
              <div v-if="showCustomRequestTextarea">
                <label for="customRequest">직접입력 요청사항</label><br>
                <textarea id="customRequest" v-model="customRequestTextarea" @input="handleCustomRequestChange" required></textarea>
              </div>

              <v-btn color="blue-grey-lighten-1" size="small" type="submit">추가</v-btn>
              <v-btn color="blue-grey-lighten-1" size="small" @click="closeDeliveryModal">닫기</v-btn>
            </form>
          </div>
        </div>
      </div>


      <!-- 상품정보 -->
      <p class="border-b border-gray-300 text-lg font-semibold mb-2 mt-4">상품정보</p>
      <div v-for="(item, idx) in selectedItems" :key="idx" class="flex mb-4">
        <div class="ml-[2.5%]">
          <v-img :src="item.product.image" cover class="w-[100px] h-[100px] shadow-lg rounded-lg" />
        </div>

        <div class="text-xl font-bold ml-3">
          {{ item.product.name }}
          <br>
          <p class="text-sm text-gray-400">{{ item.qty }}개</p>
          {{ formattedPrice(item.product.price * item.qty) }}원
        </div>
      </div>


      <!-- 결제금액-->
      <div>
        <p class="border-b border-gray-300 text-lg font-semibold mb-2s mt-4">결제금액</p>
        <table style="width: 100%;">
          <tr>
            <th class="text-left">총 상품 금액</th>
            <td class="text-right">{{totalPriceWithoutDiscount}}원</td>
          </tr>
          <tr>
            <th class="text-left">상품 할인</th>
            <td class="text-right">{{totalDiscount}}원</td>
          </tr>
          <tr>
            <th class="text-left">배송비</th>
            <td class="text-right">0원</td>
          </tr>
        </table>
      </div>

      <div class="border-b border-gray-300 mt-4">
        <div class="flex justify-space-between items-center">
          <div class="text-lg font-semibold">최종 결제 금액</div>
          <div class="text-lg font-semibold">{{totalPrice}}원</div>
        </div>
      </div>

      <div>
        <div id="payment-method"></div>
      </div>


      <div class="justify-center flex">
        <v-btn color="blue-grey-lighten-1" size="large"  @click="clickPaymentButton" >{{totalPrice}}원 결제하기</v-btn>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';

// 회원정보
const user = ref({
  name: '',
  email: '',
});

// userId를 가져오는 computed 속성 추가
const userId = computed(() => {
  // 예시: 세션 스토리지에서 userId를 가져오는 경우
  const jwt = sessionStorage.getItem('jwt');
  const user = jwt ? JSON.parse(atob(jwt.split('.')[1])) : null;
  return user ? user.id : null;
});


// API 요청을 보내는 함수
const fetchUserInfo = async () => {
  try {
    const jwt = sessionStorage.getItem('jwt');
    const response = await axios.get('http://localhost:3001/user/me', {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    // API 응답에서 사용자 정보를 가져와 변수에 저장
    user.value.name = response.data.name;
    user.value.email = response.data.email;
  } catch (error) {
    // 오류 처리
    console.error('사용자 정보를 불러오는 중 오류가 발생했습니다.', error);
  }
};

// 컴포넌트가 로드될 때 API 요청 보내기
onMounted(() => {
  fetchUserInfo();
});


// 배송정보 저장
const deliveries = ref([]); // 사용자의 배송 정보 목록을 저장하는 배열
const newDelivery = ref({
  name: '', // 여기에 배송지명을 추가해주세요.
  recipient: '',
  phone: '',
  address: '',
  request: '',
});

// 새로운 배송 정보를 저장하는 객체
const showDeliveryModal = ref(false); // 배송 정보 입력 모달의 표시 여부

const fetchDeliveries = async () => {
  try {
    const jwt = sessionStorage.getItem('jwt');
    const response = await axios.get('http://localhost:3001/user/deliveryInfo', {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    deliveries.value = response.data;
  } catch (error) {
    console.error('배송 정보를 불러오는 데 문제가 발생했습니다.', error);
  }
};

const openDeliveryModal = () => {
  showDeliveryModal.value = true;
};

const closeDeliveryModal = () => {
  showDeliveryModal.value = false;
};

const addDeliveryInfo = async () => {
  try {
    const jwt = sessionStorage.getItem('jwt');
    // 배송지명을 포함하여 데이터를 전달
    const response = await axios.post('http://localhost:3001/user/addDeliveryInfo', {
      ...newDelivery.value, // 배송지 정보 객체 전체를 전달
      userId: userId.value,
    }, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    // 추가된 배송지 정보를 가져와서 화면에 반영
    fetchDeliveries();
    // 모달창 닫기
    showDeliveryModal.value = false;
  } catch (error) {
    console.error('배송 정보를 추가하는 데 문제가 발생했습니다.', error);
  }
};


onMounted(() => {
  fetchDeliveries(); // 컴포넌트가 마운트되면 배송 정보 목록을 가져옴
});

// 배송 요청사항 - 직접입력
// 직접입력 textarea의 값을 저장할 변수
const customRequestTextarea = ref<string>('');
const showCustomRequestTextarea = ref(false);

// 요청사항이 변경될 때 호출되는 메서드
const handleDeliveryRequestChange = () => {
  if (newDelivery.value.request === '직접입력') {
    showCustomRequestTextarea.value = true;
  } else {
    showCustomRequestTextarea.value = false;
    // 직접 입력이 아닌 다른 요청사항을 선택한 경우,
    // customRequestTextarea의 내용을 초기화
    customRequestTextarea.value = '';
  }
};

// 직접 입력 textarea의 값을 newDelivery.request에 할당
const handleCustomRequestChange = () => {
  newDelivery.value.request = customRequestTextarea.value;
};


// 컴포넌트가 로드될 때 API 요청 보내기
onMounted(() => {
  fetchDeliveries();
  fetchUserInfo();
});



// CartItem 인터페이스 정의
interface CartItem {
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

// 가격
const totalPriceWithoutDiscount = computed(() => {
  return formattedPrice(selectedItems.value.reduce((total, item) => total + item.product.price * item.qty, 0));
});

const totalPrice = computed(() => {
  return formattedPrice(selectedItems.value.reduce((total, item) => total + item.product.price * item.qty * (100 - item.product.Shopping.discount)/100, 0));
});

const totalDiscount = computed(() => {
  return formattedPrice(selectedItems.value.reduce((total, item) => total + item.product.price * item.product.Shopping.discount/100 * item.qty, 0));
});


// 상품 정보
const store = useStore();

// 선택된 상품 정보 가져오기
const selectedItems = computed(() => {
  const route = router.currentRoute.value;
  const selectedItems = route.query.selectedItems;

  if (typeof selectedItems === 'string') {
    // 문자열인 경우 JSON 파싱
    return JSON.parse(selectedItems);
  } else if (Array.isArray(selectedItems)) {
    // 이미 배열인 경우 그대로 반환
    return selectedItems;
  } else {
    // 그 외의 경우 빈 배열 반환
    return [];
  }
});

// CartItem 타입을 정의한 곳에 맞게 수정
import { reactive } from 'vue';
import axios from "axios";
import {useStore} from "vuex";
import router from "@/router";
interface CartItem {
  id: number;
  qty: number;
  check: boolean; // boolean 타입으로 수정
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

const formattedPrice = (price: number) => {
  const formatted = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(price);
  return formatted.replace('₩', '');
};


// 주소API
declare global {
  interface Window {
    daum: any;
  }
}

interface IAddr {
  address: string;
  zonecode: string;
}

// ref로 변수 선언
const postcode = ref('');
const address1 = ref('');

const openPostcode = () => {
  new window.daum.Postcode({
    oncomplete: (data: IAddr) => {
      postcode.value = data.zonecode; // 우편번호 정보
      address1.value = data.address; // 기본주소 정보

      document.getElementById("address2")?.focus();
    },
  }).open();
};

//  결제 API
const clientKey = 'test_ck_PBal2vxj81PJbQn6o21r5RQgOAND';
const secretKey = 'test_ck_PBal2vxj81PJbQn6o21r5RQgOAND';
const customerKey = 'G2MD0ghzwL7EwQH01EOfK';

const paymentWidget = PaymentWidget(clientKey, customerKey);

// 컴포넌트가 로드될 때 API 요청 보내기
onMounted(() => {
  fetchDeliveries();
  fetchUserInfo();
  paymentWidget.renderPaymentMethods("#payment-method", "{totalPrice}");
});

const clickPaymentButton = () => {
  const orderName = "리팩터링 2판 외 1권"; // 주문 상품명
  const successUrl = window.location.origin + "/success"; // 결제 성공 시 리다이렉트할 URL
  const failUrl = window.location.origin + "/fail"; // 결제 실패 시 리다이렉트할 URL
  const customerEmail = "customer123@gmail.com"; // 고객 이메일
  const customerName = "김토스"; // 고객 이름

  // const paymentAmount = parseInt(totalPrice.replace(/[^0-9]/g, '')); // totalPrice에서 숫자만 추출

  paymentWidget
    .requestPayment({
      orderId: '4TITFDV0Qqs0xzmtqqtjD', // 주문 ID
      orderName,
      successUrl,
      failUrl,
      customerEmail,
      customerName,
      amount: paymentAmount, // 수정된 부분
    })
    .then((response) => {
      // 결제가 성공하면 여기에 처리 로직을 추가하세요.
      console.log('결제 성공', response);

      // 여기에서 필요한 정보를 추출합니다.
      const { orderId, amount, paymentKey } = response;

      // BoughtItem 테이블에 저장합니다.
      const boughtItemData = {
        price: paymentAmount,
        userId: user.value.id, // 사용자 ID
        shoppingId: 1/* 여기에 shoppingId를 설정하세요. */, // 쇼핑 ID (구매한 상품의 ID)
        deliveryStatus: "배송 준비중",
        orderDate: new Date(),
        paymentDate: new Date(),
        paymentStatus: "결제 완료",
        qty: 7/* 여기에 상품 개수를 설정하세요. */, // 상품 개수
        method: "카드",
        address: "주소", // 배송 주소
      };

      // 위에서 구성한 데이터를 서버로 보내서 저장합니다.
      axios.post('http://localhost:3001/boughtItem', boughtItemData)
        .then((response) => {
          console.log('BoughtItem 정보가 성공적으로 저장되었습니다.', response);

          // 여기에서 필요한 후속 작업을 수행하세요.
        })
        .catch((error) => {
          console.error('BoughtItem 정보를 저장하는 중 오류가 발생했습니다.', error);
        });
    })
    .catch((error) => {
      // 결제가 실패하면 여기에 처리 로직을 추가하세요.
      console.error('결제 실패', error);
    });
};


</script>

<style scoped>
td {
  padding-left: 20px;
  padding-bottom: 5px;
}
.address input {
  padding-bottom: 5px;
}

/* 모달 스타일링 CSS */
.modal {
  /* 모달을 화면 전체로 덮도록 설정 */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 배경을 반투명하게 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소 위에 나타나도록 설정 */
}

.modal-content {
  background-color: white;
  width: 500px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-content input, select {
  border: solid gainsboro 1px;
  width: 300px;
  height: 35px;
  border-radius: 5px;
  margin-bottom: 10px;
}

</style>

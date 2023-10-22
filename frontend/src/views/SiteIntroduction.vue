<template>
  <div class="justify-center flex">
    <div class="p-2 w-screen min-w-[800px] max-w-screen-xl">
  <div>
    <v-card-text class="text-4xl text-blue-grey-darken-1 font-bold">공 간, <span class="text-2xl text-brown-darken-2 font-bold">몰랐던 우리집의 대변신</span></v-card-text>
    <p class="mb-3 text-blue-grey ml-5">우리는 공간과 일상을 경험하는 방식을 새롭게 정의합니다.</p>
    <p class="mb-3 text-blue-grey ml-5">모두의 라이프스타일에 영감을 줄 수 있도록 끊임없이 기술을 혁신하고,</p>
    <p class="mb-5 text-blue-grey ml-5">모두가 자신의 공간, 나아가 삶을 사랑하게 만드는 유례없는 도전을 하고 있습니다.</p>
  </div>


    <div class="row-span-1 grid grid-cols-2 gap-3 mt-14 mb-32">
      <div class="col-span-1 grid grid-rows-3 gap-3 items-center flex">
        <div class="w-100">
          <div class="w-full h-96 mb-10">
            <v-img src="@/assets/siteintro/siteintro.png"/>
          </div>
        </div>
        <div class="w-100">
          <div class="w-full h-96 mb-10">
            <v-img src="@/assets/siteintro/siteintro2.png" />
          </div>
        </div>
        <div class="w-100">
          <div class="w-full h-96">
            <v-img src="@/assets/siteintro/siteintro3.png" />
          </div>
        </div>
      </div>

      <div class="col-span-1 grid grid-cols-auto gap-3">
        <div class="mt-8 ml-20">
          <p class="font-bold xl:text-xl 2xl:text-2xl">공간을 꾸미는 유저들의 사례가</p>
          <p class="font-bold xl:text-xl 2xl:text-2xl mb-14">가득한 콘텐츠</p>
          <p class="text-base">
            온라인 집들이와 인테리어 노하우 등 다양한 인테리어 콘텐츠들을<br>
            제공하여 누구나 쉽게 재미있게 공간을 변화시킬 수 있도록 돕습니다.<br>
            온라인 집들이와 인테리어 노하우 등 다양한<br>
            인테리어 콘텐츠들을제공하여 누구나 쉽게<br>
            재미있게 공간을 변화시킬 수 있도록 돕습니다.
          </p>
        </div>

        <div class="mt-10 ml-20">
          <p class="font-bold text-2xl mb-6 mt-32">매력적인 콘텐츠를 끊임없이</p>
          <p class="font-bold text-2xl -mt-4 mb-6">공유하는 커뮤니티</p>
          <p class="text-base">
            저희 공간은 인스타그램 및 다양한 sns 커뮤니티를 통해<br>
            자신의 공간을 사랑하는 유저들이 서로의 공간을 공유하고 공감하며<br>
            진정성이 담긴 콘텐츠를 지속적으로 나눕니다.
          </p>
          <div class="w-50 h-52 mt-7">
            <v-img src="@/assets/siteintro/siteintro4.png" class="w-[100%]" />
          </div>
        </div>

        <div class="mt-5 ml-20">
          <p class="font-bold text-2xl mb-6 mt-5">제품 탐색부터 구매까지</p>
          <p class="font-bold text-2xl -mt-4 mb-6">One-stop으로 가능한 스토어</p>
          <p class="text-base">
            콘텐츠 속 제품 정보가 궁금할 때 태그를 클릭하여 상세 정보를 확인하고,<br>
            구매까지 한 번에 진행할 수 있도록 편리한 구매 경험을 제공합니다
          </p>
          <div class="w-50 h-44 mt-5 ">
            <v-img src="@/assets/siteintro/siteintro5.png" class="w-[100%]" />
          </div>
        </div>
      </div>
    </div>

    <div class="row-span-1 w-full h-auto">
      <div class="row-span-1 w-full h-auto">
        <p class="text-3xl text-brown-darken-2 mt-12 text-center mb-24">
          유저들의 사례 중 BEST 3 작품 <br>
          BEST고객에겐 다양한 상품 제공
        </p>

        <!-- Add a flex container -->
        <div class="flex justify-around mt-12 mb-24">
          <!-- Each image and text is wrapped in a div -->
          <div class="w-1/4 h-96 flex flex-col items-center">
            <v-img src="@/assets/siteintro/siteintro6.png" class="w-full h-3/4 object-cover"/>
            <p class="font-bold mt-3 text-center">
              혼자 사는 원룸 한번 꾸며봤어요! #원룸<br> #인테리어소품 #커튼 #무드등 #거울<br> #테이블 #침대 #카페트 #서랍장 #공간❤
            </p>
          </div>

          <div class="w-1/4 h-96 flex flex-col items-center">
            <v-img src="@/assets/siteintro/siteintro7.png" class="w-full h-3/4 object-cover"/>
            <p class="font-bold mt-3 text-center">
              1.5평 작은방 공간분리하기🍒 #원룸 #쇼파<br> #인테리어 #가구배치 #작은방 #테이블 #원룸꾸미기 #원룸인테리어 #대형거울 #침구 #작은방 인테리어 #공간❤
            </p>
          </div>

          <div class="w-1/4 h-96 flex flex-col items-center">
            <v-img src="@/assets/siteintro/siteintro8.png" class="w-full h-3/4 object-cover"/>
            <p class="font-bold mt-3 text-center">
              1.5평 작은방 공간분리하기🍒 #원룸 #책상<br>
              #수납장 #화이트컬러 #피규어 #리제로 #무드등 #작은방 #인테리어 #화분
              #공간❤
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang = "ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SiteIntroduction',
  components: {}
});
</script>

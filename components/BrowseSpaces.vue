<template>
    <div class="relative py-6 pb-8 dark:bg-neutral-800">
      <div class="container mx-auto ">
        <swiper class="flex flex-row pb-3 space-x-4 overflow-hidden select-none" :slides-per-view="6" :space-between="0" :navigation="{prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next'}" ref="carousel">
          <swiper-slide v-for="(card, index) in cardData" :key="index">
            <NuxtLink :to="`/categories`">
              <div class="w-40 font-semibold text-center transition ease-in-out shadow-md h-42 rounded-b-md delay-10 hover:-translate-y-2 hover:scale-110">
                <img :src="card.image" class="w-40 h-24 rounded-t-md" alt="Card Image" />
                <div class="text-center">
                  <div class="content-center p-2 dark:text-gray-50">{{ card.title }}</div>
                </div>
              </div>
            </NuxtLink>
          </swiper-slide>
          <div class="hidden lg:flex swiper-button-prev"></div>
          <div class="hidden lg:flex swiper-button-next"></div>
        </swiper>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import SwiperCore, { Navigation } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  
  SwiperCore.use([Navigation]);
  
  const carousel = ref(null);
  
  const cardData = [
    { id: '1', title: 'label 1', image: 'https://picsum.photos/600/800?random=1' },
    { id: '2', title: 'label 2', image: 'https://picsum.photos/600/800?random=2' },
    { id: '3', title: 'label 3', image: 'https://picsum.photos/600/800?random=3' },
    { id: '4', title: 'label 4', image: 'https://picsum.photos/600/800?random=4' },
    { id: '5', title: 'label 5', image: 'https://picsum.photos/600/800?random=5' },
    { id: '6', title: 'label 6', image: 'https://picsum.photos/600/800?random=6' },
    { id: '7', title: 'label 7', image: 'https://picsum.photos/600/800?random=7' },
    { id: '8', title: 'label 8', image: 'https://picsum.photos/600/800?random=8' },
    { id: '9', title: 'label 9', image: 'https://picsum.photos/600/800?random=9' },
    { id: '10', title: 'label 10', image: 'https://picsum.photos/600/800?random=10' },
    { id: '11', title: 'label 11', image: 'https://picsum.photos/600/800?random=11' },
    { id: '12', title: 'label 12', image: 'https://picsum.photos/600/800?random=12' },
    { id: '13', title: 'label 13', image: 'https://picsum.photos/600/800?random=13' },
    { id: '14', title: 'label 14', image: 'https://picsum.photos/600/800?random=14' },
    { id: '15', title: 'label 15', image: 'https://picsum.photos/600/800?random=15' },
    { id: '16', title: 'label 16', image: 'https://picsum.photos/600/800?random=16' },
    { id: '17', title: 'label 17', image: 'https://picsum.photos/600/800?random=17' },
    { id: '18', title: 'label 18', image: 'https://picsum.photos/600/800?random=18' },
    { id: '19', title: 'label 19', image: 'https://picsum.photos/600/800?random=19' }
  ];
  
  const prev = () => {
    if (carousel.value && carousel.value.swiper) {
      carousel.value.swiper.slidePrev();
    }
  };
  const next = () => {
    if (carousel.value && carousel.value.swiper) {
      carousel.value.swiper.slideNext();
    }
  };
  
  onMounted(() => {
    // Wait for next tick to ensure that carousel is mounted and ready
    setTimeout(() => {
      prev();
      next();
    }, 0);
  });
  </script>
  
  <style scoped>
    .swiper-button-prev, .swiper-button-next {
      width: 60px;
      height: 60px;
      background-color: rgb(255, 255, 255);
      color: #000;
      border-radius: 50%;
      display: flex;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2), 0 6px 20px 0 rgba(0, 0, 0, .40);
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      cursor: pointer;
    }
  
    img{
      object-fit: cover;
  
    }
  
    .swiper-button-prev {
      left: 5px;
    }
  
    .swiper-button-next {
      right: 5px;
    }
  </style>
  
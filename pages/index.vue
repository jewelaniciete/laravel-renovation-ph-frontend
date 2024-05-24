<script setup>
import { ref, onMounted } from 'vue';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

SwiperCore.use([Navigation]);

import dap from 'assets/images/renovation/design and planning.png'
import car from 'assets/images/renovation/renovation and construction.png'
import faf from 'assets/images/renovation/finishes and fixture.png'
import lao from 'assets/images/renovation/landscaping and outdoor.png'


const locationDropdownConfig = ref({
    id : "location",
    name : "location",
    divClass : "mt-3 filter-search-form mt-md-0",
    prependIcon: "uil uil-map-marker"
    //add options array
})

const carousel = ref(null);
const modules = [Navigation];
const slidesPerView = ref(6);
const currentSlideIndex = ref(0);

const categories = [
    {
        title: 'Design and Planning',
        img: dap
    },
    {
        title: 'Construction and Renovation',
        img: car
        
    },
    {
        title: 'Finishes and Fixtures',
        img: faf
    },
    {
        title: 'Landscaping and Outdoor',
        img: lao
    },
]

const cardData = [
    { id: '1', title: 'label 1', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '2', title: 'label 2', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '3', title: 'label 3', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '4', title: 'label 4', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '5', title: 'label 5', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '6', title: 'label 6', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '7', title: 'label 7', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '8', title: 'label 8', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '9', title: 'label 9', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '10', title: 'label 10', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '11', title: 'label 11', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '12', title: 'label 12', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '13', title: 'label 13', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '14', title: 'label 14', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '15', title: 'label 15', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '16', title: 'label 16', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '17', title: 'label 17', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '18', title: 'label 18', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' },
    { id: '19', title: 'label 19', image: 'https://cdnb.artstation.com/p/assets/images/images/030/362/979/large/dawid-znaj-2020-09-17-19-44-04-window.jpg?1600365543' }
];

const prev = () => {
  if (carousel.value && carousel.value.swiper) {
    currentSlideIndex.value = Math.max(currentSlideIndex.value - slidesPerView.value, 0);
    carousel.value.swiper.slideTo(currentSlideIndex.value, 500); // Slide to the previous group of slides
  }
};


const next = () => {
  if (carousel.value && carousel.value.swiper) {
    currentSlideIndex.value = Math.min(
      currentSlideIndex.value + slidesPerView.value,
      carousel.value.swiper.slides.length - slidesPerView.value
    );
    carousel.value.swiper.slideTo(currentSlideIndex.value, 500); // Slide to the next group of slides
  }
};

onMounted(() => {
  setTimeout(() => {
    prev();
    next();
  }, 0);
});

</script>

<template>
    <div class="main-content">
        <div class="page-content">
            <section class="relative bg-opacity-10 py-28 ">
                <div class="container mx-auto">
                    <div class="grid items-center grid-cols-12 rtl:gap-10">
                        <div class="col-span-12 lg:col-span-7">
                            <div class="mb-3 ltr:mr-14 rtl:ml-14">
                                      <h6 class="mb-3 text-sm text-gray-900 uppercase dark:text-gray-50">We have 150,000+ projects</h6>
                                      <h1 class="mb-3 text-5xl font-semibold leading-tight text-gray-900 dark:text-gray-50">Find the perfect professional for you with <span class="font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">Renovation Ph</span></h1>
                                      <p class="text-lg font-light text-gray-500 whitespace-pre-line dark:text-gray-300">
                                                Find professionals, create blogs and interact with other homeoweners. 
                                                Carefully crafted after analyzing the needs of different homeoweners.
                                        </p>
                            </div>
                            <form action="#">
                                <div class="registration-form">
                                    <div class="grid grid-cols-12">
                                        <div class="col-span-12 xl:col-span-4">
                                            <div class="mt-3 rounded-l filter-search-form filter-border mt-md-0">
                                                <i class="uil uil-briefcase-alt"></i>
                                                <input type="search" id="job-title" class="w-full filter-input-box placeholder:text-gray-100 placeholder:text-13 dark:text-gray-100" placeholder="professional, projects    ...">
                                            </div>
                                        </div><!--end col-->
                                        <div class="col-span-12 xl:col-span-4">
                                            <ClientOnly>
                                                <DropDown :config="locationDropdownConfig" />  
                                            </ClientOnly>                                              
                                        </div><!--end col-->
                                        <div class="col-span-12 xl:col-span-4">
                                            <div class="h-full mt-3">
                                                <button class="btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=sky]:bg-sky-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=pink]:bg-pink-500 group-data-[theme-color=blue]:bg-blue-500 border rounded-lg border-transparent ltr:xl:rounded-l-none rtl:xl:rounded-r-none w-full py-[18px] text-white" type="submit"><i class="uil uil-search me-1"></i> Find Job</button>
                                            </div>
                                        </div><!--end col-->
                                    </div><!--end row-->
                                </div>
                            </form>
                        </div>
                        <div class="col-span-5">
                            <div class="mt-5">
                                <img src="assets/images/cover.svg" alt="" class="mb-5 home-img max-w-none"> 
                            </div>
                        </div>
                    </div>
                </div>
                <img src="/images/bg-shape.png" alt="" class="absolute block -bottom-5 dark:hidden">
                <img src="/images/bg-shape-dark.png" alt="" class="absolute hidden -bottom-5 dark:block">
            </section>
            <!-- end home -->

            <!-- start category -->
            <section class="py-20 dark:bg-neutral-800">
                <div class="container mx-auto">
                    <div class="grid grid-cols-1 gap-5">
                        <div class="text-center">
                            <h3 class="mb-3 text-3xl text-gray-900 dark:text-gray-50">Browse Professional by <span class="font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">Service Category</span></h3>
                            <p class="mb-5 text-gray-500 whitespace-pre-line dark:text-gray-300">
                                Post a job to tell us about your project. We'll quickly match you with the right freelancers.
                            </p>
                        </div>
                    </div>
                   
                    <div class="grid grid-cols-12 gap-5 ">
                        <div v-for="category in categories" :key="category.img" class="col-span-12 md:col-span-6 lg:col-span-3">
                            <div class="p-2 mt-3 transition-all duration-500 bg-white rounded shadow-lg shadow-gray-100/50 card dark:bg-neutral-800 dark:shadow-neutral-600/20 group/blog">
                                <div class="relative overflow-hidden">
                                        <img :src="category.img" alt="" class="rounded">
                                        <div class="absolute inset-0 hidden transition-all duration-500 rounded-md bg-black/30 group-hover/blog:block"></div>
                                        
                                        <div class="hidden bottom-2 left-2 group-hover/blog:block author group-hover/blog:absolute">
                                            <ul class="mb-0 list-unstyled">
                                                <li class="list-inline-item"><a href="javascript:void(0)" class="text-white"><i class="mdi mdi-comment-outline me-1"></i> 08</a></li>
                                            </ul>
                                        </div>
                                </div>
                                <div class="p-5 text-center">
                                    <a href="blog-details.html" class="primary-link">
                                        <h5 class="text-sm text-gray-900 dark:text-gray-50">{{category.title}}</h5>
                                    </a>
                                </div>
                            </div>
                        </div>                        
                    </div>

                    <div class="grid grid-cols-1">
                        <div class="mt-5 text-center">
                            <a href="job-categories.html" class="text-white border-transparent group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=sky]:bg-sky-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=pink]:bg-pink-500 group-data-[theme-color=blue]:bg-blue-500 btn hover:-translate-y-2">Browse All Categories <i class="uil uil-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
            </section>
            <!-- end category -->

            <!-- browse spaces -->
            <section class="py-5 dark:bg-neutral-800">
                <div class="container mx-auto">
                    <div class="grid grid-cols-1 gap-5">
                        <div class="">
                            <h3 class="mb-3 text-xl text-gray-900 dark:text-gray-50">Browse <span class="font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">Spaces</span></h3>
                            
                        </div>
                    </div>
                    <swiper :slidesPerView="5" :centeredSlides="false" :slidesPerGroupSkip="1" :grabCursor="true" :keyboard="{enabled: true,}"
                            :breakpoints="{'769': {slidesPerView: 5, slidesPerGroup: 5,},}"
                            :scrollbar="false" :navigation="true" :pagination="{clickable: true,}"
                            :modules="modules" class="mySwiper"
                            >
                        <swiper-slide v-for="(card, index) in cardData" :key="index" class="p-4">
                            <div class="max-w-sm overflow-hidden bg-white rounded-lg shadow-lg ring-4 ring-red-500 ring-opacity-40">
                                <div class="relative">
                                    <img class="w-full" src="assets/images/renovation/design and planning.png" alt="Product Image">
                                </div>
                                <div class="p-4 text-center">
                                    <h3 class="mb-2 text-lg font-medium">{{card.title}}</h3>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </section>
            <!-- end browse spaces -->

            <!-- browse professionals -->
            <section class="py-5 dark:bg-neutral-800">
                <div class="container mx-auto">
                    <div class="grid grid-cols-1 gap-5">
                        <div class="">
                            <h3 class="mb-3 text-xl text-gray-900 dark:text-gray-50">Browse <span class="font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">Professionals</span></h3>
                            
                        </div>
                    </div>
                    <swiper :slidesPerView="5" :centeredSlides="false" :slidesPerGroupSkip="1" :grabCursor="true" :keyboard="{enabled: true,}"
                            :breakpoints="{'769': {slidesPerView: 5, slidesPerGroup: 5,},}"
                            :scrollbar="false" :navigation="true" :pagination="{clickable: true,}"
                            :modules="modules" class="mySwiper"
                            >
                        <swiper-slide v-for="(card, index) in cardData" :key="index" class="p-4">
                            <div class="max-w-sm overflow-hidden bg-white rounded-lg shadow-lg ring-4 ring-red-500 ring-opacity-40">
                                <div class="relative">
                                    <img class="w-full" src="assets/images/renovation/professional.png" alt="Product Image">
                                </div>
                                <div class="p-4 text-center">
                                    <h3 class="mb-2 text-lg font-medium">{{card.title}}</h3>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </section>
            <!-- end browse professionals -->

            <!-- browse photos by style -->
            <section class="py-5 dark:bg-neutral-800">
                <div class="container mx-auto">
                    <div class="grid grid-cols-1 gap-5">
                        <div class="">
                            <h3 class="mb-3 text-xl text-gray-900 dark:text-gray-50">Browse by <span class="font-bold group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">Project Styles</span></h3>
                            
                        </div>
                    </div>
                    <swiper :slidesPerView="5" :centeredSlides="false" :slidesPerGroupSkip="1" :grabCursor="true" :keyboard="{enabled: true,}"
                            :breakpoints="{'769': {slidesPerView: 5, slidesPerGroup: 5,},}"
                            :scrollbar="false" :navigation="true" :pagination="{clickable: true,}"
                            :modules="modules" class="mySwiper"
                            >
                        <swiper-slide v-for="(card, index) in cardData" :key="index" class="p-4">
                            <div class="max-w-sm overflow-hidden bg-white rounded-lg shadow-lg ring-4 ring-red-500 ring-opacity-40">
                                <div class="relative">
                                    <img class="w-full" src="assets/images/renovation/project style.jpg" alt="Product Image">
                                </div>
                                <div class="p-4 text-center">
                                    <h3 class="mb-2 text-lg font-medium">{{card.title}}</h3>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </section>
            <!-- end browse photos by style -->



            <!-- start cta -->
            <section class="py-20 bg-gray-50 dark:bg-neutral-700">
                      <div class="container mx-auto">
                          <div class="nav-tabs round-pill">
                              <div class="grid items-center grid-cols-12 gap-5">
                                  <div class="col-span-12 lg:col-span-8 lg:col-start-3">
                                      <div class="text-center">
                                          <h2 class="mb-5 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">Browse Our <span class="text-yellow-500 fw-bold">5,000+</span> Latest
                                              Jobs</h2>
                                          <p class="text-gray-500 dark:text-gray-300">Post a job to tell us about your project. We'll quickly match you with
                                              the right freelancers.</p>
                                          <div class="pt-2 mt-5">
                                              <a href="javascript:void(0)" class="text-white border-transparent group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=sky]:bg-sky-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=pink]:bg-pink-500 group-data-[theme-color=blue]:bg-blue-500 btn hover:-translate-y-2">Started Now <i class="align-middle uil uil-rocket ms-1"></i></a>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
            </section>
            <!-- end cta -->

            <!-- start testimonial -->
            <section class="py-20 dark:bg-neutral-800">
                      <div class="container mx-auto">
                          <div class="grid grid-cols-1 gap-5">
                              <div class="mb-5 text-center">
                                  <h3 class="mb-3 text-3xl text-gray-900 dark:text-gray-50">Happy Candidates</h3>
                                  <p class="mb-5 text-gray-500 whitespace-pre-line dark:text-gray-300">Post a job to tell us about your project. We'll quickly match you with the right <br> freelancers.</p>
                              </div>
                          </div>
                          <div class="grid grid-cols-12 mt-8">
                              <div class="col-span-12 lg:col-span-8 lg:col-start-3">
                                  <div class="pb-5 swiper testimonialSlider">
                                      <div class="mb-12 swiper-wrapper">
                                          <div class="swiper-slide">
                                              <div class="text-center">
                                                  <div class="mb-4">
                                                      <img src="/images/logo/mailchimp.svg" class="h-12 mx-auto" alt="" />
                                                  </div>
                                                  <p class="mb-4 text-lg font-thin text-gray-500 dark:text-gray-200">" Very well thought out and articulate communication.
                                                      Clear milestones, deadlines and fast work. Patience. Infinite patience. No
                                                      shortcuts. Even if the client is being careless. "</p>
                                                  <h5 class="mb-0 dark:text-gray-50">Jeffrey Montgomery</h5>
                                                  <p class="mb-0 text-gray-500 dark:text-gray-300">Product Manager</p>
                                              </div>
                                          </div>
                                          <!--end swiper-slide-->
                                          <div class="swiper-slide">
                                              <div class="text-center">
                                                  <div class="mb-4">
                                                      <img src="/images/logo/wordpress.svg" class="h-12 mx-auto" alt="" />
                                                  </div>
                                                  <p class="mb-4 text-lg font-thin text-gray-500 dark:text-gray-200">" Very well thought out and articulate communication.
                                                      Clear milestones, deadlines and fast work. Patience. Infinite patience. No
                                                      shortcuts. Even if the client is being careless. "</p>
                                                  <h5 class="mb-0 dark:text-gray-50">Rebecca Swartz</h5>
                                                  <p class="mb-0 text-gray-500 dark:text-gray-300">Creative Designer</p>
                                              </div>
                                          </div>
                                          <!--end swiper-slide-->
                                          <div class="swiper-slide">
                                              <div class="text-center">
                                                  <div class="mb-4">
                                                      <img src="/images/logo/instagram.svg" class="h-12 mx-auto" alt="" />
                                                  </div>
                                                  <p class="mb-4 text-lg font-thin text-gray-500 dark:text-gray-200">" Very well thought out and articulate communication.
                                                      Clear milestones, deadlines and fast work. Patience. Infinite patience. No
                                                      shortcuts. Even if the client is being careless. "</p>
                                                  <h5 class="mb-0 dark:text-gray-50">Charles Dickens</h5>
                                                  <p class="mb-0 text-gray-500 dark:text-gray-300">Store Assistant</p>
                                              </div>
                                          </div>
                                          <!--end swiper-slide-->
                                      </div>
                                      <!--end swiper-wrapper-->
                                      <div class="swiper-pagination"></div>
                                  </div>
                              </div>
                          </div>
                      </div>
            </section>
            <!-- end testimonial -->


            <!-- start client -->
            <section class="py-10 dark:bg-neutral-800">
                      <div class="container mx-auto">
                          <div class="grid grid-cols-12 gap-5">
                              <div class="col-span-12 lg:col-span-2">
                                  <img src="/images/logo/logo-01.png" alt="" class="mx-auto cursor-pointer h-9 lg:h-6 xl:h-9" data-tooltip-target="tooltip-default">
                                  <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                      Tooltip content
                                      <div class="tooltip-arrow" data-popper-arrow></div>
                                  </div>
                              </div>
                              <div class="col-span-12 lg:col-span-2">
                                  <img src="/images/logo/logo-02.png" alt="" class="mx-auto cursor-pointer h-9 lg:h-7 xl:h-9">
                              </div>
                              <div class="col-span-12 lg:col-span-2">
                                  <img src="/images/logo/logo-03.png" alt="" class="mx-auto cursor-pointer h-9 lg:h-7 xl:h-9">
                              </div>
                              <div class="col-span-12 lg:col-span-2">
                                  <img src="/images/logo/logo-04.png" alt="" class="mx-auto cursor-pointer h-9 lg:h-7 xl:h-9">
                              </div>
                              <div class="col-span-12 lg:col-span-2">
                                  <img src="/images/logo/logo-05.png" alt="" class="mx-auto cursor-pointer h-9 lg:h-7 xl:h-9">
                              </div>
                              <div class="col-span-12 lg:col-span-2">
                                  <img src="/images/logo/logo-06.png" alt="" class="mx-auto cursor-pointer h-9 lg:h-7 xl:h-9">
                              </div>
                          </div>
                      </div>
            </section>
            <!-- end client -->   
        </div>
    </div>

      <!-- start subscribe -->
      <section class="relative py-16 overflow-hidden bg-zinc-700 dark:bg-neutral-900">
          <div class="container mx-auto">
              <div class="grid items-center grid-cols-12 gap-5">
                  <div class="col-span-12 lg:col-span-7">
                      <div class="text-center lg:text-start">
                          <h4 class="text-white">Get New Jobs Notification!</h4>
                          <p class="mt-1 mb-0 text-white/50 dark:text-gray-300">Subscribe &amp; get all related jobs notification.</p>
                      </div>
                  </div>
                  <div class="z-40 col-span-12 lg:col-span-5">
                      <form class="flex" action="#">
                          <input
                              type="text" class="w-full text-gray-100 bg-transparent rounded-md border-gray-50/30 ltr:border-r-0 rtl:border-l-0 ltr:rounded-r-none rtl:rounded-l-none placeholder:text-13 placeholder:text-gray-100 dark:text-gray-100 dark:bg-white/5 dark:border-neutral-600 focus:ring-0 focus:ring-offset-0"
                              id="subscribe" placeholder="Enter your email" >
                          <button class="text-white border-transparent btn ltr:rounded-l-none rtl:rounded-r-none group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=sky]:bg-sky-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=pink]:bg-pink-500 group-data-[theme-color=blue]:bg-blue-500 focus:ring focus:ring-custom-500/30" type="button" id="subscribebtn">Subscribe</button>
                      </form>
                  </div>
              </div>
          </div>
          <div class="absolute right-0 -top-10 -z-0 opacity-20">
              <img src="/images/subscribe.png" alt="" class="img-fluid">
          </div>
      </section>
      <!-- end subscribe -->
</template>
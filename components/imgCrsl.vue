<script lang="ts" setup>
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

SwiperCore.use([Navigation]);

interface Media {
  id: number;
  file: string;
  profile_routes: string[];
  length: number;
}

interface Professional {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
}

interface ProfessionalProject {
  id: number;
  professional_id: number;
  barangay_id: null | number;
  slug: string;
  name: string;
  cost: string;
  start_date: string;
  end_date: string;
  privacy_settings: null | string;
  post_type: null | string;
  created_at: string;
  updated_at: string;
  professional: Professional;
}

interface ProjectData {
  id: number;
  professional_project_id: number;
  media_id: number;
  space_id: null | number;
  order: number;
  created_at: string;
  updated_at: string;
  professional_project: ProfessionalProject;
  master_space: null | string;
  media: Media[]; // Media array
}

const projects = ref<ProjectData[]>([]);
const projectshow = ref<ProjectData[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const route = useRoute();
const router = useRouter();
const param = route.params.param as string;
const carousel = ref(null);
const modules = [Navigation];
const slidesPerView = ref(6);
const currentSlideIndex = ref(0);

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

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/api/gallery/gallery-show');
    if (!response.ok) {
      const data = await response.json();
      console.log('Response data:', data);

      projectshow.value = data.data;
      console.log(projects.value);
      const filteredProjects = data.data.map((project: ProjectData) => {
        const filteredMedia = project.media.filter((media) => media.file.startsWith('0'));
        return { ...project, media: filteredMedia };
      });

      projectshow.value = filteredProjects;
      console.log('Filtered Projects:', projects.value);
    }
    const data = await response.json();
    projectshow.value = data.data; // Adjust this based on your API response structure
  } catch (err) {
    error.value = 'Failed to load projects.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <section>
        <div class="container-gallery mx-auto text-black">
          <div class="">
            <div v-if="error" class="error">{{ error }}</div>
            <div v-else-if="loading" class="loading">
               <div v-for="project in projectshow" :key="project.id" class="">
                  <div v-if=" project.media.length> 0" class="">
                  <div v-for="media in project.media" :key="media.id" class="relative">
                    <img :src="media.profile_routes[0]" alt="Project Media" class="photo "/>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <swiper :slidesPerView="5" :centeredSlides="false" :slidesPerGroupSkip="1" :grabCursor="true" :keyboard="{enabled: true,}"
                            :breakpoints="{'769': {slidesPerView: 5, slidesPerGroup: 5,}, '300': {slidesPerView: 1, slidesPerGroup: 1,},}"
                            :scrollbar="false" :navigation="true" :pagination="{clickable: true,}"
                            :modules="modules" class="mySwiper"
                            >
                <swiper-slide v-for="project in projectshow" :key="project.id" class="">
                  <div v-if=" project.media.length> 0" class="">
                  <div v-for="media in project.media" :key="media.id" class="relative">
                    <NuxtLink>
                    <img :src="media.profile_routes[0]" alt="Project Media" class="photo "/>
                  </NuxtLink>
                  </div>
                </div>
              </swiper-slide>
              </swiper>
           
          </div>
        </div>
        </div>
     </section>
  </div>
</template>


<style>
.photo{
  width: 300px !important;
  height: 200px !important;
  object-fit: cover;
}
</style>
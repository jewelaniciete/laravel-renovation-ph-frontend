<script lang="ts" setup>
import moment from 'moment';
interface Media {
  id: number;
  file: string;
  profile_routes: string[];
}

interface Professional {
  first_name: string;
  last_name: string;
  user_name: string;
}

interface Project {
  id: number;
  created_at: string;
  name: string;
  description: string;
  media: Media[];
  professional: Professional;
}

const PAGE_SIZE = 9;

let currentPage = ref(1);
const spanCounter = ref(0)
const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/api/gallery/gallery-show');
    if (!response.ok) {
      const data = await response.json();
      console.log('Response data:', data);

      projects.value = data.data;
      console.log(projects.value);
      const filteredProjects = data.data.map((project: Project) => {
        const filteredMedia = project.media.filter((media) => media.file.startsWith('0'));
        return { ...project, media: filteredMedia };
      });

      projects.value = filteredProjects;
      console.log('Filtered Projects:', projects.value);
    }
    const data = await response.json();
    projects.value = data.data; // Adjust this based on your API response structure
  } catch (err) {
    error.value = 'Failed to load projects.';
  } finally {
    loading.value = false;
  }
});


// const randomColSpan = () => {
//   const randomSpan = Math.floor(Math.random() * 4) + 3; // Generate a random number between 4 and 6
//   return `col-span-12 md:col-span-6 lg:col-span-${randomSpan}`;
// };

const randomColSpan = () => {
  let randomSpan = Math.floor(Math.random() * 3) + 4
  if(randomSpan + spanCounter.value > 12) 
  {
    randomSpan = 12 - spanCounter.value
    spanCounter.value = 0;
  }
  else 
  {
    spanCounter.value += randomSpan
    if(12 - spanCounter.value < 3) {
      randomSpan = randomSpan + (12 - spanCounter.value)
      spanCounter.value = 0
    }
  }
    
  // const randomSpan = ; // Generate a random number between 4 and 6
  return `col-span-6  sm:col-span-12 md:col-span-6 lg:col-span-${randomSpan}`;
};

const totalPages = Math.ceil(projects.value.length / PAGE_SIZE);

const paginateData = () => {
  const startIndex = (currentPage.value - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  projects.value = projects.value.slice(startIndex, endIndex);
};

const changePage = (page: number ) => {
  currentPage.value = page;
  paginateData();
};

onMounted(() => {
  paginateData();
});

</script>

<template>
  <div class="main-content bg-gray-400">
    <div class="page-content">
      <section class="relative py-28">
        <div class="container-gallery mx-auto">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="p-2 space-x-6 flex">
        <div v-for="project in projects" :key="project.id" class="project relative space-x-6">
          <NuxtLink :to="`/galleryView/${project.id}`" class="project-link">
          <div>
            <div v-if="project.media.length > 0" class="media relative">
              <img :src="project.media[0].profile_routes[0]" alt="Project Media" class="imgCrd p-1" />
              <div class="absolute inset-0 transition-all duration-500 rounded-md bg-black opacity-0 group-hover:opacity-40"></div>
              <div class="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h2 class="text-2xl text-white">{{ project.name }}</h2>
              </div>
            </div>
          </div>
        </NuxtLink>
        <NuxtLink :to="`/professional-profile-view/${project.professional.user_name}`">
          <p class="text-black ml-2">{{ project.professional.user_name }}</p>
        </NuxtLink>
        </div>
      </div>
    </div>
        </div>
      </section>
    </div>
  </div>
</template>

<!-- <template>
  <div class="main-content bg-gray-400">
    <div class="page-content">
      <section class="relative py-28">
    <div class="container mx-auto">
      <div class="grid grid-cols-12 gap-y-4 md:gap-y-8 gap-3 p-2 md:p-4 md:gap-8">
        <div v-for="project in projects" :key="project.id" :class="randomColSpan()" class="relative overflow-hidden rounded-md group/modern">
          <NuxtLink :to="`/galleryView/${project.id}`">
            <div v-if="project.media.length > 0" class="media relative ">
              <img :src="project.media[0].profile_routes[0]" alt="Project Media"  class=" h-[200px] md:imgCard-modern transition-all duration-500 ease-in-out scale-110 rounded-md group-hover/modern:-translate-x-2 group-hover/modern:transition-all" />
              <div class="absolute inset-0 transition-all duration-500 rounded-md bg-black opacity-0 group-hover:opacity-40 "></div>
              <div class="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
              </div>
              </div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50"></div>
          <div class="absolute bottom-3 ltr:left-3 rtl:right-3">
            <NuxtLink :to="`/galleryView/${project.id}`" ><h5 class="card-title text-white text-sm ">{{ project.name }}</h5></NuxtLink>
            <p class="mt-1 text-gray-100 text-xs "> <NuxtLink :to="`/professional-profile-view/${project.professional.user_name}`" class="font-bold  text-white-50">{{ project.professional.user_name }}</NuxtLink> -  {{ moment(project.created_at).fromNow()}}</p>
          </div>
        </NuxtLink>
        </div>
      </div>
    </div>
    <ul class="flex justify-center gap-2 mt-14">
      <li class="w-12 h-12 text-center border rounded-full cursor-default border-gray-100/50 dark:border-zinc-600 dark:border-gray-100/20" :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }" @click="currentPage > 1 && changePage(currentPage - 1)">
          <a class="cursor-auto" href="javascript:void(0)" tabindex="-1">
              <i class="mdi mdi-chevron-double-left text-16 leading-[2.8] dark:text-gray-50"></i>
          </a>
      </li>
      <li v-for="page in totalPages" :key="page" :class="{ 'text-white bg-violet-500': currentPage === page, 'text-gray-900 hover:bg-gray-100/30 focus:bg-gray-100/30 dark:text-gray-50 dark:hover:bg-gray-500/20': currentPage !== page }" class="w-12 h-12 text-center border transition-all duration-300 rounded-full cursor-pointer border-gray-100/50 dark:border-zinc-600" @click="changePage(page)">
          <a class="text-16 leading-[2.8]" href="javascript:void(0)">{{ page }}</a>
      </li>
      <li class="w-12 h-12 text-center border rounded-full cursor-default border-gray-100/50 dark:border-zinc-600 dark:border-gray-100/20" :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }" @click="currentPage < totalPages && changePage(currentPage + 1)">
          <a href="javascript:void(0)" tabindex="-1">
              <i class="mdi mdi-chevron-double-right text-16 leading-[2.8]"></i>
          </a>
      </li>
    </ul>
  </section>
  </div>
  </div>
</template> -->

<style>
.media:hover .opacity-0 {
  opacity: 1;
}
</style>

<style scoped>
.loading {
  font-size: 1.5em;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}

.project {
  margin-bottom: 2em;
}
</style>

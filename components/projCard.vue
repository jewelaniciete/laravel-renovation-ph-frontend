<script lang="ts" setup>
interface Media {
  id: number;
  file: string;
  profile_routes: string[];
}

interface Proj {
  id: number;
  name: string;
  slug: string;
  cost: number;
  start_date: number;
  end_date: number;
  project_media: Media[];
}

const projInfo = ref<Proj[]>([]);

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookie = parts.pop()?.split(';').shift();
    return cookie ? decodeURIComponent(cookie) : null;
  }
  return null;
}

onMounted(async () => {
  await fetchProjinfo();
});

async function fetchProjinfo() {
  const accessToken = getCookie('access_token');

  if (!accessToken) {
    console.error('Access token is missing');
    return;
  }

  const response = await fetch('http://localhost:8000/api/professionals/project-index', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  });

  if (response.ok) {
    const data = await response.json();
    projInfo.value = data.data;
    console.log(projInfo.value);
  } else {
    console.error(`Failed to fetch Project data:`, response.statusText);
  }
}
</script>

<template>
  
     <div class="col-span-12 lg:col-span-4 flex-col "  v-for="(proj, index) in projInfo" :key="index">
      <div>
          <div
            class="p-2 transition-all duration-500 bg-white rounded-md dark:bg-transparent shadow-md dark:shadow-none">
            <div v-for="media in proj.project_media" :key="media.id">
          <img :src="media.profile_routes[0]" v-if="media.profile_routes.length > 0" class="imgCrd p-1" />
        </div>      
         <div class="p-5">
              <ul class="flex justify-between mb-3 list-inline">
                <li>
                  <p class="mb-0 text-gray-500 dark:text-gray-300"><NuxtLink to="/professional-profile"
                      class="font-semibold text-muted">Kiera Finchr</NuxtLink> <br>Project Duration: {{ proj.start_date }} to {{ proj.end_date }}</p>
                </li>
                <li>
                  <!-- <p class="mb-0 text-gray-500 dark:text-gray-300"><i class="mdi mdi-eye"></i> 247</p> -->
                </li>
              </ul>
              <a href="blog-details.html" class="primary-link">
                <h6
                  class="text-gray-900 transition-all duration-300 text-17 dark:text-white group-data-[theme-color=violet]:hover:text-violet-500 group-data-[theme-color=sky]:hover:text-sky-500 group-data-[theme-color=red]:hover:text-red-500 group-data-[theme-color=green]:hover:text-green-500 group-data-[theme-color=pink]:hover:text-pink-500 group-data-[theme-color=blue]:hover:text-blue-500">
                  {{ proj.name }}</h6>
              </a>
              <p class="mt-2 text-gray-500 dark:text-gray-300">This Project Cost {{ proj.cost }}</p>
              <div
                class="mt-4 font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                <NuxtLink :to="`/projectView/${proj.slug}`" class="form-text ">Read More <i class="uil uil-angle-right-b"></i></NuxtLink>
              </div>
            </div>
            </div>
          </div>
        </div>
</template>

<style>
/* Add your styles here */
</style>

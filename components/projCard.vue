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
  media: Media[];
}

interface ClientName {
  first_name: string;
  last_name: string;
}

const projInfo = ref<Proj[]>([]);
const client = ref<ClientName>({
  first_name: '',
  last_name: '',
});

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookie = parts.pop()?.split(';').shift();
    return cookie ? decodeURIComponent(cookie) : null;
  }
  return null;
}

const showCard = ref(false);


onMounted(async () => {
  await fetchProjinfo();
  await clientView();
  showCard.value = true;

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
    console.log('Response data:', data);

    projInfo.value = data.data;
    console.log(projInfo.value);
    const filteredProjects = data.data.map((project: Proj) => {
        const filteredMedia = project.media.filter((media) => media.file.startsWith('0'));
        return { ...project, media: filteredMedia };
      });

      projInfo.value = filteredProjects;
      console.log('Filtered Projects:', projInfo.value);
  } else {
    console.error(`Failed to fetch Project data:`, response.statusText);
  }
}

async function clientView() {
  const accessToken = getCookie('access_token');
  if (!accessToken) {
    console.log('Access token is missing');
    return;
  }
  const response = await fetch(`http://localhost:8000/api/professionals/view`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  });

  if (response.ok) {
    const data = await response.json();
    client.value = data.data;
    console.log(client.value);
  } else {
    console.error('Failed to fetch client data:', response.statusText);
  }
}
</script>

<template>

  <div class="col-span-12 lg:col-span-4 flex-col " v-for="(proj, index) in projInfo" :key="index">
              <NuxtLink :to="`/projectView/${proj.id}`" class="form-text ">

    <div v-if="showCard">
      <div class="p-2 transition-all duration-500 bg-white  rounded-md dark:bg-transparent shadow-xl dark:shadow-none">
        <div v-for="media in proj.media" :key="media.id">
          <img :src="proj.media[0].profile_routes[0]" alt="Project Media " class="imgCrd p-1 img" />
        </div>
        <div class="p-5">
          <ul class="flex justify-between mb-3 list-inline">
            <li>
              <p class="mb-0 text-gray-500 dark:text-gray-300">
                <NuxtLink to="/professional-profile" class="font-semibold text-muted">{{ client.first_name }} {{
                  client.last_name }}</NuxtLink>
              </p>
            </li>
          </ul>
          <NuxtLink :to="`/projectView/${proj.id}`" class="form-text ">
            <h6
              class="text-gray-900 transition-all duration-300 text-17 dark:text-white group-data-[theme-color=violet]:hover:text-violet-500 group-data-[theme-color=sky]:hover:text-sky-500 group-data-[theme-color=red]:hover:text-red-500 group-data-[theme-color=green]:hover:text-green-500 group-data-[theme-color=pink]:hover:text-pink-500 group-data-[theme-color=blue]:hover:text-blue-500">
              {{ proj.name }}</h6>
          </NuxtLink>
          <div
            class="mt-4 font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
            <NuxtLink :to="`/projectView/${proj.id}`" class="form-text ">Read More <i
                class="uil uil-angle-right-b"></i></NuxtLink>
          </div>
        </div>
      </div>
    </div>
  
    <div v-else>
      <div class="p-2 transition-all duration-500 bg-white rounded-md dark:bg-transparent shadow-xl dark:shadow-none">
        <div>

          <div class="imgCrd p-1 bg-gray-500" />
        </div>
        <div class="p-5">
          <ul class="flex justify-between mb-3 list-inline">
            <li>
              <p class="mb-0 text-gray-500 dark:text-gray-300">
                <NuxtLink to="/professional-profile" class="font-semibold text-muted">Loading...</NuxtLink>
              </p>
            </li>
          </ul>
          <NuxtLink :to="`/projectView/${proj.id}`" class="form-text ">
            <h6
              class="text-gray-900 transition-all duration-300 text-17 dark:text-white group-data-[theme-color=violet]:hover:text-violet-500 group-data-[theme-color=sky]:hover:text-sky-500 group-data-[theme-color=red]:hover:text-red-500 group-data-[theme-color=green]:hover:text-green-500 group-data-[theme-color=pink]:hover:text-pink-500 group-data-[theme-color=blue]:hover:text-blue-500">
             Loading..</h6>
          </NuxtLink>
          <div
            class="mt-4 font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
            <NuxtLink :to="`/projectView/${proj.id}`" class="form-text ">Read More <i
                class="uil uil-angle-right-b"></i></NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
  </div>


</template>

<style>
/* Add your styles here */
</style>

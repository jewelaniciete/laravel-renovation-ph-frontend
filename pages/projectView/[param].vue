<script lang="ts" setup>
interface ProjectMedia {
  id: number;
    file: string;
  profile_routes: string;
}

interface ProjectData {
  name: string;
  id: number;
  start_date: string;
  end_date: string;
  slug: string;
  cost: number;
  media: ProjectMedia[];
}

interface Project {
  data: ProjectData;
}

interface Proj {
  id: number;
  name: string;
  slug: string;
}

const projInfo = ref<Proj[]>([]);
const project = ref<Project | null>(null);
const error = ref<Error | null>(null);
const route = useRoute();
const param = route.params.param as string;

onMounted(() => {
  fetchProjinfo();
  fetchProject(param);
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


const fetchProject = async (param: string) => {
  const accessToken = getCookie('access_token');

  if (!accessToken) {
    console.error('Access token is missing');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8000/api/professionals/project/${param}/view`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    project.value = data as Project;
  } catch (err) {
    error.value = err as Error;
  }
}

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
  <div class="main-content bg-gray-400">
    <div class="page-content">
      <section class="relative py-20">
        <div class="container mx-auto">
          <div class="grid grid-cols-2">
            <div class="w-70 mx-auto bg-white p-6 text-gray-400 space-y-3">
              <p class="text-4xl font-semibold">Project Details</p>
              <div v-if="error">
                <p>Error: {{ error.message }}</p>
              </div>
              <div v-else-if="project" class="space-y-3 text-black">
                <p class="text-xl">{{ project.data.name }}</p>
                <p class="text-base">Project Duration: {{ project.data.start_date }} - {{ project.data.end_date }}</p>
                <p class="text-base">Project Cost: {{ project.data.cost }}</p>
                <div v-if="project.data.media" class="space-y-3">
                  <NuxtLink :to="`/editProject/${project.data.id}`"  class="bg-gray-btn border p-2 rounded-md hover:bg-gray-500 hover:text-white">Edit Project</NuxtLink>
                  <h3>Project Media</h3>
                  <div class="flex">
                  <div v-for="media in project.data.media" :key="media.id">
                    <img :src="media.profile_routes" class="pv p-1" />
                  </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <p>Loading...</p>
              </div>
            </div>

            <div class="w-30 h-auto mx-auto sticky bg-white p-6 text-black">
              <p class="text-2xl font-semibold pb-2">Other Projects</p>
              <div class="flex gap-6">
                <ul class="text-sm space-y-2">
                  <li class="list-item"><NuxtLink to="/professional-profile"> All Projects </NuxtLink></li>
                  <li v-for="(proj, index) in projInfo" :key="index" class="list-item">
                    <NuxtLink :to="`/projectView/${proj.id}`" class="form-text" aria-current="page">{{ proj.name }}</NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

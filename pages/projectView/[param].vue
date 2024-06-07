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
  professional_project_id: number;
  professional_project: ProfessionalProject;
  name: string;
  slug: string;
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
    console.log('Response data:', data);

    const uniqueProjects: { [key: number]: Proj } = {};

    data.data.forEach((project: Proj) => {
      if (!uniqueProjects[project.professional_project_id]) {
        uniqueProjects[project.professional_project_id] = { ...project };
      }
    });

    projInfo.value = Object.values(uniqueProjects).map(proj => ({
      ...proj,
      
    }));
    console.log('Filtered Projects:', projInfo.value);
  } else {
    console.error(`Failed to fetch Project data:`, response.statusText);
  }
}
</script>

<template>
  <div class="bg-gray-400 main-content">
    <div class="page-content">
      <section class="relative py-28">
        <div class="container mx-auto">
          <div class="flex flex-col gap-2 lg:gap-0 lg:flex-row">
            <div class="w-full p-6 mx-auto space-y-3 text-gray-400 bg-white lg:w-70">
              <div><button @click="$router.back()" class="font-semibold text-gray-400">← Back</button></div>
              <p class="text-xl font-semibold">Project Details</p>
              <div v-if="error">
                <p>Error: {{ error.message }}</p>
              </div>
              <div v-else-if="project" class="space-y-3 text-black">
                <div class="space-y-2">
                  <p class="text-2xl font-bold">{{ project.data.name }}</p>
                  <p class="px-2 text-base">Project Duration: <span class="font-semibold">{{ project.data.start_date }} - {{ project.data.end_date }}</span></p>
                  <p class="px-2 text-base">Project Cost: <span class="font-semibold">{{ project.data.cost }}</span></p>  
                </div>
                
                <div v-if="project.data.media" class="py-5 space-y-3">
                  <div class="flex flex-row w-full gap-3">
                    <diV class="">
                      <h3>Project Media</h3>
                    </diV>
                    <div class="flex">
                      <NuxtLink :to="`/editProject/${project.data.id}`" class="flex items-center justify-center gap-2 p-1 border rounded-md bg-gray-btn hover:bg-gray-500 hover:text-white">
                        <img src="assets/images/logo/editt.svg" class="w-5 h-5" alt="Edit Project" />
                        <p class="text-sm">Edit Project</p>
                      </NuxtLink>
                    </div>
                  </div>
                  
                  <div class="flex flex-col items-center justify-center lg:flex-row">
                  <div v-for="media in project.data.media" :key="media.id">
                    <img :src="media.profile_routes" class="p-1 pv" />
                  </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <p>Loading...</p>
              </div>
            </div>

            <div class="sticky h-auto p-6 mx-auto text-black bg-white w-30">
              <p class="pb-2 text-2xl font-semibold">Other Projects</p>
              <div class="flex gap-6">
                <ul class="space-y-2 text-sm">
                  <li class="list-item"><NuxtLink to="/professional-profile"> All Projects </NuxtLink></li>
                  <li v-for="(proj, index) in projInfo" :key="index" class="list-item">
                    <NuxtLink :to="`/projectView/${proj.professional_project.id}`" class="form-text" aria-current="page">{{ proj.professional_project.name }}</NuxtLink>
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

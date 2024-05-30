<script lang="ts" setup>
interface ProjectMedia {
  id: number;
  profile_routes: string;
}

interface ProjectData {
  name: string;
  start_date: string;
  end_date: string;
  cost: number;
  project_media: ProjectMedia[];
}

interface Project {
  data: ProjectData;
}

interface Proj {

  name: string;
  slug: string;
}

const projInfo = ref<Proj[]>([]);
const project = ref<Project | null>(null)
const error = ref<Error | null>(null)

const route = useRoute()
const param = route.params.param as string

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookie = parts.pop()?.split(';').shift();
    return cookie ? decodeURIComponent(cookie) : null;
  }
  return null;
}

const adjustMediaUrls = (mediaArray: ProjectMedia[]) => {
  return mediaArray.map(media => {
    return {
      ...media,
      profile_routes: `http://localhost:8000/storage/uploads/projects/${media.profile_routes}`
    }
  });
};

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
    data.data.project_media = adjustMediaUrls(data.data.project_media);
    project.value = data as Project;
  } catch (err) {
    error.value = err as Error;
  }
}

onMounted(() => {
  fetchProject(param)
})

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
            <div class=" w-70 mx-auto bg-white p-6 text-gray-400">
              <h1>Project Details</h1>
              <div v-if="error">
                <p>Error: {{ error.message }}</p>
              </div>
              <div v-else-if="project">
                <h2>{{ project.data.name }}</h2>
                <p>Project Duration: {{ project.data.start_date }} - {{ project.data.end_date }}</p>
                <p>Project Cost: {{ project.data.cost }}</p>
                <div v-if="project.data.project_media">
                  <h3>Project Media</h3>
                  <div v-for="media in project.data.project_media" :key="media.id">
                    <img :src="media.profile_routes" v-if="media.profile_routes" class="imgCrd p-1" />
                  </div>
                </div>
              </div>
              <div v-else>
                <p>Loading...</p>
              </div>
            </div>

            
            <div class="w-30 h-60 mx-auto bg-white p-6 text-black">

<p class="text-2xl font-semibold">Other Projects</p>
<div class="flex gap-6">
  <ul class="text-xs"  v-for="(proj, index) in projInfo" :key="index">
    <NuxtLink  :to="`/projectView/${proj.slug}`" class="form-text ">
    <li>{{ proj.name }}</li>
    </NuxtLink>
  </ul>
</div>

</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

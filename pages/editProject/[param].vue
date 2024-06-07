<script lang="ts" setup>
interface ProjectMedia {
  id: number;
    file: string;
  profile_routes: string;
  mediable_id: number;

}

interface ProjectData {
  name: string;
  id: number;
  start_date: string;
  end_date: string;
  slug: string;
  privacy_settings: string;
  cost: string;
  media: ProjectMedia[];
}


const project = ref<ProjectData | null>(null);
const error = ref<Error | null>(null);
const route = useRoute();
const router = useRouter();
const param = route.params.param as string;
const formData = ref({
  name: '',
  start_date: '',
  end_date: '',
  cost: '',
  privacy_settings: '',
})

onMounted(() => {
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
    project.value = data.data as ProjectData;
    formData.value = {...formData.value, ...project.value};
  } catch (err) {
    error.value = err as Error;
  }
}

async function updateProject() {
  const accessToken = getCookie('access_token');
  if (!accessToken) {
    console.error('No access token found');
    return;
  }

  try {
    const route = useRoute();
    const param = route.params.param as string;
    const response = await fetch(`http://localhost:8000/api/professionals/project/${param}/update`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(formData.value)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    project.value = data.data;
    formData.value = {...formData.value, ...project.value};


    setTimeout(() => {
      window.history.go(-1);
    }, 1000);
  } catch (error) {
    console.error('Error updating project media:', error);
  }
}
</script>

<template>
  <div class="main-content bg-gray-400">
    <div class="page-content">
      <section class="relative py-20">
        <div class="container mx-auto">
          <div class="">
            <div class="mx-auto bg-white p-6 text-gray-400 space-y-3">

              <div v-if="error">
                <p>Error: {{ error.message }}</p>
              </div>
            
              <div v-else-if="project" class="p-10 space-y-3">
                <form @submit.prevent="updateProject">
                  <div class="flex flex-col ">
                    <label class="pr-3 text-black text-lg font-semibold">Project Title:</label>
                    <input v-model="formData.name" class="text-black placeholder:text-gray-400 bg-white border p-2 rounded-md w-70" :placeholder="project.name">
                    
                    <label class="pr-3 text-black text-lg font-semibold">Project Duration</label>
                    <div class="w-1/2 space-x-2">
                      <label class="pr-3 text-black text-lg font-semibold">Start Date:</label>
                    <input v-model="formData.start_date" class="w-1/2 text-black placeholder:text-gray-400 bg-white border p-2 rounded-md" :placeholder="project.start_date" type="date">
                   
                    <label class="pr-3 text-black text-lg font-semibold" >End Date:</label>
                    <input v-model="formData.end_date" class="w-1/2 text-black placeholder:text-gray-400 bg-white border p-2 rounded-md" :placeholder="project.end_date" type="date">
                  </div>
                   
                  <div class="flexs space-y-3 space-x-4">
                    <label class="pr-3 text-black text-lg font-semibold" >Project Cost:</label>
                    <input v-model="formData.cost" class="text-black placeholder:text-gray-400 bg-white border p-2 rounded-md w-40" :placeholder="project.cost" type="number">   
                   
                    <label class="pr-3 text-black text-lg font-semibold" >Privacy:</label>
                    <input v-model="formData.privacy_settings" class="text-black placeholder:text-gray-400 bg-white border p-2 rounded-md w-40" :placeholder="project.privacy_settings" type="number">   
                  </div>
                 
                  </div>
                  <div v-if="project.media" class="space-y-3 mt-2">
                    <h3>Project Media <span class="text-xs">(Click photo to edit)</span></h3>
                    
                    <div class="flex">
                      <div v-for="media in project.media" :key="media.id">
                        <NuxtLink :to="`/mediaUpdate/${media.id}`">
                          <img :src="media.profile_routes" class="pv p-1" />
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                  <div class="space-x-4">
                  <button type="submit" class="bg-gray-400 px-3 py-2 rounded-md text-black font-semibold">Save</button>
                </div>
                </form>
                <button @click="$router.back()" class="text-gray-400 font-semibold">Back</button>

              

              </div>
              
              <div v-else>
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

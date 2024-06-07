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
  description: string;
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
  description: '',
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
  <div class="bg-gray-400 main-content">
    <div class="page-content">
      <section class="relative py-28">
        <div class="container mx-auto">
          <div class="flex flex-col gap-5 lg:flex-row">
            <div class="order-2 w-full p-6 mx-auto bg-white lg:order-1">
              <div v-if="error">
              <p>Error: {{ error.message }}</p>
            </div>
          
            <div v-else-if="project" class="p-10 space-y-3">
              <button @click="$router.back()" class="font-semibold text-gray-400">← Back</button>
              <h3>Project Details</h3>
              <form @submit.prevent="updateProject">
                <div class="flex flex-col">
                  <div class="w-full">
                    <label class="text-sm font-semibold text-black">Project Title:</label>
                    <input v-model="formData.name" class="w-full p-1 text-black bg-white border rounded-md placeholder:text-gray-400" :placeholder="project.name">
                  </div>

                  <div class="w-full mt-3">
                    <label class="text-sm font-semibold text-black">Project Description:</label>
                    <textarea v-model="formData.description" class="w-full p-1 text-black bg-white border rounded-md placeholder:text-gray-400" :placeholder="project.description" />   
                  </div>
                  
                  <div class="w-full mt-3">
                    <label class="text-sm font-semibold text-black ">Start Date:</label>
                    <input v-model="formData.start_date" class="w-full p-1 text-black bg-white border rounded-md placeholder:text-gray-400" :placeholder="project.start_date" type="date">
                  </div>
                  <div class="w-full mt-3">
                    <label class="mt-1 text-sm font-semibold text-black" >End Date:</label>
                    <input v-model="formData.end_date" class="w-full p-1 text-black bg-white border rounded-md placeholder:text-gray-400" :placeholder="project.end_date" type="date">
                  </div>
                 
                  <div class="w-full mt-3">
                    <label class="text-sm font-semibold text-black" >Project Cost:</label>
                    <input v-model="formData.cost" class="w-full p-2 text-black bg-white border rounded-md placeholder:text-gray-400" :placeholder="project.cost" type="number">   
                  
                    <!-- <label class="pr-3 text-lg font-semibold text-black" >Privacy:</label>
                    <input v-model="formData.privacy_settings" class="w-40 p-2 text-black bg-white border rounded-md placeholder:text-gray-400" :placeholder="project.privacy_settings" type="number">    -->
                  </div>
                
                  <div class="flex flex-row-reverse mt-6 space-x-4">
                    <button type="submit" class="px-3 py-2 font-semibold text-black bg-gray-400 rounded-md">Save</button>
                  </div>
                </div>
                <div v-if="project.media" class="mt-6 space-y-3">
                  <h3>Project Media <span class="text-sm">(Click photo to edit)</span></h3>
                  
                  <div class="flex">
                    <div v-for="media in project.media" :key="media.id">
                      <NuxtLink :to="`/mediaUpdate/${media.id}`">
                        <img :src="media.profile_routes" class="p-1 pv" />
                      </NuxtLink>
                    </div>
                  </div>
                </div>
                
              </form>
              

            </div>
            
            <div v-else>
              <p>Loading...</p>
            </div>
             
            </div>

            <div class="order-1 w-full p-6 text-black bg-white lg:order-2 lg:w-custom h-60">
              <p class="text-2xl font-semibold">Photo Guidelines</p>
              <p>Photos that do not meet these guidelines will be removed.</p>

              <label class="text-green-500">Do's</label>
              <div class="flex gap-6">
                <img src="/assets/images/renovation/dos.svg" />

                <ul class="text-xs list-disc">
                  <li>Photos of residential spaces</li>
                  <li>Large Photos (1000 pixels wide or more)</li>
                  <li>SGV, PNG or JPG is accepted</li>
                  <li>Good Quality Photos</li>
                  <li>Max 100MB</li>
                </ul>
              </div>
              <label class="text-red-500">Don'ts</label>
              <div class="flex gap-6">
                <img src="/assets/images/renovation/donts.svg" />
                <ul class="text-xs list-disc">
                  <li>Photos of commercial or office spaces Small Photos PDF</li>
                  <li>Multi-Page TIFF or EPS file formats</li>
                  <li>Low Quality Photos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

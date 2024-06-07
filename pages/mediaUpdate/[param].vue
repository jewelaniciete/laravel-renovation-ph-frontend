<script lang="ts" setup>

interface Media {
  id: number;
  file: string;
  profile_routes: string[];
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

interface Project {
  id: number;
  professional_project_id: number;
  media_id: number;
  space_id: string;
  style_id: string;
  province_id: null | number;
  city_id: null | number;
  title: string;
  description: string;
  order: number;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
  media: Media;
  professional_project: ProfessionalProject;
}

interface Space {
  id: string;
  name: string;
}

interface Style {
  id: string;
  name: string;
}

const formData = ref({
  title: '',
  description: '',
  style_id: '',
  space_id: '',
});

const projects = ref<Project[]>([]);
const spaces = ref<Space[]>([]);
const styles = ref<Style[]>([]);
const router = useRouter();


function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookie = parts.pop()?.split(';').shift();
    return cookie ? decodeURIComponent(cookie) : null;
  }
  return null;
}

async function fetchSpaces() {
  try {
    const response = await fetch('http://localhost:8000/api/master/space/sub-category-show');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    spaces.value = data.data;
  } catch (error) {
    console.error('Error fetching spaces:', error);
  }
}

async function fetchStyles() {
  try {
    const response = await fetch('http://localhost:8000/api/master/project-style-show');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    styles.value = data.data;
  } catch (error) {
    console.error('Error fetching styles:', error);
  }
}

onMounted(async () => {
  await fetchSpaces();
  await fetchStyles();

  const accessToken = getCookie('access_token');
  if (!accessToken) {
    console.error('No access token found');
    return;
  }

  try {
    const route = useRoute();
    const param = route.params.param as string;
    const response = await fetch(`http://localhost:8000/api/professionals/project-media/${param}/view`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    projects.value = data.data;
  } catch (error) {
    console.error('Error fetching project media:', error);
  }
});

async function updateMedia() {
  const accessToken = getCookie('access_token');
  if (!accessToken) {
    console.error('No access token found');
    return;
  }

  try {
    const route = useRoute();
    const param = route.params.param as string;
    const response = await fetch(`http://localhost:8000/api/professionals/project-media/${param}/update`, {
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
    projects.value = data.data;
    formData.value = {...formData.value};

    setTimeout(() => {
      window.history.go(-1);
    }, 1000);
  } catch (error) {
    console.error('Error updating project media:', error);
  }
}
</script>

<template>
  <div class="bg-gray-300 main-content">
    <div class="page-content">
      <section class="relative py-28">
        <div class="container mx-auto">
          <div v-if="projects.length">
            <h3>Edit Project Image</h3>
            <div v-for="project in projects" :key="project.id" class="flex flex-col w-full gap-10 py-2 lg:flex-row">
              
              <div v-for="mediaUrl in project.media.profile_routes" :key="mediaUrl" class="flex items-center justify-center w-full max-h-full p-4 bg-gray-400">
                <img :src="mediaUrl" alt="Project Media" class="object-contain w-30"/>
              </div>
              <div class="flex flex-col w-full p-4 bg-white">
                <form @submit.prevent="updateMedia">
                  <div class="w-full">
                    <label class="text-sm font-semibold text-black">Title:</label>
                    <input v-model="formData.title" :placeholder="project.title" class="w-full p-1 text-black bg-white border rounded-md placeholder:text-gray-400" />
                  </div>
                  
                  <div class="w-full mt-4">
                    <label class="text-sm font-semibold text-black">Description:</label>
                    <textarea  v-model="formData.description" :placeholder="project.description" class="w-full p-2 text-black bg-white border rounded-md placeholder:text-gray-400" />
                  </div>

                  <div class="w-full mt-4">
                    <label class="text-sm font-semibold text-black">Space:</label>
                    <select v-model="formData.space_id" class="w-full p-1 text-black bg-white border rounded-md placeholder:text-gray-400">
                      <option v-for="space in spaces" :key="space.id" :value="space.id">{{ space.name }}</option>
                    </select>
                  </div>
                  
                  <div class="w-full mt-4 ">
                    <label class="text-sm font-semibold text-black">Style:</label>
                    <select v-model="formData.style_id" :placeholder="project.style_id" class="w-full p-1 text-black bg-white border rounded-md placeholder:text-gray-400">
                      <option v-for="style in styles" :key="style.id" :value="style.id">{{ style.name }}</option>
                    </select>
                  </div>

                  <div class="flex flex-row-reverse mt-6 space-x-4">
                    <button type="submit" class="px-3 py-2 font-semibold text-black bg-gray-400 rounded">Submit</button>
                  </div>
                  
                </form>
                <div class="space-x-4 ">
                    <button @click="$router.back()" class="font-semibold text-gray-400">← Cancel</button>
                </div>
                
              </div>
            </div>
          </div>
          <div v-else>
            <div class="h-full">
                Loading...
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

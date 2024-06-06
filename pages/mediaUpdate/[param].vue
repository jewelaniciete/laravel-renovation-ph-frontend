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

    setTimeout(() => {
      window.history.go(-1);
    }, 1000);
  } catch (error) {
    console.error('Error updating project media:', error);
  }
}
</script>

<template>
  <div class="main-content bg-gray-300">
    <div class="page-content">
      <section class="relative py-20">
        <div class="container mx-auto">
          <div v-if="projects.length">
            <div v-for="project in projects" :key="project.id" class="gap-10">
              <div v-for="mediaUrl in project.media.profile_routes" :key="mediaUrl" class="w-auto bg-gray-400 p-4">
                <img :src="mediaUrl" alt="Project Media" />
              </div>
              <div class="w-auto bg-white p-4">
                <p class="text-2xl font-bold text-black">{{ project.id }}</p>
                <form @submit.prevent="updateMedia">
                  <label class="text-black font-semibold text-2xl">Title:</label>
                  <input v-model="formData.title" :placeholder="project.title" class="ml-4 text-black placeholder:text-gray-400 bg-white border p-2 rounded-md" />

                  <label class="text-black font-semibold text-2xl">Description:</label>
                  <input v-model="formData.description" :placeholder="project.description" class="ml-4 text-black placeholder:text-gray-400 bg-white border p-2 rounded-md" />

                  <label class="text-black font-semibold text-2xl">Space ID:</label>
                  <select v-model="formData.space_id" class="ml-4 text-black placeholder:text-gray-400 bg-white border p-2 rounded-md">
                    <option v-for="space in spaces" :key="space.id" :value="space.id">{{ space.name }}</option>
                  </select>

                  <label class="text-black font-semibold text-2xl">Style ID:</label>
                  <select v-model="formData.style_id" :placeholder="project.style_id" class="ml-4 text-black placeholder:text-gray-400 bg-white border p-2 rounded-md">
                    <option v-for="style in styles" :key="style.id" :value="style.id">{{ style.name }}</option>
                  </select>
                    

                  <div class="space-x-4 mt-10">
                    <button type="submit" class="text-black font-semibold bg-gray-400 px-3 py-2 rounded">Submit</button>
                  </div>
                
                </form>
                <div class="space-x-4 ">
                    <button @click="$router.back()" class="text-white font-semibold bg-red-500 px-3 py-2 rounded">Cancel</button>

                  </div>
                
              </div>
            </div>
          </div>
          <div v-else>
            Loading...
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

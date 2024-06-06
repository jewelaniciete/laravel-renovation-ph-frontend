<script lang="ts" setup>

interface Media {
  id: number;
  file: string;
  profile_routes: string[];
  length: number;
}

interface Professional {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
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
  professional: Professional;
}

interface ProjectData {
  id: number;
  professional_project_id: number;
  media_id: number;
  space_id: null | number;
  order: number;
  created_at: string;
  updated_at: string;
  professional_project: ProfessionalProject;
  master_space: null | string;
  media: Media[]; // Media array
}

const projects = ref<ProjectData[]>([]);
const projectshow = ref<ProjectData[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const route = useRoute();
const router = useRouter();
const param = route.params.param as string;

onMounted(() => {
  fetchGallery(param);
});


onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/api/gallery/gallery-show');
    if (!response.ok) {
      const data = await response.json();
      console.log('Response data:', data);

      projectshow.value = data.data;
      console.log(projects.value);
      const filteredProjects = data.data.map((project: ProjectData) => {
        const filteredMedia = project.media.filter((media) => media.file.startsWith('0'));
        return { ...project, media: filteredMedia };
      });

      projectshow.value = filteredProjects;
      console.log('Filtered Projects:', projects.value);
    }
    const data = await response.json();
    projectshow.value = data.data; // Adjust this based on your API response structure
  } catch (err) {
    error.value = 'Failed to load projects.';
  } finally {
    loading.value = false;
  }
});

const fetchGallery = async (param: string) => {
  try {
    const response = await fetch(`http://localhost:8000/api/gallery/gallery/${param}/show`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    projects.value = data.data.map((project: ProjectData) => {
      // Ensure media is an array
      const mediaArray = Array.isArray(project.media) ? project.media : [project.media];
      const filteredMedia = mediaArray.filter(media => media.file.startsWith('0'));
      return { ...project, media: filteredMedia };
    });
  } catch (err) {
    console.error('Fetch error:', err);
    error.value = 'Failed to load projects.';
  } finally {
    loading.value = false;
  }
};


</script>

<template>
  <div class="main-content bg-white">
    <div class="page-content">
      <section class="py-28">
        <div class="container-gallery mx-auto text-black">
          <div><button @click="$router.back()" class="text-gray-400 font-semibold">Back</button></div>
          <div class="">
            <div v-if="error" class="error">{{ error }}</div>
            <div v-else-if="loading" class="loading">
              <div class="p-2 space-x-6">
                <div class="project flex flex-col gap-5 lg:flex-row">
                  <div class="image-container">
                    <img src="assets/images/renovation/dafault-img.jpg" alt="Project Media"
                      class="bg-gray-500 fakeloading left" />
                  </div>
                  <div class="p-2 bg-white right">
                    <div class="text-black text-lg font-semibold pb-1">
                      <p>Loading...</p>
                    </div>
                    <div class="text-black text-sm pb-1">
                      Loading...
                    </div>
                    <div class="text-black text-xl font-bold pb-2 hover:text-green-500">
                      <p>Loading...</p>
                    </div>
                    <div>
                      <div
                        class="animate-spin inline-block w-8 h-8 border-[3px] border-l-transparent border-green-500 rounded-full">
                        <span class="hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="p-2 space-x-6">
                <div v-for="project in projects" :key="project.id" class="project flex flex-col gap-5 lg:flex-row">
                  <div v-if="project.media.length > 0" class="image-container">
                    <div v-for="media in project.media" :key="media.id">
                      <img :src="media.profile_routes[0]" alt="Project Media" />
                    </div>
                  </div>
                  <div class="p-2 bg-white right">
                    <NuxtLink to="/professional-profile-view">
                      <div class="text-black text-lg font-semibold pb-1">
                        <p>{{ project.professional_project.professional.user_name }}</p>
                      </div>
                    </NuxtLink>
                    <div class="text-black text-sm pb-1">
                      {{ project.professional_project.professional.first_name }} {{
                        project.professional_project.professional.last_name }}
                    </div>
                    <NuxtLink :to="`/projectView/${project.professional_project.id}`" class="project-link">
                      <div class="text-black text-xl font-bold pb-2 hover:text-green-500">
                        <p>{{ project.professional_project.name }}</p>
                      </div>
                    </NuxtLink>
                    <div class="text-left">
                      <p>
                        If ever we need to add a description, you can do it here in this paragraph.
                        If ever we need to add a description, you can do it here in this paragraph.
                        If ever we need to add a description, you can do it here in this paragraph.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <img-crsl /> -->
      </section>
     
    </div>
  </div>
</template>

<style scoped>
.fakeloading {
  width: auto;
  height: 650px;
  object-fit: contain;
}

.image-container {
  width: 100%;
  height: auto;
  overflow: hidden;
  background-color: lightgray;

  padding-left: 16rem;
  padding-right: 16rem;
}

.image-container img {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: contain !important;
  object-position: center !important;

}

.right {
  width: 35% !important;
  display: relative;
  padding: 4px;
}


</style>


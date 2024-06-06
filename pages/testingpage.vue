<script lang="ts" setup>

interface Media {
  id: number;
  file: string;
  profile_routes: string[];
}

interface Professional {
  first_name: string;
  last_name: string;
  user_name: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  media: Media[];
  professional: Professional;
}

const projects = ref<Project[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8000/api/gallery/gallery-show');
    if (!response.ok) {
      const data = await response.json();
      console.log('Response data:', data);

      projects.value = data.data;
      console.log(projects.value);
      const filteredProjects = data.data.map((project: Project) => {
        const filteredMedia = project.media.filter((media) => media.file.startsWith('0'));
        return { ...project, media: filteredMedia };
      });

      projects.value = filteredProjects;
      console.log('Filtered Projects:', projects.value);
    }
    const data = await response.json();
    projects.value = data.data; // Adjust this based on your API response structure
  } catch (err) {
    error.value = 'Failed to load projects.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="py-28">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="p-2 space-x-6 flex">
        <div v-for="project in projects" :key="project.id" class="project relative">
          <div>
            <div v-if="project.media.length > 0" class="media relative">
              <img :src="project.media[0].profile_routes[0]" alt="Project Media" class="imgCrd p-1" />
              <div class="absolute inset-0 transition-all duration-500 rounded-md bg-black opacity-0 group-hover:opacity-40"></div>
              <div class="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h2 class="text-2xl text-white">{{ project.name }}</h2>
              </div>
            </div>
          </div>
          <p class="text-black ml-2">{{ project.professional.user_name }}</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style>
.media:hover .opacity-0 {
  opacity: 1;
}
</style>

<style scoped>
.loading {
  font-size: 1.5em;
  text-align: center;
}

.error {
  color: red;
  text-align: center;
}

.project {
  margin-bottom: 2em;
}
</style>

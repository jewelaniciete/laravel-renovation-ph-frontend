<script setup>
import { ref, onMounted } from 'vue';

const project = ref({});

const fetchProject = async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/professionals/project/${$route.params.param}/view`);
    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }
    const data = await response.json();
    project.value = data;
  } catch (error) {
    console.error('Error fetching project:', error);
    project.value = null;
  }
};

onMounted(fetchProject);
</script>

<template>
  <div>
    <h1>{{ project.title || 'Loading...' }}</h1>
    <div v-if="project.project_media && project.project_media.length > 0">
      <h2>Project Media:</h2>
      <div v-for="(media, index) in project.project_media" :key="index">
        <img :src="media.profile_routes[0]" :alt="'Project Media ' + (index + 1)" />
        <!-- Assuming that profile_routes[0] contains the URL of the media -->
      </div>
    </div>
    <div v-else>
      <p v-if="project">No media available for this project.</p>
      <p v-else>Loading...</p>
    </div>
  </div>
</template>

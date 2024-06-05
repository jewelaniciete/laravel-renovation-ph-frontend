<script lang="ts" setup>

interface Proj {
  id: number;
  professional_project_id: number;
  professional_project: ProfessionalProject;
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

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookie = parts.pop()?.split(';').shift();
    return cookie ? decodeURIComponent(cookie) : null;
  }
  return null;
}

onMounted(async () => {
  await fetchProjinfo();
});

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
      'Authorization': `Bearer ${accessToken}`,
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
   <div>
    <p class="lg:justify-end">{{ projInfo.length }} Projects</p>
  </div>
</template>

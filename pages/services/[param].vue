<script lang="ts" setup>


interface Project {
  id: number;
  name: string;
  description: string;
  cost: string;
}

interface Professional {
  user_name: string;
  projects: Project[];
  first_name: string;
  last_name: string;
  contact_number: string;
  address: string;
}


interface Service {
  id: number;
  professionals: Professional;
  master_service: masterService;
  profile_route: string;
}

interface masterService {
  name: string;
  description: string;
}

const route = useRoute();
const param = route.params.param as string;
const loading = ref(true);
const error = ref<string | null>(null);
const services = ref<Service[]>([]);

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:8000/api/discover/professional/services/${param}`);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    services.value = data.data;
  } catch (err) {
    error.value = 'Failed to load Services.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container mx-auto py-28">
    <div>
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
           <div v-if="services.length > 0">
    <div class="text-4xl p-4 text-black text-center font-bold">{{ services[0].master_service.name }}</div>
  </div>
        <div class="mt-8 space-y-6">

          <div v-for="service in services" :key="service.id"
            class="p-4 border border-gray-100/50 rounded-md relative hover:-translate-y-1.5 transition-all duration-500 ease-in-out group-data-[theme-color=violet]:hover:border-violet-500 group-data-[theme-color=sky]:hover:border-sky-500 group-data-[theme-color=red]:hover:border-red-500 group-data-[theme-color=green]:hover:border-green-500 group-data-[theme-color=pink]:hover:border-pink-500 group-data-[theme-color=blue]:hover:border-blue-500 hover:shadow-md hover:shadow-gray-100/30 dark:border-neutral-600 dark:hover:shadow-neutral-900">


            <div class="grid items-center grid-cols-12">
              <div class="col-span-12 md:col-auto">
                <div>
                  <img :src="service.profile_route" alt=""
                    class="w-16 h-16 p-1 rounded-full outline outline-2 outline-gray-100/50 dark:outline-neutral-600">
                </div>
              </div>

              <div class="col-span-12 md:col-span-5">
                <div class="mt-3 mt-lg-0">
                  <h5 class="mb-0 text-gray-900 text-19 dark:text-white"><a href="candidate-details.html">{{ service.professionals.first_name || 'No First Name' }} {{ service.professionals.last_name || 'No Last Name' }} </a></h5>
                  <p class="mb-2 text-gray-500 text-muted dark:text-gray-300">{{
                    service.professionals.user_name }}</p>
                  <ul class="flex flex-wrap gap-3 text-gray-500 dark:text-gray-300">
                    <li class="list-inline-item">
                      <i class="mdi mdi-map-marker"></i> {{ service.professionals.address || 'No Address' }}
                    </li>
                    <li class="list-inline-item">
                      {{ service.professionals.contact_number }}
                    </li>
                    
                  </ul>

                </div>
              </div>
              <div class="col-span-12 md:col-span-4">
                                        <div class="flex flex-wrap gap-2 mt-2 mt-lg-0">
                                            <span class="px-2 py-1 text-sm font-medium text-green-500 rounded bg-green-500/20"><span
                      class="text-gray-500 text-sm ml-2">{{ service.master_service.name }}</span></span>
                                        </div>
                                    </div><!--end col-->
                      <NuxtLink :to="`/professional-profile-view/${service.professionals.user_name}`">
                        <button class=" bg-white border p-2 rounded-md  text-gray-500">
                          View Profile
                          
                        </button>
                      </NuxtLink>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Add your styles here */
</style>

<script setup>
import { ref, onMounted } from 'vue';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import Privacy from './template/company/privacy.vue';

definePageMeta({
  layout: 'template-default'
})

/* project upload endpoint */
const files = ref([]);  // Initialize as an array to handle multiple files
const previews = ref([]);  // Initialize for image previews
const formData = ref({
  name: '',
  cost: '',
  start_date: '',
  end_date: '',
  description: '',
  privacy_settings: '',
});

function onChangeFile(event) {
  files.value = Array.from(event.target.files);
  previews.value = [];
  files.value.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      previews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
  console.log(files.value);
}

//limit at 6 files only

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookie = parts.pop()?.split(';').shift();
    return cookie ? decodeURIComponent(cookie) : null;
  }
  return null;
}

async function uploadProject() {
  const accessToken = getCookie('access_token');
  const userType = getCookie('user-type');

  if (!accessToken) {
    console.error('Access token is missing');
    return;
  }

  if (!userType) {
    console.error('User type is missing');
    return;
  }

  if (files.value.length === 0) {
    console.log('Files are not selected');
    return;
  }

  const body = new FormData();
  files.value.forEach(file => {
    body.append('file[]', file);  // Append each file to the form data
  });
  body.append('name', formData.value.name);
  body.append('cost', formData.value.cost);
  body.append('start_date', formData.value.start_date);
  body.append('end_date', formData.value.end_date);
  body.append('description', formData.value.description);

  try {
    const response = await fetch(`http://localhost:8000/api/professionals/project-store`, {
      method: 'POST',
      body: body,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (response.ok) {
      Toastify({
        text: `${userType.charAt(0).toUpperCase() + userType.slice(1)} Project Posted!`,
        duration: 3000, // duration in milliseconds
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        background: "#4caf50", // green
      }).showToast();

      setTimeout(() => {
        window.location.href = '/professional-profile'; // Change the URL to your home page
      }, 1000);
    } else {
      console.error(`Failed to upload project of ${userType} data:`, response.statusText);

      Toastify({
        text: `Failed to upload project of ${userType} data: ${response.statusText}`,
        duration: 3000,
        gravity: "top",
        position: "right",
        background: "#f44336", // red
      }).showToast();
    }
  } catch (err) {
    console.error(`Error during uploading project:`, err);

    Toastify({
      text: `Error during uploading project: ${err.message}`,
      duration: 3000,
      gravity: "top",
      position: "right",
      background: "#f44336", // red
    }).showToast();
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
              <form @submit.prevent="uploadProject">
                <p class="px-3 text-4xl text-gray-500">Upload a project</p><br>
                <p class="px-3 text-gray-400">A project is a compilation of images of your own creations.</p>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div class="p-3">
                    <label class="text-xl text-gray-500">Project Title</label><br>
                    <input type="text" v-model="formData.name" placeholder="Project Title"
                      class="w-full text-black placeholder:text-gray-100" />
                  </div>
                  <div class="p-3">
                    <label class="text-xl text-gray-500">Cost</label><br>
                    <input type="number" placeholder="Add Cost" v-model="formData.cost"
                      class="w-full text-black placeholder:text-gray-100" />
                  </div>
                </div>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div class="p-3">
                    <label class="text-gray-500">Start of project</label><br />
                    <input v-model="formData.start_date" type="date" class="w-full text-black" />
                  </div>
                  <div class="p-3">
                    <label class="text-gray-500">End of project</label><br />
                    <input v-model="formData.end_date" type="date" class="w-full text-black" />
                  </div>
                </div>
                <div class="p-3">
                    <label class="text-gray-500">End of project</label><br />
                    <textarea v-model="formData.description" type="text" placeholder="Add Description" class="w-full text-black" />
                  </div>
                <!-- Input Image -->
                <div class="flex items-center justify-center w-full py-6">
                  <label for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to
                          upload </span> or drag and drop</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">PNG, or JPG (MAX. 100MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" multiple accept=".png, .jpg"
                      @change="onChangeFile" />
                       <!-- Image Previews -->
                    <div v-if="previews.length" class="py-6">
                      <div class="flex flex-wrap mt-4">
                        <img v-for="(preview, index) in previews" :key="index" class="p-2 rounded-sm size-28 " :src="`${preview}`" />
                      </div>
                    </div>
                  </label>
                </div>
                
                <div>
                  <button type="submit" class="float-right p-3 px-4 bg-gray-500 rounded-md">
                    Post
                  </button>
                </div>
              </form>
             
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



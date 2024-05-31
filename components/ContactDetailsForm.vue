<script setup>
import { ref } from 'vue';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";


const client = ref({});
const contactForm = ref({
  address: '',
  address_2: '',
  barangay: '',
  zip_code: '',
});

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if(parts.length === 2) 
    return parts.pop().split(';').shift();
};
async function userView() {
    const accessToken = getCookie('access_token');
    const userType = getCookie('user-type');

    if (!accessToken) {
      console.error('Access token is missing');
      return;
    }

    let endpoint = 'clients';
    if (userType === 'professional') {
      endpoint = 'professionals';
    }

    const response = await fetch(`http://localhost:8000/api/${endpoint}/view`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if(response.ok) {
      const data = await response.json();
      client.value = data.data;
      contactForm.value = { ...contactForm.value, ...client.value };
      console.log(client.value);
    } else {
      console.error(`Failed to fetch ${userType} data:`, response.statusText);
    }
}
const onSubmitAccount = async () => {
  const accessToken = getCookie('access_token');
  const userType = getCookie('user-type');

  if (!accessToken) {
    console.error('Access token is missing');
    return;
  }

  try {
    console.log('Submitting account form:', contactForm.value); // Debug log
    const response = await fetch('http://localhost:8000/api/clients/update', {
      method: 'POST',
      body: JSON.stringify(contactForm.value),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      Toastify({
        text: `${userType.charAt(0).toUpperCase() + userType.slice(1)} contact information updated successfully!`,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#4caf50'
      }).showToast();
    } else {
      const error = await response.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.error(`Failed to update ${userType} data:`, error.message);
    Toastify({
      text: `Failed to update ${userType} data: ${error.message}`,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor: '#f44336'
    }).showToast();
  }
};

onMounted(async () => {
  await userView();
});

</script>

<template>
  <div>
    <div class="w-full max-w-3xl p-8 mx-auto">
      <div class="py-6 px-7">
        <h1 class="mb-4 text-xl font-bold text-gray-800 dark:text-white">
          Contact Form
        </h1>
        
        <div class="mb-6">
          <h2 class="mb-2 text-lg font-semibold text-gray-700 dark:text-white">
            Make changes to your contact here. Click save when you're done.
          </h2>

          <form @submit.prevent="onSubmitAccount">
            <div class="mt-8">
            <label for="address" class="block mb-1 text-gray-700 dark:text-white">Address</label>
            <input type="text" id="address" v-model="contactForm.address"
              class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label for="address_2" class="block mb-1 text-gray-700 dark:text-white">Address_2 </label>
              <input type="text" id="address_2" v-model="contactForm.address_2"
                class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
            </div>
            <div>
              <label for="barangay" class="block mb-1 text-gray-700 dark:text-white">Barangay</label>
              <input type="text" id="barangay" v-model="contactForm.barangay"
                class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label for="city" class="block mb-1 text-gray-700 dark:text-white">City</label>
              <input type="text" id="city"
                class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
            </div>
            <div>
              <label for="province" class="block mb-1 text-gray-700 dark:text-white">Province</label>
              <input type="text" id="province"
                class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
            </div>
          </div>

          <div class="mt-4">
            <label for="zip_code" class="block mb-1 text-gray-700 dark:text-white">Zip code</label>
            <input type="text" id="zip_code" v-model="contactForm.zip_code"
              class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
          </div>
          
          <div class="flex justify-end mt-8">
            <button class="px-4 py-1 text-white rounded-lg bg-green-500/75">
              Submit
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



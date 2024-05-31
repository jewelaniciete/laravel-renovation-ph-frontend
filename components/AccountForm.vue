<script setup>
import { ref } from 'vue';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";


const client = ref({});
const accountForm = ref({
  user_name: '',
  first_name: '',
  last_name: '',
  age: '',
  gender: '',
  about_me: '',
  favorite_style: ''
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
      accountForm.value = { ...accountForm.value, ...client.value };
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
    console.log('Submitting account form:', accountForm.value); // Debug log
    const response = await fetch('http://localhost:8000/api/clients/update', {
      method: 'POST',
      body: JSON.stringify(accountForm.value),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (response.ok) {
      Toastify({
        text: `${userType.charAt(0).toUpperCase() + userType.slice(1)} information updated successfully!`,
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
          Account Form
        </h1>
        
        <div class="mb-6">
          <h2 class="mb-2 text-lg font-semibold text-gray-700 dark:text-white">
            Make changes to your account here. Click save when you're done.
          </h2>

          <form @submit.prevent="onSubmitAccount">
            <div class="mt-8">
            <label for="user_name" class="block mb-1 text-gray-700 dark:text-white">User name</label>
            <input type="text" id="user_name" v-model="accountForm.user_name"
              class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label for="first_name" class="block mb-1 text-gray-700 dark:text-white">First Name</label>
              <input type="text" id="first_name" v-model="accountForm.first_name"
                class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
            </div>
            <div>
              <label for="last_name" class="block mb-1 text-gray-700 dark:text-white">Last Name</label>
              <input type="text" id="last_name" v-model="accountForm.last_name"
                class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label for="age" class="block mb-1 text-gray-700 dark:text-white">Age</label>
              <input type="text" id="age" v-model="accountForm.age"
                class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
            </div>
            <div>
              <label for="gender" class="block mb-1 text-gray-700 dark:text-white">Gender</label>
              <input type="text" id="gender" v-model="accountForm.gender"
                class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
            </div>
          </div>

          <div class="mt-4">
            <label for="about_me" class="block mb-1 text-gray-700 dark:text-white">About Me</label>
            <input type="text" id="about_me" v-model="accountForm.about_me"
              class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
          </div>

          <div class="mt-4">
            <label for="favorite_style" class="block mb-1 text-gray-700 dark:text-white">Favorite Style</label>
            <input type="text" id="favorite_style" v-model="accountForm.favorite_style"
              class="w-full px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-none" />
          </div>
          
          <div class="flex justify-end mt-8">
            <button class="px-4 py-1 text-white rounded bg-green-500/75">
              Submit
            </button>
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



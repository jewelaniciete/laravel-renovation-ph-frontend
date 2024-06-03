<script setup>
import Toastify from 'toastify-js';
import { ref } from 'vue';
import "toastify-js/src/toastify.css";


definePageMeta({
  layout: 'template-default'
})

const showProfile = ref(false);


onMounted(async () => {
  await userView();
  await profileView();
  showProfile.value = true;

});

const client = ref({});
const profile = ref({});
const file = ref({});
const caption = ref({});

const profileUpdate = async () => {
  const accessToken = getCookie('access_token');
  const userType = getCookie('user-type');

  if(!accessToken){
    console.error('Access token is missing');
    return;
  }

  let endpoint = 'clients';
  if(userType === 'professional'){
    endpoint = 'professionals';
  }

  try{
    if (!file.value) return;
    const body = new FormData();
    body.append('file', file.value, file.value.name);
    body.append('caption', caption.value);

    const response = await fetch(`http://localhost:8000/api/${endpoint}/profile-update`, {
      method: 'POST',
      body: body,
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });

    if (response.ok){
      Toastify({
        text: "Profile updated successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#4caf50",
      }).showToast();

      setTimeout(() => {
        window.location.href = '/client-edit'; // Change the URL to your home page
      }, 1000);
      }else{
        console.error(`Failed to update ${userType} profile:`, response.statusText);
        Toastify({
          text: `Failed to update ${userType} profile: ${response.statusText}`,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#f44336", // red
        }).showToast();
      }
  }catch (err){
    console.error(`Error during profile update:`, err);
    Toastify({
      text: `Error during profile update: ${err.message}`,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336",
    }).showToast();
  }
}

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
    } else {
      console.error(`Failed to fetch ${userType} data:`, response.statusText);
    }
}
async function profileView() {
  const accessToken = getCookie('access_token');
  const userType = getCookie('user-type');

  if(!accessToken){
    console.error('Access token is missing');
    return;
  }

  let endpoint = 'clients';
  if (userType === 'professional') {
    endpoint = 'professionals';
  }

  const response = await fetch(`http://localhost:8000/api/${endpoint}/profile-view`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
      },
  });

  if (response.ok) {
    const data = await response.json();
    profile.value = data.data;
    console.log(profile.value);
  }else{
    console.error(`Failed to fetch ${userType} data:`, response.statusText);
  }
}

function onChangeFile(event) {
  file.value = event.target.files[0];
  console.log(file.value);
}

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if(parts.length === 2) 
    return parts.pop().split(';').shift();
};



const genders = [
  { id: 'male', option: 'Male' },
  { id: 'female', option: 'Female' },
  { id: 'other', option: 'Other' }
];

const selected = ref();
const openTab = ref(1);
const items = ref([
  { tab: 1, title: 'Account Form' },
  { tab: 2, title: 'Contact Form' },
  { tab: 3, title: 'Password Form' },
]);

const contactForm = ref({
  address: '',
  address_2: '',
  province: '',
  city: '',
  barangay: '',
  zip_code: ''
});

const toggleTabs = (tabNumber) => {
  openTab.value = tabNumber
}



const passwordForm = ref({
  email: '',
  currentPassword: '',
  newPassword: ''
});
</script>

<template>
    <div class="main-content">
      <div class="page-content">
        <section class="relative py-12">
          <div class="container mx-auto">
            <div class="grid grid-cols-12 mt-8 md:gap-12">
              <div class="col-span-12 lg:col-span-12">
                <div class="rounded-md">
                  <div>
                    <div class="">
                      <div class="">
                        <div class="relative h-60 cover">
                          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
                              alt="User Cover" class="object-cover w-full h-full rounded-t-lg" />
                          <div class="absolute inset-0 opacity-50 bg-gradient-to-t from-gray-900">
                          </div>
                        </div>

                        <div class="flex flex-row w-full">
                          <div v-if="showProfile" class="relative flex-col items-start justify-start mt-custom ml-custom">
                            <div class="flex items-start justify-start">
                              <NuxtLink href="#profile" @click.prevent="showModal = true">
                                  <img id="profile-img" :src="profile.profile_route" alt="" class="w-48 h-48 border-4 rounded-full">
                              </NuxtLink>
                            </div>
                            <div class="mt-3">
                              <h6 class="text-2xl font-bold text-gray-900 dark:text-gray-50">
                                  {{ client.first_name }} {{ client.last_name }}
                              </h6>
                              <p class="mt-1 text-gray-500 dark:text-gray-300">
                                {{ client.about_me }}
                              </p>
                            </div>
                            <div v-if="showModal" class="relative z-50 modal" id="modal-id_profile" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                              <div class="fixed top-0 bottom-0 left-0 right-0 z-50 overflow-hidden">
                                <div class="absolute inset-0 transition-opacity bg-black bg-opacity-60 modal-overlay" @click="showModal = false"></div>
                                <div class="box-content p-4 mx-auto animate-translate sm:max-w-lg">
                                  <div class="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl top-36 dark:bg-neutral-800" @click.stop>
                                    <div class="p-12 bg-white dark:bg-neutral-800">
                                      <label class="text-black">Upload Files</label>
                                        <div>
                                          <input type="file" class="w-full mt-2 text-black border-gray-100 rounded placeholder:text-13 placeholder:text-gray-200 focus:ring-1 focus:ring-green-900 dark:bg-transparent dark:text-gray-50 dark:border-neutral-600" @change="onChangeFile" />
                                            <div v-if="imageUrl" class="mt-4">
                                              <img :src="imageUrl" alt="Image Preview" class="h-auto max-w-full rounded">
                                            </div>
                                        </div>
                                        <div class="p-4">
                                          <label class="text-black">Caption</label>
                                          <input class="text-gray-400" type="text" name="Caption" v-model="caption" />
                                        </div>
                                        <button class="w-full mt-4 border-transparent text-black btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=sky]:bg-sky-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=pink]:bg-pink-500 group-data-[theme-color=blue]:bg-blue-500"
                                          @click="profileUpdate">Upload
                                        </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div v-else
                                                    class="relative flex-col items-start justify-start w-full mt-custom ml-custom">
                                                    <div class="flex items-start justify-start">
                                                        <img src="assets/images/renovation/default.jpg" alt=""
                                                            class="w-48 h-48 border-4 rounded-full">
                                                    </div>

                                                    <div class="mt-3">
                                                        <h6 class="text-2xl font-bold text-gray-900 dark:text-gray-50">
                                                            Loading....</h6>
                                                        <p class="mt-1 text-gray-500 dark:text-gray-300">
                                                           Loading....</p>
                                                    </div>
                                                </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-span-12 lg:col-span-12">
                <div class="flex flex-col justify-center gap-5 md:gap-12 lg:flex-row">
                  <div class="flex flex-col order-2 w-full py-2 lg:w-5/12 sm:order-1">
                    <div class="">
                      <ul class="flex flex-row flex-wrap pt-3 pb-4 mb-0 list-none w-100">
                        <div v-for="tab in items" :key="tab.tab" class="flex-auto">
                          <li class="flex-auto mr-2 -mb-px text-center last:mr-0">
                            <a
                              class="block px-5 py-3 text-xs font-bold leading-normal uppercase rounded text-gray-400 shadow-xl cursor-pointer"
                              @click="openTab = tab.tab"
                              :class="{'text-green-700 bg-white': openTab !== tab.tab, 'text-gray-900 bg-green-500\/75': openTab === tab.tab}">
                              {{ tab.title }}
                            </a>
                          </li>
                        </div>
                      </ul>
                      <div class="relative flex flex-col w-full min-w-0 mb-4 break-words bg-white shadow-lg rounded-xl">
                        <div class="flex-auto px-4 py-5  ">
                          <div v-for="tab in items" :key="tab.tab" class="tab-content tab-space ">
                            <div :class="{'hidden': openTab !== tab.tab, 'block': openTab === tab.tab}">
                              <div class="px-1 py-2 font-normal h-28 md:h-24">
                                <p class="text-base">
                                  <template v-if="tab.tab === 1">
                                    <AccountForm />
                                  </template>
                                  <template v-if="tab.tab === 2">
                                    <ContactInfoForm />
                                  </template>
                                  <template v-else-if="tab.tab === 3">
                                    <PasswordFrom />
                                  </template>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      imageUrl: null,
      caption: '',
    
      client: {
        first_name: 'John',
        last_name: 'Doe',
        about_me: 'This is a short bio.'
      }
    };
  },
  methods: {
    onChangeFile(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file);
      }
    },
    profileUpdate() {
      console.log('Image URL:', this.imageUrl);
      console.log('Caption:', this.caption);
      
      this.showModal = false;
      this.imageUrl = null;
      this.caption = '';
    }
  },
};
</script>



<!-- const onSubmit = async (formKey) => {
  let formData = {};
  if (formKey === 'account') {
    formData = accountForm;
  } else if (formKey === 'contact') {
    formData = contactForm;
  } else if (formKey === 'password') {
    formData = passwordForm;
  }
  await clientUpdate(formData, formKey);
};

const clientUpdate = async (formData, formKey) => {
  const accessToken = getCookie('access_token');
  const userType = getCookie('user-type');

  if (!accessToken) {
    console.error('Access token is missing');
    return;
  }

  try {
    const { data, error } = await fetch(`http://localhost:8000/api/clients/update`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!error) {
      Toastify({
        text: `${userType.charAt(0).toUpperCase() + userType.slice(1)} information updated successfully!`,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#4caf50'
      }).showToast();
    }else{
      throw new Error(error);
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
}; -->
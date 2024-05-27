<script setup>
import "toastify-js/src/toastify.css";

definePageMeta({
    layout: 'template-default'
})

onMounted(async () => {
    await userView();
    await profileView();
});

const selected = ref([])
const client = ref({});
const profile = ref({});
const file = ref({});
const caption = ref({});
const formData = ref({
    first_name: '',
    last_name: '',
    address: '',
    about_me: '',
    zip_code: '',
});


const profileUpdate = async () => {
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

    try {
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

        if (response.ok) {
            // Show success toast
            Toastify({
                text: "Profile updated successfully!",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#4caf50", // green
            }).showToast();

            refreshPage();
        } else {
            console.error(`Failed to update ${userType} profile:`, response.statusText);

            // Show error toast
            Toastify({
                text: `Failed to update ${userType} profile: ${response.statusText}`,
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "#f44336", // red
            }).showToast();
        }
    } catch (err) {
        console.error(`Error during profile update:`, err);

        // Show error toast
        Toastify({
            text: `Error during profile update: ${err.message}`,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "#f44336", // red
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

    if (response.ok) {
        const data = await response.json();
        client.value = data.data;
    } else {
        console.error(`Failed to fetch ${userType} data:`, response.statusText);
    }
}

async function profileView() {
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
    } else {
        console.error(`Failed to fetch ${userType} data:`, response.statusText);
    }
}


function onChangeFile(event) {
    file.value = event.target.files[0];
    console.log(file.value);
}

const items = [
  { key: 'account', label: 'Account Settings', description: 'Update your account information.' },
  { key: 'contact', label: 'Contact Information', description: 'Update your contact details.' },
  { key: 'password', label: 'Password Settings', description: 'Change your password.' }
];

const accountForm = reactive({
  username: '',
  first_name: '',
  last_name: '',
  age: '',
  about_me: '',
  favourite_style: ''
});

const contactForm = reactive({
  address: '',
  address_2: '',
  province: '',
  city: '',
  barangay: '',
  zip_code: ''
});

const passwordForm = reactive({
  email: '',
  currentPassword: '',
  newPassword: ''
});

const selectedGender = ref(null);
const genders = [
  { id: 'male', option: 'Male' },
  { id: 'female', option: 'Female' },
  { id: 'other', option: 'Other' }
];

const tabsUi = {
  wrapper: 'col-span-12 items-center gap-4',
  list: {
    base: 'relative',
    background: 'bg-gray-100 dark:bg-gray-800',
    rounded: 'rounded-lg',
    padding: 'p-1',
    marker: {
      wrapper: 'absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none',
      base: 'w-full h-full',
      background: 'bg-white dark:bg-gray-900',
      rounded: 'rounded-md'
    },
    tab: {
      base: 'relative inline-flex items-center justify-end flex-shrink-0 w-full transition-colors duration-200 ease-out',
      active: 'text-gray-900 dark:text-white',
      inactive: 'text-gray-500 dark:text-gray-400',
      height: 'h-8',
      padding: 'px-3',
      size: 'text-sm',
      font: 'font-medium',
      rounded: 'rounded-full'
    }
  }
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

const onSubmit = async (formKey) => {
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

//   let endpoint = 'clients';
//   if (userType === 'professional') {
//     endpoint = 'professionals';
//   }

  try {
    const { data, error } = await useFetch(`http://localhost:8000/api/clients/update`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }).json();

    if (!error) {
      // Show success toast
      Toastify({
        text: `${userType.charAt(0).toUpperCase() + userType.slice(1)} information updated successfully!`,
        duration: 3000, // duration in milliseconds
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        backgroundColor: '#4caf50' // green
      }).showToast();
    } else {
      throw new Error(error);
    }
  } catch (error) {
    console.error(`Failed to update ${userType} data:`, error.message);

    // Show error toast
    Toastify({
      text: `Failed to update ${userType} data: ${error.message}`,
      duration: 3000,
      gravity: 'top',
      position: 'right',
      backgroundColor: '#f44336' // red
    }).showToast();
  }
};


</script>


<template>
    <div class="main-content">
        <div class="page-content">

            <!-- Start grid -->
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
                                                <div
                                                    class="relative flex-col items-start justify-start  mt-custom ml-custom">
                                                    <div class="flex items-start justify-start">
                                                        <NuxtLink href="#profile" @click.prevent="showModal = true">
                                                            <img id="profile-img" :src="profile.profile_route" alt=""
                                                                class="w-48 h-48 rounded-full border-4 ">
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
                                                    <div v-if="showModal" class="relative z-50 modal"
                                                        id="modal-id_profile" aria-labelledby="modal-title"
                                                        role="dialog" aria-modal="true">
                                                        <div
                                                            class="fixed top-0 bottom-0 left-0 right-0 z-50 overflow-hidden">
                                                            <div class="absolute inset-0 transition-opacity bg-black bg-opacity-60 modal-overlay"
                                                                @click="showModal = false"></div>
                                                            <div
                                                                class="box-content p-4 mx-auto animate-translate sm:max-w-lg">
                                                                <div class="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl top-36 dark:bg-neutral-800"
                                                                    @click.stop>
                                                                    <div class="p-12 bg-white dark:bg-neutral-800">
                                                                        <label class="text-black">Upload Files</label>
                                                                        <div>
                                                                            <input type="file"
                                                                                class="w-full mt-2 border-gray-100 rounded text-black placeholder:text-13 placeholder:text-gray-200 focus:ring-1 focus:ring-green-900 dark:bg-transparent dark:text-gray-50 dark:border-neutral-600"
                                                                                @change="onChangeFile" />
                                                                            <div v-if="imageUrl" class="mt-4">
                                                                                <img :src="imageUrl" alt="Image Preview"
                                                                                    class="h-auto max-w-full rounded">
                                                                            </div>
                                                                        </div>
                                                                        <div class="p-4">
                                                                        <label class="text-black">Caption</label>
                                                                        <input class="text-gray-400" type="text" name="Caption" 
                                                                            v-model="caption" />
                                                                        </div>
                                                                        <button
                                                                            class="w-full mt-4 border-transparent text-black btn group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=sky]:bg-sky-500 group-data-[theme-color=red]:bg-red-500 group-data-[theme-color=green]:bg-green-500 group-data-[theme-color=pink]:bg-pink-500 group-data-[theme-color=blue]:bg-blue-500"
                                                                            @click="profileUpdate">Upload</button>
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
                        </div>

                        <div class="col-span-12 lg:col-span-12">
                            <UTabs :items="items" :ui="{
                                wrapper: 'col-span-12 items-center gap-4',
                                list: {
                                    base: 'relative',
                                    background: 'bg-gray-100 dark:bg-gray-800',
                                    rounded: 'rounded-lg',
                                    shadow: '',
                                    padding: 'p-1',
                                    height: '',
                                    width: '',
                                    marker:
                                    {
                                        wrapper: 'absolute top-[4px] left-[4px] duration-200 ease-out focus:outline-none',
                                        base: 'w-full h-full',
                                        background: 'bg-white dark:bg-gray-900',
                                        rounded: 'rounded-md',
                                        shadow: 'shadow-sm',
                                    },
                                    tab:
                                    {
                                        base: 'relative inline-flex items-center justify-end flex-shrink-0 w-full ui-focus-visible:outline-0 ui-focus-visible:ring-2 ui-focus-visible:ring-primary-500 dark:ui-focus-visible:ring-primary-400 ui-not-focus-visible:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-75 transition-colors duration-200 ease-out',
                                        background: '',
                                        active: 'text-gray-900 dark:text-white',
                                        inactive: 'text-gray-500 dark:text-gray-400',
                                        height: 'h-8',
                                        padding: 'px-3',
                                        size: 'text-sm',
                                        font: 'font-medium',
                                        rounded: 'rounded-full',
                                        shadow: '',
                                    },
                                },
                            }" class="">
                                <template #item="{ item }">
                                    <UCard @submit.prevent="onSubmit(item.key)">
                                        <template #header>
                                            <div class="col-span-12 lg:col-span-5">
                                                <div class="rounded-md">
                                                    <div ciass="h-60">
                                                        <p
                                                            class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                                            {{ item.label }}
                                                        </p>
                                                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                            {{ item.description }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>

                                        <div v-if="item.key === 'account'" class="space-y-3">
            <UFormGroup label="Username" name="user_name">
              <UInput v-model="accountForm.user_name" />
            </UFormGroup>
            <UFormGroup label="First Name" name="first_name">
              <UInput v-model="accountForm.first_name" />
            </UFormGroup>
            <UFormGroup label="Last Name" name="last_name">
              <UInput v-model="accountForm.last_name" />
            </UFormGroup>
            <UFormGroup label="Age" name="age">
              <UInput v-model="accountForm.age" />
            </UFormGroup>
            <USelectMenu v-model="gender" :options="genders" placeholder="Select gender" value-attribute="id" option-attribute="option" />
            <UFormGroup label="About me" name="about_me">
              <UTextarea v-model="accountForm.about_me" resize placeholder="Tell us about yourself" />
            </UFormGroup>
            <UFormGroup label="Favorite Style" name="favorite_style">
              <UInput v-model="accountForm.favourite_style" />
            </UFormGroup>
          </div>
          <div v-else-if="item.key === 'contact'" class="space-y-3">
            <UFormGroup label="Address" name="address" required>
              <UInput v-model="contactForm.address" />
            </UFormGroup>
            <UFormGroup label="Address 2" name="address_2" required>
              <UInput v-model="contactForm.address_2" />
            </UFormGroup>
            <UFormGroup label="Province" name="province" required>
              <UInput v-model="contactForm.province" />
            </UFormGroup>
            <UFormGroup label="City" name="city" required>
              <UInput v-model="contactForm.city" />
            </UFormGroup>
            <UFormGroup label="Barangay" name="barangay" required>
              <UInput v-model="contactForm.barangay" />
            </UFormGroup>
            <UFormGroup label="Zip Code" name="zip_code" required>
              <UInput v-model="contactForm.zip_code" />
            </UFormGroup>
          </div>
          <div v-else-if="item.key === 'password'" class="space-y-3">
            <UFormGroup label="Email" name="email" required>
              <UInput v-model="passwordForm.email" type="email" required />
            </UFormGroup>
            <UFormGroup label="Current Password" name="current" required>
              <UInput v-model="passwordForm.currentPassword" type="password" required />
            </UFormGroup>
            <UFormGroup label="New Password" name="new" required>
              <UInput v-model="passwordForm.newPassword" type="password" required />
            </UFormGroup>
          </div>

                                        <template #footer>
                                            <UButton type="submit" color="black">
              Save {{ item.key === 'account' ? 'account' : item.key }}
            </UButton>
                                        </template>
                                    </UCard>
                                </template>
                            </UTabs>
                        </div>
                    </div>
                </div>
            </section>
            <!-- End grid -->
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
      // Mock profile and client data for demonstration purposes
    
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
      // Add your profile update logic here
      // For demonstration purposes, we'll just log the data
      console.log('Image URL:', this.imageUrl);
      console.log('Caption:', this.caption);
      
      // Reset the modal and inputs after update
      this.showModal = false;
      this.imageUrl = null;
      this.caption = '';
    }
  },
  computed: {
    // Add necessary computed properties here
  }
};
</script>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
    layout: 'template-default'
})

const client = ref({});
const profile = ref({});
const showProfile = ref(false);

onMounted(async () => {
    await clientView();
    await profileView();
    showProfile.value = true;

});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookie = parts.pop()?.split(';').shift();
        return cookie ? decodeURIComponent(cookie) : null;
    }
    return null;
}

async function clientView() {
    const accessToken = getCookie('access_token');
    if (!accessToken) {
        console.log('Access token is missing');
        return;
    }
    const response = await fetch(`http://localhost:8000/api/clients/view`, {
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
        console.log(client.value);
    } else {
        console.error('Failed to fetch client data:', response.statusText);
    }
}

async function profileView() {
    const accessToken = getCookie('access_token');
    if (!accessToken) {
        console.log('Access token is missing');
        return;
    }
    const response = await fetch(`http://localhost:8000/api/clients/profile-view`, {
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
        console.error('Failed to fetch client data:', response.statusText);
    }
}


</script>

<template>
    <div class="main-content">
        <div class="page-content">

            <!-- Start grid -->
            <section class="relative py-16">
                <div class="container mx-auto">
                    <div class="grid grid-cols-12 mt-8 md:gap-12">
                        <div class="col-span-12 lg:col-span-12">
                            <div class="rounded-md">
                                <div>
                                    <div class="">
                                        <div class="mb-10">
                                            <div class="h-60 abosulte cover">
                                                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
                                                    alt="User Cover" class="object-cover w-full h-full rounded-t-lg" />
                                            </div>
                                            <div class="flex flex-col w-full lg:flex-row">
                                                <div v-if="showProfile"
                                                    class="relative flex-col items-center justify-start w-full text-center lg:items-start mt-custom lg:ml-custom lg:text-start">
                                                    <div class="flex items-center justify-center lg:justify-start lg:items-start">
                                                        <img :src="profile.profile_route" alt=""
                                                            class="w-48 h-48 border-4 rounded-full">
                                                    </div>

                                                    <div class="mt-3">
                                                        <h6 class="text-2xl font-bold text-gray-900 dark:text-gray-50">
                                                            {{ client.first_name }} {{ client.last_name }}</h6>
                                                        <p class="mt-1 text-gray-500 dark:text-gray-300">
                                                            {{ client.about_me }}</p>
                                                    </div>
                                                </div>

                                                <div v-else
                                                    class="relative flex-col items-center justify-center w-full text-center lg:text-start lg:items-start lg:justify-start mt-custom lg:ml-custom">
                                                    <div class="flex items-center justify-center lg:items-start lg:justify-start">
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
                                                <div class="flex justify-center w-full p-5 lg:justify-end items-right">
                                                    <NuxtLink to="/client-edit"> <img src="assets/images/logo/editt.svg"
                                                            alt="" class="w-6 h-6"> </NuxtLink>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-span-12 lg:col-span-5">
                            <div class="p-5 rounded-md bg-gray-50 dark:bg-neutral-700">
                                <div>
                                    <div class="mb-8">
                                        <h5 class="p-2 mb-5 text-gray-900 text-16">Social Media</h5>
                                        <ul class="flex justify-start gap-3 mb-0">
                                            <li
                                                class="w-10 h-10 leading-8 text-center duration-300 rounded-full hover:bg-violet-500 hover:text-white hover:transition-all dark:text-white">
                                                <a href="javascript:void(0)"><i class="uil uil-facebook-f"></i></a>
                                            </li>
                                            <li
                                                class="w-10 h-10 leading-8 text-center duration-300 rounded-full hover:bg-violet-500 hover:text-white hover:transition-all dark:text-white">
                                                <a href="javascript:void(0)"><i class="uil uil-whatsapp"></i></a>
                                            </li>
                                            <li
                                                class="w-10 h-10 leading-8 text-center duration-300 rounded-full hover:bg-violet-500 hover:text-white hover:transition-all dark:text-white">
                                                <a href="javascript:void(0)"><i class="uil uil-twitter-alt"></i></a>
                                            </li>
                                            <li
                                                class="w-10 h-10 leading-8 text-center duration-300 rounded-full hover:bg-violet-500 hover:text-white hover:transition-all dark:text-white">
                                                <a href="javascript:void(0)"><i class="uil uil-dribbble"></i></a>
                                            </li>
                                            <li
                                                class="w-10 h-10 leading-8 text-center duration-300 rounded-full hover:bg-violet-500 hover:text-white hover:transition-all dark:text-white">
                                                <a href="javascript:void(0)"><i class="uil uil-envelope"></i></a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="mb-8">
                                        <h5 class="p-2 mb-5 text-gray-900 text-16">Photos</h5>
                                        <div class="grid grid-cols-12 gap-3">
                                            <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                <a href="assets/images/blog/img-01.jpg" class="image-popup"><img
                                                        src="assets/images/blog/img-01.jpg" alt="" class=""></a>
                                            </div>
                                            <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                <a href="assets/images/blog/img-02.jpg" class="image-popup"><img
                                                        src="assets/images/blog/img-02.jpg" alt="" class=""></a>
                                            </div>
                                            <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                <a href="assets/images/blog/img-03.jpg" class="image-popup"><img
                                                        src="assets/images/blog/img-03.jpg" alt="" class=""></a>
                                            </div>
                                            <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                <a href="assets/images/blog/img-04.jpg" class="image-popup"><img
                                                        src="assets/images/blog/img-04.jpg" alt="" class=""></a>
                                            </div>
                                            <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                <a href="assets/images/blog/img-05.jpg" class="image-popup"><img
                                                        src="assets/images/blog/img-05.jpg" alt="" class=""></a>
                                            </div>
                                            <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                <a href="assets/images/blog/img-06.jpg" class="image-popup"><img
                                                        src="assets/images/blog/img-06.jpg" alt="" class=""></a>
                                            </div>
                                            <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                <a href="assets/images/blog/img-07.jpg" class="image-popup"><img
                                                        src="assets/images/blog/img-07.jpg" alt="" class=""></a>
                                            </div>
                                            <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                <a href="assets/images/blog/img-08.jpg" class="image-popup"><img
                                                        src="assets/images/blog/img-08.jpg" alt="" class=""></a>
                                            </div>
                                            <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                <a href="assets/images/blog/img-10.jpg" class="image-popup"><img
                                                        src="assets/images/blog/img-10.jpg" alt="" class=""></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="col-span-12 lg:col-span-7">
                            <div>
                                <div class="mt-24">
                                    <link rel="stylesheet"
                                        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

                                    <div class="flex flex-row items-center justify-center gap-2">
                                        <img :src="profile.profile_route" alt="User profile"
                                            class="w-12 h-12 rounded-full" />
                                        <button @click.prevent="showModal = true"
                                            class="w-full h-10 p-2 text-left text-gray-500 truncate bg-white border border-gray-400 rounded-full resize-none hover:bg-gray-50 xs:text-sm sm:text-lg dark:bg-gray-700 dark:text-white dark:border-gray-500">
                                            Start a post, try writing with AI
                                        </button>
                                    </div>
                                    <!--post modal-->
                                    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
    <div class="relative h-auto bg-white rounded-lg shadow-xl w-100 dark:bg-neutral-800">
      <div class="flex items-center justify-between p-4 bg-gray-200 border-b rounded-t-md dark:border-gray-700">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Create Post</h3>
        <button @click="showModal = false" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" aria-label="Close">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
        </button>
      </div>
      <div class="px-6 space-y-6">
        <textarea type="text" class="w-full h-10 p-2 overflow-hidden text-2xl text-black border-none rounded-md resize-none dark:bg-neutral-700 dark:text-white dark:border-gray-600 focus:ring-0" placeholder="add a title"></textarea>
      </div>
      <div class="px-6 py-2 space-y-6">
        <textarea type="text" class="w-full p-2 text-2xl text-black border-none rounded-md resize-none dark:bg-neutral-700 dark:text-white h-50 dark:border-gray-600 focus:ring-0" placeholder="What's on your mind?"></textarea>
      </div>
      <div class="px-6 py-2">
        <div v-if="imageSrcs.length" class="flex space-x-2">
          <div v-for="(src, index) in imageSrcs" :key="index">
            <img :src="src" alt="Image Preview" class="w-40 h-40 mb-4 rounded-md">
          </div>
        </div>
      </div>
      <div class="p-3">
        <div class="flex justify-between p-2 text-black border rounded-md resize-none dark:border-gray-600 dark:bg-neutral-700 dark:text-white">
          <p class="text-lg select-none">Add to your post</p>
          <div>
            <img id="uploadImage" class="cursor-pointer w-26" src="assets/images/gallery.svg" @click="triggerFileInput" />
            <input type="file" ref="fileInput" @change="previewImage" style="display:none;" multiple />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center p-4 border-t dark:border-gray-700">
        <button @click="showModal = false" class="w-full px-4 py-2 text-black bg-gray-200 rounded-md hover:bg-gray-500">Post</button>
      </div>
    </div>
  </div>
                                    <!--End of modal-->

                                    <div class="flex justify-between mt-2 sm:px-4">
                                        <div
                                            class="flex items-center gap-2 p-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span class="text-blue-400 material-symbols-outlined">panorama</span>
                                            <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300">Media
                                            </h3>
                                        </div>

                                        <div
                                            class="flex items-center gap-2 p-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span
                                                class="text-yellow-700 material-symbols-outlined">calendar_month</span>
                                            <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300">Event
                                            </h3>
                                        </div>

                                        <div
                                            class="flex items-center gap-2 rounded-sm cursor-pointer sm:p-2 xs:p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span class="text-orange-400 material-symbols-outlined">newsmode</span>
                                            <h3
                                                class="text-sm text-gray-600 sm:font-semibold xs:truncate dark:text-gray-300">
                                                Write article</h3>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-14">
                                    <div class="flex flex-row items-start justify-start gap-2">
                                        <img :src="profile.profile_route" alt="User profile"
                                            class="w-12 h-12 rounded-full" />
                                        <div>
                                            <a href="blog-details.html">
                                                <h5
                                                    class="mb-1 text-center text-[18.75px] text-gray-900 dark:text-gray-50">
                                                    {{ client.first_name }} {{ client.last_name }}</h5>
                                            </a>
                                            <p class="text-gray-500 dark:text-gray-300">Sep 06, 2021</p>
                                        </div>
                                    </div>
                                    <p class="mt-10 mb-4 text-gray-500 dark:text-gray-300">Whether article spirits new
                                        her covered hastily sitting her. Money witty books nor son add. Chicken age had
                                        evening believe but proceed pretend mrs. At missed advice my it no sister. Miss
                                        told ham dull knew see she spot near can. Spirit her entire her called.</p>
                                    <div class="mt-5 mb-5">
                                        <a href="blog-details.html"><img src="assets/images/blog/img-12.jpg" alt=""
                                                class="rounded-md"></a>
                                    </div>
                                    <div class="flex justify-between mt-2 sm:px-4">
                                        <div
                                            class="flex items-center gap-2 p-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span class="text-blue-400 material-symbols-outlined">panorama</span>
                                            <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300">Media
                                            </h3>
                                        </div>

                                        <div
                                            class="flex items-center gap-2 p-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span
                                                class="text-yellow-700 material-symbols-outlined">calendar_month</span>
                                            <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300">Event
                                            </h3>
                                        </div>

                                        <div
                                            class="flex items-center gap-2 rounded-sm cursor-pointer sm:p-2 xs:p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <span class="text-orange-400 material-symbols-outlined">newsmode</span>
                                            <h3
                                                class="text-sm text-gray-600 sm:font-semibold xs:truncate dark:text-gray-300">
                                                Write article</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <!-- End grid -->
        </div>
    </div>
</template>

<style scoped>

</style>


<script>
export default {
  data() {
    return {
      showModal: false,
      imageSrcs: [] // changed from imageSrc to imageSrcs to handle multiple images
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    previewImage(event) {
      const files = event.target.files;
      this.imageSrcs = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrcs.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }
};
</script>
<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
    layout: 'template-default'
})

const client = ref({});
const profile = ref({});
const showProfile = ref(false);
const showCount = ref(false);

onMounted(async () => {
    await clientView();
    await profileView();
    showProfile.value = true;
    showCount.value = true;
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
    const response = await fetch(`http://localhost:8000/api/professionals/view`, {
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
    const response = await fetch(`http://localhost:8000/api/professionals/profile-view`, {
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
                                                <div v-if="showProfile"
                                                    class="relative flex items-end justify-start w-full gap-3 mt-6 flex-cols">
                                                    <div class="flex items-start justify-start">
                                                        <img id="profile-img" :src="profile.profile_route" alt=""
                                                            class="w-48 h-48 border-2 ">
                                                    </div>
                                                    <div class="flex flex-col mt-3">
                                                        <h6 class="text-2xl font-bold text-gray-900 dark:text-gray-50">
                                                            {{ client.first_name }} {{ client.last_name }} </h6>
                                                        <p class="mt-1 text-gray-500 dark:text-gray-300">{{
                                                            client.user_name }}</p>
                                                    </div>
                                                </div>

                                                <div v-else
                                                    class="relative flex items-end justify-start w-full gap-3 mt-6 flex-cols">
                                                    <div class="flex items-start justify-start">
                                                        <img src="assets/images/renovation/default.jpg"
                                                            class="w-48 h-48 border-4 " />
                                                    </div>
                                                    <div class="flex flex-col mt-3">
                                                        <h6 class="text-2xl font-bold text-gray-900">Loading...
                                                        </h6>
                                                        <p class="mt-1 text-gray-500">Loading...</p>
                                                    </div>
                                                </div>

                                                <div class="flex justify-end p-5 items-right">
                                                    <NuxtLink to="/client-edit">
                                                        <img src="assets/images/logo/editt.svg" alt="" class="w-6 h-6">
                                                    </NuxtLink>
                                                </div>
                                            </div>

                                            <div class="flex flex-row w-full gap-3 mt-10">
                                                <div class="flex items-center justify-center">
                                                    <button
                                                        class="flex items-center gap-2 px-6 py-2 text-sm font-bold text-green-900 border border-gray-300 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                                        <img src="assets/images/renovation/star.svg" alt=""
                                                            class="w-6 h-6">
                                                        <span class="">Get Vouch</span>
                                                    </button>
                                                </div>
                                                <div class="flex items-center justify-center">
                                                    <button
                                                        class="flex items-center gap-2 px-6 py-2 text-sm font-bold text-green-900 border border-gray-300 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                                        <img src="assets/images/renovation/share.svg" alt=""
                                                            class="w-6 h-6">
                                                        <span class="">Share</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <hr class="mt-3 border-gray-200">
                                            <div class="flex flex-row w-full gap-3 mt-10">
                                                <div class="flex items-start justify-start w-full text-2xl font-semibold"
                                                    v-if="showProfile">
                                                    <p class="w-full text-gray-400 "> <project-count /> </p>
                                                </div>
                                                <div v-else>
                                                    <p class="text-xl text-gray-400 lg:justify-end">Fetching Project Count</p>
                                                </div>
                                            </div>
                                            <section class="py-16">
                                                <div class="container mx-auto">
                                                    <div class="grid grid-cols-12 md:gap-12 gap-y-8 md:gap-y-0">
                                                        <div class="col-span-12 lg:col-span-12">
                                                            <div class="grid grid-cols-12 md:gap-5">
                                                                <div class="col-span-12 lg:col-span-4">
                                                                    <NuxtLink to="/projectForm"
                                                                        class="flex flex-col items-center justify-center h-full p-2 transition-all duration-500 bg-gray-400 border-2 border-dashed rounded-md hover:bg-gray-500 hover:underline dark:bg-transparent dark:shadow-none">
                                                                        <div>
                                                                            <div class="w-auto h-full mt-6 text-center">
                                                                                <div
                                                                                    class="flex flex-col items-center justify-center p-10">
                                                                                    <img src="assets/images/renovation/add.svg"
                                                                                        alt="" class="w-16 h-16">
                                                                                    <p
                                                                                        class="text-3xl font-semibold text-gray-900">
                                                                                        New Project</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </NuxtLink>
                                                                </div>
                                                                
                                                              
                                                                <proj-card />
                                                             
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
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
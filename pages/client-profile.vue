<script setup>
import { ref, onMounted} from 'vue';

definePageMeta({
  layout: 'template-default'
})

const client = ref({});
const profile = ref({});

onMounted(async () => {
    await clientView();
    await profileView();
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
                                                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="User Cover"
                                                        class="object-cover w-full h-full rounded-t-lg" />
                                                    <div class="absolute inset-0 opacity-50 bg-gradient-to-t from-gray-900"></div>
                                                </div> 
                                                <div class="flex flex-row w-full">
                                                    <div class="relative flex-col items-start justify-start mt-custom ml-custom">
                                                        <div class="flex items-start justify-start">
                                                            <img :src="profile.profile_route" alt="" class="w-48 h-48 rounded-full">
                                                        </div>
                                                        
                                                        <div class="mt-3">
                                                            <h6 class="text-2xl font-bold text-gray-900 dark:text-gray-50">{{client.first_name}} {{client.last_name}}</h6>
                                                            <p class="mt-1 text-gray-500 dark:text-gray-300">{{client.about_me }}</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-end w-full p-5 items-right">
                                                        <a href="https://www.youtube.com/watch?v=eRYZVkxHBls"><img src="assets/images/logo/editt.svg" alt="" class="w-6 h-6" ></a>
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
                                                <li class="w-10 h-10 leading-8 text-center duration-300 rounded-full hover:bg-violet-500 hover:text-white hover:transition-all dark:text-white">
                                                    <a href="javascript:void(0)"><i class="uil uil-facebook-f"></i></a>
                                                </li>
                                                <li class="w-10 h-10 leading-8 text-center duration-300 rounded-full hover:bg-violet-500 hover:text-white hover:transition-all dark:text-white">
                                                    <a href="javascript:void(0)"><i class="uil uil-whatsapp"></i></a>
                                                </li>
                                                <li class="w-10 h-10 leading-8 text-center duration-300 rounded-full hover:bg-violet-500 hover:text-white hover:transition-all dark:text-white">
                                                    <a href="javascript:void(0)"><i class="uil uil-twitter-alt"></i></a>
                                                </li>
                                                <li class="w-10 h-10 leading-8 text-center duration-300 rounded-full hover:bg-violet-500 hover:text-white hover:transition-all dark:text-white">
                                                    <a href="javascript:void(0)"><i class="uil uil-dribbble"></i></a>
                                                </li>
                                                <li class="w-10 h-10 leading-8 text-center duration-300 rounded-full hover:bg-violet-500 hover:text-white hover:transition-all dark:text-white">
                                                    <a href="javascript:void(0)"><i class="uil uil-envelope"></i></a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="mb-8">
                                            <h5 class="p-2 mb-5 text-gray-900 text-16">Photos</h5>
                                            <div class="grid grid-cols-12 gap-3">
                                                <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                    <a href="assets/images/blog/img-01.jpg" class="image-popup"><img src="assets/images/blog/img-01.jpg" alt="" class=""></a>
                                                </div>
                                                <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                    <a href="assets/images/blog/img-02.jpg" class="image-popup"><img src="assets/images/blog/img-02.jpg" alt="" class=""></a>
                                                </div>
                                                <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                    <a href="assets/images/blog/img-03.jpg" class="image-popup"><img src="assets/images/blog/img-03.jpg" alt="" class=""></a>
                                                </div>
                                                <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                    <a href="assets/images/blog/img-04.jpg" class="image-popup"><img src="assets/images/blog/img-04.jpg" alt="" class=""></a>
                                                </div>
                                                <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                    <a href="assets/images/blog/img-05.jpg" class="image-popup"><img src="assets/images/blog/img-05.jpg" alt="" class=""></a>
                                                </div>
                                                <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                    <a href="assets/images/blog/img-06.jpg" class="image-popup"><img src="assets/images/blog/img-06.jpg" alt="" class=""></a>
                                                </div>
                                                <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                    <a href="assets/images/blog/img-07.jpg" class="image-popup"><img src="assets/images/blog/img-07.jpg" alt="" class=""></a>
                                                </div>
                                                <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                    <a href="assets/images/blog/img-08.jpg" class="image-popup"><img src="assets/images/blog/img-08.jpg" alt="" class=""></a>
                                                </div>
                                                <div class="col-span-4 md:col-span-6 lg:col-span-4">
                                                    <a href="assets/images/blog/img-10.jpg" class="image-popup"><img src="assets/images/blog/img-10.jpg" alt="" class=""></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div class="col-span-12 lg:col-span-7">
                                <div>
                                    <div class="mt-24">
                                        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                                        <div class="flex flex-row items-center justify-center gap-2">
                                            <img :src="profile.profile_route" alt="User profile" class="w-12 h-12 rounded-full" />
                                            <textarea rows="1" class="w-full h-10 text-left truncate border border-gray-400 rounded-full resize-none xs:text-sm sm:text-lg dark:bg-gray-700 dark:text-white dark:border-gray-500" placeholder="Start a post, try writing with AI"></textarea>
                                        </div>
                                        <div class="flex justify-between mt-2 sm:px-4">
                                            <div
                                                class="flex items-center gap-2 p-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <span class="text-blue-400 material-symbols-outlined">panorama</span>
                                                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300">Media</h3>
                                            </div>

                                            <div
                                                class="flex items-center gap-2 p-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <span class="text-yellow-700 material-symbols-outlined">calendar_month</span>
                                                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300">Event</h3>
                                            </div>

                                            <div
                                                class="flex items-center gap-2 rounded-sm cursor-pointer sm:p-2 xs:p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <span class="text-orange-400 material-symbols-outlined">newsmode</span>
                                                <h3 class="text-sm text-gray-600 sm:font-semibold xs:truncate dark:text-gray-300">Write article</h3>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-14">
                                        <div class="flex flex-row items-start justify-start gap-2">
                                            <img :src="profile.profile_route" alt="User profile" class="w-12 h-12 rounded-full" />
                                            <div>
                                                <a href="blog-details.html"><h5 class="mb-1 text-center text-[18.75px] text-gray-900 dark:text-gray-50">{{client.first_name}} {{ client.last_name }}</h5></a>
                                                <p class="text-gray-500 dark:text-gray-300">Sep 06, 2021</p>
                                            </div>
                                        </div>
                                        <p class="mt-10 mb-4 text-gray-500 dark:text-gray-300">Whether article spirits new her covered hastily sitting her. Money witty books nor son add. Chicken age had evening believe but proceed pretend mrs. At missed advice my it no sister. Miss told ham dull knew see she spot near can. Spirit her entire her called.</p>
                                        <div class="mt-5 mb-5">
                                            <a href="blog-details.html"><img src="assets/images/blog/img-12.jpg" alt="" class="rounded-md"></a>
                                        </div>
                                        <div class="flex justify-between mt-2 sm:px-4">
                                            <div
                                                class="flex items-center gap-2 p-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <span class="text-blue-400 material-symbols-outlined">panorama</span>
                                                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300">Media</h3>
                                            </div>

                                            <div
                                                class="flex items-center gap-2 p-2 rounded-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <span class="text-yellow-700 material-symbols-outlined">calendar_month</span>
                                                <h3 class="text-sm font-semibold text-gray-600 dark:text-gray-300">Event</h3>
                                            </div>

                                            <div
                                                class="flex items-center gap-2 rounded-sm cursor-pointer sm:p-2 xs:p-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <span class="text-orange-400 material-symbols-outlined">newsmode</span>
                                                <h3 class="text-sm text-gray-600 sm:font-semibold xs:truncate dark:text-gray-300">Write article</h3>
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
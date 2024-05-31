<script>
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
                                                    <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="User Cover"
                                                        class="object-cover w-full h-full rounded-t-lg" />
                                                    <div class="absolute inset-0 opacity-50 bg-gradient-to-t from-gray-900"></div>
                                                </div> 
                                                
                                                <div class="flex flex-row w-full">
                                                    <div class="relative flex items-end justify-start w-full gap-3 mt-6 flex-cols">
                                                        <div class="flex items-start justify-start">
                                                            <img id="profile-img" :src="profile.profile_route" alt="" class="w-48 h-48">
                                                        </div>
                                                        <div class="flex flex-col mt-3">
                                                            <h6 class="text-2xl font-bold text-gray-900 dark:text-gray-50">James Bond</h6>
                                                            <p class="mt-1 text-gray-500 dark:text-gray-300">Lowkey man</p>
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-end w-full p-5 items-right">
                                                        <NuxtLink to="/client-edit"><img src="assets/images/logo/editt.svg" alt="" class="w-6 h-6" ></NuxtLink>
                                                    </div>
                                                </div>

                                                <div class="flex flex-row w-full gap-3 mt-10">
                                                    <div class="flex items-center justify-center">
                                                        <button class="flex items-center gap-2 px-6 py-2 text-sm font-bold text-green-900 border border-gray-300 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">                       
                                                            <img src="assets/images/renovation/star.svg" alt="" class="w-6 h-6">
                                                            <span class="">Get Vouch</span>
                                                        </button>
                                                    </div>
                                                    <div class="flex items-center justify-center">
                                                        <button class="flex items-center gap-2 px-6 py-2 text-sm font-bold text-green-900 border border-gray-300 rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">                       
                                                            <img src="assets/images/renovation/share.svg" alt="" class="w-6 h-6">
                                                            <span class="">Share</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <hr class="mt-3 border-gray-200">
                                                <div class="flex flex-row w-full gap-3 mt-10">
                                                    <div class="flex items-start justify-start w-full text-2xl font-semibold">
                                                        <p class="w-full">0 projects</p>
                                                        <div class="flex justify-end w-full items-right">
                                                            <a href="https://www.youtube.com/watch?v=eRYZVkxHBls"><img src="assets/images/logo/editt.svg" alt="" class="w-8 h-8 p-1 border" ></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <section class="py-16">
                                                    <div class="container mx-auto">
                                                        <div class="grid grid-cols-12 md:gap-12 gap-y-8 md:gap-y-0">
                                                            <div class="col-span-12 lg:col-span-12">
                                                                <div class="grid grid-cols-12 md:gap-5">
                                                                    <div class="col-span-12 lg:col-span-4">
                                                                        <div class="flex flex-col items-center justify-center p-2 transition-all duration-500 bg-gray-400 border-2 border-dashed rounded-md h-72 hover:bg-gray-500 hover:underline dark:bg-transparent dark:shadow-none">
                                                                            <div>
                                                                                <div class="w-auto mt-6 text-center h-80">
                                                                                    <button class="flex flex-col items-center justify-center p-10">
                                                                                        <img src="assets/images/renovation/add.svg" alt="" class="w-16 h-16">
                                                                                        <p class="text-3xl font-semibold text-gray-900">New Project</p>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </NuxtLink>
                                                                    </div>

                                                                    <proj-card />
                                                                    <!-- <div class="col-span-12 lg:col-span-4">
                                                                        <div class="p-2 transition-all duration-500 bg-white rounded-md shadow-md dark:bg-transparent dark:shadow-none">
                                                                            <img src="assets/images/blog/img-05.jpg" alt="" class="img-fluid">
                                                                            <div class="p-5">
                                                                                <ul class="flex justify-between mb-3 list-inline">
                                                                                    <li>
                                                                                        <p class="mb-0 text-gray-500 dark:text-gray-300"><a href="blog-author.html" class="font-semibold text-muted">Kiera Finchr</a> - July 23, 2021</p>
                                                                                    </li>
                                                                                    <li>
                                                                                        <p class="mb-0 text-gray-500 dark:text-gray-300"><i class="mdi mdi-eye"></i> 247</p>
                                                                                    </li>
                                                                                </ul>
                                                                                <a href="blog-details.html" class="primary-link"><h6 class="text-gray-900 transition-all duration-300 text-17 dark:text-white group-data-[theme-color=violet]:hover:text-violet-500 group-data-[theme-color=sky]:hover:text-sky-500 group-data-[theme-color=red]:hover:text-red-500 group-data-[theme-color=green]:hover:text-green-500 group-data-[theme-color=pink]:hover:text-pink-500 group-data-[theme-color=blue]:hover:text-blue-500">How To Increase Trade Show Traffic</h6></a>
                                                                                <p class="mt-2 text-gray-500 dark:text-gray-300">Intrinsically incubate intuitive opportunities and real-time potentialities Appropriately communicate one-to-one technology.</p>
                                                                                <div class="mt-4 font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                                                                    <a href="blog-details.html" class="form-text ">Read More <i class="uil uil-angle-right-b"></i></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> -->
                                                                    <!-- <div class="col-span-12 lg:col-span-4">
                                                                        <div class="p-2 transition-all duration-500 bg-white rounded-md shadow-md dark:bg-transparent dark:shadow-none">
                                                                            <img src="assets/images/blog/img-06.jpg" alt="" class="img-fluid">
                                                                            <div class="p-5">
                                                                                <ul class="flex justify-between mb-3 list-inline">
                                                                                    <li>
                                                                                        <p class="mb-0 text-gray-500 dark:text-gray-300"><a href="blog-author.html" class="font-semibold text-muted">Toby Lees</a> - July 11, 2021</p>
                                                                                    </li>
                                                                                    <li>
                                                                                        <p class="mb-0 text-gray-500 dark:text-gray-300"><i class="mdi mdi-eye"></i> 188</p>
                                                                                    </li>
                                                                                </ul>
                                                                                <a href="blog-details.html" class="primary-link"><h6 class="text-gray-900 transition-all duration-300 text-17 dark:text-white group-data-[theme-color=violet]:hover:text-violet-500 group-data-[theme-color=sky]:hover:text-sky-500 group-data-[theme-color=red]:hover:text-red-500 group-data-[theme-color=green]:hover:text-green-500 group-data-[theme-color=pink]:hover:text-pink-500 group-data-[theme-color=blue]:hover:text-blue-500">How apps is changing the IT world</h6></a>
                                                                                <p class="mt-2 text-gray-500 dark:text-gray-300">Intrinsically incubate intuitive opportunities and real-time potentialities Appropriately communicate one-to-one technology.</p>
                                                                                <div class="mt-4 font-medium group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                                                                    <a href="blog-details.html" class="form-text ">Read More <i class="uil uil-angle-right-b"></i></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> -->
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
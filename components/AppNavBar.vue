<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const client = ref({});
const profile = ref({});
const router = useRouter();
const showNavbarAccount = ref(false);

onMounted(async () => {
    await clientView();
    await profileView();
    showNavbarAccount.value = true;
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

const profileLink = computed(() => {
    const userType = getCookie('user-type');
    return userType === 'client' ? '/client-profile' : '/professional-profile';
});

async function clientView() {
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

async function logout() {
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
        const response = await fetch(`http://localhost:8000/api/${endpoint}/credential-logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (response.ok) {
            // Clear the cookies by setting their Max-Age to 0
            document.cookie = 'access_token=; Max-Age=0; path=/;';
            document.cookie = 'user-type=; Max-Age=0; path=/;';
            router.push('/');
        } else {
            console.error(`Failed to logout ${userType}:`, response.statusText);
        }
    } catch (error) {
        console.error(`Error during logout ${userType}:`, error);
    }
}
</script>

<template>
    <div class="hidden px-5 mx-auto border-gray-200 container-fluid lg:px-24 bg-gray-50 md:block dark:bg-neutral-600">
        <div class="grid items-center grid-cols-12">
            <div class="col-span-7">
                <ul class="flex items-center py-3">
                    <li class="ltr:mr-4 rtl:ml-4">
                        <p class="mb-0 text-gray-800 text-13 dark:text-gray-50"> <i class="mdi mdi-map-marker"></i> Your
                            Location: <a href="javascript:void(0)" class="font-medium">Philippines</a></p>
                    </li>
                    <li>
                        <ul class="flex flex-wrap gap-4 text-gray-800 ">
                            <li
                                class="transition-all duration-200 ease-in hover:text-green-500 dark:text-gray-50 dark:hover:text-green-500">
                                <a href="javascript:void(0)" class="social-link"><i class="uil uil-whatsapp"></i></a>
                            </li>
                            <li
                                class="transition-all duration-200 ease-in hover:text-green-500 dark:text-gray-50 dark:hover:text-green-500">
                                <a href="javascript:void(0)" class="social-link"><i
                                        class="uil uil-facebook-messenger-alt"></i></a>
                            </li>
                            <li
                                class="transition-all duration-200 ease-in hover:text-green-500 dark:text-gray-50 dark:hover:text-green-500">
                                <a href="javascript:void(0)" class="social-link"><i class="uil uil-instagram"></i></a>
                            </li>
                            <li
                                class="transition-all duration-200 ease-in hover:text-green-500 dark:text-gray-50 dark:hover:text-green-500">
                                <a href="javascript:void(0)" class="social-link"><i class="uil uil-envelope"></i></a>
                            </li>
                            <li
                                class="transition-all duration-200 ease-in hover:text-green-500 dark:text-gray-50 dark:hover:text-green-500">
                                <a href="javascript:void(0)" class="social-link"><i class="uil uil-twitter-alt"></i></a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="col-span-5 ltr:ml-auto rtl:mr-auto">
                <ul class="flex items-center gap-4">
                    <li>
                        <div class="relative hidden dropdown language sm:block">
                            <button class="px-4 py-3 border-0 btn dropdown-toggle" type="button" aria-expanded="false"
                                data-dropdown-toggle="navNotifications">
                                <img src="/images/flags/us.jpg" alt="" class="h-4" id="header-lang-img">
                            </button>
                            <div class="absolute top-auto z-50 hidden w-40 list-none bg-white rounded shadow dropdown-menu -left-20 dark:bg-neutral-700"
                                id="navNotifications">
                                <ul class="border border-gray-50 dark:border-gray-700"
                                    aria-labelledby="navNotifications">
                                    <li>
                                        <a href="#"
                                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/50 dark:text-gray-200 dark:hover:bg-neutral-600/50 dark:hover:text-white"><img
                                                src="/images/flags/us.jpg" alt="user-image"
                                                class="inline-block h-3 mr-1"> <span
                                                class="align-middle">English</span></a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/50 dark:text-gray-200 dark:hover:bg-neutral-600/50 dark:hover:text-white"><img
                                                src="/images/flags/spain.jpg" alt="user-image"
                                                class="inline-block h-3 mr-1"> <span
                                                class="align-middle">Spanish</span></a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/50 dark:text-gray-200 dark:hover:bg-neutral-600/50 dark:hover:text-white"><img
                                                src="/images/flags/germany.jpg" alt="user-image"
                                                class="inline-block h-3 mr-1"> <span
                                                class="align-middle">German</span></a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50/50 dark:text-gray-200 dark:hover:bg-neutral-600/50 dark:hover:text-white"><img
                                                src="/images/flags/italy.jpg" alt="user-image"
                                                class="inline-block h-3 mr-1"> <span
                                                class="align-middle">Italian</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <nav class="navbar fixed right-0 left-0 top-0 lg:top-[44.5px] px-5 lg:px-24 transition-all duration-500 ease shadow-lg shadow-gray-200/20 bg-white border-gray-200 dark:bg-neutral-800 z-40 dark:shadow-neutral-900"
        id="navbar">
        <div class="mx-auto container-fluid">
            <div class="flex items-center mx-auto lg:flex-wrap justify-normal lg:justify-between">
                <a href="/" class="flex items-center">
                    <img src="assets/images/renovation.svg" alt="" class="logo-dark h-[22px] block dark:hidden">
                </a>
                <button data-collapse-toggle="navbar-collapse" type="button"
                    class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg navbar-toggler group lg:hidden hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
                <div class="lg:order-2">
                    <div v-if="showNavbarAccount && profile.profile_route == null" class="flex flex-row">
                        <div class="lg:px-4">
                            <div class="relative dropdown">
                                <div class="relative">
                                    <button type="button"
                                        class="py-6 btn border-0 h-[70px] dropdown-toggle px-2 text-gray-500 dark:text-gray-300"
                                        aria-expanded="false" data-dropdown-toggle="notification">
                                        <i class="text-2xl mdi mdi-bell"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-2 cursor-pointer">
                            <div>
                                <NuxtLink to="/sign-in" class="relative dropdown ltr:mr-4 rtl:ml-4">
                                    <p
                                        class="py-8 font-bold dropdown-toggle  dark:text-gray-50 lg:h-[70px] group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                        Sign In</p>
                                </NuxtLink>
                            </div>
                            <div>
                                <NuxtLink to="/choose-role" class="relative dropdown ltr:mr-4 rtl:ml-4">
                                    <p
                                        class="py-8 font-bold dropdown-toggle  dark:text-gray-50 lg:h-[70px] group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                        Sign Up</p>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="showNavbarAccount" class="flex flex-row">
                        <div>
                            <div class="relative dropdown">
                                <NuxtLink to="/projectForm" class="flex items-center py-3 rounded border-dashed mt-4 border lg:px-4 dropdown-toggle"
                                    id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="true">
                                    <img src="assets/images/renovation/add.svg" alt="" class="w-6 h-6">
                                </NuxtLink>
                                </div>
                        </div>

                        <div>
                            <div class="relative dropdown">
                                <div class="relative">
                                    <button type="button"
                                        class="btn border-0 mt-1 h-[70px] dropdown-toggle px-4 text-gray-500 dark:text-gray-300"
                                        aria-expanded="false" data-dropdown-toggle="notification">
                                        <i class="text-2xl mdi mdi-bell"></i>
                                    </button>
                                    <span
                                        class="absolute text-xs px-1.5 mt-1 bg-red-500 text-white font-medium rounded-full left-6 top-3 ring-2 ring-white dark:ring-neutral-800">3</span>
                                </div>
                                <div class="absolute right-0 top-auto left-auto z-50 hidden list-none bg-white rounded shadow dropdown-menu w-72 dark:bg-neutral-800 "
                                    id="notification">
                                    <div class="border rounded border-gray-50 dark:border-neutral-600"
                                        aria-labelledby="notification">
                                        <div class="grid grid-cols-1 ">
                                            <div class="p-4 bg-gray-50 dark:bg-neutral-700">
                                                <h6 class="mb-1 text-gray-800 dark:text-gray-50"> Notification </h6>
                                                <p class="mb-0 text-gray-500 text-13 dark:text-gray-300">You have 4
                                                    unread Notification</p>
                                            </div>
                                        </div>
                                        <div class="h-60" data-simplebar>
                                            <div>
                                                <a href="#!">
                                                    <div
                                                        class="flex p-4 hover:bg-gray-50/30 dark:hover:bg-neutral-600/50">
                                                        <div class="flex-shrink-0 ltr:mr-3 rtl:ml-3">
                                                            <div
                                                                class="h-10 w-10 bg-violet-500/20 rounded-full text-center leading-[2.8]">
                                                                <i
                                                                    class="text-lg text-violet-500 uil uil-user-check"></i>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow">
                                                            <h6 class="mb-1 text-sm text-gray-700 dark:text-gray-300">22
                                                                verified registrations</h6>
                                                            <div class="text-gray-600 text-13 dark:text-gray-300">
                                                                <p class="mb-0"><i
                                                                        class="mdi mdi-clock-outline dark:text-gray-300"></i>
                                                                    <span>3 hour ago</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>

                                                <a href="#!">
                                                    <div
                                                        class="flex items-center p-4 hover:bg-gray-50/30 dark:hover:bg-neutral-600/50">
                                                        <div class="flex-shrink-0 ltr:mr-3 rtl:ml-3">
                                                            <img src="/images/user/img-01.jpg"
                                                                class="w-10 h-10 rounded-full" alt="user-pic">
                                                        </div>
                                                        <div class="flex-grow">
                                                            <h6 class="mb-1 text-sm text-gray-700 dark:text-gray-300">
                                                                Kevin Stewart</h6>
                                                            <div class="text-gray-600 text-13 dark:text-gray-300">
                                                                <p class="mb-0"><i
                                                                        class="mdi mdi-clock-outline dark:text-gray-300"></i>
                                                                    <span>1 hour ago</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>

                                                <a href="#!">
                                                    <div
                                                        class="flex items-center p-4 hover:bg-gray-50/30 dark:hover:bg-neutral-600/50">
                                                        <div class="flex-shrink-0 ltr:mr-3 rtl:ml-3">
                                                            <img src="/images/featured-job/img-04.png"
                                                                class="w-10 h-10 rounded-full" alt="user-pic">
                                                        </div>
                                                        <div class="flex-grow">
                                                            <h6 class="mb-1 text-sm text-gray-700 dark:text-gray-300">
                                                                Applications has been approved</h6>
                                                            <div class="text-gray-600 text-13 dark:text-gray-300">
                                                                <p class="mb-0"><i
                                                                        class="mdi mdi-clock-outline dark:text-gray-300"></i>
                                                                    <span>45 min ago</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>

                                                <a href="#!">
                                                    <div
                                                        class="flex items-center p-4 hover:bg-gray-50/30 dark:hover:bg-neutral-600/50">
                                                        <div class="flex-shrink-0 ltr:mr-3 rtl:ml-3">
                                                            <img src="/images/user/img-02.jpg"
                                                                class="w-10 h-10 rounded-full" alt="user-pic">
                                                        </div>
                                                        <div class="flex-grow">
                                                            <h6 class="mb-1 text-sm text-gray-700 dark:text-gray-300">
                                                                Salena Layfield</h6>
                                                            <div class="text-gray-600 text-13 dark:text-gray-300">
                                                                <p class="mb-0"><i
                                                                        class="mdi mdi-clock-outline dark:text-gray-300"></i>
                                                                    <span>15 min ago</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>

                                                <a href="#!">
                                                    <div
                                                        class="flex items-center p-4 hover:bg-gray-50/30 dark:hover:bg-neutral-600/50">
                                                        <div class="flex-shrink-0 ltr:mr-3 rtl:ml-3">
                                                            <img src="/images/featured-job/img-01.png"
                                                                class="w-10 h-10 rounded-full" alt="user-pic">
                                                        </div>
                                                        <div class="flex-grow">
                                                            <h6 class="mb-1 text-sm text-gray-700 dark:text-gray-300">
                                                                Creative Agency</h6>
                                                            <div class="text-gray-600 text-13 dark:text-gray-300">
                                                                <p class="mb-0"><i
                                                                        class="mdi mdi-clock-outline dark:text-gray-300"></i>
                                                                    <span>15 min ago</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>

                                            </div>
                                        </div>
                                        <div
                                            class="grid p-1 border-t border-gray-50 dark:border-zinc-600 justify-items-center bg-gray-50 dark:bg-neutral-700">
                                            <a class="border-0 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500 btn dark:text-gray-50"
                                                href="javascript:void(0)">
                                                <i class="mr-1 mdi mdi-arrow-right-circle"></i> <span>View More..</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="relative dropdown ltr:mr-4 rtl:ml-4">
                                <button type="button" class="flex items-center py-5 lg:px-4 dropdown-toggle"
                                    id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="true">
                                    <img class="rounded-full size-1 lg:size-small ltr:xl:mr-2 rtl:xl:ml-2"
                                        :src="profile.profile_route" alt="Header Avatar">
                                    <span class="hidden font-medium text-gray-500 xl:block dark:text-gray-50">{{
                                        client.user_name }}</span>
                                </button>
                                <ul class="absolute top-auto z-50 hidden w-48 p-3 list-none bg-white border rounded shadow-lg dropdown-menu border-gray-500/20 xl:ltr:-left-3 ltr:-left-32 rtl:-right-3 dark:bg-neutral-800"
                                    id="profile/log" aria-labelledby="navNotifications">
                                    <li class="p-2 dropdown-item group/dropdown dark:text-gray-300">
                                        <a class="text-15 font-medium text-gray-800  group-data-[theme-color=violet]:group-hover/dropdown:text-violet-500 group-data-[theme-color=sky]:group-hover/dropdown:text-sky-500 group-data-[theme-color=red]:group-hover/dropdown:text-red-500 group-data-[theme-color=green]:group-hover/dropdown:text-green-500 group-data-[theme-color=pink]:group-hover/dropdown:text-pink-500 group-data-[theme-color=blue]:group-hover/dropdown:text-blue-500 group-hover:pl-1.5 transition-all duration-300 ease-in dark:text-gray-50"
                                            href="manage-jobs.html">Manage Jobs</a>
                                    </li>
                                    <li class="p-2 dropdown-item group/dropdown dark:text-gray-300">
                                        <a class="text-15 font-medium text-gray-800 group-data-[theme-color=violet]:group-hover/dropdown:text-violet-500 group-data-[theme-color=sky]:group-hover/dropdown:text-sky-500 group-data-[theme-color=red]:group-hover/dropdown:text-red-500 group-data-[theme-color=green]:group-hover/dropdown:text-green-500 group-data-[theme-color=pink]:group-hover/dropdown:text-pink-500 group-data-[theme-color=blue]:group-hover/dropdown:text-blue-500 group-hover:pl-1.5 transition-all duration-300 ease-in dark:text-gray-50"
                                            href="bookmark-jobs.html">Bookmarks Jobs</a>
                                    </li>
                                    <li class="p-2 dropdown-item group/dropdown dark:text-gray-300">
                                        <NuxtLink :to="profileLink"
                                            class="text-15 font-medium text-gray-800 group-data-[theme-color=violet]:group-hover/dropdown:text-violet-500 group-data-[theme-color=sky]:group-hover/dropdown:text-sky-500 group-data-[theme-color=red]:group-hover/dropdown:text-red-500 group-data-[theme-color=green]:group-hover/dropdown:text-green-500 group-data-[theme-color=pink]:group-hover/dropdown:text-pink-500 group-data-[theme-color=blue]:group-hover/dropdown:text-blue-500 group-hover:pl-1.5 transition-all duration-300 ease-in dark:text-gray-50">
                                            My Profile
                                        </NuxtLink>
                                    </li>
                                    <li class="p-2 dropdown-item group/dropdown dark:text-gray-300">
                                        <a href="/">
                                            <div @click.prevent="logout"
                                                class="text-15 font-medium text-gray-800 group-data-[theme-color=violet]:group-hover/dropdown:text-violet-500 group-data-[theme-color=sky]:group-hover/dropdown:text-sky-500 group-data-[theme-color=red]:group-hover/dropdown:text-red-500 group-data-[theme-color=green]:group-hover/dropdown:text-green-500 group-data-[theme-color=pink]:group-hover/dropdown:text-pink-500 group-data-[theme-color=blue]:group-hover/dropdown:text-blue-500 group-hover:pl-1.5 transition-all duration-300 ease-in dark:text-gray-50">
                                                Logout</div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div v-else class="flex items-center px-6">
                        <button type="button" class="flex items-center px-4 py-5 dropdown-toggle"
                            id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="true">
                            <span class="bg-gray-500 rounded-full size-1 lg:size-small ltr:xl:mr-2 rtl:xl:ml-2"
                                alt="Header Avatar"></span>
                            <span class="hidden font-medium text-gray-200 xl:block dark:text-gray-50">Loading....</span>
                        </button>
                    </div>
                </div>

                <div id="navbar-collapse"
                    class="navbar-res items-center justify-between w-full text-sm lg:flex lg:w-auto lg:order-1 group-focus:[.navbar-toggler]:block hidden">
                    <ul class="flex flex-col items-start mt-5 mb-10 font-medium text-black dark:text-white lg:mt-0 lg:mb-0 lg:items-center lg:flex-row"
                        id="navigation-menu">
                        <li class="relative dropdown lg:mt-0">
                            <NuxtLink to="/gallery">
                                <button class="py-5 text-black lg:px-4 dropdown-toggle dark:text-gray-50 lg:h-[70px]"
                                    id="gallery" data-bs-toggle="dropdown">
                                    Explore Spaces <i class='bx bxs-chevron-down ltr:ml-1 rtl:mr-1'></i>
                                </button>
                            </NuxtLink>
                            <ul class="z-50 w-auto p-5 bg-white border-0 rounded dropdown-menu lg:absolute lg:border border-gray-500/20 lg:shadow-lg dark:bg-neutral-800"
                                aria-labelledby="category">
                                <CategoriesDrop />
                            </ul>

                        </li>



                        <li class="relative dropdown lg:mt-0">
                            <NuxtLink to="/services">
                                <button class="py-5 text-black lg:px-4 dropdown-toggle dark:text-gray-50 lg:h-[70px]"
                                    id="services" data-bs-toggle="dropdown">Discover Services <i
                                        class='align-middle bx bxs-chevron-down ltr:ml-1 rtl:mr-1'></i></button>
                            </NuxtLink>
                            <ul class="z-50 w-auto p-5 bg-white border-0 rounded dropdown-menu lg:absolute lg:border border-gray-500/20 lg:shadow-lg dark:bg-neutral-800"
                                aria-labelledby="services">
                                <ServicesDrop />
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
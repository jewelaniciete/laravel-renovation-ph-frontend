<script setup>
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'template-extra'
})
const router = useRouter();
const formData = ref({
    email: '',
    password: '',
    remember_me: '',
});

console.log(formData.value);

async function login() {
    try {
        const response = await fetch('http://localhost:8000/api/professionals/credential-login', {
            method: 'POST',
            body: JSON.stringify(formData.value),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            const data = await response.json(); 
            document.cookie = `access_token=${data.data}; path=/; secure; samesite=strict`;

            window.location.href = '/';
        } else {
            const errorData = await response.json();
            console.error('Failed to login:', errorData.message || response.statusText);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}
</script>

<template>
    <div class="main-content">
        <div class="page-content">

            <section class="flex items-center justify-center min-h-screen py-10 group-data-[theme-color=violet]:bg-violet-500/10 group-data-[theme-color=sky]:bg-sky-500/10 group-data-[theme-color=red]:bg-red-500/10 group-data-[theme-color=green]:bg-green-500/10 group-data-[theme-color=pink]:bg-pink-500/10 group-data-[theme-color=blue]:bg-blue-500/10 dark:bg-neutral-700">
                <div class="container mx-auto">
                    <div class="grid grid-cols-12">
                        <div class="col-span-12 lg:col-span-10 lg:col-start-2">
                            <div class="flex flex-col bg-white rounded-lg dark:bg-neutral-800">
                                <div class="grid flex-col grid-cols-12 ">
                                    <div class="col-span-12 lg:col-span-6 ltr:rounded-l-lg rtl:rounded-r-lg">
                                        <div class="flex flex-col items-center justify-center p-10">
                                            <NuxtLink to="/">
                                                <img src="assets/images/renovation.svg" alt="" class="logo-dark h-[22px] block dark:hidden">
                                            </NuxtLink>
                                                                                        <div class="mt-5">
                                                <img src="assets/images/renovation/signin-prof.png" alt="" class="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-span-12 rounded-b-md lg:col-span-6 group-data-[theme-color=violet]:bg-violet-700 group-data-[theme-color=sky]:bg-sky-700 group-data-[theme-color=red]:bg-red-700 group-data-[theme-color=green]:bg-green-700 group-data-[theme-color=pink]:bg-pink-700 group-data-[theme-color=blue]:bg-blue-700 lg:rounded-b-none lg:ltr:rounded-r-lg rtl:rounded-l-lg">
                                        <div class="flex flex-col justify-center h-full p-12">
                                            <div class="text-center">
                                                <h5 class="text-[18.5px] text-white">Welcome Back !</h5>
                                                <p class="mt-3 text-white/80">Sign in as a professional to continue to <span class="font-bold">Renovation Ph</span>.</p>
                                            </div>
                                            <form @submit.prevent="login" class="mt-8">
                                                <div class="mb-5">
                                                    <label for="email" class="text-white">Username</label>
                                                    <input v-model="formData.email" type="text" class="w-full mt-1 bg-white py-2.5 rounded border-transparent placeholder:text-sm placeholder:text-gray-900 text-gray-900" required="" id="email" placeholder="Enter your username">
                                                </div>
                                                <div class="mb-5">
                                                    <label for="password" class="text-white">Password</label>
                                                    <input v-model="formData.password" type="password" class="w-full bg-white mt-1  py-2.5 rounded border-transparent placeholder:text-sm placeholder:text-gray-900 text-gray-900" id="password" placeholder="Enter your password">
                                                </div>
                                                <div><input class="align-middle border-transparent rounded focus:ring-0 focus:ring-offset-0 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=sky]:checked:bg-sky-500 group-data-[theme-color=red]:checked:bg-red-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=pink]:checked:bg-pink-500 group-data-[theme-color=blue]:checked:bg-blue-500" type="checkbox" id="flexCheckDefault">
                                                    <a href="reset-password.html" class="text-white ltr:float-right rtl:float-left">Forgot Password?</a>
                                                    <label class="p-2 text-white align-middle" for="flexCheckDefault">Remember me</label>
                                                </div>
                                                <div class="my-8 text-center">
                                                    <button type="submit" class="btn w-full bg-white text-gray-900 font-medium border-transparent hover:-translate-y-1.5 duration-500 ease">Sign in
                                                </button></div>
                                            </form>
                                            <div class="text-center">
                                                <p class="text-white">Don't have an account yet? <NuxtLink to="/sign-up" class="text-white underline fw-medium"> Sign Up </NuxtLink></p>
                                            </div>
                                            <div class="flex justify-end px-6 mx-auto mt-5 text-white max-w-7xl">
                                               <p>Sign-in as a <NuxtLink to="/sign-in" class="font-semibold text-md hover:underline"> client </NuxtLink></p>
                                            </div>
                                            <div class="flex justify-end px-6 mx-auto mt-5 font-semibold text-white max-w-7xl">
                                                <NuxtLink to="/" class="text-md"> ← Back to Home</NuxtLink>
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

<style scoped>

</style>
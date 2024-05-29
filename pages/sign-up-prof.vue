<script setup>
import { useRouter } from 'vue-router';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

definePageMeta({
  layout: 'template-extra'
});

const formData = ref({
  email: '',
  password: '',
});

async function register() {
  try {
    const response = await fetch('http://localhost:8000/api/professionals/credential-register', {
      method: 'POST',
      body: JSON.stringify(formData.value),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      // Show success toast
      Toastify({
        text: "Registration successful!",
        duration: 3000, // duration in milliseconds
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "#4caf50", // green
      }).showToast();

      // Redirect to sign-in page
      setTimeout(() => {
        window.location.href = '/sign-in-prof'; // Change the URL to your sign-in page
      }, 3000); // delay the redirection to allow user to see the toast
    } else {
      const errorText = await response.text(); // read the error response
      console.error('Failed to register:', errorText);

      // Show error toast
      Toastify({
        text: `Registration failed: ${errorText}`,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#f44336", // red
      }).showToast();
    }
  } catch (error) {
    console.error('Error during registration:', error);

    // Show error toast
    Toastify({
      text: `Error during registration: ${error.message}`,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#f44336", // red
    }).showToast();
  }
}
const router = useRouter();
</script>

<template>
    <div class="main-content">
        <div class="page-content">

            <section class="flex items-center justify-center min-h-screen py-10 group-data-[theme-color=violet]:bg-violet-500/10 group-data-[theme-color=sky]:bg-sky-500/10 group-data-[theme-color=red]:bg-red-500/10 group-data-[theme-color=green]:bg-green-500/10 group-data-[theme-color=pink]:bg-pink-500/10 group-data-[theme-color=blue]:bg-blue-500/10 dark:bg-neutral-700">
                <div class="container mx-auto">
                    <div class="grid grid-cols-12">
                        <div class="col-span-12 lg:col-span-10 lg:col-start-2">
                            <div class="flex flex-col bg-white rounded-lg dark:bg-neutral-800">
                                <div class="grid flex-col grid-cols-12">
                                    <div class="col-span-6 ltr:rounded-l-lg rtl:rounded-r-lg">
                                        <div class="flex flex-col items-center justify-center p-10">
                                            <a href="index.html">
                                                <img src="assets/images/renovation.svg" alt="" class="h-[22px] block dark:hidden">
                                            </a>
                                            <div class="mt-5">
                                                <img src="assets/images/renovation/signup-prof.png" alt="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-span-12 rounded-b-md lg:col-span-6 group-data-[theme-color=violet]:bg-violet-700 group-data-[theme-color=sky]:bg-sky-700 group-data-[theme-color=red]:bg-red-700 group-data-[theme-color=green]:bg-green-700 group-data-[theme-color=pink]:bg-pink-700 group-data-[theme-color=blue]:bg-blue-700 lg:rounded-b-none lg:ltr:rounded-r-lg rtl:rounded-l-lg">
                                        <div class="flex flex-col justify-center h-full p-12">
                                            <div class="text-center">
                                                <h5 class="text-[18.5px] text-white">Let's Get Started</h5>
                                                <p class="mt-3 text-gray-50">Sign up and get access to all the features of <span class="font-bold">Renovation Ph</span>.</p>
                                            </div>
                                            <form @submit.prevent="register" class="mt-8">
                                                
                                                <div class="mb-5">
                                                    <label for="passwordInput" class="text-white">Email</label>
                                                    <input type="email" v-model="formData.email" class="w-full mt-1 py-2.5 rounded border-transparent placeholder:text-sm placeholder:text-gray-900 text-gray-900" required="" id="emailInput" placeholder="Enter your email">
                                                </div>
                                                <div class="mb-5">
                                                    <label for="emailInput" class="text-white">Password</label>
                                                    <input type="password" v-model="formData.password" class="w-full mt-1  py-2.5 rounded border-transparent placeholder:text-sm placeholder:text-gray-900 text-gray-900" id="passwordInput" placeholder="Enter your password">
                                                </div>
                                                <div class="mb-4">
                                                    <div><input class="align-middle border-transparent rounded focus:ring-0 focus:ring-offset-0 group-data-[theme-color=violet]:checked:bg-violet-500 group-data-[theme-color=sky]:checked:bg-sky-500 group-data-[theme-color=red]:checked:bg-red-500 group-data-[theme-color=green]:checked:bg-green-500 group-data-[theme-color=pink]:checked:bg-pink-500 group-data-[theme-color=blue]:checked:bg-blue-500" type="checkbox" id="flexCheckDefault">
                                                        <label class="p-2 text-white align-middle" for="flexCheckDefault">I agree to the <a href="javascript:void(0)" class="pb-1 text-white underline align-middle">Terms and conditions</a></label>
                                                    </div>
                                                </div>
                                                <div class="my-5 text-center">
                                                    <button type="submit" class="btn w-full bg-white text-gray-900 font-medium border-transparent hover:-translate-y-1.5 duration-500 ease">Sign Up
                                                </button></div>
                                            </form>
                                            <div class="text-center">
                                                <p class="text-white">Already a member ? <NuxtLink to="/sign-in-prof" class="text-white underline fw-medium"> Sign In </NuxtLink></p>
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
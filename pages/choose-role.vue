<script setup>
    definePageMeta({
        layout: 'template-extra'
    });

</script>

<template>
    <div class="main-content">
        <div class="page-content">
            <section class="flex flex-col items-center justify-center min-h-screen py-10 group-data-[theme-color=violet]:bg-violet-500/10 group-data-[theme-color=sky]:bg-sky-500/10 group-data-[theme-color=red]:bg-red-500/10 group-data-[theme-color=green]:bg-green-500/10 group-data-[theme-color=pink]:bg-pink-500/10 group-data-[theme-color=blue]:bg-blue-500/10 dark:bg-neutral-700">
                <div class="flex items-center w-full max-w-md mb-10">
                    <img src="assets/images/renovation.svg" alt="" class="logo-dark h-[22px] block dark:hidden">

                    </div>
                <div class="container gap-3">
                    <div class="grid grid-cols-12">
                        <div class="col-span-12 shadow-xl lg:col-span-10 lg:col-start-2">
                            <div class="flex flex-col bg-white rounded-lg dark:bg-neutral-800">
                                <div class="grid flex-col grid-cols-12">
                                    <!-- link for client sign up -->
                                    <NuxtLink to="/sign-up" class="col-span-6 ">
                                            <div class="flex flex-col justify-center p-3">
                                                <div class = "flex justify-center mb-3">
                                                    <img src="assets/images/choose_one.svg" class="w-48 h-48" alt="" />
                                                </div>
                                                <h3 class="font-bold text-center text-green-900"> Join as Client </h3>
                                            </div>
                                    </NuxtLink>

                                    <!-- link for professional sign up -->
                                    <NuxtLink to="/sign-up-prof" class=" col-span-6 rounded-lg group-data-[theme-color=green]:bg-green-400/40">
                                        <div class="flex flex-col justify-center m-10 p-3">
                                            <div class = "flex justify-center mt-10 ">
                                                <img src="assets/images/choose_two.svg" class="w-48 h-48" alt="" />
                                            </div>
                                            <h3 class="font-bold text-center text-green-900"> Join as Professional</h3>
                                        </div> 
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>  
        </div>
    </div>
</template>

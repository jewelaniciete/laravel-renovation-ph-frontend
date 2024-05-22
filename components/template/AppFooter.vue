<script setup>
const currentYear = ref(new Date().getFullYear())
</script>

<template>
    <!-- Footer Start -->
    <footer class="footer ">
        <!-- start footer -->
        <section class="py-12 bg-zinc-800 dark:bg-neutral-900">
            <div class="container mx-auto">
                <div class="grid grid-cols-12 lg:gap-10">
                    <div class="col-span-12 xl:col-span-4">
                        <div class="mr-12">
                            <h4 class="text-white mb-6 text-[23px]">Jobcy</h4>
                            <p class="text-white/50 dark:text-gray-300">
                                It is a long established fact that a reader will be of a page reader
                                will be of at its layout.
                            </p>
                            <p class="mt-3 text-white dark:text-gray-50">Follow Us on:</p>
                            <div class="mt-5">
                                <ul class="flex gap-3">
                                    <li class="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                        <a href="#">
                                            <i class="uil uil-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li class="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                        <a href="#">
                                            <i class="uil uil-linkedin-alt"></i>
                                        </a>
                                    </li>
                                    <li class="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                        <a href="#">
                                            <i class="uil uil-google"></i>
                                        </a>
                                    </li>
                                    <li class="w-8 h-8 leading-loose text-center text-gray-200 transition-all duration-300 border rounded-full cursor-pointer border-gray-200/50 hover:text-gray-50 group-data-[theme-color=violet]:hover:bg-violet-500 group-data-[theme-color=sky]:hover:bg-sky-500 group-data-[theme-color=red]:hover:bg-red-500 group-data-[theme-color=green]:hover:bg-green-500 group-data-[theme-color=pink]:hover:bg-pink-500 group-data-[theme-color=blue]:hover:bg-blue-500 hover:border-transparent">
                                        <a href="#">
                                            <i class="uil uil-twitter"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                        <p class="mb-6 text-white text-16">Company</p>
                        <ul class="space-y-4">
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/company/about">
                                    <i class="mdi mdi-chevron-right"></i> About Us
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/contact">
                                    <i class="mdi mdi-chevron-right"></i> Contact Us
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/company/services">
                                    <i class="mdi mdi-chevron-right"></i> Services
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/blog/blog">
                                    <i class="mdi mdi-chevron-right"></i> Blog
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/company/team">
                                    <i class="mdi mdi-chevron-right"></i> Team
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/company/pricing">
                                    <i class="mdi mdi-chevron-right"></i> Pricing
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                        <p class="mb-6 text-white text-16">For Jobs</p>
                        <ul class="space-y-4">
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/pages/jobs/job-categories">
                                    <i class="mdi mdi-chevron-right"></i> Browser Categories
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/pages/jobs/job-list">
                                    <i class="mdi mdi-chevron-right"></i> Browser Jobs
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/pages/jobs/job-details">
                                    <i class="mdi mdi-chevron-right"></i> Job Details
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/bookmark-jobs">
                                    <i class="mdi mdi-chevron-right"></i> Bookmark Jobs
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                        <p class="mb-6 text-white text-16">For Candidates</p>
                        <ul class="space-y-4">
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/pages/candidates/candidate-list">
                                    <i class="mdi mdi-chevron-right"></i> Candidate List
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/pages/candidates/candidate-grid">
                                    <i class="mdi mdi-chevron-right"></i> Candidate Grid
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/pages/candidates/candidate-details">
                                    <i class="mdi mdi-chevron-right"></i> Candidate Details
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-span-12 mt-8 md:col-span-6 xl:col-span-2 md:mt-0">
                        <p class="mb-6 text-white text-16">Support</p>
                        <ul class="space-y-4">
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/contact">
                                    <i class="mdi mdi-chevron-right"></i> Help Center
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/company/faqs">
                                    <i class="mdi mdi-chevron-right"></i> FAQ'S
                                </a>
                            </li>
                            <li class="text-sm transition-all duration-500 ease-in-out text-white/50 hover:text-gray-50 hover:text-base dark:text-gray-300 dark:hover:text-gray-50">
                                <a href="/template/company/privacy">
                                    <i class="mdi mdi-chevron-right"></i> Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!-- end footer -->
        <!-- strat footer alt -->
        <section class="py-6 border-t bg-zinc-800 border-gray-100/10 dark:bg-neutral-900">
            <div class="container mx-auto">
                <div class="text-center">
                    <p class="mb-0 text-center text-white/50">
                        {{currentYear}}
                        © Jobcy - Job Listing Page
                            Template by
                        <a href="https://themeforest.net/search/themesdesign" target="_blank" class="underline transition-all duration-300 hover:text-gray-50">Themesdesign</a>
                    </p>
                </div>
            </div>
        </section>
        <!-- end footer alt -->
    </footer>
    <!-- end Footer -->
</template>

<style scoped>

</style>


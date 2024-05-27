<script setup>

definePageMeta({
  layout: 'template-default'
})

const items = [
    {
        key: 'account',
        label: 'Account',
        description: 'Make changes to your account here. Click save when you\'re done.'
    },
    {
        key: 'contact',
        label: 'Conntact',
        description: 'Change your Conntact here. Click save when you\'re done.'
    }, 
    {
        key: 'password',
        label: 'Password',
        description: 'Change your password here. After saving, you\'ll be logged out.'
    }
]

const genders = [
    {
        id: 1,
        option: 'Male',
    },
    {
        id: 2,
        option: 'Female',
    },
    {
        id: 3,
        option: 'Others',
    },

]	
const selected = ref([])

const accountForm = reactive({ name: '', username: '' })
const contactForm = reactive({ name: '', username: '' })
const passwordForm = reactive({ currentPassword: '', newPassword: '' })

function onSubmit (form) {
  console.log('Submitted form:', form)
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
                                                    <div class="relative flex-col items-start justify-start mt-custom ml-custom">
                                                        <div class="flex items-start justify-start">
                                                            <img id="profile-img" src="assets/images/user/img-02.jpg" alt="" class="w-48 h-48 rounded-full">
                                                        </div>
                                                        <div class="mt-3">
                                                            <h6 class="text-2xl font-bold text-gray-900 dark:text-gray-50">James Bond</h6>
                                                            <p class="mt-1 text-gray-500 dark:text-gray-300">Lowkey man</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>   
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="col-span-12 lg:col-span-12">
                                <UTabs :items="items"
                                        :ui="{ 
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
                                            }, }" class="">
                                    <template #item="{ item }">
                                        <UCard @submit.prevent="() => onSubmit(item.key === 'account' ? accountForm : passwordForm)">
                                            <template #header>
                                                <div class="col-span-12 lg:col-span-5">
                                                    <div class="rounded-md">
                                                        <div ciass="h-60">
                                                            <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
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
                                                    <UInput v-model="accountForm.username" />
                                                </UFormGroup>
                                                <UFormGroup label="First Name" name="first_name">
                                                    <UInput v-model="accountForm.name" />
                                                </UFormGroup>
                                                <UFormGroup label="Last Name" name="last_name">
                                                    <UInput v-model="accountForm.name" />
                                                </UFormGroup>
                                                <UFormGroup label="Age" name="age">
                                                    <UInput v-model="accountForm.name" />
                                                </UFormGroup>
                                                <USelectMenu
                                                    v-model="selected"
                                                    :options="genders"
                                                    placeholder="Select gender"
                                                    value-attribute="id"
                                                    option-attribute="option"
                                                />
                                                <UFormGroup label="About me" name="about_me">
                                                    <UTextarea resize placeholder="" model-value="" />
                                                </UFormGroup>
                                                <UFormGroup label="Favorite Style" name="favorite_style">
                                                    <UInput v-model="accountForm.name" />
                                                </UFormGroup>
                                                
                                            </div>
                                            <div v-else-if="item.key === 'contact'" class="space-y-3">
                                                <UFormGroup label="Address" name="address" required>
                                                    <UInput v-model="contactForm.address"/>
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
                                                    <UInput v-model="passwordForm.zip_code" />
                                                </UFormGroup>
                                            </div>
                                            <div v-else-if="item.key === 'password'" class="space-y-3">
                                                <UFormGroup label="Email" name="email" required>
                                                    <UInput v-model="passwordForm.currentPassword" type="password" required />
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
                                                Save {{ item.key === 'account' ? 'account' : 'password' }}
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
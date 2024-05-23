<template>
  <div>
    <ClientOnly>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'RenovationPh',
  ogTitle: 'Renovation.ph',
  description: 'Here to help you with your needs',
  ogDescription: 'Here to help you with your needs',
  ogImage: '/images/logodark2.png',
  twitterCard: 'summary_large_image',
})
</script>
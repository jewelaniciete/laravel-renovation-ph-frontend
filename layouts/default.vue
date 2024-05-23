<template>
  <div lang="en" dir="ltr" data-mode="light" class="scroll-smooths group" data-theme-color="green">
    <div class="bg-white dark:bg-neutral-800">
      <ClientOnly>
        <AppNavBar />
        <!-- <SideTheme /> -->
        <slot />
        <AppFooter />
      </ClientOnly>
    </div>
  </div>
</template>
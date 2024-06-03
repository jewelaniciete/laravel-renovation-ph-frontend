<template>
  <div>
    <!-- Tabs for categories -->
    <div class="flex border-b">
      <div 
        v-for="category in categoryDropdown" 
        :key="category.id" 
        @click="selectedCategory = category.id" 
        class="cursor-pointer py-2 px-4 text-base font-semibold"
        :class="{'border-b-2 border-green-500': selectedCategory === category.id}"
      >
        {{ category.name }}
      </div>
    </div>

    <!-- Content for selected tab -->
    <div class="p-4">
      <ul v-if="selectedCategory" aria-labelledby="pages">       
        <li  
          v-for="sub in subcategoryDropdown.filter(sub => sub.category_id === selectedCategory)" 
          :key="sub.slug"
        >
          <NuxtLink
            :to="`/services/${sub.slug}`"
            class="subcategory-item"
          >
            {{ sub.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>

// Define types for category and subcategory
interface Category {
  id: number;
  name: string;
  // Add other properties if there are any
}

interface Subcategory {
  category_id: number;
  name: string;
  slug: string;
  // Add other properties if there are any
}

// Then use these types for your dropdowns
const categoryDropdown = ref<Category[]>([]);
const subcategoryDropdown = ref<Subcategory[]>([]);
const selectedCategory = ref<number | null>(null);

onMounted(async () => {
  // Fetch product data when component is mounted
  await fetchCategories();
  await fetchSubCategories();
  if (categoryDropdown.value.length > 0) {
    selectedCategory.value = categoryDropdown.value[0].id; // Select the first category by default
  }
});

async function fetchCategories() {
  const response = await fetch(`http://localhost:8000/api/master/service/category-show`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  categoryDropdown.value = data.data;
}

async function fetchSubCategories() {
  const response = await fetch(`http://localhost:8000/api/master/service/sub-category-show`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  subcategoryDropdown.value = data.data;
}
</script>

<style scoped>
.border-b-2 {
  border-bottom-width: 2px;
}
.border-indigo-500 {
  border-color: #6366F1;
}
</style>

<template>
  <div class="flex">
    <div v-for="category in categoryDropdown" :key="category.id" class="category-container">
      <div class="category-name">
        <p class="text-13 font-semibold select-none">{{ category.name }}</p>
      </div>
      <ul class="subcategory-list" aria-labelledby="pages">
        <li v-for="sub in subcategoryDropdown.filter(sub => sub.category_id === category.id)" :key="sub.category_id">
          <NuxtLink :to="`/categories/${sub.slug}`" class="subcategory-item">
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
 
}

interface Subcategory {
  category_id: number;
  name: string;
  slug: string;
}

// Then use these types for your dropdowns
const categoryDropdown = ref<Category[]>([]);
const subcategoryDropdown = ref<Subcategory[]>([]);

onMounted(async () => {
  // Fetch product data when component is mounted
  await fetchCategories();
  await fetchSubCategories();
});

async function fetchCategories() {
  const response = await fetch(`http://localhost:8000/api/master/space/category-show`, {
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
  const response = await fetch(`http://localhost:8000/api/master/space/sub-category-show`, {
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
/* Add your styles here */
</style>

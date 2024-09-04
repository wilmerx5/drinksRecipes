<script setup>

import Recipe from '@/components/Recipe.vue';
import { useDrinksStore } from '@/stores/drinks';

const store = useDrinksStore()
</script>
<template>
    

    <div 
    v-if="store.isRecipes"
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-2 mb-10">
        <Recipe 
        v-for="recipe  in store.recipes"
        :key="recipe.id"
        :recipe="recipe"
        >

        </Recipe>

    </div>
    <h3 v-else class="text-center text-3xl py-10 bg-orange-400 rounded text-white uppercase mb-2">
        There are no recipes to show search something
    </h3>
</template>
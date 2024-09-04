<script setup>

import { useDrinksStore } from '@/stores/drinks';
const props = defineProps({
    recipe: {
        type: Object,
        required: true
    }
})
const store = useDrinksStore()
</script>

<template>

    <div class="boder shadow-lg px-2">
        <div>
            <img class="m-auto md:w-4/6 cursor-pointer 2xl:w-5-6 hover:scale-110 transition-transform hover:rotate-2"
            :src="recipe.strDrinkThumb"
            />

        </div>
        <div class="p-5">
            <h2 class="text-2xl truncate font-extrabold text-center">{{ recipe.strDrink }}</h2>
            <button
            @click="store.getRecipe(recipe.idDrink)"
            
            class="bg-orange-500 mt-5 w-full p-3 font-bold text-white"
            >
                See Recipe
            </button>
           
        </div>
    </div>
</template>

<script setup>
import Recipe from '@/components/Recipe.vue';
import { useDrinksStore } from '@/stores/drinks';

import { useFavoritesStore } from '@/stores/favorites';
import { useNotificationsStore } from '@/stores/notifications';


const favoritesStore = useFavoritesStore()
const store= useDrinksStore()
const storeNotifications= useNotificationsStore()

</script>
<template>

 
<div 
v-if="favoritesStore.isFavorites"
class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-2 mb-10">
        <Recipe 
        v-for="recipe  in favoritesStore.favorites"
        :key="recipe.id"
        :recipe="recipe"
        >

        </Recipe>
        </div>

    <p v-else class="my-10 text-center text-2xl">
There are no favorites
    </p>
</template>
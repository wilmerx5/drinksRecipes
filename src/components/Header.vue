<script setup>
import { useDrinksStore } from '@/stores/drinks';
import { useNotificationsStore } from '@/stores/notifications';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
const store = useDrinksStore()
const storeNotifications = useNotificationsStore()

const route = useRoute()

const isHomePage = computed(() => route.name == 'home')

const handleSubmit = () => {

    if (Object.values(store.search).includes('')) {


            storeNotifications.$patch({
                txt: "complete all the fields",
                show: true,
                error: true
            })

        return
    }
    //To do validate
    store.getRecipes()
}
</script>

<template>

    <header class=" bg-slate-900  " :class="{ header: isHomePage }">

        <div class=" mx-auto container px-5 py-2">



            <div class="flex justify-between items-center py-2">
                <RouterLink :to="{ name: 'home' }">
                    <img class="w-32 " src="/public/img/logo.svg">
                </RouterLink>
                <div class="flex  gap-4">
                    <RouterLink active-class="text-orange-600" class="text-white uppercase font-bold "
                        :to="{ name: 'home' }">
                        Home
                    </RouterLink>
                    <RouterLink active-class="text-orange-600" class="text-white uppercase font-bold "
                        :to="{ name: 'favorites' }">
                        Favorites
                    </RouterLink>
                </div>

            </div>
        </div>
        <div class="mx-auto container px-5 py-1">

            <div>

            </div>
            <form @submit.prevent="handleSubmit" v-if="isHomePage"
                class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-4 ">

                <div class="space-y-4">
                    <label class="block text-white uppercase font-extrabold" for="ingredient">
                        Ingredient
                    </label>

                    <input v-model="store.search.name" id="ingredient" type="text"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        placeholder="Type ingredients  ex: vodka, coffee, etc. " />

                </div>

                <div class="space-y-4">
                    <label for="category" class="block text-white uppercase font-extrabold text-lg">
                        Category
                    </label>
                    <select v-model="store.search.category" id="category"
                        class="p-3 w-full rounded-lg focus:outline-none">
                        <option value="">
                            --Select Category--
                        </option>
                        <option v-for="category in store.categories" key:category.strCategory
                            :value="category.strCategory">

                            {{ category.strCategory }}

                        </option>
                    </select>

                </div>

                <input type="submit"
                    class="bg-orange-800 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
                    value="SEARCH">


            </form>

        </div>

    </header>
</template>

<style scoped>
.header {
    background-image: url('/public/img/bg.jpg');
    background-size: cover;
}
</style>
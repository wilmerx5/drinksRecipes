<script setup>
import { useDrinksStore } from '@/stores/drinks';
import { useFavoritesStore } from '@/stores/favorites';
import { useModalStore } from '@/stores/modal';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';

const modalStore = useModalStore()
const drinksStore = useDrinksStore()
const favoritesStore = useFavoritesStore()


const formatIngredients = () => {
    const ingredientsDiv = document.createElement('DIV')

    for (let i = 1; i < 15; i++) {

        if (drinksStore.recipe[`strIngredient${i}`]) {
            const ingredient = drinksStore.recipe[`strIngredient${i}`]
            const measure = drinksStore.recipe[`strMeasure${i}`]

            const p = document.createElement('P')
            p.classList.add('text-lg','text-gray-500')
            p.textContent = `${ingredient} - ${measure}`
            ingredientsDiv.appendChild(p)
        }
    }
    return ingredientsDiv
}
</script>

<template>
    <TransitionRoot as="template" :show="modalStore.showModal">
        <Dialog @close="modalStore.handleClickModal()" as="div" class="relative z-10">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                            <div>
                                <div class="mt-3">

                                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold">
                                        {{ drinksStore.recipe.strDrink }}
                                    </DialogTitle>

                                    <img 
                                    class="mx-auto w-96"
                                    :src="drinksStore.recipe.strDrinkThumb" />

                                    <DialogTitle as="h3" class="text-center text-gray-900 text-2xl font-extrabold">
                                        Ingredients and Measure
                                    </DialogTitle>

                                    <div v-html="formatIngredients().outerHTML">

                                    </div>
                                    <DialogTitle as="h3" class=" text-center text-gray-900 text-2xl font-extrabold">
                                        Instructions
                                    </DialogTitle>
                                    <p class="text-lg text-gray-500">
                                        {{ drinksStore.recipe.strInstructions }}
                                    </p>



                                </div>
                            </div>
                            <div class="mt-5 sm:mt-6 flex justify-between gap-4">

                                <button @click="modalStore.handleClickModal()" type="button"
                                    class="w-full p-3 rounded bg-gray-600 uppercase text-white">
                                    Close
                                </button>

                                <button @click="favoritesStore.handleClickFavorites()" type="button"
                                    class="w-full p-3 rounded bg-orange-600 uppercase text-white">
                                {{modalStore.txtButton?'Delete from Favorites':'Add to Favorites'}}
                                </button>

                            </div>


                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
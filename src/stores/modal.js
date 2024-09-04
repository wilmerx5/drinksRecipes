import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useDrinksStore } from "./drinks";
import { useFavoritesStore } from "./favorites";

export const useModalStore = defineStore('modal', () => {

    const storeFavorites = useFavoritesStore()
    const storeDrinks = useDrinksStore()


    const showModal = ref(false)

    function handleClickModal(){
        showModal.value = !showModal.value
    }

    const txtButton= computed(()=>{

        return storeFavorites.existFavorite(storeDrinks.recipe.idDrink)
    })
    return {
        showModal,
        handleClickModal,
        txtButton
    }
})
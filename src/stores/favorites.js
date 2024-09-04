import { defineStore } from "pinia";

import { computed, onMounted, ref, watch } from "vue";
import { useDrinksStore } from "./drinks";
import { useModalStore } from "./modal";
import { useNotificationsStore } from "./notifications";

export const useFavoritesStore = defineStore('favorites', () => {

    const drinksStore = useDrinksStore()
    const modalStore = useModalStore()
    const notificationsStore = useNotificationsStore()



    onMounted(()=>{

        favorites.value = JSON.parse(localStorage.getItem('favorites')) ?? [] 

    })

    const favorites = ref([])
    watch(favorites, () => {
        syncLocalStorage()
    }, {
        deep: true
    })

    const syncLocalStorage = () => {
        localStorage.setItem('favorites', JSON.stringify(favorites.value))

    }

    const isFavorites =computed(()=> favorites.value.length>0)
    const existFavorite=(id)=>{

        const favoritesSaved= JSON.parse(localStorage.getItem('favorites'))?? []

        return favoritesSaved.some(f=>f.idDrink ===id)

    }
    const handleClickFavorites = () => {

        notificationsStore.show = true
        if(existFavorite(drinksStore.recipe.idDrink)){
           favorites.value = favorites.value.filter(e=>e.idDrink !=drinksStore.recipe.idDrink)
           notificationsStore.txt = 'Deleted from favorites'
           notificationsStore.error=true
           
        }else{
            
            favorites.value.push(drinksStore.recipe)
            notificationsStore.txt = 'Added to favorites'

         

        }

        modalStore.handleClickModal() 
    }

    return {
        handleClickFavorites,
        favorites,
        existFavorite,
        isFavorites
    }
})
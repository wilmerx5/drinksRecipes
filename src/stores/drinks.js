import APIservice from "@/Services/APIservice";
import { defineStore } from "pinia";
import { computed, onMounted, reactive, ref } from "vue";
import { useModalStore } from "./modal";

export const  useDrinksStore=defineStore('drinks',()=>{
    const modalStore= useModalStore()
    const categories = ref([])
    const recipes = ref([])


    const search =  reactive({
        name:'',
        category:''
    })

    const recipe=ref({})

    onMounted(async()=>{
        const {data} = await APIservice.getCategories();
         categories.value = data.drinks 
    })

    async function  getRecipes() {

        
        const {data} =  await APIservice.searchRecipe(search)

      recipes.value = data.drinks
    }

    async function getRecipe(id){
        recipe.value={}
        modalStore.handleClickModal()
        const {data:{drinks}} =  await APIservice.getRecipe(id)
       recipe.value =drinks[0]
    }

    const  isRecipes =computed(()=>recipes.value.length>0)
    return {
        categories,
        search,
        getRecipes,
        recipes,
        getRecipe,
        recipe,
        isRecipes
    }

})
import axios from "@/lib/axios";


export default {

    getCategories(){
        return axios('/list.php?c=list')
    },
    searchRecipe(search){

        return axios(`/filter.php?c=${search.category}&i=${search.name}`)
    },
    getRecipe(id){
        return axios(`/lookup.php?i=${id}`)
    }

}
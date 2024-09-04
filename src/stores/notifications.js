import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useNotificationsStore = defineStore('notifications', () => {

    const show = ref(false)
    const txt = ref('')
    const error = ref(false)

  watch(show,()=>{

    if(show.value){
        setTimeout(()=>{

            show.value=false
            txt.value=''
            error.value=false
        },3000)
    }
  })
    return {
        show,
        txt,
        error,
    
    }
})

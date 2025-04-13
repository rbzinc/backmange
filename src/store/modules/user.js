import { defineStore } from "pinia";

import { constantRoute } from "@/router/routes.js";

import { ref } from "vue"

export let useUserStore = defineStore('user', () =>{
    const username = ref()
    const menuRoutes = constantRoute
    const userInfo = ref()
    const setUserInfo = (val) => {
        userInfo.value = val
    }

    const clearUserInfo = () => {
        userInfo.value = null
    }
    return {
        username,
        userInfo,
        setUserInfo,
        clearUserInfo,
        menuRoutes
    }
},{
    persist: true,
})
export default useUserStore
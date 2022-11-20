<script>

    /**
     * Svelte
     */
    import {writable} from "svelte/store";
    import {getContext, onMount, setContext} from "svelte";
    import axios from "axios";

    /**
     * Get context
     */
    const {getCookie, setCookie, deleteCookie} = getContext("cookies")

    /**
     * Store
     */
    const isAuth = writable(false)
    const user = writable({})

    /**
     * Set context
     */
    // const baseUrl = "http://localhost:32512"
    const baseUrl = "https://api.shorlty.tech/"

    const api = writable(
        axios.create({
            withCredentials: true,
            baseURL: baseUrl,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
            }
        })
    )

    let timeout

    const refresh = async () => {
        clearTimeout(timeout)
        try {
            const {data: req} = await $api.get("/user/refresh")
            if (req.success) {
                let refreshTime = req.data.info.expire_at - Math.round(Date.now() / 1000)
                timeout = setTimeout(refresh, refreshTime * 1000)
                $isAuth = true

                $user = req.data.user
            } else {
                $isAuth = false
            }
        } catch (e) {
            $isAuth = false
            console.log('[AUTH]', e)
        }
    }

    const logout = async () => {
        const {data: req} = await $api.get("/user/logout")
        console.log(req)
        $isAuth = false
    }

    const register = async (data) => {
        try {
            const {data: req} = await $api.post('/user/registration', data)
            return req
        } catch (e) {
            console.log('[REGISTER]', e)
            return false
        }
    }

    setContext('isAuth', isAuth)
    setContext("baseURL", baseUrl)
    setContext('checkAuth', refresh)
    setContext("api", api)
    setContext("logout", logout)
    setContext("user", user)
    setContext("register", register)

    $: console.log('isAuth', $isAuth)
    $: console.log('user', $user)
</script>

{#await refresh() then }
    <slot/>
{/await}
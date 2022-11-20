<script>
    /**
     * Svelte
     */
    import {writable} from "svelte/store";
    import {getContext, setContext} from "svelte";

    /**
     * Get context
     */
    const api = getContext("api")
    const isAuth = getContext("isAuth")
    const {getCookie, setCookie} = getContext("cookies")

    /**
     * Store
     */
    const URLs = writable([])

    const getAllURLs = async () => {
        if ($isAuth) {
            console.log('kek')
            const {data: res} = await $api.get('/url')
            $URLs = res.data.urls
        } else {
            try {
                $URLs = [...JSON.parse(getCookie("urls"))]
            }catch (e) {
                console.log(e)
            }
        }
    }

    const cutURL = async (url) => {
        const formData = new FormData()
        formData.append('url', url)
        const {data: res} = await $api.post('/url', formData)
        console.log(res)
        const info = {
            id: res.data.short_url,
            url: url
        }
        setCookie("urls", JSON.stringify(info), 7)

        await getAllURLs()
    }

    const getInfo = async (id) => {
        const {data: res} = await $api.post(`/url/${id}`)
        return res.data.url
    }

    const getAllTransitions = async () => {
        const {data: res} = await $api.get('url/transitions')
        return res.data.urls
    }

    setContext("URL", {
        cutURL,
        getInfo,
        getAllTransitions,

        URLs
    })

    // $: console.log($URLs)
</script>

{#await getAllURLs() then }
    <slot/>
{/await}
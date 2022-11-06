<script>

    /**
     * Svelte
     */
    import {writable} from "svelte/store";
    import {setContext} from "svelte";

    /**
     * Store
     */
    const isAuth = writable(true)

    /**
     * Set context
     */
    setContext('isAuth', isAuth)


</script>

<slot/>
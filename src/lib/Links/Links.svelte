<script>
    /**
     * Svelte
     */
    import {getContext} from "svelte";
    import {fly} from "svelte/transition"

    /**
     * Components
     */
    import Icon from "$lib/Core/Icon.svelte";
    import IconButton from "$lib/Buttons/IconButton.svelte";

    /**
     * Libs
     */
    import {writable} from "svelte/store";
    import URLBlock from "$lib/URL/URLBlock.svelte";
    import URLInfo from "$lib/URL/URLInfo.svelte";

    /**
     * Get context
     */
    const {URLs} = getContext("URL")

    /**
     * Store
     */
    const activeURL = writable(-1)

    /**
     * Functions
     */
    const selectActive = (e) => {
        $activeURL = e.detail.url
    }

    $: if (($URLs ?? []).length > 0 && $activeURL === -1) $activeURL = $URLs[0]
</script>

<div class="all__links" in:fly={{x: 50}}>
    <div class="link_list">
        {#each $URLs as url, urlIndex (url.id)}
            <URLBlock bind:url={url}
                      active={url.id === $activeURL.id}
                      on:select={selectActive}/>
        {/each}

    </div>

    <URLInfo bind:url={$activeURL}/>
</div>

<style lang="scss">
  .all__links {
	padding: 50px 25px;

	margin: 0 auto;

	display: grid;
	grid-template-columns: 1fr 2fr;
	width: 100%;
	gap: 25px;
  }

  .link_list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
</style>
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
    import Button from "$lib/Buttons/Button.svelte";
    import {router} from "tinro";

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

    {#if ($URLs ?? []).length > 0}

        <div class="link_list">
            {#each $URLs as url, urlIndex (url.id)}
                <URLBlock bind:url={url}
                          active={url.id === $activeURL.id}
                          on:select={selectActive}/>
            {/each}

        </div>

        <URLInfo bind:url={$activeURL}/>

    {:else}
        <div class="placeholder">

            <h1>You have not created any links yet</h1>
            <Button primary={true}
                    on:click={() => router.goto('/')}>
                Create a short link
            </Button>
        </div>

    {/if}
</div>

<style lang="scss">

  .placeholder {
	position: absolute;
	left: 50%;
	top: 50%;
	color: var(--primary-text);

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

	transform: translate(-50%, -50%);

    :global(.button) {
      width: max-content;
    }
  }

  .all__links {
    position: relative;
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
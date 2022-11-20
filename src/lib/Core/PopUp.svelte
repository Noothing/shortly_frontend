<script>

    /**
     * Svelte
     */
    import {fade} from 'svelte/transition'
    import {createEventDispatcher} from "svelte";

    /**
     * Event dispatcher
     */
    const dispatch = createEventDispatcher()

    /**
     * Props
     */
    export let
        isOpen = true

    const onClickOutSide = () => {
        isOpen = false
        dispatch('close')
    }
</script>

{#if isOpen}
    <div class="popup"
         transition:fade={{duration: 300}}>

        <slot/>
    </div>

    <div class="backdrop"
         on:click={onClickOutSide}
         transition:fade={{duration: 300}}></div>
{/if}
<style lang="scss">
  .popup {
	min-height: 200px;
	min-width: 500px;
	background: var(--modal-bg);

	padding: 15px 20px;

	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 5;

	border-radius: 9px;
  }

  .backdrop {
	position: fixed;
	left: 0;
	top: 0;

	width: 100%;
	height: 100%;
	z-index: 4;

	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(3px);
  }
</style>
<script>

    /**
     * Components
     */
    import PopUp from "$lib/Core/PopUp.svelte";
    import Button from "$lib/Buttons/Button.svelte";

    /**
     * Svelte
     */
    import {createEventDispatcher} from "svelte";

    /**
     * Dispatcher
     */
    const dispatch = createEventDispatcher()

    /**
     * Props
     */
    export let
        isOpen = true
</script>


<PopUp bind:isOpen={isOpen}>
    <div class="confirm">
        <h2>Do you sure?</h2>
        <p>After press 'yes' action will be completed and can't to be rollback</p>

        <div class="confirm__actions">
            <Button primary={true}
                    on:click={() => dispatch('confirm')}>
                Yes
            </Button>

            <Button warning={true}
                    on:click={() => isOpen = false}>
                No
            </Button>
        </div>
    </div>
</PopUp>

<style lang="scss">
  .confirm {
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	color: var(--primary-text);

	h2 {
	  text-align: center;
	  margin-bottom: 30px;
	}

	&__actions {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: space-around;
	  gap: 25px;
	  width: 100%;
	  margin-top: 25px;

	  :global(.button) {
		width: 50%;
	  }
	}
  }
</style>
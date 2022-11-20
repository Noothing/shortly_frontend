<script>
    /**
     * Svelte
     */
    import {createEventDispatcher} from "svelte";

    /**
     * States
     */
    let isShow = false

    /**
     * Dispatch
     */
    const dispatch = createEventDispatcher()

</script>

<div class="tooltip"
     on:click={() => dispatch('click')}
     on:mouseleave={() => isShow = false}
     on:mouseover={() => isShow = true}>

    <slot name="trigger"/>

    {#if isShow}
        <div class="tooltip__text">
            <slot name="text"/>
        </div>
    {/if}

</div>

<style lang="scss">
  .tooltip {
	position: relative;

	&__text {
	  position: absolute;
	  bottom: -10px;
	  left: 50%;
	  transform: translate(-50%, 100%);

	  padding: 4px 10px;
	  border-radius: 5px;

	  color: var(--primary-text);
	  background: var(--modal-bg);
	  border: 1px solid var(--secondary-text);

	  font-size: 12px;
	  max-width: 200px;
	  width: max-content;

	  text-align: center;
	  user-select: none;
	  cursor: default;


	  &:before {
		content: '';

		height: 10px;
		width: 10px;
		transform: rotate(45deg) translate(-50%, 0%);
		z-index: -1;

		background: var(--modal-bg);
		border-left: 1px solid var(--secondary-text);
		border-top: 1px solid var(--secondary-text);

		position: absolute;
		left: 50%;
		top: -2px;
	  }
	}
  }
</style>
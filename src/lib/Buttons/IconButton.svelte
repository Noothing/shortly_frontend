<script>

    import Icon from "$lib/Core/Icon.svelte";

    /**
     * Props
     */
    export let
        href = false,
        disabled = false,
        primary = false,
        secondary = false,
        main = false,
        icon = false,
        icon_only = false


</script>

{#if href}
    <a href={href}
       class="button"
       class:primary
       class:secondary
       class:icon
       class:disabled
       class:main>
        <Icon url={icon}
              height="20px"
              width="20px"/>
        {#if !icon_only}
            <span><slot/></span>
        {/if}
    </a>
{:else}
    <button class="button"
            class:primary
            class:secondary
            class:icon
            class:disabled
            class:main
            on:click|preventDefault|stopPropagation>
        <Icon url={icon}
              height="20px"
              width="20px"/>
        {#if !icon_only}
            <span><slot/></span>
        {/if}
    </button>
{/if}

<style lang="scss">
  .button {
	margin: 0;
	text-decoration: none;

	font-weight: 500;
	font-size: 14px;
	line-height: 20px;

	border: unset;
	border-radius: 40px;

	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-wrap: nowrap;
	gap: 10px;

	cursor: pointer;
	padding: 10px 24px;

	white-space: nowrap;

	background: transparent;

	&.primary {
	  color: var(--primary-button-text);
	  background: var(--primary-button);

	  &:not(.disabled) {
		&:hover {
		  background: var(--primary-button-hover);
		}

		&:active, &.active {
		  background: var(--primary-button-active);
		}
	  }

	  &.disabled {
		cursor: default;

		background: var(--primary-button-disabled);
		color: var(--primary-button-text-disabled);
	  }
	}

	&.secondary {
	  color: var(--primary-text);
	  background: var(--secondary-button);

	  &:not(.disabled) {
		&:hover {
		  background: var(--secondary-button-hover);
		  color: black;

		  :global(svg path) {
			fill: black;
		  }
		}

		&:active, &.active {
		  background: var(--secondary-button-active);
		  color: var(--primary-text);

		  :global(svg path) {
			fill: var(--primary-text);
		  }
		}
	  }

	  &.disabled {
		cursor: default;

		background: var(--secondary-button-hover);
		color: var(--primary-text);
	  }
	}
  }

</style>
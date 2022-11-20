<script>

    /**
     * Props
     */
    export let
        href = false,
        disabled = false,
        primary = false,
        secondary = false,
        main = false,
        icon = false

</script>

{#if href}
    <a href={href}
       class="button"
       class:primary
       class:secondary
       class:disabled={disabled}
       class:icon
       class:main>
        <slot/>
    </a>
{:else}
    <button class="button"
            class:primary
            class:secondary
            class:disabled={disabled}
            class:main
            class:icon
            on:click|preventDefault|stopPropagation>
        <slot/>
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
	border-radius: 9px;

	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-wrap: nowrap;
	gap: 10px;

	cursor: pointer;
	padding: 10px 24px;

	white-space: nowrap;
    background: transparent;

    &.icon {
      :global(svg path){
        fill: var(--primary-text);
      }

	  &:hover {
		:global(svg path) {
		  fill: var(--primary-text-hover);
		}
	  }
    }

	&.primary {
	  color: var(--primary-button-text);
	  background: var(--primary-button);


	  &:not(.disabled) {
		&:hover {
		  background: var(--primary-button-hover);
		}

		&:active, &.active {
		  background: var(--primary-button-active);
          color: var(--primary-text);
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
		}

		&:active, &.active {
		  background: var(--secondary-button-active);
		  color: var(--primary-text);
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
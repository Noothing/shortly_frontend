<script>
    /**
     * Svelte
     */
    import Icon from "$lib/Core/Icon.svelte";
    import {createEventDispatcher} from "svelte";

    /**
     * Dispatch
     */
    const dispatch = createEventDispatcher()

    /**
     * Props
     */
    export let
        url = null,
        active = false
</script>

<div class="link__block"
     class:active={active}
     on:click={() => dispatch('select', {url})}>
    <div class="link__block-info">
        <span class="link__block-date">{new Date(url.date_added).toLocaleDateString("en-US", {dateStyle: "short"})}</span>
        <span class="link__block-title">{url.url}</span>
        <span class="link__block-id">link.shorlty.tech/{url.id}</span>
    </div>

    <div class="link__block-stats">
        {url.transitions}
        <Icon url="/icons/timeline.svg" height="20px" width="20px"/>
    </div>
</div>

<style lang="scss">
  .link {

	&__information {
	  display: flex;
	  flex-direction: column;
	  gap: 10px;

	  &-main {
		display: flex;
		flex-direction: column;
		background: var(--modal-bg);
		padding: 15px 20px;

		.link {
		  &__title {
			color: var(--primary-text);
			margin-bottom: 10px;
		  }

		  &__date {
			color: var(--secondary-text);
			margin-bottom: 5px;
		  }

		  &__sub {
			display: inline-flex;
			align-items: center;
			gap: 5px;

			color: var(--primary-text);
			font-weight: 300;
			font-size: 12px;

			:global(.icon svg path) {
			  fill: var(--primary-text);
			}
		  }
		}
	  }

	  &-sub {
		background: var(--modal-bg);
		padding: 15px 20px;

		display: flex;
		flex-direction: column;

		.link {
		  &__url {
			&-title {
			  color: var(--main-color);
			  font-size: 1.5em;
			  font-weight: 500;
			  text-decoration: none;

			  margin-bottom: 10px;
			}

			&-info {
			  display: inline-flex;
			  align-items: center;
			  gap: 10px;

			  color: var(--primary-text);

			  a {
				color: var(--primary-text);
				text-decoration: none;
			  }
			}
		  }
		}

		:global(.button) {
		  width: max-content;
		  margin-bottom: 15px;
		}
	  }
	}

	&_list {
	  display: flex;
	  flex-direction: column;
	  gap: 15px;
	}

	&__block {
	  display: flex;
	  flex-direction: row;
	  justify-content: space-between;
	  background: var(--modal-bg);
	  width: 100%;
	  padding: 8px 10px;
	  border-radius: 4px;
	  gap: 20px;
	  border: 1px solid transparent;

	  cursor: pointer;

	  &.active {
		border-color: var(--main-color);;
	  }

	  &:not(.active) {
		&:hover {
		  border-color: rgba(90, 49, 255, 0.3);
		}
	  }

	  &-stats {
		border-left: 1px solid var(--stroke-def);

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		width: 75px;

		color: var(--primary-text);
        user-select: none;

		:global(.icon svg path) {
		  fill: var(--primary-text);
		}
	  }

	  &-info {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: calc(100% - 100px);
	  }

	  &-date {
		color: var(--secondary-text);
		font-size: 12px;
	  }

	  &-title {
		color: var(--primary-text);
		width: max-content;
		max-width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	  }

	  &-id {
		color: var(--main-color);
		font-size: 14px;
	  }
	}

  }
</style>


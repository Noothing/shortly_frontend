<script>
    /**
     * Components
     */
    import IconButton from "$lib/Buttons/IconButton.svelte";
    import Icon from "$lib/Core/Icon.svelte";

    /**
     * Svelte
     */
    import {getContext} from "svelte";
    import URLChart from "$lib/URL/URLChart.svelte";

    /**
     * Get context
     */
    const {getInfo} = getContext("URL")

    /**
     * Props
     */
    export let
        url = null

    /**
     * States
     */
    let moreInfo = null

    /**
     * Functions
     */
    const getMoreInfo = async () => {
        let data = await getInfo(url.id)
        data.url_transitions = groupArrays(data.url_transitions)
        return data
    }

    // Edit: to add it in the array format instead
    const groupArrays = (data) => {
        return data.reduce((groups, game) => {
            const date = game.date_added.split('T')[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(game);
            return groups;
        }, {});
    }

</script>

<div class="link__information">
    <div class="link__information-main">
        <h2 class="link__title">{url.title}</h2>
        <p class="link__date">{new Date(url?.date_added)} by You</p>
        <div class="link__sub">
            <Icon url="/icons/chart.svg" height="20px" width="20px"/>
            {url.transitions} Total transitions
        </div>
    </div>

    <div class="link__information-sub">
        <a class="link__url-title" href="link.shorlty.tech/{url.id}">link.shorlty.tech/{url.id}</a>
        <IconButton primary={true}
                    on:click={async () => await navigator.clipboard.writeText(`https://link.shorlty.tech/${url.id}`)}
                    icon="/icons/copy.svg">Copy
        </IconButton>
        <div class="link__url-info">
            <h4>Origin:</h4>
            <a href={url.url}>{url.url}</a>
        </div>

        {#if url.transitions > 0}
            {#await getMoreInfo()}
                wait
            {:then moreInfo}
                <URLChart transition={moreInfo.url_transitions}/>
            {/await}
        {/if}
    </div>
</div>

<style lang="scss">
  .link {

	&__information {
	  display: flex;
	  flex-direction: column;
	  gap: 10px;
	  width: 100%;

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

			  margin-bottom: 20px;

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
	  width: 350px;
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
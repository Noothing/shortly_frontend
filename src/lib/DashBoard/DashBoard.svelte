<script>
    /**
     * Svelte
     */
    import {getContext, onMount} from "svelte";
    import {fly} from "svelte/transition"

    /**
     * Components
     */
    import Icon from "$lib/Core/Icon.svelte";
    import DashBoardPieChart from "$lib/DashBoard/DashBoardPieChart.svelte";

    /**
     * Get context
     */
    const {URLs, getAllTransitions} = getContext("URL")

    /**
     * States
     */
    let transitions = []
    let user_agents = []
    let platform = []
    let city = []

    // Edit: to add it in the array format instead
    const groupArrays = (data, field) => {
        return data.reduce((groups, item) => {
            const date = item[field];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(item);
            return groups;
        }, {});
    }

    const getAllStats = () => {
        user_agents = groupArrays(transitions, 'user_agent')
        platform = groupArrays(transitions, 'platform')
        city = transitions.reduce((groups, item) => {
            const date = item.city.name;
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(item);
            return groups;
        }, {});
    }

    onMount(async () => {
        transitions = await getAllTransitions()
        getAllStats()
    })

</script>

<div class="dashboard" in:fly={{x: 50}}>

    <div class="dashboard__block row wide">
        <div class="information__block">
            <Icon url="/icons/link.svg" height="100px" width="100px"/>

            <div class="information__data">
                <h4>Links created</h4>
                <span>{$URLs.length}</span>
            </div>
        </div>

        <div class="information__block">
            <Icon url="/icons/chart.svg" height="100px" width="100px"/>

            <div class="information__data">
                <h4>Total clicks</h4>
                <span>{$URLs.reduce((sum, {transitions}) => sum + transitions, 0)}</span>
            </div>
        </div>
    </div>

    <div class="dashboard__block">
        <h3>Top links</h3>

        {#if $URLs.length >= 5}
            <div class="dashboard__block-list">
                {#each $URLs.sort((a, b) => b.transitions - a.transitions).splice(0, 5) as url, urlIndex (url.id)}
                    <div class="url">
                        <div class="url__list">
                            <a class="url-native" href={url.url}>{url.url}</a>
                            <a class="url-short"
                               href='https://link.shorlty.tech/{url.id}'>https://link.shorlty.tech/{url.id}</a>
                        </div>

                        <div class="url__transitions">
                            {url.transitions}
                            <Icon url="/icons/timeline.svg" height="20px" width="20px"/>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="no-data">
                <p class="placeholder">Too low data</p>
                <span class="description">You need to short 5 or more link</span>
            </div>
        {/if}
    </div>

    {#if (Object.keys(city) ?? []).length > 0}
        <div class="dashboard__block">
            <h3>Top location</h3>
            {#if $URLs.length >= 5}
                <DashBoardPieChart transition={city}/>
            {:else}
                <div class="no-data">
                    <p class="placeholder">Too low data</p>
                    <span class="description">You need to short 5 or more link</span>
                </div>
            {/if}
        </div>
    {/if}

    {#if (Object.keys(platform) ?? []).length > 0}
        <div class="dashboard__block">
            <h3>Top platforms</h3>
            {#if $URLs.length >= 5}
                <DashBoardPieChart transition={platform}/>
            {:else}
                <div class="no-data">
                    <p class="placeholder">Too low data</p>
                    <span class="description">You need to short 5 or more link</span>
                </div>
            {/if}
        </div>
    {/if}

    {#if (Object.keys(user_agents) ?? []).length > 0}
        <div class="dashboard__block">
            <h3>Top browsers</h3>
            {#if $URLs.length >= 5}
                <DashBoardPieChart transition={user_agents}/>
            {:else}
                <div class="no-data">
                    <p class="placeholder">Too low data</p>
                    <span class="description">You need to short 5 or more link</span>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
  .no-data {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.placeholder {
	  color: var(--primary-text);
	  font-size: 20px;
	}

    .description {
      color: var(--secondary-text);
    }
  }

  .information {
	&__block {
	  display: inline-flex;
	  align-items: center;
	  justify-content: center;

	  height: 100%;
	  width: 100%;

	  gap: 15px;

	  padding: 25px;

	  :global(.icon svg path) {
		fill: var(--main-color);
		transform-origin: center center;
	  }
	}

	&__data {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	  gap: 5px;
	  color: var(--primary-text);

	  span {
		width: 100%;
		text-align: center;
		font-size: 20px;
	  }
	}
  }

  .dashboard {
	padding: 50px 25px;

	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 150px;
	gap: 25px;

	&__block {
	  position: relative;

	  display: flex;
	  flex-direction: column;
	  background: var(--modal-bg);
	  padding: 25px 35px;

	  height: 100%;
	  width: 100%;

	  border-radius: 8px;

	  &.wide {
		grid-column-start: 1;
		grid-column-end: 3;

		height: 150px;
	  }

	  &.row {
		flex-direction: row;
	  }

	  h3 {
		text-transform: uppercase;
		color: var(--primary-text);

		margin-bottom: 25px;
	  }

	  &-list {
		display: flex;
		flex-direction: column;
		width: 100%;

		gap: 10px;
	  }
	}
  }

  .url {
	display: flex;
	flex-direction: row;
	align-items: center;

	&__list {
	  width: calc(100% - 50px);
	  display: flex;
	  flex-direction: column;
	  padding-right: 10px;

	  a {
		text-decoration: none;

		&:hover {
		  color: var(--main-color);
		}
	  }
	}

	&__transitions {
	  border-left: 1px solid var(--stroke-def);

	  display: flex;
	  align-items: center;
	  justify-content: center;
	  gap: 8px;
	  width: 75px;

	  user-select: none;

	  color: var(--primary-text);

	  :global(.icon svg path) {
		fill: var(--primary-text);
	  }
	}

	&-native {
	  font-size: 14px;
	  font-weight: 500;
	  color: var(--primary-text);
	}

	&-short {
	  font-size: 12px;
	  font-weight: 300;
	  color: var(--secondary-text);
	}
  }
</style>
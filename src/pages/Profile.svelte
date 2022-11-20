<script>
    import Icon from "$lib/Core/Icon.svelte";
    import IconButton from "$lib/Buttons/IconButton.svelte";
    import {getContext, onMount, tick} from "svelte";

    /**
     * Libs
     */
    import {router, meta} from 'tinro';

    /**
     * Components
     */
    import Links from "$lib/Links/Links.svelte";
    import DashBoard from "$lib/DashBoard/DashBoard.svelte";
    import Settings from "$lib/Settings/Settings.svelte";

    const route = meta();

    let currentSelection = Links
    const pages = [
        {
            name: 'links',
            component: Links
        },
        {
            name: 'dashboard',
            component: DashBoard
        },
        {
            name: 'settings',
            component: Settings
        }
    ]

    /**
     * Functions
     */
    const setHash = async (name) => {
        router.location.query.clear()
        router.location.query.set('page', name)

        currentSelection = pages.find(e => e.name == name)
    }

    $: if (!$route.query.page) {
        setHash('links')
    }

    onMount(() => {
        setHash($route.query.page)
    })
</script>

<div class="wrapper">
    <aside class="aside">
        <div class="logo" on:click={() => router.goto('/')}>
            <Icon url="/icons/logo.svg"
                  height="60px"
                  width="60px"/>
        </div>

        <div class="menu">
            <div class="menu__url"
                 on:click={() => setHash('links')}
                 class:active={$route.query.page == 'links'}>
                All links
            </div>
            <div class="menu__url"
                 on:click={() => setHash('dashboard')}
                 class:active={$route.query.page == 'dashboard'}>
                Links dashboard
            </div>
            <div class="menu__url"
                 on:click={() => setHash('settings')}
                 class:active={$route.query.page == 'settings'}>
                Settings
            </div>
        </div>
    </aside>

    <svelte:component this={currentSelection.component}/>
</div>

<style lang="scss">
  .logo {
	cursor: pointer;
	transition: .3s;

	&:hover {
	  transform: scale(0.93);
	}

	&:active {
	  transform: scale(0.95);
	  opacity: 0.6;
	}
  }


  .wrapper {
	gap: 25px;

    display: grid;
    grid-template-columns: 175px 1fr;

    overflow-x: hidden;
  }

  .all__links {
	padding: 50px 25px;

	margin: 0 auto;

	display: grid;
	grid-template-columns: 1fr 2fr;
	width: 100%;
	gap: 25px;
  }

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

  .aside {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 10px 0;
	background: var(--modal-bg);
	height: 100vh;
	width: max-content;

	gap: 50px;


	.menu {
	  display: flex;
	  flex-direction: column;
	  gap: 25px;

	  &__url {
		color: var(--primary-text);
		user-select: none;
		cursor: pointer;
		padding: 5px 25px;
		display: flex;

        transition: .3s;

		&:hover {
		  color: var(--primary-text-hover);
		}

		&.active, &:active {
		  color: var(--main-color);
		}

		&.active {
		  position: relative;
		  z-index: 2;

		  &:before {
			content: '';
			position: absolute;
			background: var(--layout-bg);
			height: 100%;
			width: calc(100% - 25px);
			border-top-left-radius: 10px;
			border-bottom-left-radius: 10px;

			padding: 10px;
			top: 50%;
			right: 0;
			transform: translateY(-50%);
			z-index: -1;

            transition: .3s;
		  }
		}
	  }
	}
  }
</style>
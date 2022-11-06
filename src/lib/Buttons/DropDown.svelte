<script>

    import Icon from "$lib/Core/Icon.svelte";
    import {writable} from "svelte/store";
    import {setContext} from "svelte";
    import {clickOutside} from "$lib/utils/index.js";

    export let
        items = [{
            id: 0,
            title: 'Профиль',
            dropdown: [
                {
                    id: 0,
                    icon: '/icons/profile.svg',
                    name: 'Пользователь',
                    warning: false,
                    disabled: false,
                    fn: () => {
                    }
                },
                {
                    id: 1,
                    icon: '/icons/exit.svg',
                    name: 'Выйти',
                    warning: true,
                    disabled: false,
                    fn: () => {
                    }
                },
            ]
        }]

    /**
     * Functions
     */
    const dropdownHandler = () => {
        $isOpen = !$isOpen
    }

    const clickHandler = (e, fn) => {
        fn()
    }

    /**
     * Store
     */
    const isOpen = writable(false)

    /**
     * Set context
     */
    setContext("dropdown-open", isOpen)
</script>

<div class="dropdown"
     on:click={dropdownHandler}
     use:clickOutside
     on:click_outside={() => $isOpen = false}>

    {#if $isOpen}
        <div class="dropdown__wrapper">
            {#each items as item, itemIndex (item.id)}
                <div class="dropdown__item">

                    <h4 class="dropdown__item-title">{item.title}</h4>

                    <div class="dropdown__item-menu">
                        {#each item.dropdown as dropdownItem, dropdownItemIndex (dropdownItem.id)}
                            <div class="dropdown__item-menu__item"
                                 on:click|preventDefault={(e) => clickHandler(e, dropdownItem.fn)}
                                 class:disabled={dropdownItem.disabled}
                                 class:warning={dropdownItem.warning}>

                                {#if dropdownItem.icon}
                                    <Icon url={dropdownItem.icon}
                                          height="20px"
                                          width="20px"/>
                                {/if}

                                <span class="dropdown__item-menu__item-name">{dropdownItem.name}</span>
                            </div>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    {/if}

    <slot/>
</div>

<style lang="scss">
  .dropdown {
	position: relative;

	&__wrapper {
	  position: absolute;
	  bottom: -6px;
	  right: 0;
	  z-index: 10;

	  transform: translateY(100%);

	  width: 200px;
	  padding: 4px;
	  border-radius: 5px;
	  background: var(--modal-bg);

	  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
	}

	&__item {
	  display: flex;
	  flex-direction: column;
	  gap: 4px;

	  &-title {
		padding: 4px 8px;
		color: var(--secondary-text);
		margin: 0;

		font-weight: 400;
	  }

	  &-menu {
		display: flex;
		flex-direction: column;
		gap: 5px;

		&__item {
		  display: flex;
		  flex-direction: row;
		  gap: 10px;
		  padding: 6px 8px;
		  cursor: pointer;

		  border-radius: 2px;

		  :global(.icon svg path) {
			fill: var(--primary-text);
		  }

		  &-name {
			color: var(--primary-text);
		  }

		  &.warning {
			:global(.icon svg path) {
			  fill: var(--warning-text);
			}

			.dropdown__item-menu__item-name {
			  color: var(--warning-text);
			}
		  }

		  &:hover {
			background: var(--modal-item-hover);
		  }

          &.active {
			background: var(--modal-item-hover);
		  }
		}
	  }
	}
  }
</style>
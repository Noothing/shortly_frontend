<script>

    /**
     * Components
     */
    import Icon from "$lib/Core/Icon.svelte";
    import Button from "$lib/Buttons/Button.svelte";
    import {getContext, onMount} from "svelte";
    import IconButton from "$lib/Buttons/IconButton.svelte";
    import ToolTip from "$lib/Buttons/ToolTip.svelte";
    import MainHeader from "$lib/Blocks/MainHeader.svelte";
    import {router} from "tinro";

    /**
     * Get context
     */
    const isAuth = getContext("isAuth")
    const {cutURL, URLs} = getContext("URL")


    const checkUrl = (string) => {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    let error = false
    let url = ''
    let short = ''

    let center = true

    let registrationPopUp = false
    let loginPopUp = false

    const openRegistration = () => {
        loginPopUp = false
        registrationPopUp = true
    }

    const openLogin = () => {
        loginPopUp = true
        registrationPopUp = false
    }

    let input
    let loading = false

    const cutUrl = async () => {
        loading = true
        const url = input.value
        if (checkUrl(url)) {
            const res = await cutURL(url)
            loading = false
        } else {
            error = true
            loading = false
        }
    }

    const inputLogic = async (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (!loading) await cutUrl()
        }
    }
</script>

<MainHeader/>

<main class="wrapper">

    <div class="short__block">
        <div class="short__input"
             class:error={error}>
            <input type="text"
                   on:keyup={inputLogic}
                   bind:this={input}
                   disabled={loading}
                   placeholder="https://shorlty.tech"/>
            <Button primary={true}
                    disabled={loading}
                    on:click={cutUrl}>Cut
            </Button>
        </div>

        {#if $URLs.length > 0}
            <div class="short__last">
                <a class="url__native" href="https://vk.com">
                    {$URLs[0].url}
                </a>

                <div class="url__short">
                    <a href="https://link.shorlty.tech/ABSDF">
                        https://link.shorlty.tech/{$URLs[0].id}
                    </a>
                    {#if $isAuth}
                        <IconButton icon="/icons/timeline.svg"
                                    on:click={() => router.goto('/profile')}
                                    icon_only={true}/>
                    {:else}
                        <ToolTip>
                            <svelte:fragment slot="trigger">
                                <Icon url="/icons/timeline.svg"
                                      height="20px"
                                      width="20px"/>
                            </svelte:fragment>

                            <svelte:fragment slot="text">
                                You need to be authed for viewing more information
                            </svelte:fragment>
                        </ToolTip>
                    {/if}
                </div>
            </div>
        {/if}
    </div>

</main>

<style lang="scss">
  .url {
	&__short {
	  display: inline-flex;
	  align-items: center;
	  gap: 10px;

	  a {
		text-align: right;
	  }

	  :global(.button) {
		height: 25px;
		width: 25px;

		padding: unset;
		display: flex;
		justify-content: center;
		align-items: center;
	  }

	  :global(.button svg path) {
		height: 25px;
		width: 25px;
		display: flex;
		justify-content: center;
		align-items: center;

		fill: var(--primary-text);
	  }

	  :global(.tooltip svg path) {
		fill: var(--primary-text);
	  }
	}
  }

  .short {
	&__last {
	  display: grid;
	  grid-template-columns: 1fr 1fr;
	  grid-gap: 20px;
	  width: 100%;

	  a {
		width: 100%;
		max-width: 100%;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		color: var(--primary-text);
		font-size: 14px;
		line-height: 18px;
		text-decoration: none;

		&:hover {
		  color: var(--main-color);
		}
	  }
	}

	&__block {
	  position: absolute;
	  top: 50%;
	  left: 50%;

	  transform: translate(-50%, -50%);

	  width: 55vw;
	  min-width: 32rem;
	  max-width: 54rem;

	  display: flex;
	  flex-direction: column;
	  gap: 15px;
	}

	&__input {
	  width: 100%;
	  height: 2.8rem;
	  display: inline-flex;
	  align-items: center;

	  border: 2px solid var(--main-color);
	  border-radius: 8px;

      overflow: hidden;

      &.error {
        border-color: var(--warning-text);
      }

	  input {
		padding: 0 2rem 0 .8rem;
		margin: unset;
		background: unset;
		border: unset;
		outline: none;
		flex-grow: 1;

		color: var(--primary-text);
		font-size: 16px;
		line-height: 18px;
	  }

	  :global(.button.primary) {
		border-radius: unset;
	  }
	}
  }

  .wrapper {
	display: flex;
	height: 100%;
	width: 100%;

	position: relative;
  }

  .content {
	display: flex;
	justify-content: center;

	margin-top: 100px;
	height: 100%;
	width: 100%;
  }

  .global-input {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	top: 28px;
	position: absolute;
	left: 50%;

	transform: translateX(-50%);

	height: max-content;
	width: 50%;

	transition: top .2s, transform .2s;

	&.center {
	  top: 50%;
	  transform: translate(-50%, -50%);
	}

	&__block {
	  position: relative;

	  display: inline-flex;
	  align-items: center;

	  width: 100%;
	  height: 60px;

	  margin-bottom: 10px;

	  overflow: hidden;

	  border: 1px solid var(--main-color);
	  border-radius: 15px;

	  padding: 0 0 0 1rem;

	  &.error {
		border-color: var(--warning-text);
	  }

	  .input {
		height: 100%;
		width: 100%;

		outline: unset;
		background: var(--layout-bg);

		font-size: 18px;
		line-height: 24px;
		color: var(--primary-text);

		margin-right: 46px;

		border: unset;

		&::placeholder {
		  font-size: 18px;
		  line-height: 24px;
		}

		&:valid {
		  background: var(--layout-bg);
		}

		&:-webkit-autofill,
		&:-webkit-autofill:hover,
		&:-webkit-autofill:focus,
		&:-webkit-autofill:active {
		  -webkit-box-shadow: none !important;
		  background: unset;
		}
	  }

	  :global(button.primary) {
		border-radius: 9px;
		margin: 6px;
		height: calc(100% - 12px);
	  }

	  :global(button.icon) {
		height: 100%;
		padding: 8px;
		margin: 0 10px;

		position: absolute;
		right: 100px;
	  }
	}

	&__shorted {
	  display: flex;
	  flex-direction: column;
	  width: 100%;

	  border-radius: 15px;
	  padding: 3px 0;
	}
  }

  .shorted__item {
	display: inline-flex;
	justify-content: space-between;
	align-items: center;

	border-radius: .4rem;
	padding: 2px 4px 2px 1rem;

	a {
	  line-height: 2;
	  color: var(--primary-text);
	  text-decoration: none;
	}

	:global(button) {
	  font-size: 12px;
	}

	&-long {
	  color: var(--secondary-text);
	}

	&-short {
	  &__block {
		display: inline-flex;
		align-items: center;
		gap: 10px;

		:global(.button.icon) {
		  padding: 4px;
		}
	  }
	}
  }

</style>
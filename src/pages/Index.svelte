<script>

    /**
     * Components
     */
    import Icon from "$lib/Core/Icon.svelte";
    import Button from "$lib/Buttons/Button.svelte";
    import {getContext} from "svelte";
    import DropDown from "$lib/Buttons/DropDown.svelte";
    import {flip} from 'svelte/animate'

    /**
     * Get context
     */
    const isAuth = getContext("isAuth")


    const checkUrl = (e) => {
        if (e.target.value.length > 0) {
            try {
                error = !Boolean(new URL(e.target.value));
            } catch (e) {
                error = true
            }
        } else {
            error = false
        }
    }

    let error = false
    let url = ''
    let short = ''

    let center = true
</script>

<h1> Test </h1>

<style lang="scss">
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

  .header {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;

	display: inline-flex;
	align-items: center;
	justify-content: space-between;

	width: 100%;
	padding: 28px 34px 0;
  }

  .user {
	height: 50px;
	width: 50px;
	border-radius: 50px;
	overflow: hidden;

	border: 1px solid #5A31FF;
	cursor: pointer;

	img {
	  height: 100%;
	  width: 100%;
	}
  }

  .logo {
	height: 50px;
	width: 50px;
  }
</style>
<script>
    /**
     * Svelte
     */
    import {getContext} from "svelte";

    /**
     * Components
     */
    import Icon from "$lib/Core/Icon.svelte";
    import DropDown from "$lib/Buttons/DropDown.svelte";
    import Button from "$lib/Buttons/Button.svelte";
    import RegistrationPopUp from "$lib/PopUp/RegistrationPopUp.svelte";
    import LoginPopUp from "$lib/PopUp/LoginPopUp.svelte";
    import {router} from "tinro";

    /**
     * Get context
     */
    const isAuth = getContext("isAuth")
    const logout = getContext("logout")

    let registrationPopUp = false
    let loginPopUp = false
    const dropdown = [{
        id: 0,
        title: null,
        dropdown: [
            {
                id: 0,
                icon: '/icons/chart.svg',
                name: 'All links',
                warning: false,
                disabled: false,
                fn: () => router.goto('/profile?page=links')
            },
            {
                id: 1,
                icon: '/icons/timeline.svg',
                name: 'Dashboard',
                warning: false,
                disabled: false,
                fn: () => router.goto('/profile?page=dashboard')
            },
            {
                id: 2,
                icon: '/icons/settings.svg',
                name: 'Settings',
                warning: false,
                disabled: false,
                fn: () => router.goto('/profile?page=settings')
            },
            {
                id: 3,
                icon: '/icons/exit.svg',
                name: 'Log out',
                warning: true,
                disabled: false,
                fn: () => logout()
            },
        ]
    }]

    const openRegistration = () => {
        router.goto('/registration')
    }

    const openLogin = () => {
        loginPopUp = true
        registrationPopUp = false
    }
</script>

<header class="header">
    <div class="logo">
        <Icon url="/icons/logo.svg"
              height="48px"
              width="48px"/>
    </div>

    {#if $isAuth}
        <DropDown items={dropdown}>
            <div class="user">
                <img src="../../public/avatar.jpg" alt="avatar"/>
            </div>
        </DropDown>
    {:else}
        <div class="buttons">
            <Button primary={true}
                    on:click={openLogin}>
                Sign in
            </Button>

            <Button secondary={true}
                    on:click={openRegistration}>
                Registration
            </Button>
        </div>
    {/if}
</header>

<RegistrationPopUp bind:isOpen={registrationPopUp}/>

<LoginPopUp bind:isOpen={loginPopUp}/>

<style lang="scss">
  .buttons {
    display: inline-flex;
    gap: 15px;
    align-items: center;
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
	z-index: 3;
  }

  .user {
	height: 45px;
	width: 45px;
	border-radius: 50px;
	cursor: pointer;

	position: relative;

	img {
	  height: 100%;
	  width: 100%;
	  overflow: hidden;
	  border-radius: 50px;
	}
  }

  .logo {
	height: 48px;
	width: 48px;
  }
</style>
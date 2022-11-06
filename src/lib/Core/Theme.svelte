<script>
    /**
     * Svelte
     */
    import {writable} from "svelte/store";
    import {getContext, onMount} from "svelte";

    /**
     * Get context
     */
    const {getCookie, setCookie} = getContext("cookies")

    /**
     * System
     */


    /**
     * Store
     */
    const theme = writable(getCookie("theme", null))

    /**
     * Functions
     */

    const setTheme = () => {
        switch ($theme) {
            case null:
                document.body.classList.contains('light') && document.body.classList.remove('light')
                document.body.classList.contains('dark') && document.body.classList.remove('dark')

                if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                    document.body.classList.add('dark')
                    setCookie('theme', 'dark')
                } else {
                    document.body.classList.add('light')
                    setCookie('theme', 'light')
                }

                break

            case 'dark':
                document.body.classList.contains('light') && document.body.classList.remove('light')
                document.body.classList.add('dark')
                break

            case 'light':
                document.body.classList.contains('dark') && document.body.classList.remove('dark')
                document.body.classList.add('light')
                break
        }
    }

    onMount(() => setTheme())

</script>

<slot/>

<style lang="scss" global>
  @import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;600;700&display=swap');

  * {
	box-sizing: border-box;
	font-family: 'Readex Pro', sans-serif;
	outline: unset;
	padding: 0;
	margin: 0;
  }

  html {
    height: 100%;
  }

  body {
	height: 100%;
	background: var(--layout-bg);

	&.dark {
      --main-color: #5A31FF;

	  --layout-bg: #161617;

	  --primary-text: #FFFFFF;
	  --primary-text-hover: rgba(255, 255, 255, .6);

	  --secondary-text: rgba(255, 255, 255, .45);
	  --secondary-text-hover: rgba(255, 255, 255, .6);

      --warning-text: #DC2626;

      --primary-button: #93C5FD;
      --primary-button-hover: #60A5FA;
      --primary-button-active: #1E3A8A;
      --primary-button-disabled: #5B21B6;

      --primary-button-text: #000000;
      --primary-button-text-disabled: #000000;

      --modal-bg: #232325;
      --modal-item-hover: #475569;
	}

	&.light {
	  --main-color: #5A31FF;

	  --layout-bg: #FFFFFF;

	  --primary-text: #030303;
	  --primary-text-hover: rgba(0, 0, 0, .6);

	  --secondary-text: rgba(255, 255, 255, .45);
	  --secondary-text-hover: rgba(255, 255, 255, .6);

      --warning-text: #DC2626;

	  --primary-button: #93C5FD;
	  --primary-button-hover: #DBEAFE;
	  --primary-button-active: #BFDBFE;
	  --primary-button-disabled: #C4B5FD;

	  --primary-button-text: #000000;
	  --primary-button-text-disabled: #000000;

	  --modal-bg: #fff;
	  --modal-item-hover: #475569;
	}
  }

</style>
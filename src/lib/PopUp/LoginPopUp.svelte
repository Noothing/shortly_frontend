<script>

    /**
     * Svelte
     */
    import {getContext} from "svelte";

    /**
     * Components
     */
    import PopUp from "$lib/Core/PopUp.svelte";
    import Button from "$lib/Buttons/Button.svelte";
    import Input from "$lib/Blocks/Input.svelte";

    /**
     * Props
     */
    export let
        isOpen = false

    /**
     * Get context
     */
    const api = getContext("api")
    const checkAuth = getContext("checkAuth")

    /**
     * Function
     */
    const logIn = async () => {
        const data = {}

        form.forEach(field => data[field.name] = field.value)

        const {data: req} = await $api.post('/user/auth', data)

        if (req.success) {
            isOpen = false
            checkAuth()
        } else {
            req.error.errored.forEach((field) => {
                form[field].error = req.error.text
            })

            form = form
        }
    }

    /**
     * Variables
     */
    let form = [
        {
            id: 1,
            label: 'Username',
            name: 'username',
            type: 'text',
            placeholder: null,
            required: true,
            ref: null,
            form: false,
            validation: {
                min: 6,
                max: null,
                fn: null
            },
            value: null,
            error: false
        },
        {
            id: 2,
            label: 'Password',
            name: 'password',
            type: 'password',
            placeholder: null,
            required: true,
            ref: null,
            form: false,
            validation: {
                min: 6,
                max: null,
                fn: null
            },
            value: null,
            error: false
        }
    ]
</script>

<PopUp isOpen={isOpen}>

    <div class="popup__header">
        Log in
    </div>

    <div class="popup__body">
        {#each form as input, inputIndex (input.id)}
            <Input
                    bind:ref={input.ref}
                    label={input.label}
                    placeholder={input.placeholder}
                    validation={input.validation.fn}
                    min={input.validation.min}
                    required={input.required}
                    name={input.name}
                    type={input.type}
                    bind:error={input.error}
                    bind:value={input.value}/>
        {/each}
    </div>

    <div class="popup__footer">
        <Button primary={true}
                disabled={form.find(e => (e.value ?? '').length === 0) || form.find(e => e.error)}
                on:click={logIn}>
            Confirm
        </Button>
    </div>
</PopUp>

<style lang="scss">
  .popup__header {
	font-size: 20px;
	font-weight: 500;
	line-height: 25px;
	color: var(--primary-text);

	margin-bottom: 35px;
	text-align: center;
  }

  .popup__body {
    display: flex;
    flex-direction: column;
	margin-bottom: 20px;
    gap: 15px;
  }

  .popup__footer {
	display: flex;
	justify-content: center;
	align-items: center;
  }

  .registration {
	display: flex;
	flex-direction: column;

	justify-content: center;
	align-items: center;

	width: 100%;

	gap: 15px;

	.input_block {
	  display: flex;
	  flex-direction: column;
	  gap: 5px;
	  width: 100%;

	  &__label {
		font-size: 14px;
		font-weight: 300;
		color: var(--primary-text);
	  }
	}
  }
</style>
<script>
    /**
     * Svelte
     */
    import {getContext} from "svelte";


    /**
     * Components
     */
    import PopUp from "$lib/Core/PopUp.svelte";
    import Input from "$lib/Blocks/Input.svelte";
    import Button from "$lib/Buttons/Button.svelte";

    /**
     * Get context
     */
    const api = getContext("api")
    const register = getContext("register")
    const checkAuth = getContext("checkAuth")

    /**
     * Props
     */
    export let
        isOpen = false

    /**
     * Functions
     */
    const validateEmail = (value) => {
        const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return !validRegex.test(value) ? 'Email is invalid' : false
    }

    const validateUsername = async (value, min) => {
        if (value.trim().length === value.length) {
            console.log(value)
            if (value.length > min) {
                const {data: req} = await $api.get("/user/exist", {
                    params: {
                        username: value
                    }
                })

                console.log(req.data.exist)

                return req.data.exist ? "Username is already exist" : false
            } else {
                return `Field length have to be more then ${min} symbols`
            }
        } else {
            return 'Field have not contain spaces'
        }
    }

    const validateText = (value, min) => {
        if (value.length > min) {
            if (value.trim().length !== 0) {
                return false
            } else {
                return `Incorrect field value`
            }
        } else {
            return `Field length have to be more then ${min} symbols`
        }
    }

    const validateConfirm = (value) => {
        const password = form.find(e => e.name === 'password')

        if (password) {
            if (value != password.value) {
                return 'Password are not the same'
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const validateAll = async () => {
        let errored = 0
        let data = {}

        for (let i = 0; i < form.length; i++) {
            const field = form[i]
            const value = field.ref.value

            data[field.name] = field.value

            field.error = await field.validation.fn(value, field.validation.min)
            if (field.error) errored++
        }

        form = form

        if (errored === 0) {
            const res = await register(data)

            if (!res.success) {
                res.error.errored.forEach(field => {
                    const formField = form.find(e => e.name == field)
                    formField.error = res.error.text
                })

                form = form
            } else {
                await checkAuth()
            }
        }
    }

    /**
     * Variables
     */
    let form = [
        {
            id: 0,
            label: 'Email',
            name: 'email',
            type: 'email',
            placeholder: 'market@mail.ru',
            required: true,
            ref: null,
            form: true,
            validation: {
                min: null,
                max: null,
                fn: validateEmail
            },
            value: 'test@mail.ru',
            error: false
        },
        {
            id: 1,
            label: 'Username',
            name: 'username',
            type: 'text',
            placeholder: 'dangermaster_2007',
            required: true,
            ref: null,
            form: true,
            validation: {
                min: 3,
                max: null,
                fn: validateUsername
            },
            value: 'dangermaster',
            error: false
        },
        {
            id: 2,
            label: 'First name',
            name: 'firstname',
            type: 'text',
            placeholder: 'Danger',
            required: true,
            ref: null,
            form: true,
            validation: {
                min: 1,
                max: null,
                fn: validateText
            },
            value: 'Danger',
            error: false
        },
        {
            id: 3,
            label: 'Last name',
            name: 'lastname',
            type: 'text',
            placeholder: 'Master',
            required: true,
            ref: null,
            form: true,
            validation: {
                min: 1,
                max: null,
                fn: validateText
            },
            value: 'Master',
            error: false
        },
        {
            id: 4,
            label: 'Address',
            name: 'address',
            type: 'address',
            placeholder: 'Deep dark fantasy',
            required: false,
            ref: null,
            form: true,
            validation: {
                min: null,
                max: null,
                fn: validateText
            },
            value: 'Deep dark fantasy',
            error: false
        },
        {
            id: 5,
            label: 'Password',
            name: 'password',
            type: 'password',
            placeholder: null,
            required: true,
            ref: null,
            form: true,
            validation: {
                min: 6,
                max: null,
                fn: validateText
            },
            value: '1234567',
            error: false
        },
        {
            id: 6,
            label: 'Confirm password',
            name: 'confirm password',
            type: 'password',
            placeholder: null,
            required: true,
            ref: null,
            form: false,
            validation: {
                min: 6,
                max: null,
                fn: validateConfirm
            },
            value: '1234567',
            error: false
        }
    ]

</script>

<PopUp bind:isOpen>

    <div class="popup__header">
        Registration
    </div>

    <div class="popup__body">
        <div class="registration">

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
    </div>

    <div class="popup__footer">
        <Button primary={true}
                disabled={form.find(e => (e.value ?? '').length === 0) || form.find(e => e.error)}
                on:click={validateAll}>
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
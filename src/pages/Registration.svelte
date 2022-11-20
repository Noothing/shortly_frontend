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
    import Icon from "$lib/Core/Icon.svelte";
    import {router} from "tinro";

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
                router.goto('/')
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
            placeholder: 'noothing@shorlty.tech',
            required: true,
            ref: null,
            form: true,
            validation: {
                min: null,
                max: null,
                fn: validateEmail
            },
            value: null,
            error: false
        },
        {
            id: 1,
            label: 'Username',
            name: 'username',
            type: 'text',
            placeholder: 'shorlty_2022',
            required: true,
            ref: null,
            form: true,
            validation: {
                min: 3,
                max: null,
                fn: validateUsername
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
            form: true,
            validation: {
                min: 6,
                max: null,
                fn: validateText
            },
            value: null,
            error: false
        },
        {
            id: 3,
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
            value: null,
            error: false
        }
    ]

</script>

<div class="bg">
</div>

<div class="form">

    <div class="form__information">
        <div class="logo" on:click={() => router.goto('/')}>
            <Icon url="/icons/full-logo.svg"
                  height="100px"
                  width="250px"/>
        </div>

        <h1 class="form__title">Shorlty - smart link shortening service</h1>

        <div class="form__advantages">

            <div class="advantage">

                <Icon url="/icons/timeline.svg"
                      height="30px"
                      width="30px"/>

                <h3 class="advantage-title">Detailed statistics</h3>
            </div>

            <div class="advantage">

                <Icon url="/icons/no-money.svg"
                      height="30px"
                      width="30px"/>

                <h3 class="advantage-title">Most functions are for free</h3>
            </div>

            <div class="advantage">

                <Icon url="/icons/settings-ethernet.svg"
                      height="30px"
                      width="30px"/>

                <h3 class="advantage-title">Don't need to any integrations</h3>
            </div>

        </div>
    </div>

    <div class="form__block">

        <h1 class="form__block-title">Registration</h1>

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

        <Button primary={true}
                disabled={form.find(e => (e.value ?? '').length === 0) || form.find(e => e.error)}
                on:click={validateAll}>
            Create account
        </Button>

        <div class="form__description">
            <span>Already have account? <a href="/login">Sign in</a></span>
        </div>

    </div>


</div>


<style lang="scss">
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    
    height: 100%;
    width: 100%;
	overflow: hidden;

    background: url("/icons/cover.png") center;
    
    img {
      height: 100%;
	  width: 100%;
    }
  }

  .advantage {
    height: 150px;
    width: 150px;
    background: var(--main-color);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    border-radius: 10px;

    padding: 15px 10px;
    gap: 15px;

    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: .3s;

    user-select: none;

    &:hover {
      transform: translateY(-5px);
    }

    &-title {
	  font-size: 16px;
	  font-weight: 500;
	  color: var(--primary-text);

      cursor: default;
	}

    :global(.icon svg path) {
      fill: var(--primary-text);
    }
  }

  .form {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	display: grid;
	grid-template-columns: 0.8fr 500px;
	align-items: center;
	gap: 50px;
	width: 75vw;

    @media screen and (max-width: 1200px){
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
	}

    &__advantages {
      display: flex;
      flex-direction: row;
      align-items: center;

      width: 100%;
      justify-content: space-around;

      margin-top: 20px;

    }

	&__description {
	  margin: 0 auto;
	  color: var(--secondary-text);
      user-select: none;

	  a {
		color: var(--main-color);
		text-decoration: none;
	  }
	}

	&__information {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;

      user-select: none;
      border-radius: 10px;

      background: var(--modal-bg);
      height: 100%;

      gap: 20px;

	  @media screen and (max-width: 1200px){
		display: none;
	  }

	  h1 {
		color: var(--primary-text);
		font-size: 25px;
	  }

      .logo {
        cursor: pointer;
      }
	}

	&__block {
	  display: flex;
	  flex-direction: column;
	  gap: 15px;
	  width: 100%;

	  background: var(--modal-bg);
	  padding: 20px 25px;
	  border-radius: 10px;

	  h1 {
		text-align: center;
		color: var(--primary-text);
		font-size: 25px;
	  }
	}
  }
</style>
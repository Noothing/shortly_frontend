<script>
    /**
     * Components
     */
    import PopUp from "$lib/Core/PopUp.svelte";
    import Input from "$lib/Blocks/Input.svelte";
    import Button from "$lib/Buttons/Button.svelte";

    /**
     * Svelte
     */
    import {createEventDispatcher, getContext} from "svelte";

    /**
     * Get context
     */
    const {createGood} = getContext("goods")

    /**
     * Event dispatcher
     */
    const dispatch = createEventDispatcher()

    /**
     * Props
     */
    export let
        isOpen = true

    /**
     * Functions
     */

    const openInput = () => {
        inputFile.click()
    }

    function readURL(input) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            form[0].value = reader.result
        });
        reader.readAsDataURL(input.target.files[0]);
    }

    const validateText = (value, min) => {
        if (value.length > min) {
            if (value.trim().length !== 0) {
                return false
            } else {
                return `Incorrect field value`
            }
        } else {
            return `Field length has to be more then ${min} symbols`
        }
    }

    const validateNumber = (value, min) => {
        if (+value > +min) {
            return false
        } else {
            return `Field has to be more then ${min}`
        }
    }

    const urlToFile = async (url, filename, mimeType) => {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        return new File([buf], filename, {type: mimeType});
    };


    const validateAll = async () => {
        let errored = 0
        let formData = new FormData()

        for (let i = 0; i < form.length; i++) {
            const field = form[i]
            const value = field.value

            if (field.value) {
                if (field.type === 'file') formData.append(field.name, await urlToFile(field.value, `item.jpg`, "image/jpeg"))
                else formData.append(field.name, field.value)
            }

            if (field.validation.fn) field.error = await field.validation.fn(value, field.validation.min)
            if (field.error) errored++

        }

        form = form

        if (errored === 0) {
            const res = await createGood(formData)

            if (res) {
                isOpen = false
                dispatch('success')
            }
        }
    }

    /**
     * Body
     */
    let inputFile

    let form = [
        {
            id: 1,
            label: 'Image',
            name: 'image',
            type: 'file',
            placeholder: null,
            required: false,
            ref: null,
            form: false,
            validation: {
                min: null,
                max: null,
                fn: null
            },
            value: null,
            error: false
        },
        {
            id: 2,
            label: 'Name',
            name: 'name',
            type: 'text',
            placeholder: 'Bandage',
            required: true,
            ref: null,
            form: false,
            validation: {
                min: 6,
                max: null,
                fn: validateText
            },
            value: 'Bandage',
            error: false
        },
        {
            id: 3,
            label: 'Description',
            name: 'description',
            type: 'text',
            placeholder: 'Very stretch for funny games with two heterosexual guys',
            required: true,
            ref: null,
            form: false,
            validation: {
                min: 6,
                max: null,
                fn: validateText
            },
            value: 'Very stretch for funny games with two heterosexual guys',
            error: false
        },
        {
            id: 4,
            label: 'Price',
            name: 'price',
            type: 'number',
            placeholder: '300',
            required: true,
            ref: null,
            form: false,
            validation: {
                min: 0,
                max: null,
                fn: validateNumber
            },
            value: 560,
            error: false
        },

    ]

</script>

<PopUp bind:isOpen={isOpen}>
    <div class="create">

        <h2>Create good</h2>

        <div class="create__image" on:click={openInput}>
            <input type="file"
                   on:change={readURL}
                   bind:this={inputFile}
                   accept=".png, .jpg, .jpeg"/>

            {#if form[0].value}
                <img src={form[0].value} alt="good_image"/>
            {/if}
        </div>

        <div class="create__form">

            {#each form as field, fieldIndex (field.id)}
                {#if field.type != 'file'}
                    <Input
                            bind:ref={field.ref}
                            label={field.label}
                            placeholder={field.placeholder}
                            validation={field.validation.fn}
                            min={field.validation.min}
                            required={field.required}
                            name={field.name}
                            type={field.type}
                            bind:error={field.error}
                            bind:value={field.value}/>
                {/if}
            {/each}
        </div>

        <Button primary={true}
                disabled={form.find(e => e.required && (e.value ?? '').length === 0) || form.find(e => e.error)}
                on:click={form.find(e => e.required && (e.value ?? '').length === 0) || form.find(e => e.error) ? null : validateAll}>
            Create
        </Button>

    </div>
</PopUp>

<style lang="scss">
  .create {
	display: flex;
	flex-direction: column;
	gap: 25px;
	align-items: center;
	height: 100%;
	width: 100%;
	color: var(--primary-text);

	&__form {
	  display: flex;
	  flex-direction: column;
	  width: 100%;
	  gap: 20px;
	}

	h2 {
	  text-align: center;
	}

	&__image {
	  height: 250px;
	  width: 250px;
	  border: 1px solid var(--main-color);
	  cursor: pointer;
	  position: relative;

	  img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	  }

	  input {
		display: none;
		position: absolute;
		left: 0;
		top: 0;
	  }
	}

  }

</style>
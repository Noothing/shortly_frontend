<script>
    /**
     * Svelte
     */
    import {createEventDispatcher} from "svelte";

    /**
     * Libs
     */
    import {v4 as uuidv4} from 'uuid';

    /**
     * Dispatch
     */
    const dispatch = createEventDispatcher()

    /**
     * Props
     */
    export let
        type = "text",
        label = null,
        value = null,
        placeholder = null,
        name = null,
        required = false,
        min = null,
        error = false,
        ref = false,
        validation = () => {
        }

    const onInput = (e) => {
        value = e.target.value
    }

    const onBlur = async (e) => {
        if (required) {
            if (e.target.value.length > 0 && typeof validation == "function") {
                error = await validation(e.target.value, min)
                console.log(error)
            }
        }
    }

    const id = uuidv4()
</script>

<div class="input_block">
    {#if label}
        <label for={id} class="input_block__label">
            {label}
        </label>
    {/if}

    <input
            id={id}
            {type}
            {name}
            bind:this={ref}
            on:input={onInput}
            on:blur={onBlur}
            value={value}
            placeholder={placeholder}
            class:error
            class="input">

    {#if error}
        <span class="input_block__error">
            {error}
        </span>
    {/if}
</div>

<style lang="scss">

  .input_block {
	display: flex;
	flex-direction: column;
	gap: 5px;
	width: 100%;

	&__error {
	  font-size: 12px;
	  font-weight: 300;
	  color: var(--warning-text);
	}

	&__label {
	  font-size: 14px;
	  font-weight: 300;
	  color: var(--primary-text);
	}
  }

  .input {
	width: 100%;

	background: transparent;
	border: unset;
	border-bottom: 1px solid white;

	font-size: 14px;
	line-height: 18px;
	color: var(--primary-text);

	padding: 6px 10px;

	&:hover, &:focus {
	  border-color: var(--main-color);
	}

	&.error {
	  border-color: var(--warning-text);
	}
  }

</style>
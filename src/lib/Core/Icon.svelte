<script>
    /**
     * Svelte
     */
    import {setContext} from "svelte";

    /**
     * Export
     */
    export let url = undefined;
    export let width = undefined;
    export let height = undefined;
    export let customFill = false;
    export let customStroke = false;
    export let marginTop = undefined;
    export let marginRight = undefined;
    export let marginBottom = undefined;
    export let marginLeft = undefined;
    export let mask = false

    /**
     * Function
     */
    const load = (url) => {
        return new Promise(async (resolve, reject) => {
            const res = await fetch(url);
            const text = await res.text();

            if (res.ok) {
                resolve(text);
            } else {
                reject(text);
            }
        });
    }

</script>

<div class="icon"
     style:width
     style:height
     style:margin-top={marginTop}
     style:margin-right={marginRight}
     style:margin-bottom={marginBottom}
     style:margin-left={marginLeft}>
    {#await load(url)}
        <slot name="loading"/>
    {:then text}
        {@html text}
    {/await}
</div>

<style lang="scss">
  .icon {
	display: flex;

	& :global(svg) {
	  width: 100%;
	  height: 100%;
	}

	&.custom-fill {
	  & :global(svg path) {
		fill: var(--fill);
	  }
	}

	&.custom-stroke {
	  & :global(svg path) {
		stroke: var(--stroke);
	  }
	}

	&.mask {
	  :global(svg mask) {
		fill: var(--fill);
	  }

	  :global(svg path) {
		fill: var(--fill);
	  }

	  :global(svg mask path) {
		fill: aqua;
	  }
	}
  }
</style>

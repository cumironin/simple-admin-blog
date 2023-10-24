<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	export let show = true;

	const dispatch = createEventDispatcher();

	const out = $page.route.id as string;
	const splitUrl = out.split('/');

	const getUrl = String('/' + splitUrl[1] + '/' + splitUrl[2]);

	const closeOutside = () => {
		dispatch('closeOutside');

		if (out !== 'modal') {
			goto(getUrl);
		}
	};
</script>

{#if show}
	<div class="fixed top-0 left-0 w-full bg-black bg-opacity-80 z-50" on:click={closeOutside}>
		<div
			class="mx-auto my-52 max-w-sm bg-white rounded-lg shadow-xl p-10 space-y-6"
			on:click|stopPropagation
		>
			<!--Ini untuk forms-->
			<slot />
		</div>
	</div>
{/if}

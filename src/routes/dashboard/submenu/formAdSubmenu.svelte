<script lang="ts">
	import { enhance } from '$app/forms';

	import { createEventDispatcher } from 'svelte';
	import type { PageData } from '../../$types';

	const dispatch = createEventDispatcher();

	const closeForm = () => {
		dispatch('closeForm');
	};

	export let data: paged;
</script>

<form method="POST" action="/dashboard/submenu?/saveSubMenu" use:enhance={closeForm}>
	<div>
		<div>
			<label for="name" class="block text-sm font-medium text-gray-900 leading-6"
				>Sub Menu Name</label
			>
			<input
				id="name"
				type="text"
				name="name"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
			/>
		</div>
		<div>
			<label for="urlrestrict" class="block text-sm font-medium text-gray-900 leading-6"
				>URL Restrict</label
			>
			<input
				id="urlrestrict"
				type="text"
				name="urlrestrict"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
			/>
		</div>
		<div>
			<select name="submenu">
				<option value="">-- Pilih Menu --</option>
				{#each data.menuId as submenu}
					<option value={submenu.id}>{submenu.name}</option>
				{/each}
			</select>
		</div>

		<div class="flex justify-end">
			<button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"> Save </button>
			<button
				class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
				on:click={closeForm}
			>
				Cancel
			</button>
		</div>
	</div>
</form>

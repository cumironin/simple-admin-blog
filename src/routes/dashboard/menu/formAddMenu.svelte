<script lang="ts">
	import { enhance } from '$app/forms';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const closeForm = () => {
		dispatch('closeForm');
	};

	// export let roleAll: Role;
</script>

<form method="POST" action="/dashboard/menu?/saveMenu" use:enhance={closeForm}>
	<div>
		<div>
			<label for="numsort" class="block text-sm font-medium text-gray-900 leading-6">Num Sort</label
			>
			<input
				id="numsort"
				type="text"
				name="numsort"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
			/>
		</div>
		<div>
			<label for="name" class="block text-sm font-medium text-gray-900 leading-6">Menu Name</label>
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
			<label for="svg" class="block text-sm font-medium text-gray-900 leading-6">SVG</label>
			<input
				id="svg"
				type="text"
				name="svg"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
			/>
		</div>
		<!-- <div>
			<select name="role">
				<option value="">-- Pilih Role --</option>
				{#each roleAll.rol as role}
					<option value={role.id}>{role.name}</option>
				{/each}
			</select>
		</div> -->

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

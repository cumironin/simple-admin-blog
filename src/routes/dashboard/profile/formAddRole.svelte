<script lang="ts">
	import { enhance } from '$app/forms';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const closeForm = () => {
		dispatch('closeForm');
	};

	export let data: any;
</script>

<form method="POST" action="/dashboard/profile?/saveMenu" use:enhance={closeForm}>
	<div>
		<div>
			<label for="username" class="block text-sm font-medium text-gray-900 leading-6"
				>User Name</label
			>
			<input
				id="username"
				type="text"
				name="username"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
			/>
		</div>
		<div>
			<label for="name" class="block text-sm font-medium text-gray-900 leading-6">Name</label>
			<input
				id="name"
				type="text"
				name="name"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
			/>
		</div>
		<div>
			<label for="email" class="block text-sm font-medium text-gray-900 leading-6">Email</label>
			<input
				id="email"
				type="text"
				name="email"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
			/>
		</div>

		<div>
			<select name="role">
				<option value="">-- Pilih Role --</option>
				{#each data.roleAll as role}
					<option value={role.id}>{role.name}</option>
					<input id="roleid" name="roleid" type="hidden" />
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

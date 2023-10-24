<script lang="ts">
	import { enhance } from '$app/forms';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const closeForm = () => {
		dispatch('closeForm');
	};

	export let data: any;
</script>

<form method="POST" action="/dashboard/usergroup?/saveGroup" use:enhance={closeForm}>
	<div>
		<div>
			<select name="user">
				<option value="">-- Pilih User --</option>
				{#each data.userAll as user}
					<option value={user.id}>{user.name}</option>
				{/each}
			</select>
		</div>
		<div>
			<select name="role">
				<option value="">-- Pilih Role --</option>
				{#each data.roleAll as role}
					<option value={role.id}>{role.rolename}</option>
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

<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let data: any;
	export let userGroupId: any;

	const out = String($page.route.id);
	const splitUrl = out.split('/');
	const getUrl = String('/' + splitUrl[1] + '/' + splitUrl[2]);

	const closeForm = () => {
		dispatch('closeForm');

		if (out !== 'modal') {
			goto(getUrl);
		}
	};

	// console.log(userGroupId);
</script>

<form method="POST" use:enhance={closeForm}>
	<div>
		<div>
			<select name="user" bind:value={userGroupId.nameid}>
				<option value="">-- Pilih User --</option>
				{#each data.userAll as user}
					<option value={user.id}>{user.name}</option>
				{/each}
			</select>
		</div>
		<div>
			<select name="role" bind:value={userGroupId.roleid}>
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

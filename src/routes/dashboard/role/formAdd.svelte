<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import MultiSelect from 'svelte-multiselect';

	let selected;
	const dispatch = createEventDispatcher();

	export let data: any;

	let arrMenu: any[] = [];
	const menuIdOk = data.menuAll;
	menuIdOk.forEach((item: { name: any }) => {
		arrMenu.push(item.name);
	});

	let arrPermission: any[] = [];
	const permissionAll = data.permissionAll;
	permissionAll.forEach((item: { name: any }) => {
		arrPermission.push(item.name);
	});

	const closeForm = () => {
		dispatch('closeForm');
	};
</script>

<form method="POST" action="/dashboard/role?/saveRole" use:enhance={closeForm}>
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
			<label for="rolename" class="block text-sm font-medium text-gray-900 leading-6">Name</label>
			<input
				id="rolename"
				type="text"
				name="rolename"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
			/>
		</div>
		<div>
			<label for="arrmenu" class="block text-sm font-medium text-gray-900 leading-6"
				>Restricted Menu</label
			>
			<MultiSelect name="arrmenu" options={arrMenu} />
		</div>

		<div>
			<label for="arrpermission" class="block text-sm font-medium text-gray-900 leading-6"
				>Restricted Permission</label
			>
			<MultiSelect name="arrpermission" options={arrPermission} />
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

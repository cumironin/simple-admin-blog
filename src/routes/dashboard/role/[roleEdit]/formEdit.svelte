<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { MultiSelect } from 'svelte-multiselect';

	const dispatch = createEventDispatcher();
	export let data;
	const roleDataId = data.roleId;
	// const roleMenuName = data.menuName;

	let arrMenu: any[] = [];
	const roleMenuName = data.menuName;
	roleMenuName.forEach((item: { name: any }) => {
		arrMenu.push(item.name);
	});

	let arrPermission: any[] = [];
	const permissionName = data.permissionName;
	permissionName.forEach((item: { name: any }) => {
		arrPermission.push(item.name);
	});

	const out = String($page.route.id);
	const splitUrl = out.split('/');
	const getUrl = String('/' + splitUrl[1] + '/' + splitUrl[2]);

	const closeForm = () => {
		dispatch('closeForm');

		if (out !== 'modal') {
			goto(getUrl);
		}
	};
</script>

<form method="POST" use:enhance={closeForm}>
	<div>
		<div>
			<label for="rolename" class="block text-sm font-medium text-gray-900 leading-6">Name</label>
			<input
				id="rolename"
				type="text"
				name="rolename"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
				value={roleDataId.roleName}
			/>
		</div>
		<div>
			<label for="selectrole" class="block text-sm font-medium text-gray-900 leading-6">Menu</label>
			<MultiSelect name="arrmenu" bind:selected={arrMenu} options={arrMenu} />
		</div>

		<div>
			<label for="arrpermission" class="block text-sm font-medium text-gray-900 leading-6"
				>Menu</label
			>
			<MultiSelect name="arrpermission" bind:selected={arrPermission} options={arrPermission} />
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

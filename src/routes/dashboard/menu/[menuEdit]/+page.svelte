<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Modal from '$lib/components/Modal.svelte';
	import TableBody from '$lib/components/TableBody.svelte';
	import FormEditMenu from './formEditMenu.svelte';

	export let data;

	const out = $page.route.id as string;

	let showModal = true;
	const handleClose = () => {
		showModal = false;
	};
</script>

<TableBody>
	<div slot="button" class="flex justify-end">
		<button
			type="button"
			class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			on:click={() => (showModal = true)}>Add Menu</button
		>
	</div>

	<table slot="table" class="min-w-full divide-y divide-gray-300">
		<thead class="bg-gray-50">
			<tr>
				<th
					scope="col"
					class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
					>Menu Name</th
				>
				<th
					scope="col"
					class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
					>URl Restrict</th
				>

				<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
					<span class="sr-only">Edit</span>
				</th>
				<th scope="col" class="relative p-0 m-0">
					<span class="sr-only">|</span>
				</th>
				<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
					<span class="sr-only">Delete</span>
				</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-gray-200 bg-white">
			{#each data.menuAll as menu}
				<tr>
					<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
						>{menu.name}</td
					>
					<td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6"
						>{menu.urlRestrict}</td
					>
					<!-- <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
						>{menu.svg}</td
					> -->

					<td
						class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-2"
					>
						<!-- svelte-ignore a11y-invalid-attribute -->
						<a href="/dashboard/menu/{menu.id}" class="text-indigo-600 hover:text-indigo-900"
							>Edit<span class="sr-only">, Lindsay Walton</span></a
						>
					</td>
					<td class="p-0 m-0 text-center text-gray-500">|</td>
					<td class="relative whitespace-nowrap text-left text-sm font-medium pr-0">
						<form action="/dashboard/menu?/delMenu&id={menu.id}" method="post" use:enhance>
							<button class="text-red-600 hover:text-red-900 px-2">Delete</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</TableBody>

<Modal show={showModal} on:closeOutside={handleClose}>
	<FormEditMenu on:closeForm={handleClose} menuId={data.menuId} />
</Modal>

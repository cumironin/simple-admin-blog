<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/Modal.svelte';
	import FormAdd from './formAdd.svelte';

	export let data;

	let showModal = false;
	const handleClose = () => {
		showModal = false;
	};
</script>

<div class="flex flex-col mt-10 px-4 sm:px-6 lg:px-8">
	<div class="flex justify-end">
		<button
			type="button"
			class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			on:click={() => (showModal = true)}>Add Permission</button
		>
	</div>
	<div class="mt-8 flow-root">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
				<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
					<table class="min-w-full divide-y divide-gray-300">
						<thead class="bg-gray-50">
							<tr>
								<th
									scope="col"
									class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
									>Name</th
								>
								<th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>URL Restrict</th
								>

								<th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white">
							{#each data.permissions as permission}
								<tr>
									<td
										class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
										>{permission.name}</td
									>
									<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
										>{permission.urlRestrict}</td
									>

									<td
										class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
									>
										<!-- svelte-ignore a11y-invalid-attribute -->
										<a
											href="/dashboard/permission/{permission.id}"
											class="text-indigo-600 hover:text-indigo-900"
											>Edit<span class="sr-only">, Lindsay Walton</span></a
										>

										<span class="text-indigo-600 hover:text-indigo-900 px-2">|</span>
									</td>
									<td>
										<form
											action="/dashboard/permission?/delPermission&id={permission.id}"
											method="post"
											use:enhance
										>
											<button class="text-red-600 hover:text-red-900 px-2">Delete</button>
										</form>
									</td>
								</tr>
							{/each}

							<!-- More people... -->
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<Modal show={showModal} on:closeOutside={handleClose}>
	<FormAdd on:closeForm={handleClose} />
</Modal>

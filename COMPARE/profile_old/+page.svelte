<h1>THIS IS PROFILE PAGE</h1>
<!-- <script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
	export let data;

	const items = data.usersSelect;

	let dataItems: string[] = [];

	items.forEach(function (e) {
		dataItems.push(e.id);
	});

	let selected: string[] = [];

	function toggleAll(e) {
		selected = e.target.checked ? [...dataItems] : [];
	}
</script>

<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Add Users</h2>

<div class="px-4 py-3 mb-8 bg-white shadow-sm dark:bg-gray-800">
	<form class="grid gap-6 mb-8 md:grid-cols-2" method="POST" use:enhance action="?/saveUsers">
		<div>
			<label class="text-sm" for="name">Name</label>
			<input
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="text"
				name="name"
			/>
			<label for="name" class="text-xs text-red-600">
				{#if form?.errors.name}
					<span class="label-text-alt text-error">{form?.errors?.name}</span>
				{/if}
			</label>
		</div>
		<div>
			<label class="text-sm" for="email">Email</label>
			<input
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="text"
				name="email"
			/>
			<label for="email" class="text-xs text-red-600">
				{#if form?.errors?.email}
					<span class="label-text-alt text-error">{form?.errors?.email}</span>
				{/if}
			</label>
		</div>
		<div>
			<label class="text-sm" for="username">Username</label>
			<input
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="text"
				name="username"
			/>
			<label for="username" class="text-xs text-red-600">
				{#if form?.errors?.username}
					<span class="label-text-alt text-error">{form?.errors?.username}</span>
				{/if}
			</label>
		</div>
		<div>
			<label class="text-sm" for="password">Password</label>
			<input
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="password"
				name="password"
			/>
			<label for="password" class="text-xs text-red-600">
				{#if form?.errors?.password}
					<span class="label-text-alt text-error">{form?.errors?.password}</span>
				{/if}
			</label>
		</div>
		<div>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				type="submit">Register</button
			>
		</div>
	</form>
</div>

<h4 class="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300">Users Data</h4>

<div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
	<div class="w-full overflow-x-auto">
		<div class="w-full whitespace-no-wrap">
			<thead>
				<tr
					class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
				>
					<th class="px-4 py-3">Name</th>
					<th class="px-4 py-3">Email</th>
					<th class="px-4 py-3">Username</th>
					<th class="px-4 py-3">Edit</th>
					<th class="px-4 py-3">Delete</th>
				</tr>
			</thead>
			<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
				<div>
					<input type="checkbox" on:change={toggleAll} checked={selected.length === items.length} />
				</div>
				<div>
					<form action="?/pickDeleteUsers&id={selected}" method="POST" use:enhance>
						<button
							class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
							type="submit">Delete</button
						>
					</form>
				</div>
				{#each data.usersSelect as user}
					<tr class="text-gray-700 dark:text-gray-400">
						<td>
							<input type="checkbox" bind:group={selected} name={user.id} value={user.id} />
						</td>
						<td class="px-4 py-3 text-sm">
							{user.email}
						</td>
						<td class="px-4 py-3 text-sm">
							{user.username}
						</td>
						<td class="px-4 py-3 text-sm">
							<a
								href="/users/edit/{user.id}"
								class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							>
								Edit
							</a>
						</td>
						<td class="px-0 py-3 text-sm">
							<form action="?/deleteUsers&id={user.id}" method="POST" use:enhance>
								<button
									class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
									type="submit">Delete</button
								>
							</form>
						</td>
					</tr>
				{/each}
			</tbody>
		</div>
	</div>
</div> -->

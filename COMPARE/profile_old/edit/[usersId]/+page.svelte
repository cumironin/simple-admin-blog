<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">Edit Users</h2>

<div class="px-4 py-3 mb-8 bg-white shadow-sm dark:bg-gray-800">
	<form class="grid gap-6 mb-8 md:grid-cols-2" method="POST" use:enhance>
		<div>
			<label class="text-sm" for="name">Name</label>
			<input
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="text"
				name="name"
				value={data.userEdit.fullName}
			/>
		</div>
		<div>
			<label class="text-sm" for="email">Email</label>
			<input
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="text"
				name="email"
				value={data.userEdit.email}
			/>
		</div>
		<div>
			<label class="text-sm" for="username">Username</label>
			<input
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="text"
				name="username"
				value={data.userEdit.username}
			/>
		</div>
		<div>
			<label class="text-sm" for="password">Password</label>
			<input
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				type="password"
				name="password"
				value={data.userEdit.password}
			/>
		</div>
		<div>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				type="submit">Update</button
			>
		</div>
	</form>
</div>

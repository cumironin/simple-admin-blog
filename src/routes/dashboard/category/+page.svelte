<script lang="ts">
	export let data;
</script>

<!-- "name": "category", -->

<h2 class="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">CATEGORY</h2>

{#each data.navbar as submenu}
	<h1>{submenu.name}</h1>
	<p>{submenu.urlRestrict}</p>
	-----------------------------------
	{#each submenu.SubMenu as item}
		<h1>{item.name}</h1>
		<p>{item.urlRestrict}</p>
		++++++++++++++++++
	{/each}
{/each}

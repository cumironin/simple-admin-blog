<script lang="ts">
	import { closeSideMenu, pageMenus, togglePageMenu, toggleSideMenu } from '$lib/stores/menu';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const appName = import.meta.env.VITE_APP_NAME;

	$: changeLink = (link: any) => {
		closeSideMenu();
		goto(link.urlRestrict);
	};

	$: isMainLink = (link: any) => {
		if (!link.url) {
			return false;
		}
		return link.urlRestrict === activeUrl.pathname;
	};

	$: isChildLink = (link: any) => {
		if (!link.urlRestrict) {
			return false;
		}
		return activeUrl.pathname.indexOf(link.urlRestrict, 0) >= 0;
	};

	$: activeUrl = $page.url;

	export let withTitle = true;
	export let data;
</script>

<div class="py-4 text-gray-500 dark:text-gray-400">
	{#if withTitle}
		<a class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="/">{appName}</a>
	{/if}
	<ul class="mt-6">
		{#each data.navbar as menu, a}
			<li class="relative px-6 py-3">
				{#if isMainLink(menu)}
					<span
						class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
						aria-hidden="true"
					/>
				{/if}

				<!-- klo submenunya isinya arraynya kosong maka jalanin ini klo ada isinya jalanin kedua -->

				{#if menu.SubMenu == 0}
					<a
						class="{isMainLink(menu) &&
							'text-gray-800 dark:text-gray-100'} inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
						href={menu.urlRestrict}
						on:click={(e) => {
							e.preventDefault();
							changeLink(menu);
						}}
					>
						{#if menu.svg}
							<svg
								class="w-5 h-5"
								aria-hidden="true"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<!-- {#each menu.svg as s, b}
									<path d={s} />
								{/each} -->
								<path d={menu.svg} />
							</svg>
						{/if}
						<span class="ml-4">{menu.name}</span>
					</a>
				{:else}
					<!-- toggle sub link -->
					<button
						on:click={() => togglePageMenu(menu.name)}
						class="{isChildLink(menu) &&
							'text-gray-800 dark:text-gray-100'} inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
						aria-haspopup="true"
					>
						<!-- name and logo sub link -->
						<span class="inline-flex items-center">
							<svg
								class="w-5 h-5"
								aria-hidden="true"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
								/>
							</svg>
							<span class="ml-4">{menu.name}</span>
						</span>

						<!-- arrow link -->
						<svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>

					<!-- bellow sublink -->
					{#if $pageMenus[menu.name] || isChildLink(menu)}
						<ul
							class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
							aria-label="submenu"
						>
							{#each menu.SubMenu as sublink, c}
								<li
									class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
								>
									<a class="w-full" href={sublink.urlRestrict}>{sublink.name}</a>
								</li>
							{/each}
						</ul>
					{/if}
				{/if}
			</li>
		{/each}
	</ul>
</div>

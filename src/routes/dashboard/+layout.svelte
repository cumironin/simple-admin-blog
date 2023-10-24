<script lang="ts">
	import { clickOutside } from '$lib/actions/clickOutside';

	import Header from '$lib/components/Header.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import { closeSideMenu, isSideMenuOpen } from '$lib/stores/menu';

	// function keydownEscape(arg0: HTMLElement): any {
	// 	throw new Error('Function not implemented.');
	// }

	export let data;

	// console.log(data.dogsegol);
	// console.log(data.pushdogol);

	// this is the real deal of an array
	// console.log(data.dogol);
	// console.log(data.dogse);
	// console.log(data.semuaArr);
</script>

<section id="body">
	<div class="flex h-screen bg-gray-100 dark:bg-gray-900" class:overflow-hidden={$isSideMenuOpen}>
		<!-- Desktop sidebar -->
		<aside
			class="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 border-r"
		>
			<SideBar {data} />
		</aside>

		<!-- Mobile sidebar -->
		<!-- Backdrop -->
		{#if $isSideMenuOpen}
			<div
				class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
			/>
			<aside
				class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
				use:clickOutside={['nav-mobile-hamburger']}
				on:click-outside={closeSideMenu}
			>
				<SideBar {data} />
			</aside>
		{/if}

		<div class="flex flex-col flex-1 w-full">
			<Header />

			<main class="h-full pb-16 overflow-y-auto">
				<div class="container px-6 mx-auto">
					<slot />
				</div>
			</main>
		</div>
	</div>
</section>

<!-- use:clickOutside={['nav-mobile-hamburger']}
on:click-outside={closeSideMenu}
use:keydownEscape
on:keydown-escape={closeSideMenu} -->

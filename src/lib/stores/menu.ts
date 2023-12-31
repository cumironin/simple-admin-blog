import { writable } from 'svelte/store';

export const isDark = writable(false);
export const isSideMenuOpen = writable(false);
export const isNotificationsMenuOpen = writable(false);
export const isProfileMenuOpen = writable(false);
export const pageMenus = writable([]);

export const togglePageMenu = (name: string) => {
	pageMenus.update((pages) => {
		if (typeof pages[name] === 'undefined') {
			pages[name] = true;
		} else {
			pages[name] = !pages[name];
		}

		return pages;
	});
};

export const toggleTheme = () => {
	window.document.documentElement.classList.toggle('dark');
	isDark.update((v) => {
		localStorage.theme = v ? '' : 'dark';
		return !v;
	});
};

export const toggleSideMenu = () => {
	isSideMenuOpen.update((v) => !v);
};

export const closeSideMenu = () => {
	isSideMenuOpen.update(() => false);
	// isSideMenuOpen.set(false);
};

export const toggleNotificationsMenu = () => {
	isNotificationsMenuOpen.update((v) => !v);
};

export const closeNotificationsMenu = () => {
	isNotificationsMenuOpen.set(false);
};

export const toggleProfileMenu = () => {
	isProfileMenuOpen.update((v) => !v);
};

export const closeProfileMenu = () => {
	isProfileMenuOpen.set(false);
};

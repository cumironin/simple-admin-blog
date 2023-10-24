export const load = async ({ fetch }) => {
	const fetchNavbar = async () => {
		const res = await fetch('/api/navbar');
		const data = await res.json();
		return data;
	};

	return {
		navbar: fetchNavbar()
	};
};

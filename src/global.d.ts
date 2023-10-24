interface RoleId {
	id: string;
	roleName: string | null;
}

interface Menu {
	id: string;
	numsort: Integer;
	name: string;
	urlRestrict: string;
	svg: string;
}

interface SubMenu {
	id: string;
	name: string | null;
	urlRestrict: string | null;
	menuId: string;
}

interface Role {
	id: string;
	name: string | null;
}

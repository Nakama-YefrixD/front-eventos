type RowObj = {
	name: [string, boolean];
	progress: string;
	quantity: number;
	date: string;
	info: boolean;
};

const tablahora: RowObj[] = [
	{
		name: [ 'Horizon UI PRO', true ],
		quantity: 2458,
		progress: '17.5%',
		date: '12 Jan 2021',
		info: false
	},
];

export default tablahora;

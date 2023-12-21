type RowObj = {
	name: string;
	status: string;
	date: string;
	progress: number;
};

const tableDataComplex: RowObj[] = [
	{
		name: 'N - 1',
		progress: 75.5,
		status: 'Approved',
		date: '12 Jan 2021'
	},
	{
		name: 'N - 2',
		progress: 25.5,
		status: 'Disable',
		date: '21 Feb 2021'
	},
	{
		name: 'N - 3',
		progress: 90,
		status: 'Error',
		date: '13 Mar 2021'
	},
	{
		name: 'N - 4',
		progress: 50.5,
		status: 'Approved',
		date: '24 Oct 2022'
	},
	{
		name: 'N - 5',
		progress: 50.5,
		status: 'Approved',
		date: '24 Oct 2022'
	},
	{
		name: 'N - 6',
		progress: 50.5,
		status: 'Approved',
		date: '24 Oct 2022'
	},
	{
		name: 'N - 7',
		progress: 50.5,
		status: 'Approved',
		date: '24 Oct 2022'
	},
	{
		name: 'N - 8',
		progress: 50.5,
		status: 'Approved',
		date: '24 Oct 2022'
	}
];
export default tableDataComplex;

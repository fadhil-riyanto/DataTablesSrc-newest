describe('tables - table().header.structure()', function() {
	dt.libs({
		js: ['jquery', 'datatables'],
		css: ['datatables']
	});

	describe('Check the defaults', function() {
		let table;
	
		dt.html('basic');

		it('Exists and is a function', function() {
			table = $('#example').DataTable();

			expect(typeof table.table().header).toBe('function');
		});

		it('Return is an array', function() {
			let header = table.table().header.structure();

			expect(header instanceof Array).toBe(true);
		});

		it('Simple table structure', function() {
			let header = table.table().header.structure();
			let cells = $('table thead tr').children();

			expect(header).toEqual([[
				{colspan: 1, rowspan: 1, cell: cells[0], title: 'Name'},
				{colspan: 1, rowspan: 1, cell: cells[1], title: 'Position'},
				{colspan: 1, rowspan: 1, cell: cells[2], title: 'Office'},
				{colspan: 1, rowspan: 1, cell: cells[3], title: 'Age'},
				{colspan: 1, rowspan: 1, cell: cells[4], title: 'Start date'},
				{colspan: 1, rowspan: 1, cell: cells[5], title: 'Salary'},
			]]);
		});

		it('Includes hidden columns by default', function() {
			table.column(1).visible(false);

			let header = table.table().header.structure();
			let cells = $('table thead tr').children();

			expect(header).toEqual([[
				{colspan: 1, rowspan: 1, cell: cells[0], title: 'Name'},
				{colspan: 1, rowspan: 1, cell: table.column(1).header(), title: 'Position'},
				{colspan: 1, rowspan: 1, cell: cells[1], title: 'Office'},
				{colspan: 1, rowspan: 1, cell: cells[2], title: 'Age'},
				{colspan: 1, rowspan: 1, cell: cells[3], title: 'Start date'},
				{colspan: 1, rowspan: 1, cell: cells[4], title: 'Salary'},
			]]);
		});

		it('Can specify columns', function() {
			let header = table.table().header.structure([0, 5]);
			let cells = $('table thead tr').children();

			expect(header).toEqual([[
				{colspan: 1, rowspan: 1, cell: cells[0], title: 'Name'},
				{colspan: 1, rowspan: 1, cell: cells[4], title: 'Salary'},
			]]);
		});
	});

	describe('Complex header behaviour', function() {
		let table;

		dt.html('complex-header-footer');

		it('All columns', function() {
			table = $('#example').DataTable();
			
			let header = table.table().header.structure();
			let cells = $('table thead th');

			expect(header).toEqual([
				[
					{colspan: 1, rowspan: 2, cell: cells[0], title: 'Name'},
					{colspan: 2, rowspan: 1, cell: cells[1], title: 'Position'},
					{colspan: 3, rowspan: 1, cell: cells[2], title: 'Contact'},
				],
				[
					{colspan: 3, rowspan: 1, cell: cells[3], title: 'HR info'},
					{colspan: 2, rowspan: 1, cell: cells[4], title: 'Direct'},
				]
			]);
		});

		it('First column only', function() {
			table = $('#example').DataTable();
			
			let header = table.table().header.structure(0);
			let cells = $('table thead th');

			expect(header).toEqual([
				[
					{colspan: 1, rowspan: 2, cell: cells[0], title: 'Name'},
				],
				[]
			]);
		});

		it('Truncated column', function() {
			table = $('#example').DataTable();
			
			let header = table.table().header.structure([0, 1]);
			let cells = $('table thead th');

			expect(header).toEqual([
				[
					{colspan: 1, rowspan: 2, cell: cells[0], title: 'Name'},
					{colspan: 1, rowspan: 1, cell: cells[1], title: 'Position'}
				],
				[
					{colspan: 1, rowspan: 1, cell: cells[3], title: 'HR info'}
				]
			]);
		});

	});
});

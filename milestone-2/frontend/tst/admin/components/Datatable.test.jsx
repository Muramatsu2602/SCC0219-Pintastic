import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Datatable from '../../../src/admin/components/Datatable';

describe('Admin datatable component', () => {
  it('Should render the datatable successfuly', () => {
    const columns = [
      'Email',
      'Compras realizadas',
      'Status',
    ];

    const data = [
      [
        {'type': 'text', 'value': 'email'},
        {'type': 'text', 'value': 'purchases'},
        {'type': 'text', 'value': 'status'},
      ],
    ];

    render(<Datatable columns={columns} data={data} />);

    const renderedTable = screen.getByRole('table');
    expect(renderedTable).toBeInTheDocument();

    columns.forEach((column) => {
      const renderedColumn = screen.getByRole('columnheader', {name: column});
      expect(renderedColumn).toBeInTheDocument();
    });

    data.forEach((row) => {
      row.forEach((cell) => {
        const renderedCell = screen.getByRole('cell', {name: cell.value});
        expect(renderedCell).toBeInTheDocument();
      });
    });
  });
});

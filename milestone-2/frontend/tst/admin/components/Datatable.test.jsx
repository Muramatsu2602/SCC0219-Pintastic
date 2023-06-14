import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Datatable from '../../../src/admin/components/Datatable';

describe('Admin datatable component', () => {
  let columns;
  let data;

  beforeEach(() => {
    columns = [
      'Email',
      'Compras realizadas',
      'Status',
    ];

    data = [
      [
        {'type': 'text', 'value': 'email'},
        {'type': 'text', 'value': 'purchases'},
        {'type': 'text', 'value': 'status'},
      ],
    ];
  });

  it('Should render even when an unmapped data type is passed', () => {
    const invalidData = [
      [
        {'type': 'unmappedType', 'value': 'email'},
        {'type': 'text', 'value': 'purchases'},
        {'type': 'text', 'value': 'status'},
      ],
    ];

    const consoleSpy = jest.spyOn(console, 'error');

    render(<Datatable columns={columns} data={invalidData} />);

    assertThatTableWasRendered(columns, data);
    expect(consoleSpy).toBeCalledWith('Column type is not mapped: unmappedType');
  });

  it('Should render the datatable successfuly', () => {
    render(<Datatable columns={columns} data={data} />);

    assertThatTableWasRendered(columns, data);
  });

  function assertThatTableWasRendered(columns, data) {
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
  }
});

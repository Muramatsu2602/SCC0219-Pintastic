import React, {useState} from 'react';

import Swal from 'sweetalert2';
import {faPencil} from '@fortawesome/free-solid-svg-icons';

import PintasticException from '../../../models/PintasticException';
import Datatable from '../../components/Datatable';
import SubmitButton from '../../components/SubmitButton';
import Modal from '../../components/Modal';
import mockClients from './mockClients';

import './styles.css';

export default function Clients() {
  const [clients] = useState(mockClients);
  const [modal, setModal] = useState(null);

  const columns = [
    'Email',
    'Compras realizadas',
    'Status',
  ];

  const data = formatClientsIntoDatatable(clients, setModal);

  return (
    <>
      <div id='admin-clients-page'>
        { modal }
        <div className='content-header'>
          <h1>Clientes</h1>
        </div>
        <hr />
        <Datatable columns={columns} data={data} options={true} />
      </div>
    </>
  );
}

function ToggleClientStatusModal(props) {
  async function handleToggleClientStatus(e) {
    try {
      e.preventDefault();

      const updatedClient = props.client;
      updatedClient.status = updatedClient.status == 'active' ? 'inactive' : 'active';

      console.log(updatedClient);

      props.hideModal();
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível editar o cliente, tente novamente mais tarde', 'error');
    }
  }

  return (
    <Modal
      { ...props }
      title={props.client.status == 'active' ? 'Deseja desativar o cliente?' : 'Deseja ativar o cliente?'}
      body={(
        <form onSubmit={handleToggleClientStatus}>

          <SubmitButton
            value='Confirmar'
          />
        </form>
      )}
    />
  );
}

function formatClientsIntoDatatable(clients, setModal) {
  return clients
      .map((client) => {
        return [
          {
            'type': 'text',
            'value': client.email,
          },
          {
            'type': 'text',
            'value': client.purchases,
          },
          {
            'type': 'status',
            'value': client.status,
          },
          {
            'type': 'options',
            'value': [
              {
                'title': client.status == 'active' ? 'Desativar' : 'Ativar',
                'icon': faPencil,
                'action': () => {
                  const toggleClientStatusModal = (
                    <ToggleClientStatusModal
                      hideModal={() => setModal(null)}
                      client={client}
                    />
                  );

                  setModal(toggleClientStatusModal);
                },
              },
            ],
          },
        ];
      });
}

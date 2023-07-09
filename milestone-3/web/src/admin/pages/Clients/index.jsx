import React, {useState, useEffect} from 'react';

import Swal from 'sweetalert2';
import {faPencil} from '@fortawesome/free-solid-svg-icons';

import api from '../../../services/api';
import PintasticException from '../../../models/PintasticException';
import Datatable from '../../components/Datatable';
import SubmitButton from '../../components/SubmitButton';
import Modal from '../../components/Modal';

import './styles.css';

export default function Clients() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(null);

  const columns = [
    'Email',
    'Compras realizadas',
    'Status',
  ];

  const loadClients = async () => {
    const response = await api.get('/users');

    setData(formatClientsIntoDatatable(response.data, setModal));
  };

  useEffect(() => {
    loadClients();
  }, [modal]);

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
  async function toggleClientStatus(client) {
    try {
      await api.put(`/users/toggleActive/${client._id}`);
    } catch (error) {
      throw error;
    }
  }

  async function handleToggleClientStatus(e) {
    try {
      e.preventDefault();

      const client = props.client;

      await toggleClientStatus(client);

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
      title={props.client.active ? 'Deseja desativar o cliente?' : 'Deseja ativar o cliente?'}
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
            'value': client.active ? 'active' : 'inactive',
          },
          {
            'type': 'options',
            'value': [
              {
                'title': client.active ? 'Desativar' : 'Ativar',
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

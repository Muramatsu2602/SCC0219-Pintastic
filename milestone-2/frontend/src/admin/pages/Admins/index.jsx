import React, {useState} from 'react';

import Swal from 'sweetalert2';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencil, faPlus} from '@fortawesome/free-solid-svg-icons';

import PintasticException from '../../../models/PinstaticException';
import Datatable from '../../components/Datatable';
import Input from '../../components/Input';
import SubmitButton from '../../components/SubmitButton';
import Modal from '../../components/Modal';
import mockAdmins from './mockAdmins';

import './styles.css';

export default function Admins() {
  const [admins, setAdmins] = useState(mockAdmins);
  const [modal, setModal] = useState(null);

  const columns = [
    'Nome',
    'Última edição',
    'Email',
    'Status',
  ];

  const data = formatAdminsIntoDatatable(admins, setModal);

  return (
    <>
      <div id='admin-administrators-page'>
        { modal }
        <div className='content-header'>
          <h1>Administradores</h1>
          <button onClick={() => {
            const createAdminModal = (
              <CreateAdminModal admins={admins} setAdmins={setAdmins} hideModal={() => setModal(null)} />
            );

            setModal(createAdminModal);
          }}>
            <FontAwesomeIcon icon={faPlus} /> Criar novo
          </button>
        </div>
        <hr />
        <Datatable columns={columns} data={data} options={true} />
      </div>
    </>
  );
}

function CreateAdminModal(props) {
  async function handleCreateAdmin(e) {
    try {
      e.preventDefault();

      const admin = {
        createdAt: new Date(),
        updatedAt: new Date(),
        name,
        email,
        status: 'active',
      };

      props.setAdmins([admin, ...props.admins]);

      console.log(admin);

      props.hideModal();
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível criar o administrador, tente novamente mais tarde', 'error');
    }
  }

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Modal
      { ...props }
      title='Novo administrador'
      body={(
        <form onSubmit={handleCreateAdmin}>
          <Input
            type='text'
            placeholder='Nome do administrador'
            label='Nome'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type='email'
            placeholder='admin@pintastic.com'
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <SubmitButton
            value='Criar administrador'
          />
        </form>
      )}
    />
  );
}

function ToggleAdminStatusModal(props) {
  async function handleToggleAdminStatus(e) {
    try {
      e.preventDefault();

      const updatedAdmin = props.admin;
      updatedAdmin.status = updatedAdmin.status == 'active' ? 'inactive' : 'active';

      console.log(updatedAdmin);

      props.hideModal();
    } catch (error) {
      if (error instanceof PintasticException) {
        Swal.fire('Ocorreu um erro', error.getBusinessMessage(), 'error');
        return;
      }

      console.error(error);
      Swal.fire('Ocorreu um erro', 'Não foi possível editar o produto, tente novamente mais tarde', 'error');
    }
  }

  return (
    <Modal
      { ...props }
      title={props.admin.status == 'active' ? 'Deseja desativar o administrador?' : 'Deseja ativar o administrador?'}
      body={(
        <form onSubmit={handleToggleAdminStatus}>

          <SubmitButton
            value='Confirmar'
          />
        </form>
      )}
    />
  );
}

function formatAdminsIntoDatatable(admins, setModal) {
  const dateFormatter = new Intl.DateTimeFormat('pt-BR');

  return admins
      .map((admin) => {
        return [
          {
            'type': 'text',
            'value': admin.name,
          },
          {
            'type': 'text',
            'value': dateFormatter.format(new Date(admin.updatedAt)),
          },
          {
            'type': 'text',
            'value': admin.email,
          },
          {
            'type': 'status',
            'value': admin.status,
          },
          {
            'type': 'options',
            'value': [
              {
                'title': admin.status == 'active' ? 'Desativar' : 'Ativar',
                'icon': faPencil,
                'action': () => {
                  const toggleAdminStatusModal = (
                    <ToggleAdminStatusModal
                      hideModal={() => setModal(null)}
                      admin={admin}
                    />
                  );

                  setModal(toggleAdminStatusModal);
                },
              },
            ],
          },
        ];
      });
}

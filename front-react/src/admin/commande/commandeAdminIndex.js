import '../../App.css';
import '../adminStyle.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, Routes, Route } from 'react-router-dom';
import moment from 'moment';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function CommandeAdminIndex() {
  const [listCommandes, setListCommandes] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15); // Définit 15 lignes par défaut
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCommandes = async (page, perPage) => {

    const apiCommandeGet = `http://localhost:8000/api/commandes?itemsPerPage=${perPage}&page=${page}`;

    setLoading(true);
    try {
      const response = await axios.get(apiCommandeGet);
      console.log(response)
      setListCommandes(response.data['hydra:member']);
      setTotalRows(response.data['hydra:totalItems']);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes(page, perPage);
  }, [page, perPage]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  };
  const removeCommande= async (id) => {
    const apiCommandeRemove = `http://localhost:8000/api/commandes/${id}`;

    setLoading(true);
    try {
      const response = await fetch(apiCommandeRemove, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/ld+json'
        },
    });

    if (response.ok) {
      console.log('success')
    }
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes", error);
    } finally {
      // Fin du chargement
      setLoading(false);
      fetchCommandes(page, perPage);
    }
  }

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Nom',
      selector: row => row.nom,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Num Phone',
      selector: row => row.phoneNumber,
      sortable: true,
    },
    {
      name: 'Nbre place',
      selector: row => row.nbre,
      sortable: true,
    },
    {
      name: 'Prix Total',
      selector: row => row.prixTotal + ' Ar',
      sortable: true,
    },

    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
    {
      name: 'evenements',
      selector: row => row.evenementID && 
      <div className='d-flex flex-column'>
      {row.evenementID.map((eventID)=> (
        <span className='commandeEvent p-1' key={eventID.id}>{eventID.name}</span>
      ))}
    </div>
    ,
      sortable: true,
    },

    {
      name: 'Date',
      selector: row => 
    moment(row.date).format('DD-MM-YYYY HH:mm')
        ,
      sortable: true,
    },
    {
      name: 'Action',
      cell: row => 
/*          <Dropdown.Item >
            <Link to="/admin/event/create">Show<i className='fa fa-show ps-1'></i></Link>
          </Dropdown.Item>
*/
        <DropdownButton id="dropdown-basic-button" title="Action" size="sm">
          <Dropdown.Item href={`/admin/commande/${row.id}`} >
            Edit<i className='fa fa-pencil ps-1'></i>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => removeCommande(row.id)}>
            Delete<i className='fa fa-trash ps-1'></i>
          </Dropdown.Item>
        </DropdownButton>
        ,
      sortable: true,
    },
 
  ];

  return (

    <div className='commandeContaint'>
    <div className='row'>
    <div className='d-flex justify-content-end'>
    <Link to="/admin/commande/create" className="btn btn-primary">Add <i className='fa fa-plus ps-1'></i></Link>

    </div>
    </div>
    <div className='datatable'>
      <DataTable
        title="Liste des utilisateurs"
        columns={columns}
        data={listCommandes}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationRowsPerPageOptions={[15,30]} // Options de pagination
        defaultSortField="name"
        highlightOnHover
        striped
        paginationPerPage={15} // Définit 15 lignes par page par défaut
        responsive
      />
    </div>
    </div>
  );
}

export default CommandeAdminIndex;

import '../../App.css';
import '../adminStyle.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, Routes, Route } from 'react-router-dom';
import moment from 'moment';
import { Dropdown, DropdownButton } from 'react-bootstrap';

function EventAdminIndex() {
  const [listEvents, setListEvents] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15); // Définit 15 lignes par défaut
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (page, perPage) => {

    const apiEventGet = `http://localhost:8000/api/evenements?itemsPerPage=${perPage}&page=${page}`;

    setLoading(true);
    try {
      const response = await axios.get(apiEventGet);
      console.log(response)
      setListEvents(response.data['hydra:member']);
      setTotalRows(response.data['hydra:totalItems']);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page, perPage);
  }, [page, perPage]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  };
  const removeEvent= async (id) => {
    const apiEventRemove = `http://localhost:8000/api/evenements/${id}`;

    setLoading(true);
    try {
      const response = await fetch(apiEventRemove, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/ld+json'
        },
    });

    if (response.ok) {
      console.log('success')
    }
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs", error);
    } finally {
      // Fin du chargement
      setLoading(false);
      fetchEvents(page, perPage);
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
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Type',
      selector: row => row.type && row.type.nameType,
      sortable: true,
    },
    {
      name: 'Img',
      cell: row => 
        <img
      src={`http://localhost:8000/images/uploads/${row.img}`}
      
      style={{ maxWidth: '70px', height: 'auto' }}
    />,
    },   {
      name: 'Prix Entrer',
      selector: row => row.prixEntrer + ' Ar',
      sortable: true,
    },
    {
      name: 'Organisateur',
      selector: row => row.organisateur,
      sortable: true,
    },
    {
      name: 'Decription',
      selector: row => row.description,
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
          <Dropdown.Item href={`/admin/event/${row.id}`} >
            Edit<i className='fa fa-pencil ps-1'></i>
          </Dropdown.Item>
          <Dropdown.Item onClick={() => removeEvent(row.id)}>
            Delete<i className='fa fa-trash ps-1'></i>
          </Dropdown.Item>
        </DropdownButton>
        ,
      sortable: true,
    },
 
  ];

  return (

    <div className='eventContaint'>
    <div className='row'>
    <div className='d-flex justify-content-end'>
    <Link to="/admin/event/create" className="btn btn-primary">Add <i className='fa fa-plus ps-1'></i></Link>

    </div>
    </div>
    <div className='datatable'>
      <DataTable
        title="Liste des utilisateurs"
        columns={columns}
        data={listEvents}
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

export default EventAdminIndex;

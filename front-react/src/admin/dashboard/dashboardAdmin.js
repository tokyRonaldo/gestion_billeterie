import '../adminStyle.css';
import NavbarAdmin from '../layoutAdmin/NavbarAdmin';
import React, { useEffect, useState } from 'react';

function DashboardAdmin() {
  return (
    <div className=''>
   

          <div className="row">
              <div className="col-md-3">
                  <div className="card text-white bg-primary mb-3">
                      <div className="card-body">
                          <h5 className="card-title">Tickets</h5>
                          <p className="card-text">1,234</p>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="card text-white bg-success mb-3">
                      <div className="card-body">
                          <h5 className="card-title">Revenu</h5>
                          <p className="card-text">567</p>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="card text-white bg-warning mb-3">
                      <div className="card-body">
                          <h5 className="card-title">Evenement à venir</h5>
                          <p className="card-text">89</p>
                      </div>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="card text-white bg-danger mb-3">
                      <div className="card-body">
                          <h5 className="card-title">Evenement Passer</h5>
                          <p className="card-text">$12,345</p>
                      </div>
                  </div>
              </div>
          </div>

          <div className="card mt-4">
              <div className="card-header">
                  <h5>Recent Orders</h5>
              </div>
              <div className="card-body">
                  <table className="table table-hover">
                      <thead>
                      <tr>
                          <th>#</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Amount</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                          <th>1</th>
                          <td>John Doe</td>
                          <td>2024-08-19</td>
                          <td><span className="badge bg-success">Completed</span></td>
                          <td>$120.00</td>
                      </tr>
                      <tr>
                          <th>2</th>
                          <td>Jane Doe</td>
                          <td>2024-08-18</td>
                          <td><span className="badge bg-warning">Pending</span></td>
                          <td>$85.00</td>
                      </tr>
                      <tr>
                          <th>3</th>
                          <td>Michael Smith</td>
                          <td>2024-08-17</td>
                          <td><span className="badge bg-danger">Cancelled</span></td>
                          <td>$45.00</td>
                      </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  );
}

export default DashboardAdmin;

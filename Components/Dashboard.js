import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // for logout button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // to link to the products, orders pages
import './Style.css'; // include more css for the background water wave animations

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(1);  // every count defaultly starts from 1
  const [totalOrders, setTotalOrders] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(1);
  const [totalRevenue, setTotalRevenue] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (totalProducts < 75) {
        setTotalProducts((prevProducts) => prevProducts + 1);
      }
      if (totalOrders < 143) {
        setTotalOrders((prevOrders) => prevOrders + 1);
      }
      if (totalCustomers < 34) {
        setTotalCustomers((prevCustomers) => prevCustomers + 1);
      }
      if (totalRevenue < 1234) {
        setTotalRevenue((prevRevenue) => prevRevenue + 10);
      }
    }, 10);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // apply random animation durations and delays to div boxes
    const boxes = document.querySelectorAll('.rounded-3');
    boxes.forEach((box) => {
      const duration = Math.floor(Math.random() * 5 + 3) + 's'; // random duration between 3s and 7s
      const delay = Math.floor(Math.random() * 5) + 's'; // random delay between 0s and 5s
      box.style.setProperty('--duration', duration);
      box.style.animationDelay = delay;
    });
  }, []);

  // actual content starts hereeeee!......
  return (
    <div className="dashboard">

      {/* navigation */}
      <nav className="container-fluid shadow p-3 mt-2">
        <div className="row">
          
          {/* title */}
          <div className="col-md-6 offset-md-1">
            <div className="jumbotron p-4 rounded-2 text-white">
              <h1 className="header">
                ENTNT ERP-system
              </h1>
            </div>
          </div>

          {/* search, button, and dropdown */}
          <div className="col-md-5 d-flex justify-content-end align-items-center">
            <div className="d-flex align-items-center">
              <form className="row">
                <div className="col">
                  <input type="search" className="form-control" placeholder="Search" />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn btn-success">Search</button>
                </div>
              </form>

              <DropdownButton title="More:" variant="dark" size="md" className="p-4 ml-2">
                <Dropdown.Item>#Home</Dropdown.Item>
                <Dropdown.Item>#About</Dropdown.Item>
                <Dropdown.Item>
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> &nbsp;
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
        </div>
      </nav>

      {/* body part form here, first two main tasks*/}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="rounded-3 p-4 bg-light rounded-lg shadow-lg text-center">
              <h2 className="text-dark mb-4">Total Products: <span className="large-number">{totalProducts <= 75 ? totalProducts : 75}</span></h2>
              <Link className="btn btn-primary btn-lg" to='/Products'>
                Manage Products
              </Link>
            </div>
          </div>

          <div className="col-md-6">
            <div className="rounded-3 p-4 bg-light rounded-lg shadow-lg text-center">
              <h2 className="text-dark mb-4">Total Orders: <span className="large-number">{totalOrders <= 143 ? totalOrders : 143}</span></h2>
              <Link className="btn btn-primary btn-lg" to='/Orders'>
                Manage Orders
              </Link>
            </div>
          </div>
        </div>

        {/* additional features for eg alone */}
        <div className="row mt-4">
          <div className="col-md-6">
            <div className="rounded-3 p-4 bg-light rounded-lg shadow-lg text-center">
              <h2 className="text-dark mb-4">Total Customers: <span className="large-number">{totalCustomers <= 34 ? totalCustomers : 34}</span></h2>
              <Link className="btn btn-primary btn-lg" to='/Customers'>
                Manage Customers
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="rounded-3 p-4 bg-light rounded-lg shadow-lg text-center">
              <h2 className="text-dark mb-4">Total Revenue: <span className="large-number">${totalRevenue <= 1234 ? totalRevenue : 1234}</span></h2>
              <Link className="btn btn-primary btn-lg" to='/Revenue'>
                Revenue Stats
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="footer mt-5">
        <div className="text-center text-muted">
          <p>© 2024 ENTNT Pvt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;

import React, { useState } from "react";
import Calendar from 'react-calendar';  // react calendar
import { Modal, Button, Badge, Table } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import './Style.css'; // for the same table

// data from Orders.js
const OrdersCalendar = ({ orders }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // filter orders by selected date
  const filteredOrders = orders.filter(order => {
    const dueDate = new Date(order.dueDate);
    return dueDate.toDateString() === selectedDate.toDateString();
  });

  // calculate order statistics
  const totalOrders = filteredOrders.length;
  const acceptedOrders = filteredOrders.filter(order => order.status === "Accepted").length;
  const rejectedOrders = filteredOrders.filter(order => order.status === "Rejected").length;
  const inProgressOrders = filteredOrders.filter(order => order.status === "Pending").length;

  // main
  return (
    <div className="container mt-5">
      <div className="row top-0">

        {/* calendar display */}
        <div className="col-md-6">
          <div className="text-center">
            <div style={{ maxWidth: "250px", margin: "0 auto" }}>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                calendarType="US"
                className="shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* orders statistics */}
        <div className="col-md-6">
          <div className="text-center" style={{ fontSize: "1.5rem" }}> { /*to increase the size of badges*/}
            <h4>Order Statistics</h4>
            <p><strong>Total Orders:</strong> {totalOrders}</p>
            <p><Badge variant="success">Accepted: {acceptedOrders}</Badge></p>
            <p><Badge variant="danger">Rejected: {rejectedOrders}</Badge></p>
            <p><Badge variant="info">In Progress: {inProgressOrders}</Badge></p>
          </div>
        </div>
      </div>

      {/* Information about orders for the selected date */}
      <h4 className="mt-4">Orders for {selectedDate.toDateString()}</h4> <br />
      <div className="table-responsive">
        <Table striped bordered hover className="scrollable-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.dueDate}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for order details */}
      <Modal show={showOrderDetails} onHide={() => setShowOrderDetails(false)} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Order Statistics</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Total Orders:</strong> {totalOrders}</p>
          <p><Badge variant="success">Accepted: {acceptedOrders}</Badge></p>
          <p><Badge variant="danger">Rejected: {rejectedOrders}</Badge></p>
          <p><Badge variant="info">In Progress: {inProgressOrders}</Badge></p>
          <h4 className="mt-4">All Orders</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{order.dueDate}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOrderDetails(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default OrdersCalendar;

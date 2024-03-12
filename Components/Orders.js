import React, { useState } from "react";
import OrdersCalendar from "./OrdersCalendar.js";  // our main content 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Table, DropdownButton, Dropdown } from 'react-bootstrap';
import './Style.css'; // to make table perfect scroallable view for mobiles

function Orders() {

  // this can be replace by the data that has retrieved from backend
  // since data will retain back as it is if we refresh or came back to page from another page
  // bcz I haven't store data even localally in the web browser
  // but if we made changes in DB, sure it will reflect as we expected, this is one drawback here...
  const [orders, setOrders] = useState([
    { id: 1, customerName: "Ganesh", orderDate: "2024-03-10", status: "Pending", dueDate: "2024-03-15" },
    { id: 2, customerName: "Penchala", orderDate: "2024-03-09", status: "Accepted", dueDate: "2024-03-14" },
    { id: 3, customerName: "Venu Gopal", orderDate: "2024-03-08", status: "Rejected", dueDate: "2024-03-13" },
    { id: 4, customerName: "Lokesh", orderDate: "2024-03-06", status: "Pending", dueDate: "2024-03-16" },
    { id: 5, customerName: "Bhanu Prakash", orderDate: "2024-03-08", status: "Accepted", dueDate: "2024-03-14" },
    { id: 6, customerName: "ChandraHas", orderDate: "2024-03-11", status: "Accepted", dueDate: "2024-03-13" },
    { id: 7, customerName: "Rohith", orderDate: "2024-03-07", status: "Pending", dueDate: "2024-03-16" }
  ]);

  // State to manage calendar modal
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Function to update order status
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  // Function to delete order
  const deleteOrder = (orderId) => {
    const filteredOrders = orders.filter(order => order.id !== orderId);
    setOrders(filteredOrders);
  };

  // function to determine row color based on status 
  // tried but functionality was not working properly
  const getRowColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f0ad4e"; // Yellow for Pending
      case "Rejected":
        return "#dc3545"; // Red for Rejected
      case "Accepted":
        return "#28a745"; // Green for Accepted
      default:
        return "";
    }
  };

  // As usual our main story
  return (
    <div className="container mt-5 shadow p-2">

      {/* nav bar  */}
      <div className="mb-4">
        <h2 className="mb-4">Orders Management</h2>
        <div className="d-flex justify-content-start align-items-center">
          <button className="btn btn-secondary mr-3" onClick={() => window.history.back()}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
          &nbsp; &nbsp; &nbsp;
          <button className="btn btn-primary" onClick={() => setShowCalendarModal(true)}>
            <FontAwesomeIcon icon={faCalendarAlt} /> Calendar View
          </button>
        </div>
      </div>
      
      {/* Calendar Modal */}
      <Modal show={showCalendarModal} onHide={() => setShowCalendarModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Orders Calendar View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrdersCalendar orders={orders} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCalendarModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* table data - Epic Idea right! */}
       <div className="table-responsive">
         <Table striped bordered hover className="scrollable-table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Order ID</th>
              <th style={{ width: '20%' }}>Customer Name</th>
              <th style={{ width: '20%' }}>Order Date</th>
              <th style={{ width: '20%' }}>Status</th>
              <th style={{ width: '30%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ backgroundColor: getRowColor(order.status) }}> 
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.orderDate}</td>
                <td>{order.status}</td>
                <td>
                  <div className="d-flex">
                    <DropdownButton title="Change Status" variant="info" size="sm" className="ml-2">
                      <Dropdown.Item onClick={() => updateOrderStatus(order.id, "Pending")}>Pending</Dropdown.Item>
                      <Dropdown.Item onClick={() => updateOrderStatus(order.id, "Accepted")}>Accepted</Dropdown.Item>
                      <Dropdown.Item onClick={() => updateOrderStatus(order.id, "Rejected")}>Rejected</Dropdown.Item>
                    </DropdownButton> &nbsp; &nbsp; &nbsp;
                    <Button variant="danger" size="sm" onClick={() => deleteOrder(order.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
       </div>

    </div>
  );
}

export default Orders;

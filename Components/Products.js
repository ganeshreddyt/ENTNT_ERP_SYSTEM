import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap'; // for creating pop-ups
import './Style.css';

const initialProducts = [  // this can be override by the data from back end
  { id: 1, name: "Product 1", category: "Category 1", price: 100, quantity: 6 },
  { id: 2, name: "Product 2", category: "Category 2", price: 20, quantity: 30 },
  { id: 3, name: "Product 3", category: "Category 3", price: 150, quantity: 5 },
  { id: 4, name: "Product 4", category: "Category 4", price: 70, quantity: 15 },
  { id: 5, name: "Product 5", category: "Category 5", price: 350, quantity: 2 }
];

// intialize all with their respective null and 0 values using useState Hook
const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [formData, setFormData] = useState({ id: null, name: "", category: "", price: 0, quantity: 0 });
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // to handle that add/modify modal
  const handleCloseModal = () => {  
    setShowModal(false);
    setFormData({ id: null, name: "", category: "", price: 0, quantity: 0 });
    setEditingId(null);
  };

  // to enable pop-up
  const handleShowModal = () => setShowModal(true);  

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is price or quantity
    // If so, parse the value as an integer
    // Otherwise, set the value directly
    const sanitizedValue = (name === "price" || name === "quantity") ? Math.max(0, parseInt(value)) : value;

    setFormData(prevState => ({
      ...prevState,
      [name]: sanitizedValue
    }));
};

  // add form data as a new row and incr length by 1
  const handleAddProduct = () => {  
    const newProduct = { ...formData, id: products.length + 1 };
    setProducts([...products, newProduct]);
    handleCloseModal();
  };

  // same like add, but fields fill with existing data
  const handleEditProduct = (id) => {
    const editedProduct = products.find((product) => product.id === id);
    setFormData(editedProduct);
    setEditingId(id);
    setShowModal(true);
  };

  // to save means add it or update with the changes maded
  const handleSaveProduct = () => {
    const updatedProducts = products.map((product) =>
      product.id === formData.id ? { ...formData } : product
    );
    setProducts(updatedProducts);
    handleCloseModal();
  };

  // to delete 
  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  // main story from here
  return (
    <div className="container mt-5 shadow p-3">

      {/* navigation */}
      <div className="mb-4">
        <h2 className="mb-4">Products Management</h2>
        <div className="d-flex justify-content-start align-items-center">
          <button className="btn btn-secondary mr-3" onClick={() => window.history.back()}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
          <button className="btn btn-primary m-4" onClick={handleShowModal}>
            <FontAwesomeIcon icon={faPlus} />Add Product</button>
        </div>
      </div>

      {/* data with in the table */}
      <div className="table-responsive">
        <table className="custom-table table table-hover table-striped table-condensed scrollable-table">
          <thead className="bg-primary text-white bg-primary">
            <tr>
              <th className="py-3">Name</th>
              <th className="py-3">Category</th>
              <th className="py-3">Price</th>
              <th className="py-3">Quantity</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className={index % 2 === 0 ? "bg-light" : ""}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button className="btn btn-info btn-sm mr-2" onClick={() => handleEditProduct(product.id)}>Edit</button>
                  &nbsp; &nbsp; &nbsp;
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal building for add/submit */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit" : "Add"} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleFormChange} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input type="text" className="form-control" name="category" value={formData.category} onChange={handleFormChange} />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input type="number" className="form-control" name="price" value={formData.price} onChange={handleFormChange} />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleFormChange} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={editingId ? handleSaveProduct : handleAddProduct}>
            {editingId ? "Save Changes" : "Add Product"}
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div >
  );
};

export default Products;

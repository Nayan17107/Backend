import './Form.css';
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';

function MyForm() {
    const initialState = {
        name: "",
        quantity: "",
        description: "",
        img: "",
        price: ""
    }

    const [inputForm, setInputForm] = useState(initialState)

    const handelChanged = (e) => {
        const { name, value } = e.target;
        setInputForm({
            ...inputForm,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Product Submitted:", inputForm);
        setInputForm(initialState);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h1>Product Details</h1>

                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Product Name"
                        name="name"
                        onChange={handelChanged}
                        value={inputForm.name}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Product Quantity"
                        name="quantity"
                        onChange={handelChanged}
                        value={inputForm.quantity}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Select
                        aria-label="Select Category"
                        name="description"
                        onChange={handelChanged}
                        value={inputForm.description}
                        required
                    >
                        <option value="">Open this select menu</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Beauty">Beauty</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Product Image URL"
                        name="img"
                        onChange={handelChanged}
                        value={inputForm.img}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter Product Price"
                        name="price"
                        onChange={handelChanged}
                        value={inputForm.price}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit Product
                </Button>
            </Form>
        </>
    )
}

export default MyForm;
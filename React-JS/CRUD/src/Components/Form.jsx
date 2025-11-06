import './Form.css';
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row, Button, InputGroup, Card } from 'react-bootstrap';
import { FaTags, FaTag, FaDollarSign, FaBoxes, FaImage, FaInfo } from "react-icons/fa";
import uniqueId from 'generate-unique-id';

function MyForm() {
    const handalstorage = () => {
        return JSON.parse(localStorage.getItem('products')) || [];
    };

    const initialState = {
        id: "",
        name: "",
        category: "",
        stock: "",
        description: "",
        image: "",
        price: ""
    };

    const [inputForm, setinputForm] = useState(initialState);
    const [inputErr, setinputErr] = useState({});
    const [storage, setStorage] = useState(handalstorage()); 
    const [displayData, setDisplayData] = useState(handalstorage()); 
    const [edit, setedit] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(storage));
        setDisplayData(storage); 
    }, [storage]);

    const handalchang = (e) => {
        const { name, value } = e.target;
        setinputForm({
            ...inputForm,
            [name]: value
        });
    };

    const handalsubmit = (e) => {
        e.preventDefault();

        if (!edit) {
            if (handalErros()) {
                inputForm.id = "DL" + uniqueId({
                    length: 10,
                    useLetters: false,
                    includeSymbols: ['@', '#', '$']
                });
                const updated = [...handalstorage(), inputForm];
                setStorage(updated);
            }
        } else {
            let updatedData = storage.map((ele) => ele.id === inputForm.id ? inputForm : ele);
            setStorage(updatedData);
            setedit(false);
        }
        setinputForm(initialState);
    };

    const handalErros = () => {
        let errors = {};

        if (inputForm.category === "") errors.categoryErr = "Please select category";
        if (inputForm.name === "") errors.nameErr = "Enter Product Name";
        if (!inputForm.price) errors.priceErr = "Enter Price";
        if (!inputForm.stock) errors.stockErr = "Enter stock";
        if (inputForm.image === "") errors.imageErr = "Provide Image URL";
        if (inputForm.description === "") errors.descriptionErr = "Describe the Product";

        setinputErr(errors);
        return Object.keys(errors).length === 0;
    };

    const handalDelete = (id) => {
        let data = handalstorage();
        let updateData = data.filter((ele) => ele.id !== id);
        setStorage(updateData);
    };

    const handalEdit = (id) => {
        let data = handalstorage();
        setedit(true);
        let findeingdata = data.find((ele) => ele.id === id);
        setinputForm(findeingdata);
    };

    const handleSearch = () => {
        let searchData = [...storage].filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
        );
        setDisplayData(searchData);
        setSearch("");
    };

    const handleASC = () => {
        let sortedData = [...displayData].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        setDisplayData(sortedData);
    };

    const handleDESC = () => {
        let sortedData = [...displayData].sort((a, b) =>
            b.name.localeCompare(a.name)
        );
        setDisplayData(sortedData);
    };

    const handleReset = () => {
        let Clear = JSON.parse(localStorage.getItem('products')) || [];
        setDisplayData(Clear);
    };

    return (
        <>
            <Container fluid className="crud-container d-flex justify-content-center align-items-center">
                <Row className="justify-content-center">
                    <Col>
                        <div className="form-card rounded-5 w-100 p-5 bg-white">
                            <div className="form-header text-center mb-5">
                                <h2 className="fw-bold h2">Add New Product</h2>
                                <hr />
                            </div>

                            <Form onSubmit={handalsubmit}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>
                                            Category <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><FaTags /></InputGroup.Text>
                                            <Form.Select name="category" value={inputForm.category} onChange={handalchang}>
                                                <option value="">Select Category</option>
                                                <option value="Clothing">Clothing</option>
                                                <option value="Electronic">Electronic</option>
                                                <option value="Grosery">Grosery</option>
                                                <option value="Jewellery">Jewellery</option>
                                            </Form.Select>
                                        </InputGroup>
                                        {inputErr.categoryErr && <Form.Text className="text-danger">{inputErr.categoryErr}</Form.Text>}
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>
                                            Product Name <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><FaTag /></InputGroup.Text>
                                            <Form.Control type="text" name="name" value={inputForm.name} onChange={handalchang} />
                                        </InputGroup>
                                        {inputErr.nameErr && <Form.Text className="text-danger">{inputErr.nameErr}</Form.Text>}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Label>
                                            Price <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><FaDollarSign /></InputGroup.Text>
                                            <Form.Control type="number" name="price" value={inputForm.price} onChange={handalchang} />
                                        </InputGroup>
                                        {inputErr.priceErr && <Form.Text className="text-danger">{inputErr.priceErr}</Form.Text>}
                                    </Col>

                                    <Col md={6} className="mb-3">
                                        <Form.Label>
                                            Stock <span className="text-danger">*</span>
                                        </Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><FaBoxes /></InputGroup.Text>
                                            <Form.Control type="number" name="stock" value={inputForm.stock} onChange={handalchang} />
                                        </InputGroup>
                                        {inputErr.stockErr && <Form.Text className="text-danger">{inputErr.stockErr}</Form.Text>}
                                    </Col>
                                </Row>

                                <Form.Group controlId="image" className="mb-4">
                                    <Form.Label>
                                        Image URL <span className="text-danger">*</span>
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><FaImage /></InputGroup.Text>
                                        <Form.Control type="text" name="image" value={inputForm.image} onChange={handalchang} />
                                    </InputGroup>
                                    {inputErr.imageErr && <Form.Text className="text-danger">{inputErr.imageErr}</Form.Text>}
                                </Form.Group>

                                <Form.Group controlId="description" className="mb-4">
                                    <Form.Label>
                                        Description <span className="text-danger">*</span>
                                    </Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><FaInfo /></InputGroup.Text>
                                        <Form.Control as="textarea" name="description" value={inputForm.description} onChange={handalchang} />
                                    </InputGroup>
                                    {inputErr.descriptionErr && <Form.Text className="text-danger">{inputErr.descriptionErr}</Form.Text>}
                                </Form.Group>

                                <div className="text-center">
                                    <Button type="submit" className="btn border-0 submit-btn p-2 w-50">
                                        {edit ? "Update Product" : "Add Product"}
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* ✅ Searching & Sorting Section */}
            <div className="crud-container">
                <Container>
                    <h1 className='text-center'>Searching & Sorting</h1>
                    <div className='text-center m-4'>
                        <input
                            type="text"
                            placeholder="Search by Name or Category"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ padding: "6px", width: "250px" }}
                        />&nbsp;&nbsp;
                        <button onClick={handleSearch}>Search</button>&nbsp;&nbsp;
                        <button onClick={handleASC}>Ascending Order</button>&nbsp;&nbsp;
                        <button onClick={handleDESC}>Descending Order</button>&nbsp;&nbsp;
                        <button onClick={handleReset}>Show All</button>
                    </div>

                    <Row>
                        {displayData.map((product) =>
                            <Col sm={12} md={6} lg={4} xl={3} key={product.id}>
                                <Card className="d-block mb-3">
                                    <Card.Img variant="top" src={product.image} style={{ width: "100%", height: "200px" }} />
                                    <Card.Body>
                                        <Card.Title className="text-center">{product.name}</Card.Title>
                                        <Card.Title>{product.category}</Card.Title>
                                        <Card.Text><strong>$ {product.price}</strong></Card.Text>
                                        <Card.Text><small>Left Stock: {product.stock}</small></Card.Text>
                                        <Card.Subtitle className="overflow-scroll" style={{ width: "100%", height: "100px" }}>
                                            {product.description}
                                        </Card.Subtitle>
                                        <Row className="justify-content-around mt-2">
                                            <Button className="col-4" variant="primary" onClick={() => handalEdit(product.id)}>Edit</Button>
                                            <Button className="col-4" variant="danger" onClick={() => handalDelete(product.id)}>Delete</Button>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default MyForm;

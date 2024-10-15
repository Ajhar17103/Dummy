import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Shade/Loaders/Loaders';
import { toast } from "react-toastify";

const ProductDetails = ({ effect, setEffect }) => {
  const { id } = useParams(); // This will be the encoded ID
  const decodedId = atob(id); // Decode from Base64
  const [productsDetails, setProductsDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`https://gutendex.com/books/${decodedId}`)
      .then((res) => {
        if (res?.data) {
          setProductsDetails(res.data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setProductsDetails([]);
        setIsLoading(true);
        console.log(err, 'err');
      });
  }, []);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of "${productsDetails.title}" to cart.`);
  };

  // Add to wishlist function
  const addWishList = (prodItem) => {
    let wishListProduct = JSON.parse(localStorage.getItem('wishList')) || [];
    const productExists = wishListProduct.some(item => item.id === prodItem.id);

    if (!productExists) {
      wishListProduct.push(prodItem);
      localStorage.setItem('wishList', JSON.stringify(wishListProduct));

      toast.success(`"${prodItem.title}" added to wishlist`, {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 5000,
        theme: "colored",
      });
      setEffect(effect + 30);
    } else {
      toast.error(`"${prodItem.title}" is already in the wishlist`, {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 5000,
        theme: "colored",
      });
    }
  };
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <Container className="mt-5">
        <Row>
          <Col md={6}>
            <Card className="shadow border-0 rounded">
              <Card.Img variant="top" src={productsDetails.formats["image/jpeg"]} className="product-image" />
            </Card>
          </Col>
          <Col md={6}>
            <div className="product-details p-4 bg-light rounded shadow-sm">
              <h2 className="text-primary">{productsDetails.title}</h2>
              <h4 className="text-muted">
                Author: {productsDetails.authors[0].name} ({productsDetails.authors[0].birth_year} - {productsDetails.authors[0].death_year})
              </h4>
              <p><strong>Download Count:</strong> {productsDetails.download_count}</p>
              <h5 className="mt-3">Subjects</h5>
              <ul>
                {productsDetails.subjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
              <h5 className="mt-3">Bookshelves</h5>
              <ul>
                {productsDetails.bookshelves.map((shelf, index) => (
                  <li key={index}>{shelf}</li>
                ))}
              </ul>

              <Form.Group controlId="quantity" className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                  min={1}
                />
              </Form.Group>

              <Button variant="success" size="lg" onClick={() => handleAddToCart(productsDetails)}>
                <i class="fa-solid fa-cart-plus"></i> Add to Cart
              </Button>
              <Button variant="outline-danger" className="ms-2" onClick={() => addWishList(productsDetails)}>
                <i class="fa-solid fa-heart"></i>  Add to Wishlist
              </Button>

              <h5 className="mt-4">Download Links</h5>
              <ul>
                {Object.entries(productsDetails.formats).map(([format, url], index) => (
                  <li key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary">{format}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ProductDetails;
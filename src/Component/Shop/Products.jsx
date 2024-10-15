import React, { useEffect, useState } from 'react';
import { Card, Button, Pagination, Col, Row, Breadcrumb, Dropdown, DropdownButton, FormControl, Badge } from 'react-bootstrap';
import axios from 'axios';
import './Product.css';
import Loader from '../../Shade/Loaders/Loaders';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Products = ({ effect, setEffect }) => {
  const [dynamicUrl, setDynamicUrl] = useState('https://gutendex.com/books/');
  const [allProduct, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const getAllProducts = () => {
    axios.get(dynamicUrl)
      .then((res) => {
        if (res?.data) {
          setAllProducts(res.data);
          setFilteredProducts(res.data.results); // Initialize filtered products with all results
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setAllProducts([]);
        setFilteredProducts([]);
        setIsLoading(true);
        console.log(err, 'err');
      });
  };

  useEffect(() => {
    getAllProducts(dynamicUrl);
  }, [dynamicUrl]);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber) { // Check if pageNumber is not null or undefined
      console.log(pageNumber, 'pageNumber');
      setIsLoading(true);
      setDynamicUrl(pageNumber);
      getAllProducts(pageNumber);
    }
  };

  // Truncate Text
  const truncateText = (text, maxLength) => {
    if (text?.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    } else {
      return text;
    }
  };

  // Handle Sort
  const handleSort = (type) => {
    setSortType(type);
    const sortedProducts = [...filteredProducts];
    sortedProducts.sort((a, b) => {
      if (type === 'title') {
        return a.title.localeCompare(b.title);
      } else if (type === 'author') {
        return a.authors[0]?.name.localeCompare(b.authors[0]?.name);
      }
      return 0;
    });
    setFilteredProducts(sortedProducts); // Update filtered products
  };

  // View product details
  const viewDetails = (prodId) => {
    const encodedId = btoa(prodId);
    navigate(`/product-details/${encodedId}`);
  };

  const addToCart = (prodItem) => {
    console.log(prodItem, 'prodItem')
  }
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
      setEffect(effect + 40)
    } else {
      toast.error(`"${prodItem.title}" is already in the wishlist`, {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 5000,
        theme: "colored",
      });
    }
  };

  // Handle search query
  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredProducts(allProduct.results); // Reset to full product list when search is cleared
    } else {
      const filtered = allProduct.results.filter((prodItem) =>
        prodItem.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <div>
        {/* Breadcrumbs */}
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Shop</Breadcrumb.Item>
        </Breadcrumb>

        {/* Sort Dropdown */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <FormControl
            type="search"
            placeholder="Search by title"
            className="me-2"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
          />
          <DropdownButton
            id="sort-dropdown"
            title={`Sort by: ${sortType === 'title' ? 'Title' : 'Author'}`}
            onSelect={handleSort}
            variant="outline-secondary"
          >
            <Dropdown.Item eventKey="title">Title</Dropdown.Item>
            <Dropdown.Item eventKey="author">Author</Dropdown.Item>
          </DropdownButton>
        </div>

        {/* Products */}
        <Row>
          {
            filteredProducts.map((prodItem, index) => (
              <Col lg={3} md={4} sm={6} className="mb-3" key={prodItem?.id}>
                {/* Product Card */}
                <Card className={`text-center shadow-lg p-3 bg-white rounded product-card h-100 animate-show`}
                  style={{ transitionDelay: `${index * 0.1}s` }}>
                  <Card.Img
                    variant="top"
                    src={prodItem?.formats?.['image/jpeg']}
                    alt={prodItem?.title}
                    className="product-images"
                  />
                  <Card.Body className="d-flex flex-column">
                    {/* Title */}
                    <Card.Title className="mt-2 fw-bold text-primary">
                      <i className="fa-solid fa-book-open me-2"></i>
                      {truncateText(prodItem?.title, 30)}
                    </Card.Title>

                    {/* Author */}
                    <div className="d-flex justify-content-center align-items-center mb-2">
                      <i className="fa-solid fa-user-pen me-2"></i>
                      <span>{truncateText(prodItem?.authors[0]?.name, 20)}</span>
                    </div>

                    {/* Subjects */}
                    <div className="product-subjects mb-3">
                      {prodItem?.subjects.slice(0, 2).map((subject, idx) => (
                        <Badge bg="secondary" key={idx} className="me-1">
                          {truncateText(subject, 20)}
                        </Badge>
                      ))}
                    </div>

                    {/* Download Count */}
                    <div className="mb-3">
                      <i className="fa-solid fa-download me-1"></i>
                      <span>{prodItem?.download_count} Downloads</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-auto">
                      <div className="d-flex justify-content-center gap-2">
                        <Button variant="outline-success" onClick={() => addToCart(prodItem)}>
                          <i className="fa-solid fa-cart-plus"></i>
                        </Button>
                        <Button variant="outline-danger" onClick={() => addWishList(prodItem)}>
                          <i className="fa-solid fa-heart"></i>
                        </Button>
                        <Button variant="outline-info" onClick={() => viewDetails(prodItem.id)}>
                          <i className="fa-regular fa-eye"></i>
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          }

        </Row>

        {/* Pagination */}
        <Pagination className="justify-content-end">
          <Pagination.Prev
            onClick={() => handlePageChange(allProduct?.previous)}
            disabled={!allProduct?.previous} // Disable if previous is null
            className='cursor-pointer'
          />
          <Pagination.Next
            onClick={() => handlePageChange(allProduct?.next)}
            disabled={!allProduct?.next} // Disable if next is null
            className='cursor-pointer'
          />
        </Pagination>
      </div>
    );
  }
};

export default Products;

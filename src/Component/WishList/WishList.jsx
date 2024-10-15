import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import './Wishlist.css'; // Make sure to create this CSS file
import GetAllWishListData from './GetAllWishListData';
import { useNavigate } from 'react-router-dom';

function WishList({ effect, setEffect }) {
  const [wishlistItems, setWishListItem] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let data = GetAllWishListData();
    if (data?.length !== 0) {
      setWishListItem(data)
    }
  }, [effect])

  const handleAddToCart = (item) => {
    console.log(`Added "${item.title}" to cart.`);
  };

  const viewDeatils = (prodId) => {
    const encodedId = btoa(prodId)
    navigate(`/product-details/${encodedId}`);
  }

  const handleRemoveFromWishlist = (itemId) => {
    const wishListProduct = JSON.parse(localStorage.getItem('wishList')) || [];

    const updatedWishList = wishListProduct.filter(item => item.id !== itemId);
    localStorage.setItem('wishList', JSON.stringify(updatedWishList));

    setWishListItem(updatedWishList);
    const removedItem = wishListProduct.find(item => item.id === itemId);
    setEffect(effect + 10)
    toast.success(`Removed "${removedItem.title}" from wishlist.`, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: false,
      autoClose: 5000,
      theme: "colored",
    });

    console.log(`Removed item with ID ${itemId} from wishlist.`);
  };


  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">My Wishlist</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th> {/* New Column for Images */}
            <th>Title</th>
            <th>Author</th>
            <th>Download Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlistItems?.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.formats["image/jpeg"]} alt={item.title} style={{ width: '50px', height: 'auto' }} />
              </td> {/* Image Cell */}
              <td>{item.title}</td>
              <td>{item.authors[0].name} ({item.authors[0].birth_year} - {item.authors[0].death_year})</td>
              <td>{item.download_count}</td>
              <td>
                <Button variant="outline-success" onClick={() => handleAddToCart(item)} className="me-2">
                  <i className="fa-solid fa-cart-plus"></i>
                </Button>
                <Button variant="outline-info" className="me-2" onClick={() => viewDeatils(item.id)}>
                  <i class="fa-regular fa-eye"></i>
                </Button>
                <Button variant="outline-danger" onClick={() => handleRemoveFromWishlist(item.id)}>
                  <i className="fa-solid fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
          {
            wishlistItems?.length === 0 &&
            <tr className='p-5 text-center'>
              No Wish List Product Found!
            </tr>
          }
        </tbody>
      </Table>
    </Container>
  );
}

export default WishList;

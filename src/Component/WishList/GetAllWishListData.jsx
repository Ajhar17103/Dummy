
export default function GetAllWishListData() {
	let getAllWishlistProduct = JSON.parse(localStorage.getItem('wishList')) || [];
	return getAllWishlistProduct
}

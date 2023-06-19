import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  clearErrors,
  getProductDetails,
  getSimilarProducts,
  newReview,
} from "../../actions/productAction";
import { NextBtn, PreviousBtn } from "../Home/Banner/Banner";
import ProductSlider from "../Home/ProductSlider/ProductSlider";
import Loader from "../Layouts/Loader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import { addItemsToCart } from "../../actions/cartAction";
import { getDeliveryDate, getDiscount } from "../../utils/functions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../actions/wishlistAction";
import MinCategory from "../Layouts/MinCategory";
import MetaData from "../Layouts/MetaData";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const navigate = useNavigate();

  // reviews toggle
  const [open, setOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  const productId = params.id;
  const itemInWishlist = wishlistItems.some((i) => i.product === productId);

  const addToWishlistHandler = () => {
    if (itemInWishlist) {
      dispatch(removeFromWishlist(productId));
      enqueueSnackbar("Remove From Wishlist", { variant: "success" });
    } else {
      dispatch(addToWishlist(productId));
      enqueueSnackbar("Added To Wishlist", { variant: "success" });
    }
  };

  const reviewSubmitHandler = () => {
    if (rating === 0 || !comment.trim()) {
      enqueueSnackbar("Empty Review", { variant: "error" });
      return;
    }
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", productId);
    dispatch(newReview(formData));
    setOpen(false);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId));
    enqueueSnackbar("Product Added To Cart", { variant: "success" });
  };

  const handleDialogClose = () => {
    setOpen(!open);
  };

  const itemInCart = cartItems.some((i) => i.product === productId);

  const goToCart = () => {
    navigate("/cart");
  };

  const buyNow = () => {
    addToCartHandler();
    navigate("/shipping");
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    if (reviewError) {
      enqueueSnackbar(reviewError, { variant: "error" });
      dispatch(clearErrors());
    }
    if (success) {
      enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(productId));
    // eslint-disable-next-line
  }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

  useEffect(() => {
    dispatch(getSimilarProducts(product?.category));
  }, [dispatch, product, product.category]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={product.name} />
          <MinCategory />
          <main className="mt-12 sm:mt-0  font-medium font-serif">
            {/* <!-- product image & description container --> */}
            <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative ">
              {/* <!-- image wrapper --> */}
              <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen shadow-md shadow-gray-500 ">
                {/* <!-- imgbox --> */}
                <div className="flex flex-col gap-3 m-3">
                  <div className="w-full h-full pb-6 border relative">
                    <Slider {...settings}>
                      {product.images &&
                        product.images.map((item, i) => (
                          <img
                            draggable="false"
                            className="w-full h-96 object-contain"
                            src={item.url}
                            alt={product.name}
                            key={i}
                          />
                        ))}
                    </Slider>
                    <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                      <span
                        onClick={addToWishlistHandler}
                        className={`${
                          itemInWishlist
                            ? "text-red-500"
                            : "hover:text-red-500 text-gray-300"
                        } cursor-pointer`}
                      >
                        <FavoriteIcon sx={{ fontSize: "18px" }} />
                      </span>
                    </div>
                  </div>

                  <div className="w-full flex gap-3">
                    {/* <!-- add to cart btn --> */}
                    {product.stock > 0 && (
                      <button
                        onClick={itemInCart ? goToCart : addToCartHandler}
                        className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-green-400 rounded-full shadow hover:shadow-lg "
                      >
                        <ShoppingCartIcon />
                        {itemInCart ? "GO TO CART" : "ADD TO CART"}
                      </button>
                    )}
                    <button
                      onClick={buyNow}
                      disabled={product.stock < 1 ? true : false}
                      className={
                        product.stock < 1
                          ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-full shadow hover:shadow-lg"
                          : "p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-pink-600 rounded-full shadow hover:shadow-lg"
                      }
                    >
                      <FlashOnIcon />
                      {product.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                    </button>
                    {/* <!-- add to cart btn --> */}
                  </div>
                </div>
                {/* <!-- imgbox --> */}
              </div>
              {/* <!-- image wrapper --> */}

              {/* <!-- product desc wrapper --> */}
              <div className="flex-1 py-2 px-3">
                {/* <!-- whole product description --> */}
                <div className="flex flex-col gap-2 mb-4">
                  <h2 className=" text-2xl">{product.name}</h2>
                  {/* <!-- rating badge --> */}
                  <span className="text-sm text-black-500 font-medium flex gap-2 items-center ">
                    <span className="text-sm px-1.5 py-0.5 bg-pink-600  text-white flex items-center gap-0.5 rounded-md">
                      {product.ratings && product.ratings.toFixed(1)}{" "}
                      <StarIcon sx={{ fontSize: "12px" }} />
                    </span>
                    <span>{product.numOfReviews} Reviews</span>
                  </span>
                  {/* <!-- rating badge --> */}

                  {/* <!-- price desc --> */}
                  {/* <span className="text-primary-green text-sm font-medium">Special Price</span> */}
                  <div className="flex items-baseline gap-2 text-3xl font-medium font-sans">
                    <span className="text-gray-800">
                      ₹{product.price?.toLocaleString()}
                    </span>
                    <span className="text-base text-gray-500 line-through">
                      ₹{product.cuttedPrice?.toLocaleString()}
                    </span>
                    <span className="text-base text-primary-lightGreen">
                      {getDiscount(product.price, product.cuttedPrice)}
                      %&nbsp;off
                    </span>
                  </div>
                  {product.stock <= 10 && product.stock > 0 && (
                    <span className="text-red-500 text-sm font-medium">
                      Hurry, Only {product.stock} left!
                    </span>
                  )}
                  {/* <!-- price desc --> */}

                  {/* <!-- banks offers --> */}
                  <p className="text-md font-medium text-primary-lightGreen">
                    Available offers
                  </p>

                  <p className="text-sm flex items-center gap-1">
                    {/* <span className="text-primary-lightGreen"><LocalOfferIcon sx={{ fontSize: "20px" }} /></span> */}
                    <span className="font-medium ml-2 text-primary-lightGreen">
                      Offer
                    </span>{" "}
                    Free shipping on orders of 500 and above
                  </p>

                  {/* <!-- banks offers --> */}

                  {/* <!-- warranty & brand --> */}
                  <div className="flex gap-8 mt-2 items-center text-sm">
                    <img
                      draggable="false"
                      className="w-20 h-8 p-0.5 border object-contain"
                      src={product.brand?.logo.url}
                      alt={product.brand && product.brand.name}
                    />
                    {/* <span className=' text-primary-pink'>{product.warranty} Year Warranty </span> */}
                  </div>
                  {/* <!-- warranty & brand --> */}

                  {/* <!-- delivery details --> */}
                  <table className="w-full mt-4 pb-4 rounded-sm border shadow-sm shadow-gray-500">
                    <tbody>
                      {/* Delivery */}
                      <tr className="bg-gray-100">
                        <td className="px-6 py-4 border-b text-lg font-medium text-gray-500">
                          Delivery
                        </td>
                        <td className="px-6 py-4 border-b">{`Delivery by ${getDeliveryDate()}`}</td>
                      </tr>

                      {/* Highlights */}
                      <tr>
                        <td className="px-6 py-4 border-b text-lg font-medium text-gray-500">
                          Highlights
                        </td>
                        <td className="px-6 py-4 border-b">
                          <ul className=" flex flex-col gap-2 w-64 list-none">
                            {product.highlights?.map((highlight, i) => (
                              <li key={i}>
                                <p>{highlight}</p>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>

                      {/* Services */}
                      <tr className="bg-gray-100">
                        <td className="px-6 py-4 border-b text-lg font-medium text-gray-500">
                          Services
                        </td>
                        <td className="px-6 py-4 border-b">
                          <ul className="flex flex-col gap-2">
                            <li>
                              <p className="flex items-center gap-3">
                                <span className="text-red-500">
                                  <CachedIcon sx={{ fontSize: "18px" }} />
                                </span>{" "}
                                7 Days Replacement Policy
                              </p>
                            </li>
                            <li>
                              <p className="flex items-center gap-3">
                                <span className="text-red-500">
                                  <CurrencyRupeeIcon
                                    sx={{ fontSize: "18px" }}
                                  />
                                </span>{" "}
                                Cash on Delivery available
                              </p>
                            </li>
                          </ul>
                        </td>
                      </tr>

                      {/* Seller */}
                      <tr>
                        <td className="px-6 py-4 text-lg font-medium text-gray-500">
                          Seller
                        </td>
                        <td className="px-6 py-4">
                          {product.brand && product.brand.name}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* <!-- seller details --> */}

                  {/* <!-- description details --> */}

                  {/* <!-- border box --> */}

                  <div className="w-full mt-6 rounded-md border border-gray-300 shadow-md">
                    <h1 className="px-6 py-4 bg-gray-100 border-b border-gray-300 text-lg font-medium">
                      Product Description
                    </h1>
                    <div className="p-6">
                      <p className="text-gray-700">{product.description}</p>
                    </div>
                  </div>

                  {/* <!-- border box --> */}

                  {/* <!-- specifications border box --> */}

                  <div className="w-full mt-4 pb-4 rounded-md border flex flex-col shadow-md border-gray-300">
                    <h1 className="px-6 py-4 border-b text-lg font-medium bg-gray-100">
                      Specifications
                    </h1>
                    <h1 className="px-6 py-3 text-lg">General</h1>

                    {/* <!-- specs list --> */}
                    {product.specifications?.map((spec, i) => (
                      <div
                        className="px-6 py-2 flex items-center text-sm "
                        key={i}
                      >
                        <p className="text-gray-500 w-3/12">{spec.title}</p>
                        <p className="flex-1">{spec.description}</p>
                      </div>
                    ))}
                    {/* <!-- specs list --> */}
                  </div>

                  {/* <!-- specifications border box --> */}

                  {/* <!-- reviews border box --> */}
                  <div className="w-full mt-4  flex flex-col rounded-md border border-gray-300 shadow-md">
                    <div className="flex justify-between items-center border-b px-6 py-4 bg-gray-100 ">
                      <h1 className="text-lg font-medium">Ratings & Reviews</h1>
                      <button
                        onClick={handleDialogClose}
                        className="shadow bg-pink-600 text-white px-4 py-2 rounded-full hover:shadow-lg "
                      >
                        Rate Product
                      </button>
                    </div>

                    <Dialog
                      aria-labelledby="review-dialog"
                      open={open}
                      onClose={handleDialogClose}
                    >
                      <DialogTitle className="border-b">
                        Submit Review
                      </DialogTitle>
                      <DialogContent className="flex flex-col m-1 gap-4">
                        <Rating
                          onChange={(e) => setRating(e.target.value)}
                          value={rating}
                          size="large"
                          precision={0.5}
                        />
                        <TextField
                          label="Review"
                          multiline
                          rows={3}
                          sx={{ width: 400 }}
                          size="small"
                          variant="outlined"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <button
                          onClick={handleDialogClose}
                          className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={reviewSubmitHandler}
                          className="py-2 px-6 rounded bg-green-600 hover:bg-green-700 text-white shadow uppercase"
                        >
                          Submit
                        </button>
                      </DialogActions>
                    </Dialog>

                    <div className="flex items-center border-b text-xl">
                      <h1 className="px-6 py-3 text-xl font-semibold">
                        {product.ratings && product.ratings.toFixed(1)}
                        <StarIcon />
                      </h1>
                      <p className="text-xl text-gray-500">
                        ({product.numOfReviews}) Reviews
                      </p>
                    </div>

                    {viewAll
                      ? product.reviews
                          ?.map((rev, i) => (
                            <div
                              className="flex flex-col gap-2 py-4 px-6 border-b "
                              key={i}
                            >
                              <Rating
                                name="read-only"
                                value={rev.rating}
                                readOnly
                                size="small"
                                precision={0.5}
                              />
                              <p>{rev.comment}</p>
                              <span className="text-sm text-gray-500">
                                by {rev.name}
                              </span>
                            </div>
                          ))
                          .reverse()
                      : product.reviews
                          ?.slice(-3)
                          .map((rev, i) => (
                            <div
                              className="flex flex-col gap-2 py-4 px-6 border-b"
                              key={i}
                            >
                              <Rating
                                name="read-only"
                                value={rev.rating}
                                readOnly
                                size="small"
                                precision={0.5}
                              />
                              <p>{rev.comment}</p>
                              <span className="text-sm text-gray-500">
                                by {rev.name}
                              </span>
                            </div>
                          ))
                          .reverse()}
                    {product.reviews?.length > 3 && (
                      <button
                        onClick={() => setViewAll(!viewAll)}
                        className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-primary-blue text-white"
                      >
                        {viewAll ? "View Less" : "View All"}
                      </button>
                    )}
                  </div>
                  {/* <!-- reviews border box --> */}
                </div>
              </div>
              {/* <!-- product desc wrapper --> */}
            </div>
            {/* <!-- product image & description container --> */}

            {/* Sliders */}
            <div className="flex flex-col gap-3 mt-6 border border-gray-300 shadow-md bg-gray-100">
              <ProductSlider
                title={"Similar Products"}
                tagline={"Based on the category"}
              />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetails;

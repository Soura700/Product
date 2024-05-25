import React, { useEffect, useState } from "react";
import productData from '../../data.json';
import "./product.css"
import Review from "../Review/Review";

interface Product {
  productName: string;
  description: string;
  countInStock: number;
  oldPrice: number;
  newPrice: number;
  images: string[];
  video: string;
}

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState<Product[]>(() => [productData.product]);
  const [media, setMedia] = useState<string | null>(null); // State for image or video
  const [isVideo, setIsVideo] = useState<boolean>(false); // State to check if the media is video
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [userId, setUserId] = useState(null);
  const [maxCount, setMaxCount] = useState(null);
  const [positivePercentage, setPositivePercentage] = useState(0);
  const [negativePercentage, setNegativePercentage] = useState(0);


  alert(media);
  useEffect(() => {
    setMedia(singleProduct[0].images[0]);
  }, [])

  // const handleMedia = (mediaUrl: string, isVideo: boolean = false) => {
  //   setMedia(mediaUrl);
  //   setIsVideo(isVideo);
  // };

  const handleRating = (value: number) => {
    if (value <= rating) {
      setRating(value - 1);
    } else {
      setRating(value);
    }
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const handleSubmitReview = async () => {
    alert("Submit Review");
  };

  const handleMedia = (mediaUrl: string, isVideo: boolean = false) => {
    setMedia(mediaUrl);
    setIsVideo(isVideo);
    if (isVideo) {
      // If the media is a video, update the CSS styles for the video element
      const videoElement = document.querySelector('.img-showcase video');
      if (videoElement) {
        videoElement.classList.add('small-video'); // Add a class to style the video
      }
    }
  };


  return (
    <>
      <div className="card-wrapper">
        <div className="card_single">
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                {media && !isVideo && <img src={media} alt="Selected product" />}
                {media && isVideo && <video controls className="small-video" src={media}></video>}
              </div>
            </div>
            <div className="img-select">
              {singleProduct.map((slide: Product, i: number) => (
                <React.Fragment key={i}>
                  {slide.images.map((image, j) => (
                    <div className="img-item" key={j}>
                      <a
                        href="#"
                        className-id={i + 1}
                        onClick={() => handleMedia(image)}
                      >
                        <img
                          src={image}
                          alt={`product image ${j}`}
                        />
                      </a>
                    </div>
                  ))}
                  <div className="img-item">
                    <a
                      href="#"
                      className-id="video"
                      onClick={() => handleMedia(slide.video, true)}
                    >
                      <img
                        src="/path/to/video-thumbnail.jpg"
                        alt="product video"
                      />
                    </a>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="product-content">
            {singleProduct.map((slide, i) => (
              <>
                <h2 className="product-title">{slide.productName}</h2>
                {positivePercentage > 50 && positivePercentage > negativePercentage ? (
                  <a href="#" className="product-link">Customer Favorite</a>
                ) : (
                  <a href="#" className="product-link">Customer Cautions</a>
                )}

                <div className="product-rating">
                  {averageRating === null ? (
                    <>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <span>No ratings yet</span>
                    </>
                  ) : (
                    <>
                      {[...Array(5)].map((_, index) => {
                        if (index < Math.floor(averageRating)) {
                          return <i key={index} className="fas fa-star"></i>;
                        } else if (index === Math.floor(averageRating) && averageRating % 1 >= 0.5) {
                          return <i key={index} className="fas fa-star-half-alt"></i>;
                        } else {
                          return <i key={index} className="far fa-star"></i>;
                        }
                      })}
                      <span>
                        {averageRating.toFixed(1)} ({singleProduct.length})
                      </span>
                    </>
                  )}
                </div>

                <div className="product-price">
                  <p className="last-price">Old Price: <span>$25.0</span></p>
                  <p className="new-price">New Price: <span>$30.50 (5%)</span></p>
                </div>
                <div className="product-detail">
                  <h2 className="product-detail">about this item: </h2>
                  <p>It's a Headphone</p>
                  <ul>
                    <li>Color: <span>Black</span></li>
                    <li>Available: <span>In Stock</span></li>
                    <li>Category: <span>Head Phone</span></li>
                    <li>Shipping Area: <span>All over the world</span></li>
                    <li>Shipping Fee: <span>Free</span></li>
                  </ul>
                </div>
                <div className="purchase-info">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />

                  {slide.countInStock > 0 && (
                    <button type="button" className="btn_single" onClick={() => {}}>
                      <i className="fas fa-shopping-cart"></i>
                      Add To Cart
                    </button>
                  )}

                  <button type="button" className="btn_single">
                    Compare
                  </button>
                </div>
                <div className="social-links">
                  <p>Share At: </p>
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-whatsapp"></i></a>
                  <a href="#"><i className="fab fa-pinterest"></i></a>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="review-section">
          <h3>Give a Review</h3>
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <i
                key={value}
                className={`fas fa-star ${value <= rating ? "active" : ""}`}
                onClick={() => handleRating(value)}
              ></i>
            ))}
          </div>
          <textarea
            placeholder="Write your review here..."
            value={review}
            // onChange={handleReviewChange}
          ></textarea>
          <button onClick={handleSubmitReview}>Submit Review</button>
        </div>
      </div>
      <Review product_id={1} />
    </>
  );
};

export default SingleProduct;

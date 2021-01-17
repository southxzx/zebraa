import React, { useEffect, useState } from 'react';
import { Modal, Col } from 'reactstrap';
import historyApi from '../../../api/historyApi';
import reviewApi from '../../../api/reviewApi';
import ReactStars from "react-rating-stars-component";
import {usePromiseTracker, trackPromise} from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import {Link} from 'react-router-dom';

function History() {

    const [historyList,setHistoryList] = useState([]);
    const [modalReview, setModalReview] = useState(false);
    const [rating,setRating] = useState();
    const [comment,setComment] = useState();
    const [idProduct,setProduct] = useState();
    const [done,setDone] = useState(false);

    // historyList.history ? console.log(historyList.history) : console.log("B");
    // REtrieve user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    const toggleReviewForm = (id) => {
        console.log(id);
        setProduct(id);
        setModalReview(!modalReview);
    }
    const handleChangeTextarea = (e) => {
        setComment(e.target.value);
    }
    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    let data = {
        product:"",
        user:user._id,
        rating:"",
        comment:""
    };

    const { promiseInProgress } = usePromiseTracker();


    const submitFormReview = (e) => {

        data.rating = rating;
        data.product = idProduct;
        data.comment = comment;

        console.log(data);

        e.preventDefault();
        const addReview = async () => {
            await trackPromise(reviewApi.add(data));
        }
        addReview();
        setDone(true);
        
    }

    useEffect(() =>{
        const fetchHistory = async() =>{
            const response = await historyApi.getAll(user._id);
            setHistoryList(response.data);
        }
        fetchHistory();
    },[1]);

    return (
        <div className="card">
            <div className="card-content">
                <div className="search-content">
                    <div className="search-form">
                        <div className="left-side">
                            <img src="/Assets/images/search.png" />
                            <form>
                                <input className="search-input" type="search" placeholder="Search by ID or Name" name="name" />
                            </form>
                        </div>
                        <div className="right-side">
                            <select className="custom-select" id="inputGroupSelect01">
                                <option defaultValue="1">Name</option>
                            </select>
                        </div>
                    </div>
                    <p>Result of "Nike"</p>
                </div>
                <div className="time-line">
                    {
                        historyList.history ? historyList.history.slice(0).reverse().map((item, key) => (
                            <div className="block" key={key}>
                                <p>{item.createdAt.slice(0,19).replace("T"," / ")}</p>
                                <div className="history-content">
                                    <div className="thumbnail">
                                        <img src={item.idColorProduct.images[0]} alt="Thumb" />
                                    </div>
                                    <div className="block-detail">
                                        <div>
                                            <p><b>Name: </b>{item.idProduct.name}</p>
                                        </div>
                                        <div>
                                            <p><b>Category: </b>{item.idProduct.category.name}</p>
                                        </div>
                                    </div>
                                    <div className="block-detail">
                                        <div>
                                            <p><b>Color: </b>{item.idColorProduct.color.name}</p>
                                        </div>
                                        <div>
                                            <p><b>Size: </b>{item.idProduct.colorProducts[
                                                                item.idProduct.colorProducts.findIndex(x => x._id === item.idColorProduct._id)
                                                            ].sizeProducts[
                                                                item.idProduct.colorProducts[
                                                                    item.idProduct.colorProducts.findIndex(x => x._id === item.idColorProduct._id)
                                                                ].sizeProducts.findIndex(y => y._id === item.idSize)
                                                            ].size.name}</p>
                                        </div>
                                    </div>
                                    <div className="block-detail">
                                        <div>
                                            <p><b>Quantity: </b>{item.quantity}</p>
                                        </div>
                                        <div>
                                            <p><b>Price: </b>${item.totalPrice}</p>
                                        </div>
                                    </div>
                                    <div className="block-detail">
                                        <a 
                                            onClick={()=>toggleReviewForm(item.idProduct._id)}
                                            className="btn-default btn-upload">Write Review
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )) : null
                    }
                </div>
                <Modal size="lg" isOpen={modalReview}>
                    <div className="row-review row-login">
                        <div className="btn-cancel">
                            <a onClick={toggleReviewForm}><i className="fa fa-times"></i></a>
                        </div>
                        <form 
                            onSubmit={(e)=>submitFormReview(e)}
                            className="review-content"
                        >
                            <div className="title">
                                <h4>WRITE A REVIEW</h4>
                                <p>Please share your experience</p>
                            </div>
                            {
                                promiseInProgress ? (
                                <div className="load">
                                    <Loader
                                        type="ThreeDots"
                                        color="#ff6500"
                                        height={100}
                                        width={100}
                                        timeout={3000} //3 secs
                                    />
                                </div>
                                ) : (
                                <div>
                                    {
                                        !done ? (
                                            <div>
                                                <div className="star">
                                                    <ReactStars
                                                        count={5}
                                                        onChange={ratingChanged}
                                                        size={48}
                                                        activeColor="#ffd700"
                                                    />
                                                </div>
                                                <textarea
                                                    value={comment}
                                                    onChange={(e) => handleChangeTextarea(e)}
                                                    className="area-content"
                                                    placeholder="Write your review here.  It must be at least 5 characters long.  Consider whether you would recommend this product and what you like or dislike about it.">
                                                </textarea>
                                                <input type="submit" className="btn-default btn-subscribe btn-submit" value="SUBMIT"></input>
                                            </div>
                                        ) :
                                        (<div className="thank">
                                            <h4>Thanks for your review!!!</h4>
                                        </div>)
                                    }
                                </div>
                                )
                            }
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default History

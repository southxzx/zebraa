import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Title from '../../../Component/Common/Title';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axiosClient from '../../../../../api/axiosClient';

function RemoveProduct(props) {
    const {_idProduct} = useParams();
    console.log(_idProduct);

    // Handle submit data
    function handleSubmit(event){
        event.preventDefault();

        axiosClient.put(`/product/delete?id=${_idProduct}`)
                .then(res => {toast.success("Delete Success")})
                .catch(err => {toast.error("Delete Error")});
    }

    return (
        <div className="remove_product_admin">
            <ToastContainer/>
            <Title title="REMOVE DETAIL PRODUCTS" title_below="Zebraa Products"/>

            <form onSubmit={(event)=>handleSubmit(event)}>
                <button type="submit" className='btn-default btn-subscribe btn-next'>
                   Wanna Delete
                </button>
            </form>
        </div>
    );
}

export default RemoveProduct;
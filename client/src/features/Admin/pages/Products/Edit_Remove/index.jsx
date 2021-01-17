import React, { useEffect, useState } from 'react';
import Title from '../../../Component/Common/Title';
import './edit.css';
import { Table } from 'reactstrap';
import { Link, NavLink } from "react-router-dom";
import productApi  from '../../../../../api/productApi';
import categoryApi from '../../../../../api/categoryApi';

function EditProduct(props) {

    const [product,setProduct] = useState([]);
    const [category,setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const responseProduct = await productApi.getAll({});
            const responseCategory = await categoryApi.getAll();
            console.log(responseProduct.data.data);
            console.log(responseCategory.data);
            setProduct(responseProduct.data.data);
            setCategory(responseCategory.data);
        }
        fetchData();
    },[])


    return (
        <div className="edit-products">
            <Title title="EDIT PRODUCTS" title_below="Zebraa Products" />
        
            <Table >
                <thead>
                    <tr>
                        <th>#</th>
                        <th className="th-image"><p>Image</p></th>
                        <th className="th-image"><p>Name</p></th>
                        <th className="th-image"><p>Category</p></th>
                        <th className="th-image"><p>Color Number</p></th>
                        <th className="th-image"><p>Active</p></th>
                        <th className="th-image"><p>Edit / Remove</p></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        product ? product.map((item,key) => (
                            <tr key={key}>
                            <th className="table-num" scope="row">{key+1}</th>
                            <td className="table-img"><img src={item.colorProducts ? item.colorProducts[0].images[0] : null}></img></td>
                            <td className="table-name"><p>{item.name}</p></td>
                            <td className="table-name"><p>{category.map(cate => (cate._id === item.category._id) ? cate.name : null)}</p></td>
                            <td className="table-name"><p>{item.colorProducts ? item.colorProducts.length : 0}</p></td>
                            <td className="table-name"><p>{item.active.toString()}</p></td>
                            <td className="table-name"><p> <Link to ={`/admin/products/edit/${item._id}`} >Edit</Link> / <Link to={`/admin/products/remove_product/${item._id}`}>Remove</Link> </p></td>
                            </tr>
                        )) : null
                    }
                    
                </tbody>
            </Table>

        </div>
    );
}

export default EditProduct;
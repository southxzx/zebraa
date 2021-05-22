import React, { useEffect, useState } from 'react';
import Title from '../../../Component/Common/Title';
import './edit.css';
import { Table } from 'reactstrap';
import { Link, NavLink } from "react-router-dom";
import productApi  from '../../../../../api/productApi';
import categoryApi from '../../../../../api/categoryApi';


function EditCategory(props) {

    const [category,setCategory] = useState([]);

    useEffect(() => {
        const fetchCate = async () => {
            const response = await categoryApi.getAll();
            setCategory(response.data);
        }

        fetchCate();

        //return() => setCategory([]);
        
    },[])

    return (
        <div className="edit-category">
            <Title title="EDIT CATEGORY" title_below="Zebraa Category" />
        
            <Table >
                <thead>
                    <tr>
                        <th>#</th>
                        <th className="th-image"><p>Name</p></th>
                        <th className="th-image"><p>Active</p></th>
                        <th className="th-image"><p>Edit / Remove</p></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        category ? category.map((item,key) => (
                            <tr key={key}>
                            <th className="table-num" scope="row">{key+1}</th>
                            <td className="table-name"><p>{item.name}</p></td>
                            <td className="table-name"><p>{item.active.toString()}</p></td>
                            <td className="table-name"><p> <Link to ={{pathname: `/admin/category/edit/${item._id}` , params:{oldNameCategory: item.name}}} >Edit</Link> / <Link to={`/admin/category/remove_category/${item._id}`}>Remove</Link> </p></td>
                            </tr>
                        )) : null
                    }
                    
                </tbody>
            </Table>

        </div>
    );
}

export default EditCategory;
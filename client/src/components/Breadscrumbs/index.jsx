import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import './breadscrumbs.css'

function Breadcrumbs(props) {
    return (
        <div className="breadcrumb-section">
            <img src="Assets/images/breadscrumb.png" alt="Breadscrumb"/>
            <div className="breadcrumb-inner">
            <h2>{props.title}</h2>
                <Breadcrumb>
                    <BreadcrumbItem><a href="#">{props.linkBack}</a></BreadcrumbItem>
                    <BreadcrumbItem active>{props.active}</BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>
    )
}

export default Breadcrumbs

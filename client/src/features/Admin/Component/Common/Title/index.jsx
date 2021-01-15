import React from 'react';
import './title.css'

function Title(props) {
    const {title,title_below} = props;
    return (
        <div className="title-common">
            <span>{title}</span>
            <h4>{title_below}</h4>
        </div>
    );
}

export default Title;
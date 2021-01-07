import React, { useEffect, useState } from 'react';

function IsAuthorized(ComposedComponent,props) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(loading){
            console.log("bay");
        }
    })

    return (
        <div>
            <ComposedComponent/>
        </div>
    );
}

export default IsAuthorized;
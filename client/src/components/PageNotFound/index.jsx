import React from 'react'

function PageNotFound(props) {
    return (
        <div style={{"width":"37%","margin":"auto","margin-top": "30px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="503" height="310" viewBox="0 0 503 310" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M487.5 61H486.5C486.5 69.117 480.053 75.7281 472 75.9918V77.0082C479.719 77.261 485.963 83.3465 486.467 91H487.533C488.037 83.3465 494.281 77.261 502 77.0082V75.9918C493.947 75.7281 487.5 69.117 487.5 61Z" fill="#00773E">
                </path>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M437.367 29H436.633C436.633 34.9525 431.905 39.8006 426 39.994V40.7397C431.661 40.925 436.24 45.3876 436.609 51H437.391C437.76 45.3876 442.339 40.925 448 40.7397V39.994C442.095 39.8006 437.367 34.9525 437.367 29Z" fill="#009E52"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M479 7.99619C475.242 7.87323 472.233 4.78799 472.233 1H471.767C471.767 4.78799 468.758 7.87323 465 7.99619V8.47139C468.602 8.58925 471.516 11.4287 471.752 15H472.248C472.484 11.4287 475.398 8.58925 479 8.47139V7.99619Z" fill="#009E52">
                </path>
                <circle cx="241" cy="185" r="125" fill="#F7F7F7" fill-opacity="0.5"></circle><circle cx="241" cy="185" r="98" fill="#F7F7F7">
                </circle>
                <circle cx="241.5" cy="184.5" r="71.5" fill="#D9D9D9">
                </circle>
                <circle cx="241.5" cy="184.5" r="35.5" fill="white">
                </circle>
                <path d="M9.6 227V194.2L71.6 107.4H114V193H129.6V227H114V251H74.4V227H9.6ZM77.4 152.4L49.2 193H77.4V152.4Z" fill="#BFBFBF">
                </path>
                <path d="M346.6 227V194.2L408.6 107.4H451V193H466.6V227H451V251H411.4V227H346.6ZM414.4 152.4L386.2 193H414.4V152.4Z" fill="#BFBFBF">
                </path>
            </svg>
            <div style={{"text-align":"center","font-size":"20px","font-weight":"400","padding":"40px 0px"}}>Oops!!! Page Not Found</div>
            <div style={{"text-align":"center"}}>
                <a href="/" className="btn-default btn-subscribe">Back To Home</a>
            </div>
        </div>
    )
}

export default PageNotFound


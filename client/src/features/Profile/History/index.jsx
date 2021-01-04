import React from 'react'

function History() {
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
                            <select class="custom-select" id="inputGroupSelect01">
                                <option selected>ID</option>
                                <option value="1">Name</option>
                            </select>
                        </div>
                    </div>
                    <p>Result of "Nike"</p>
                </div>
                <div className="time-line">
                    <div className="block">
                        <p>6 hours ago</p>
                        <div className="history-content">
                            <div className="thumbnail">
                                <img src="https://res.cloudinary.com/zebraa/image/upload/v1609422116/hkbsm16cedlbwsi2rxzk.jpg" alt="Thumb"/>
                            </div>
                            <div className="block-detail"> 
                                <div>
                                    <p><b>Name:</b> Air Jordan 2.0</p>
                                </div>
                                <div>
                                   <p><b>Category:</b> Jordan</p>
                                </div>
                            </div>
                            <div className="block-detail"> 
                                <div>
                                    <p><b>Color:</b> Red</p>
                                </div>
                                <div>
                                    <p><b>Size:</b> 42</p>
                                </div>
                            </div>
                            <div className="block-detail"> 
                                <div>
                                    <p><b>Quantity:</b> 1</p>
                                </div>
                                <div>
                                    <p><b>Price:</b> 200$</p>
                                </div>
                            </div>
                            <div className="block-detail">
                                <a className="btn-default btn-upload">Write Review</a>
                            </div>
                        </div>
                    </div>
                    <div className="block">
                        <p>6 hours ago</p>
                        <div className="history-content">
                            <div className="thumbnail">
                                <img src="https://res.cloudinary.com/zebraa/image/upload/v1609422116/hkbsm16cedlbwsi2rxzk.jpg" alt="Thumb"/>
                            </div>
                            <div className="block-detail"> 
                                <div>
                                    <p><b>Name:</b> Air Jordan 2.0</p>
                                </div>
                                <div>
                                   <p><b>Category:</b> Jordan</p>
                                </div>
                            </div>
                            <div className="block-detail"> 
                                <div>
                                    <p><b>Color:</b> Red</p>
                                </div>
                                <div>
                                    <p><b>Size:</b> 42</p>
                                </div>
                            </div>
                            <div className="block-detail"> 
                                <div>
                                    <p><b>Quantity:</b> 1</p>
                                </div>
                                <div>
                                    <p><b>Price:</b> 200$</p>
                                </div>
                            </div>
                            <div className="block-detail">
                                <a className="btn-default btn-upload">Write Review</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History

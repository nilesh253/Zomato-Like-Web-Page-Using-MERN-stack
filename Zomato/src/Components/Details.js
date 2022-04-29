import React from 'react';      
import axios from 'axios';     
import { Carousel } from 'react-responsive-carousel';   
import Modal from 'react-modal';                          
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../Styles/details.css';
import queryString from 'query-string';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '3px',
        backgroundColor: 'black',
        border: 'solid 2px brown',
        width: '85%',
        height: '90%'
    }
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: {},
            loginModalIsOpen: false
        }
    }

    componentDidMount() {
        const queryParams = queryString.parse(this.props.location.search);
        const restaurantId = queryParams.restaurant;
        axios({
            method: 'GET',
            url: `http://localhost:4200/getRestaurantsById/${restaurantId}`,
            headers: { 'Content-Type': 'application/json' }
        }).then(res => this.setState({ restaurant: res.data.restaurant }))
            .catch(err => console.log(err))
    }

    handleGallery = () => {
        this.setState({ loginModalIsOpen: true });
    }

    handleClose = () => {
        this.setState({ loginModalIsOpen: false });
    }

    isDate(val) {
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })

        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    getData = (data) => {

        return fetch(`http://localhost:4200/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(err))
    }

    makePayment = () => {
        this.getData({ amount: 500, email: 'abc@gmail.com' }).then(response => {
            var information = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: response
            }
            this.post(information)
        })
    }

    render() {
        const { restaurant, loginModalIsOpen } = this.state;
        return (
            <div>
                { restaurant != null ?
                    < React.Fragment >
                        <div>
                            {restaurant.thumb && <img src={require('../' + restaurant.thumb[0])} width="100%" height="500px" />}
                            <button class="gallery-button" onClick={this.handleGallery}>Click to see Image Gallery</button>
                        </div>
                        <button className="btn btn-danger" onClick={this.makePayment}>Pay Now</button>
                        <div class="heading">{restaurant.name}</div>
                        <div class="tabs">
                            <div class="tab">
                                <input type="radio" id="tab-1" name="tab-group-1" checked />
                                <label for="tab-1">Overview</label>

                                <div class="content">
                                    <div class="about">About the place</div>
                                    <div class="head">Cuisine</div>
                                    <div class="value">{restaurant.cuisine && restaurant.cuisine.map((item) => item.name + ', ')}</div>
                                    <div class="head">Average Cost</div>
                                    <div class="value">&#8377; {restaurant.min_price}</div>
                                </div>
                            </div>
                            <div class="tab">
                                <input type="radio" id="tab-2" name="tab-group-1" />
                                <label for="tab-2">Contact</label>
                                <div class="content">
                                    <div class="head">Phone Number</div>
                                    <div class="value">{restaurant.contact_number}</div>
                                    <div class="head">{restaurant.name}</div>
                                    <div class="value">{`${restaurant.locality}, ${restaurant.city}`}</div>
                                </div>
                            </div>
                        </div>
                        <Modal
                            isOpen={loginModalIsOpen}
                            style={customStyles}
                        >
                            <div>
                                <button className="btn btn-sm btn-warning" style={{ float: 'right' }} onClick={this.handleClose}>Close</button>
                                <Carousel showThumbs={false}>
                                    {restaurant && restaurant.thumb && restaurant.thumb.map((item) => {
                                        return <div>
                                            <img src={require('../' + item)} />
                                        </div>
                                    })}
                                </Carousel>
                            </div>
                        </Modal>
                    </React.Fragment> : null
                }
            </div>
        )
    }
}

export default Details;  
import React, { Component } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import axios from "axios";

const initState = {
    name: "",
    price: "",
    stock: "",
    shortDesc: "",
    description: ""
};
// component is checking whether the current user is stored in context & if that user has an accessLevel of less than 1 (which would be an admin)
// if so, a form is rendered to add a new product, if not it will redirect to the main page.

// all the form fields e.g (name, price, etc..) and the data the user enters into them are tracked into the components state.
// upon form submission the components save method is called, making an ajax request to the back end to create a new product.
// unique ID is also being created (expected from that json-server) and passing that into the request.

// finally the addProduct method recieved from context, is called. This adds the new product to the global state and resets the form.
// if the product is added successfully, a flash property is set into state that will update the view to confirm to the user the product was created
// name & price are mandatory fields will also notify the user.

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = initState;
    }

    save = async (e) => {
        e.preventDefault();
        const { name, price, stock, shortDesc, description } = this.state;

        if (name && price) {
            const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

            await axios.post(
                // backend endpoint
                "http://localhost:3001/products",
                { id, name, price, stock, shortDesc, description },
            )

            this.props.context.addProduct(
                {
                    name,
                    price,
                    shortDesc,
                    description,
                    stock: stock || 0
                },
                () => this.setState(initState)
            );
            this.setState(
                { flash: { status: "is-success", msg: "Product created successfully" }}
            );
            
        } else {
            this.setState(
                { flash: { status: "is-danger", msg: "Please enter name and price" }}
            );
        }
    };

    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

    render() {
        const { name, price, stock, shortDesc, description } = this.state;
        const { user } = this.props.context;

        return !(user && user.accessLevel < 1) ? (
            <Redirect to="/" />
        ) : (
            <>
                <div className="hero is-primary">
                    <div className="hero-body container">
                        <h4 className="title">Add Product</h4>
                    </div>
                </div>
                <br/>
                <br/>
                <form onSubmit={this.save}>
                    <div className="columns is-mobile is-centered">
                        <div className="column is-one-third">
                            <div className="field">
                                <label className="label">Product Name: </label>
                                <input 
                                    className="input"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="field">
                                <label className="label">Price: </label>
                                <input
                                    className="input" 
                                    type="number"
                                    name="price"
                                    value={price}
                                    onChange={this.handleChange} 
                                    required
                                />
                            </div>
                            <div className="field">
                                <label className="label">Available in Stock: </label>
                                <input
                                    className="input" 
                                    type="number"
                                    name="stock"
                                    value={stock}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="field">
                                <label className="label">Short Description: </label>
                                <input
                                    className="input" 
                                    type="text"
                                    name="shortDesc"
                                    value={shortDesc}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="field">
                                <label className="label">Description: </label>
                                <textarea
                                    className="textarea" 
                                    type="text"
                                    rows="2"
                                    style={{ resize: "none" }}
                                    name="description"
                                    value={description}
                                    onChange={this.handleChange} 
                                />
                            </div>
                            {this.state.flash && (
                                <div className={`notification ${this.state.flash.status}`}>
                                    {this.state.flash.msg}
                                </div>
                            )}
                            <div className="field is-clearfix">
                                <button
                                    className="button is-primary is-outlined is-pulled-right"
                                    type="submit"
                                    onClick={this.save}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        );
    }
}

export default withContext(AddProduct);
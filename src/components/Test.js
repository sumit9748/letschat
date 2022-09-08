import React, { useState, useRef, useReducer } from 'react'
import "./test.css"
import { formReducer, INITIAL_STATE } from '../context/formReducer'
const Test = () => {


    // const [product, setProduct] = useState({
    //     title: "",
    //     desc: "",
    //     price: 0,
    //     category: "",
    //     tags: [],
    //     images: {
    //         sm: "",
    //         md: "",
    //         lg: "",
    //     },
    //     quantity: 0,
    // });



    // const handleChange = (e) => {
    //     setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // };

    // const tagRef = useRef();

    // const handleTags = (e) => {
    //     (product.tags.includes(e.target.value)) ?
    //         product.tags.filter((t) => t !== e.target.value)
    //         : setProduct((prev) => ({ ...prev, tags: [...prev.tags, e.target.value] }))
    // };

    // const handleRemoveTag = (tag) => {
    //     setProduct((prev) => ({
    //         ...prev,
    //         tags: prev.tags.filter((t) => t !== tag),
    //     }));
    // };

    // const handleIncrease = () => {
    //     setProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
    // };

    // const handleDecrease = () => {
    //     setProduct((prev) => ({
    //         ...prev,
    //         quantity: prev.quantity - 1,
    //     }));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(product)
    }
    const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

    console.log(state)

    const handleChange = (e) => {
        dispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const handleTags = (e) => {
        dispatch({
            type: "CHANGE_TAGS",
            payload: e.target.value,
        })
    }
    const handleDecrease = () => {
        dispatch({ type: "DECREASE" })
    }
    const handleIncrease = () => {
        dispatch({ type: "INCREASE" })
    }




    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="Title"
                />
                <input
                    type="text"
                    name="desc"
                    onChange={handleChange}
                    placeholder="Desc"
                />
                <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    placeholder="Price"
                />
                <p>Category:</p>
                <select name="category" id="category" onChange={handleChange} >
                    <option value="sneakers">Sneakers</option>
                    <option value="tshirts">T-shirts</option>
                    <option value="jeans">Jeans</option>
                </select>
                <p>Tags:</p>
                <div>
                    <input type="checkbox" value={"sing"} name="sing" onChange={handleTags} />
                    <label htmlfor="sing">Singing</label>
                    <input type="checkbox" value={"dance"} name="dance" onChange={handleTags} />
                    <label htmlfor="dance">Dancing</label>
                    <input type="checkbox" value={"photography"} name="photography" onChange={handleTags} />
                    <label htmlfor="photography">Photography</label>
                </div>

                <div className="tags">
                    {state.tags.map((tag) => (
                        <small
                            onClick={() => dispatch({ type: "REMOVE_TAG", payload: tag })}
                            key={tag}
                        >
                            {tag}
                        </small>
                    ))}
                </div>
                <div className="quantity">
                    <button type="button" onClick={handleDecrease}>
                        -
                    </button>
                    <span>Quantity ({state.quantity})</span>
                    <button type="button" onClick={handleIncrease}>
                        +
                    </button>
                </div>
                <select name='images' onChange={handleChange} >
                    <option name="sm" value="200">100-400</option>
                    <option name="md" value="200">400-700</option>
                    <option name="lg" value="200">700-1000</option>
                </select>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Test
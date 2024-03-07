import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './../AuthContext';



export const cartContext = createContext();

export default function CartContextProvider({ children }) {
    const { myToken } = useContext(authContext);
    const [numOfCartItems, setNumOfCartItem] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [allProducts, setAllProducts] = useState(null);
    const [cartID, setCartID] = useState(null)


    // console.log("allproducts", allProducts)
    async function addProductToCart(id) {


        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            "productId": id
        }, {
            headers: {
                token: localStorage.getItem('tkn')
            }


        }).then((res) => {
            // console.log("res", res)
            return res;


        }).catch((err) => {

            console.log("error", err)

        })


    }

    async function getUserCart() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: localStorage.getItem('tkn')
            }


        }).then((res) => {
            // console.log("res", res)


            setCartID(res.data.data._id)
            // localStorage.setItem("cartID" ,res.data.data._id)
            localStorage.setItem("userID", res.data.data.cartOwner)
            // console.log("cartID", res.data.data._id)
            setAllProducts(res.data.data.products)
            setNumOfCartItem(res.data.numOfCartItems)
            setTotalCartPrice(res.data.data.totalCartPrice)
             getUserCart();
          


            return res;


        }).catch((err) => {

            console.log("error", err)

        })


    }




    async function deleteProduct(id) {
        try {
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
                headers: { token: localStorage.getItem('tkn') }
            });
            // console.log("res", res);
            setAllProducts(res.data.data.products);
            setNumOfCartItem(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            return res;
        } catch (error) {
            console.log("error", error);


        }
    }

    async function clearCart() {
        try {
            const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: { token: localStorage.getItem('tkn') }
            });
            // console.log("res from clear cart", res.data);
            setTotalCartPrice(0);
            setAllProducts([]);
            setNumOfCartItem(0);
        //   await  getUserCart();
            return res;
   


        } catch (error) {
            console.log("error from clearcart", error);

            throw error;
        }
    }





    async function updateCount(id, newCount) {
        try {
            const res = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                { count: newCount },
                { headers: { token: localStorage.getItem('tkn') } }
            );
            // console.log("res", res);
            // console.log("res", res.data);
            setAllProducts(res.data.data.products);
            setNumOfCartItem(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            return res;
        } catch (err) {
            console.log("error", err);
        }
    }

    useEffect(() => {
        getUserCart();

        // console.log("getting user data")
    }, [myToken])
    return <cartContext.Provider value={{ addProductToCart, numOfCartItems, totalCartPrice, allProducts, updateCount, deleteProduct, cartID, getUserCart , clearCart }}>



        {children}


    </cartContext.Provider>
}


"use client"

import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Star, Clock, ShoppingCart } from "lucide-react"
import { Badge } from "../ui/badge"
import { useEffect } from "react"
import axios from "axios"
import { cartItem, setRes } from "../Redux/resSlice"
import { RootState } from "../Redux/store"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


import staticData from './Static_data'

export default function RestaurantList() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const res = useSelector((state: RootState) =>
    state.resturant.res
  )

  const cartItemStorage: cartItem[] = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems") || "") : []

  useEffect(() => {

    const fetchRestaurants = async () => {
      try {
        const apiurl = import.meta.env.VITE_BACKEND_URL
        const response = await axios.get(apiurl + "/res/getLists");

        const data = response.data;

        if (data) {
          dispatch(setRes(data));
        }
      } catch (error) {

        let filtered = [];

        for (let index = 0; index < staticData.length; index++) {
          const item = staticData[index];
          filtered.push({
            ...item,
            _id: Number(item._id),
            menu: item.menu.map(menuItem => ({
              ...menuItem,
              _id: Number(menuItem._id),
            })),
          });
        }

        dispatch(setRes(filtered))
      }
    }

    fetchRestaurants()
  }

    , [])



  const handleAddToCart = (item: cartItem) => {
    const existingItem = cartItemStorage.find((cartItem: cartItem) => cartItem.id === item.id);
    if (existingItem) {
      navigate("/cart")
      return;
    }
    cartItemStorage.push(item)
    localStorage.setItem("cartItems", JSON.stringify(cartItemStorage))

    toast.success("Item added to cart", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(res !== null && res?.length >= 0) && res.map((restaurant) => (
        <Card key={restaurant?._id} className="overflow-hidden">
          <div className="relative h-48">
            <img
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            {restaurant.featured && <Badge className="absolute top-2 right-2 bg-orange-500">Featured</Badge>}
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{restaurant.name}</h3>
                <p className="text-gray-500">{restaurant.cuisine}</p>
              </div>
              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded">
                <Star className="w-4 h-4 fill-current mr-1" />
                <span>{restaurant.rating}</span>
              </div>
            </div>
            <div className="flex items-center mt-2 text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{restaurant.deliveryTime}</span>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Popular Items</h4>
              <div className="space-y-3">
                {restaurant.menu.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded mr-2"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">${item.price}</p>
                      </div>
                    </div>
                    <Button size="sm" variant={`${!cartItemStorage.find((cart) => cart.id === item.id) ? "outline" : "default"}`} className={` hover:bg-orange-600 ${cartItemStorage.find((cart) => cart.id === item.id) ? "bg-orange-500" : ""}`} onClick={() => handleAddToCart({ ...item, quantity: 1 })}>
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">View More</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

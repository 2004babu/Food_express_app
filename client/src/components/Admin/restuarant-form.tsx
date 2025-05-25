"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useSelector } from "react-redux"
import {  useNavigate, useParams } from "react-router-dom"
import {
  // selectRestaurantById,
  // addRestaurant,
  // updateRestaurant,
  // addMenuItem,
  // deleteMenuItem,
  type Restaurant,
  type MenuItem,
  
} from "../Redux/resSlice"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Plus, Trash, Upload, X } from "lucide-react"
import { Separator } from "../ui/separator"
import type { RootState } from "../Redux/store"

import { useDropzone } from "react-dropzone"
import { toast } from "react-toastify"
import axios from "axios"




export default function RestaurantForm() {
  const navigate = useNavigate()
  const { id } = useParams()

  const restaurantId = id ?? undefined

  let existingRestaurant: Restaurant | undefined = undefined
  // const existingRestaurant = undefined
  const { user } = useSelector((state: RootState) => state.user)
  existingRestaurant = useSelector((state: RootState) => state.resturant.res?.find((res) => res._id.toString() === restaurantId?.toString()))



  useEffect(() => {
    try {
      if (existingRestaurant || !user?.uid||!restaurantId) return
      const fetchSingleRestaurant = async () => {
        const localStorageToken = localStorage.getItem("pizzatoken")
        if (!localStorageToken) {
          toast.error("Please log in to continue", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          })
          return
        }
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/res/getRestaurant/${restaurantId}`, { withCredentials: true, headers: { Authorization: `Bearer ${localStorageToken}` } })

        if (response.data?.restaurant) {
          existingRestaurant = response.data.restaurant

          if (response.data.restaurant) {
            setRestaurant({
              name: response.data.restaurant.name,
              image: response.data.restaurant.image,
              cuisine: response.data.restaurant.cuisine,
              rating: response.data.restaurant.rating,
              deliveryTime: response.data.restaurant.deliveryTime,
              featured: response.data.restaurant.featured,
              menu: response.data.restaurant.menu,
            })

          }

        }
      }
      fetchSingleRestaurant()
    } catch (error) {

      console.error("Error fetching restaurant:", error)
      toast.error("Error fetching restaurant", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })

    }

  }, [restaurantId, user])



  const [restaurant, setRestaurant] = useState<Omit<Restaurant, "_id">>({
    name: "",
    image: "/placeholder.svg?height=300&width=400",
    cuisine: "",
    rating: 4.0,
    deliveryTime: "30-40 min",
    featured: false,
    menu: [],
  })

  const [newMenuItem, setNewMenuItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    price: 0,
    image: "/placeholder.svg?height=100&width=100",
  })

  const [activeTab, setActiveTab] = useState("details")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (existingRestaurant !== undefined) {
      setRestaurant({
        name: existingRestaurant.name,
        image: existingRestaurant.image,
        cuisine: existingRestaurant.cuisine,
        rating: existingRestaurant.rating,
        deliveryTime: existingRestaurant.deliveryTime,
        featured: existingRestaurant.featured,
        menu: existingRestaurant.menu,
      })
    }
  }, [existingRestaurant, user])




  const onDrop = useCallback((acceptedFiles: File[]) => {

    const file = acceptedFiles[0]
    const reader = new FileReader();

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.")
      return
    }


    reader.readAsDataURL(file);
    reader.onerror = () => {
      console.error("File reading error")
    }
    // console.log(activeTab)
    reader.onload = () => {
      const result = reader.result
      if (typeof result === "string") {
        if (activeTab.toString() == "menu") {
          setNewMenuItem((prev) => ({
            ...prev,
            image: result,
          }))
        }
        if (activeTab.toString() == "details") {
          setRestaurant((prev) => ({
            ...prev,
            image: result,
          }))
        }
      }

    }

  }, [activeTab])


  const { getRootProps, getInputProps } = useDropzone({ onDrop: onDrop, accept: { 'image/*': [] }, multiple: false })



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRestaurant((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = Number.parseFloat(value)
    if (!isNaN(numValue)) {
      setRestaurant((prev) => ({
        ...prev,
        [name]: numValue,
      }))
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setRestaurant((prev) => ({
      ...prev,
      featured: checked,
    }))
  }

  const handleMenuItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "price") {
      const numValue = Number.parseFloat(value)
      if (!isNaN(numValue)) {
        setNewMenuItem((prev) => ({
          ...prev,
          [name]: numValue,
        }))
      }
    } else {
      setNewMenuItem((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleAddMenuItem = () => {
    if (!newMenuItem.name || newMenuItem.price <= 0) {
      setErrors({
        ...errors,
        menuItem: "Menu item name and price are required",
      })
      return
    }

    setErrors({
      ...errors,
      menuItem: "",
    })

    if (restaurantId) {
      // dispatch(addMenuItem({ restaurantId: id, item: newMenuItem }))
    } else {
      setRestaurant((prev) => ({
        ...prev,
        menu: [...prev.menu, { ...newMenuItem, id: Date.now() }], // Assuming id is generated on the client side for simplicity
      }))
    }

    setNewMenuItem({
      name: "",
      price: 0,
      image: "/placeholder.svg?height=100&width=100",
    })
  }

  const handleRemoveMenuItem = (itemId: number) => {

    setRestaurant((prev) => ({
      ...prev,
      menu: prev.menu.filter((item) => item.id !== itemId),
    }))

  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!restaurant.name) {
      newErrors.name = "Restaurant name is required"
    }

    if (!restaurant.cuisine) {
      newErrors.cuisine = "Cuisine type is required"
    }

    if (restaurant.rating < 0 || restaurant.rating > 5) {
      newErrors.rating = "Rating must be between 0 and 5"
    }

    if (!restaurant.deliveryTime) {
      newErrors.deliveryTime = "Delivery time is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // console.log(restaurant, newMenuItem);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return toast.error("Please fix the errors before submitting", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }


    try {
      const localStorageToken = localStorage.getItem("pizzatoken");
      if (!localStorageToken) {
        toast.error("Please log in to continue", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
        return
      }

      const formdata = new FormData()

      formdata.append("name", restaurant.name)
      formdata.append("image", restaurant.image)
      formdata.append("cuisine", restaurant.cuisine)
      formdata.append("rating", restaurant.rating.toString())
      formdata.append("deliveryTime", restaurant.deliveryTime)
      formdata.append("featured", restaurant.featured.toString())
      formdata.append("menu", JSON.stringify(restaurant.menu)) // send as JSON string

      if (restaurantId) {
        formdata.append("id", restaurantId)
      }


      // restaurant.menu.forEach((item, index) => {
      //   formdata.append(`menu[${index}][name]`, item.name);
      //   formdata.append(`menu[${index}][price]`, item.price.toString());
      //   formdata.append(`menu[${index}][image]`, item.image); // if it's a File
      // });

      // restaurant.menu.forEach((item, index) => {
      //   formdata.append(`menuImages`, item.image); // use same key as in backend's multer config
      // });


      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/res/addRestaurant`, formdata, {
        withCredentials: true, headers: { Authorization: `Bearer ${localStorage.getItem("pizzatoken")}`, "Content-Type": "multipart/form-data" }
      })


      if (response.status === 201) {
        toast.success("Restaurant saved successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })

        // dispatch(setRes(response.data.restaurant));
      }

    } catch (error) {
      console.error("Error saving restaurant:", error)
      toast.error("Error saving restaurant", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }

    // navigate("/admin/restaurants")
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Restaurant Details</TabsTrigger>
          <TabsTrigger value="menu">Menu Items</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the restaurant details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Restaurant Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={restaurant.name}
                  onChange={handleInputChange}
                  placeholder="Enter restaurant name"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuisine">Cuisine Type</Label>
                <Input
                  id="cuisine"
                  name="cuisine"
                  value={restaurant.cuisine}
                  onChange={handleInputChange}
                  placeholder="Italian, Chinese, etc."
                />
                {errors.cuisine && <p className="text-sm text-red-500">{errors.cuisine}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={restaurant.rating}
                    onChange={handleNumberInputChange}
                  />
                  {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryTime">Delivery Time</Label>
                  <Input
                    id="deliveryTime"
                    name="deliveryTime"
                    value={restaurant.deliveryTime}
                    onChange={handleInputChange}
                    placeholder="20-30 min"
                  />
                  {errors.deliveryTime && <p className="text-sm text-red-500">{errors.deliveryTime}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="featured" checked={restaurant.featured} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="featured">Featured Restaurant</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Restaurant Image</CardTitle>
              <CardDescription>Upload a restaurant image</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4 relative">
                <div {...getRootProps()} className="w-full h-48 border-2 border-dashed rounded-md flex items-center justify-center overflow-hidden">
                  {restaurant.image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={restaurant.image || "/placeholder.svg"}
                        alt="Restaurant preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => setRestaurant((prev) => ({ ...prev, image: "" }))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      {!restaurant.image && (
                        <input type="file" className="absolute h-full w-full" {...getInputProps()} />
                      )}
                      <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                    </>
                  )}
                </div>

                <Input
                  id="image"
                  name="image"
                  type="text"
                  value={restaurant.image}
                  onChange={handleInputChange}
                  placeholder="Or enter image URL"
                  className="max-w-md"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => navigate("/admin/restaurants")}>
              Cancel
            </Button>
            <Button type="button" onClick={() => setActiveTab("menu")}>
              Next: Menu Items
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="menu" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Menu Items</CardTitle>
              <CardDescription>Add items to the restaurant menu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {restaurant.menu.length === 0 ? (
                  <div className="text-center py-8 border rounded-md">
                    <p className="text-gray-500">No menu items added yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {restaurant?.menu.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 border p-3 rounded-md">
                        <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveMenuItem(item.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Add New Menu Item</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input
                      id="itemName"
                      name="name"
                      value={newMenuItem.name}
                      onChange={handleMenuItemChange}
                      placeholder="Enter item name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="itemPrice">Price ($)</Label>
                    <Input
                      id="itemPrice"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={newMenuItem.price}
                      onChange={handleMenuItemChange}
                      placeholder="0.00"
                    />
                  </div>
                </div>


                {/* <CardContent> */}
                <div className="flex flex-col items-center space-y-4 relative">
                  <div {...getRootProps()} className="w-full h-48 border-2 border-dashed rounded-md flex items-center justify-center overflow-hidden">
                    {newMenuItem.image ? (
                      <div className="relative w-full h-full">
                        <img
                          src={newMenuItem.image || "/placeholder.svg"}
                          alt="Restaurant preview"
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => setNewMenuItem((prev) => ({ ...prev, image: "" }))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>

                        <input type="file" className="absolute h-full w-full" {...getInputProps()} />
                        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or GIF (max. 2MB)</p>
                      </>
                    )}
                  </div>

                  <Label htmlFor="itemImage">Item Image URL</Label>
                  <Input
                    id="itemImage"
                    name="image"
                    value={newMenuItem.image}
                    onChange={handleMenuItemChange}
                    placeholder="Enter image URL"
                  />
                </div>
                {/* </CardContent> */}


                {errors.menuItem && <p className="text-sm text-red-500">{errors.menuItem}</p>}

                <Button type="button" variant="outline" className="w-full" onClick={handleAddMenuItem}>
                  <Plus className="h-4 w-4 mr-2" /> Add Item
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
              Back to Details
            </Button>
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={() => navigate("/admin/restaurants")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                {restaurantId ? "Update Restaurant" : "Create Restaurant"}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  )
}

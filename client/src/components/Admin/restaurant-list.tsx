"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { selectRestaurants, deleteRestaurant } from "@/redux/features/restaurant-slice"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Star, Edit, Trash, Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "../ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Link } from "react-router-dom"
import { RootState } from "../Redux/store"
import axios from "axios"
import { setRes } from "../Redux/resSlice"
import { toast } from "react-toastify"

export default function RestaurantList() {
  // const restaurants = []


    useEffect(() => {
  
      const fetchRestaurants = async () => {
        const apiurl = import.meta.env.VITE_BACKEND_URL
        const response = await axios.get(apiurl + "/res/getLists");
  
        const data = response.data;
  
        if (data) {
          dispatch(setRes(data));
        }
      }
  
      fetchRestaurants()
    }
  
      , [])
  

  
  const restaurants = useSelector((state: RootState) => state.resturant.res)
 
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [restaurantToDelete, setRestaurantToDelete] = useState<number | null>(null)

  const itemsPerPage = 5

  // Filter restaurants based on search query
  const filteredRestaurants = restaurants?.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Paginate restaurants
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRestaurants = filteredRestaurants?.slice(indexOfFirstItem, indexOfLastItem)
  let totalPages = 0
  if (filteredRestaurants !== undefined) {

    totalPages = Math.ceil(filteredRestaurants?.length / itemsPerPage)
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleDeleteClick = (id: number) => {
    setRestaurantToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (restaurantToDelete !== null) {
      // dispatch(deleteRestaurant(restaurantToDelete))
      const apiurl = import.meta.env.VITE_BACKEND_URL
      const deleteRestaurant = async () => {
        const response = await axios.delete(apiurl + `/res/deleteRestaurant/${restaurantToDelete}`,{
          withCredentials: true,
          headers: { Authorization: `Bearer ${localStorage.getItem("pizzatoken")}` },

        })
        const data = response.data
        if (data) {
          toast.success("Restaurant deleted successfully", {
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
      }
      deleteRestaurant()
      setDeleteDialogOpen(false)
      setRestaurantToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input
            placeholder="Search restaurants..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Delivery Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Menu Items</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRestaurants&& currentRestaurants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No restaurants found
                </TableCell>
              </TableRow>
            ) : (
              currentRestaurants?.map((restaurant) => (
                <TableRow key={restaurant._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded overflow-hidden">
                        <img
                          src={restaurant.image || "/placeholder.svg"}
                          alt={restaurant.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{restaurant.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{restaurant.cuisine}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span>{restaurant.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{restaurant.deliveryTime}</TableCell>
                  <TableCell>
                    {restaurant.featured ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Featured</Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500 hover:bg-gray-50">
                        Standard
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{restaurant.menu.length}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">Open menu</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-more-vertical"
                          >
                            <circle cx="12" cy="12" r="1" />
                            <circle cx="12" cy="5" r="1" />
                            <circle cx="12" cy="19" r="1" />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/restaurants/${restaurant._id}`} className="flex items-center">
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(restaurant._id)} className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {filteredRestaurants !==undefined&&Math.min(indexOfLastItem, filteredRestaurants?.length)} of{" "}
            {filteredRestaurants?.length} restaurants
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the restaurant and all its menu items.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

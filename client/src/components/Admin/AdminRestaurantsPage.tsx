import { Suspense } from "react"
import RestaurantList from "./restaurant-list"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import {Link} from "react-router-dom"

export default function AdminRestaurantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Restaurants</h1>
          <p className="text-gray-500">Manage your restaurant listings</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600" asChild>
          <Link to="/admin/newrestaurants">
            <Plus className="mr-2 h-4 w-4" /> Add Restaurant
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div className="w-full h-96 animate-pulse bg-gray-200 rounded-lg"></div>}>
        <RestaurantList />
      </Suspense>
    </div>
  )
}

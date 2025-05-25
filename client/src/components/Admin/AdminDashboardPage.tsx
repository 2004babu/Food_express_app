import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Store, Utensils, Users, TrendingUp } from "lucide-react"
import {Link} from "react-router-dom"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Manage your restaurants and menu items</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Restaurants</p>
              <h3 className="text-2xl font-bold">6</h3>
            </div>
            <Store className="h-8 w-8 text-orange-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Menu Items</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
            <Utensils className="h-8 w-8 text-orange-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Users</p>
              <h3 className="text-2xl font-bold">128</h3>
            </div>
            <Users className="h-8 w-8 text-orange-500" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-row items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Orders Today</p>
              <h3 className="text-2xl font-bold">12</h3>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your restaurant data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/admin/restaurants" className="block p-4 border rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Manage Restaurants</h4>
                  <p className="text-sm text-gray-500">Add, edit or remove restaurants</p>
                </div>
                <Store className="h-5 w-5 text-gray-400" />
              </div>
            </Link>

            <Link
              to="/admin/newrestaurants/"
              className="block p-4 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Add New Restaurant</h4>
                  <p className="text-sm text-gray-500">Create a new restaurant listing</p>
                </div>
                <Store className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                <div>
                  <p className="text-sm font-medium">Restaurant Added</p>
                  <p className="text-xs text-gray-500">Pizza Paradise was added to the platform</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium">Restaurant Updated</p>
                  <p className="text-xs text-gray-500">Burger Bliss information was updated</p>
                  <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-orange-500" />
                <div>
                  <p className="text-sm font-medium">Menu Item Added</p>
                  <p className="text-xs text-gray-500">New items added to Sushi Sensation</p>
                  <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

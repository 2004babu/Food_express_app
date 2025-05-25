
import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, User, Menu, X, Home, ClipboardList, LogOut } from "lucide-react"
import { Button } from "./ui/button"
// import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../components/ui/sheet"
import { Badge } from "../components/ui/badge"
import { useSelector } from "react-redux"
import { RootState } from "./Redux/store"
import { cartItem } from "./Redux/resSlice"
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    //   const cartItems = useSelector(selectCartItems)
let totalItems:number= 0
    const cartItems:cartItem[] =localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems") || "") : []
    
    if (cartItems.length > 0) {
        totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
      } 
    
    const navigete =useNavigate()
const user = useSelector((state: RootState) => state.user.user)    

    return (
        <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-orange-500">
                        FoodExpress
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="font-medium hover:text-orange-500 transition-colors">
                            Home
                        </Link>
                        <Link to="/orders" className="font-medium hover:text-orange-500 transition-colors">
                            My Orders
                        </Link>
                        {user?.isAdmin&& <Link to="/admin/dashboard" className="font-medium hover:text-orange-500 transition-colors">
                        DashBoard
                    </Link>}
                        {!user?.uid&& <Link to="/login" className="font-medium hover:text-orange-500 transition-colors">
                        Login
                    </Link>}
                         
           
                <Button onClick={()=>navigete('/cart')} className="relative bg-orange-500 hover:bg-orange-600">
                  <ShoppingCart  className="w-5 h-5" />
                  {totalItems > 0 && <Badge className="absolute -top-2 -right-2 bg-blue-500 hover:bg-blue-600">{totalItems}</Badge>}
                </Button>
              
          </div>

          <div className="md:hidden flex items-center">
            
                <Button onClick={()=>navigete('/cart')}  variant="outline" size="icon" className="relative mr-2 cursor-pointer">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && <Badge className="absolute -top-2 -right-2 bg-red-500">{totalItems}</Badge>}
                </Button>
              

            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button> 
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                to="/"
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Home className="w-5 h-5" />
                                <span>Home</span>
                            </Link>
                            <Link
                                to="/orders"
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <ClipboardList className="w-5 h-5" />
                                <span>My Orders</span>
                            </Link>
                            <Link
                                to="/account"
                                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User className="w-5 h-5" />
                                <span>Account</span>
                            </Link>
                            <button className="justify-start">
                                <LogOut className="w-5 h-5 mr-2" />
                                <span>Sign Out</span>
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

// import { useEffect } from 'react'

import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
// import auth from './firebase'
// import { clearUser, setUser } from './components/Redux/userSlice'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
import Orders from './pages/Orders'
import CartPage from './components/cart/page'
import CheckOut from './pages/CheckOut'
import AdminLayout from './components/Admin/AdminLayout'
import AdminDashboardPage from './components/Admin/AdminDashboardPage'
import AdminRestaurantsPage from './components/Admin/AdminRestaurantsPage'
import RestaurantForm from './components/Admin/restuarant-form'
import RequirAdmin from './utils/RequireAdmin'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'


function App() {


  // const [isloaded, setIsLoaded] = useState<boolean>(false);

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   const unsubcribe = auth.onAuthStateChanged(async (firebaseUser) => {
  //     // setIsLoaded(true)

  //     if (firebaseUser) {
  //       const token = await firebaseUser?.getIdToken()

  //       const apiurl = import.meta.env.VITE_BACKEND_URL

  //       if (token) {
  //         localStorage.setItem('pizzatoken', token);
  //       }

  //       const response = await axios.post(apiurl + '/auth/emailSignup', {}, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
  //       if (response.data.user) {
  //         dispatch(setUser(response.data.user))
  //       }
  //     } else {
  //       dispatch(clearUser())
  //     }


  //   })

  //   const getNOtificationPermission = async () => await Notification.requestPermission()

  //   getNOtificationPermission()

  //   return () => { unsubcribe() }
  // }, []);



  return (

    <>
      <ToastContainer />
      {/* <Login /> */}
      <BrowserRouter>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOut />} />

            <Route path="/admin/dashboard" element={
              <RequirAdmin>

                <AdminDashboardPage />
              </RequirAdmin>
            } />

            <Route path="/admin/restaurants/:id" element={
              <RequirAdmin>
                <RestaurantForm />
              </RequirAdmin>
            } />
            <Route path="/admin/restaurants/" element={
              <RequirAdmin>
                <AdminRestaurantsPage />
              </RequirAdmin>
            } />
            <Route path="/admin/newrestaurants" element={
              <RequirAdmin>
                <RestaurantForm />
              </RequirAdmin>
            } />


          </Routes>
        </AdminLayout>
        {/* {!isloaded && */}

        {/* <Layout>
            <Routes>
              
            </Routes>
          </Layout> */}
        {/* } */}
      </BrowserRouter>
    </>
  )
}

export default App

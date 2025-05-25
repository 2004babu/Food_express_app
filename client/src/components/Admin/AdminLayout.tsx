import type React from "react"
import Navbar from "../Navbar"
import { Footer } from "react-day-picker"

export default function AdminLayout({ children }: { children: React.ReactNode }) {



  // if (user?.isAdmin!==false) {

  //   return (
  //     <div className="h-screen bg-gray-50">
  //       <AdminHeader />
  //       <div className="flex">
  //         <AdminSidebar />
  //         <main className="flex w-full  p-6">
  //           <Suspense fallback={<div className="w-full h-screen animate-pulse bg-gray-200 rounded-lg"></div>}>
  //             {children}
  //           </Suspense>
  //         </main>
  //       </div>
  //     </div>
  //   )

  // }
  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  )

}

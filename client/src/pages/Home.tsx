import FoodCategories from "../components/home/FoodCategories"
import HeroSection from "../components/home/HeroSection"
import RestaurantList from "../components/home/RestaurantList"
import { Suspense } from "react"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div className="h-20 w-full animate-pulse bg-gray-200 rounded-lg"></div>}>
          <FoodCategories />
        </Suspense>
        <h2 className="text-2xl font-bold mt-8 mb-4">Popular Restaurants Near You</h2>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 animate-pulse bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          }
        >
          <RestaurantList />
        </Suspense>
      </div>
    </main>
  )
}

import { Button } from '../components/ui/button'
import { ArrowBigLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
const CheckOut = () => {
    const naviagte = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center h-screen text-4xl font-bold text-gray-800'>     

      Payment In Test Mode !


    <Button onClick={()=>naviagte('/cart')} className='bg-orange-500 mt-10 hover:bg-orange-600 text-white px-4 py-2 px-10 rounded-lg mb-4'>
      <ArrowBigLeft/>  Go Back  
    </Button>
    </div>
  )
}

export default CheckOut

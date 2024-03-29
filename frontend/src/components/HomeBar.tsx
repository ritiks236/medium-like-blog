import { Link } from "react-router-dom"

export const HomeBar = () => {
    return (
      
        <div className="border-b flex justify-between px-20 py-4">
            <Link to={'/'} className="flex flex-col justify-center cursor-pointer">
                Medium
            </Link>
            
            <div>
            <Link to={'/signup'}>
                <button type="button" className="mr-8 text-white bg-[#845eed] hover:bg-[#5232a9] 
                focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm 
                px-5 py-2.5 text-center me-2 mb-2">Get Started</button>

            </Link>
            </div>

          
        </div>
     
    )
}
import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = () => {
    return (
      
        <div className="border-b flex justify-between px-20 py-4">
              <Link to={'/blogs'}>
            <div className="flex flex-col justify-center cursor-pointer">
                Medium
            </div>
            </Link>
            <Avatar name={"Ritik Singh"} />
        </div>
     
    )
}
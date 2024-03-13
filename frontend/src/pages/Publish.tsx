
import { AppBar } from "../components/AppBar"
import { useMemo, useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";

export const Publish = () => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    
    const editor = useRef(null);
    const [content, setContent] = useState('');
    

    const config : any = {
        placeholder : "Write an article..."
    }

    return(
        <div>
            <AppBar />
            <div className="mx-2 mt-4 pt-4 flex justify-center">
            
            <div className="max-w-screen-lg w-full">
                

            <input type="text" onChange={(e) => {setTitle(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"  placeholder="Title" />
            <div className="mt-4 min-w-96">
                <JoditEditor 
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={newContent => setContent(newContent)} 
                    onChange={newContent => {}}
        
                />
            </div>
         
            <button onClick={async () => {
               try{
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title : title,
                    description: content
                }, {
                    headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
                });
                toast.success('Published!');
                navigate(`/blog/${response.data.id}`)
               } 
               catch(err){
                toast.error('Failed!')
               }
            }} className="mt-6 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
       Publish post
   </button>

            </div>
            
        </div>
        </div>
     
    )
}


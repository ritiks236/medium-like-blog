import { EditorState, convertToRaw } from "draft-js"
import { Editor } from "react-draft-wysiwyg";
import { AppBar } from "../components/AppBar"
import { useEffect, useState } from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from "axios";
import { convertToHTML } from 'draft-convert';
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const [convertedContent, setConvertedContent] = useState('');

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
    }, [editorState])

    // console.log(editorState.getCurrentContent())
    return(
        <div>
            <AppBar />
            <div className="mx-2 mt-4 pt-4 flex justify-center">
            
            <div className="max-w-screen-lg w-full">
                

            <input type="text" onChange={(e) => {setTitle(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"  placeholder="Title" />
            <div className="mt-4">
            <Editor editorState={editorState} 
              onEditorStateChange={setEditorState}
              wrapperClassName="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
              editorClassName="m-2 p-1 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-md block min-h-80"
              placeholder="Write an article ..."
              toolbarClassName="m-2 bg-gray-50 border border-gray-200 rounded-lg"/>
            </div>
            <button onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title : title,
                    description: convertedContent
                }, {
                    headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
                });
                navigate(`/blog/${response.data.id}`)
            }} className="mt-6 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
       Publish post
   </button>

            </div>
            
        </div>
        </div>
     
    )
}


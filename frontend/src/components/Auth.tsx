import { Link, useNavigate } from "react-router-dom"
import { InputBox } from "./InputBox"
import { useState } from "react"
import { SignupType } from "@ritiks236/common-app"
import axios from "axios"
import { BACKEND_URL } from "../config"
import toast from 'react-hot-toast';


export const Auth = ({type} : {type : "signin" | "signup"}) =>   {
    const [postInputs, setPostInputs] = useState<SignupType>({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? 'signup' : 'signin'}`, {
                email : postInputs.email,
                password : postInputs.password
            })
            if(type == 'signup'){
                toast.success('Signed up');
            } else {
                toast.success("Logged In");
            }
            
            const jwt = response.data.token;
            localStorage.setItem('token', jwt);
            navigate('/blogs');
        } catch (e) {
            //alert the user request failed
            if(type == 'signup'){
                toast.error("Signup Failed!");
            } else {
                toast.error("Login Failed");
            }
        }
        
    }

    return(
        <div className="h-screen flex justify-center flex-col items-center">
            <div>
            <div className="px-10">
                <div className="text-3xl font-extrabold">
                Create an account
                </div>
                <div className="text-slate-400">
                    {type === "signup" ? "Already have an account?" : "Don't have an account?"}
                    <Link className="pl-2 underline" to={type === "signup" ? '/signin' : '/signup'}>{type === "signup" ? 'Login' : 'Signup'}</Link>
                </div>
            </div>
            <div className="mt-2 pt-2">
            <InputBox label={"Email"} placeholder={"email@email.com"} onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    email: e.target.value
                })
            }}/>
            <InputBox label={"Password"} placeholder={"123456"} type={"password"} onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })
            }}/>
            {type === "signup" ? <InputBox label={"Name"} placeholder={"Jhon Doe"} onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
            }}/> : null}
            <div className="mt-8">

           
            <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">{type === "signup" ? "Sign up" : "Sign in"}</button>
           
            </div>

            </div>
            </div> 
        </div>
    )
}
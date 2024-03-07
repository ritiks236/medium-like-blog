import { Link } from "react-router-dom"

interface BlogCardprops{
    authorName : string,
    title: string,
    content: string,
    publishedDate : string,
    id: number
}

export const BlogCard = ({authorName, title, content, publishedDate, id} :BlogCardprops) => {
    return(
        <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 pt-8 max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar name={authorName} /> 
                <div className="font-extralight pl-2 text-sm">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle />
                </div>
                <div className="pl-2 font-thin text-slate-500">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4 pb-4">
                {`${Math.ceil(content.length/100)} min read`}
            </div>
        </div>
        </Link>
    )
}

function Circle() {
    return (
        <div className="h-1 w-1 rounded-full bg-slate-300">

        </div>
    )
}

export function Avatar({name} : {name:string}) {
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-xs text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>

}
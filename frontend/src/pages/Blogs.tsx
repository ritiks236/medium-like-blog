import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"


export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading){
        return (<div>
            <div>
            <AppBar />
            </div>
            <div>
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
            
        </div>)
    }

    return (
        <div>
            <AppBar />
            <div className="flex justify-center">
                <div className="max-w-xl">
                {blogs.map(blog => <BlogCard id={blog.id} authorName={blog.author.name || "Anyonumous"} title={blog.title}
                content={blog.description}
                publishedDate={"04 Feb 2023"} />)}
                

            
                </div>
            </div>
        </div>
    )
}
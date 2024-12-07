
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import BlogpostClientComponent from "/components/BlogpostClientComponent";

export default async function Page({ params }) {

    const slug = (await params).slug;

    // Define the directory containing the blog files
    const blogDirectory = path.join(process.cwd(), "content");

    // Read all markdown files in the content directory
    const blogFiles = fs.readdirSync(blogDirectory);

    // Extract metadata and content for all blogs
    const blogs = blogFiles.map((fileName) => {
        const fullPath = path.join(blogDirectory, fileName);
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { data, content } = matter(fileContent);
        return {
            ...data,
            content,
        };
    });

    // Find the blog with the matching slug
    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
        return (
            <div className="max-w-4xl mx-auto py-10 px-5">
                <h1 className="text-3xl font-bold">404 - Blog Not Found</h1>
                <p className="text-sm mt-2">The blog you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <BlogpostClientComponent
            blog={{
                ...blog,
                date: blog.date ? new Date(blog.date).toDateString() : "Unknown Date",
            }}
        />
    );
}

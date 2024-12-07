import matter from "gray-matter";
import path from "path";
import fs from "fs";
import BlogClientComponent from "@/components/BlogClientComponent.js";

export default function BlogsPage() {

    const blogDirectory = path.join(process.cwd(), "content");
    const blogFiles = fs.readdirSync(blogDirectory);

    const blogs = blogFiles.map((fileName) => {

        const fullPath = path.join(blogDirectory, fileName);
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { data } = matter(fileContent);
        return {
            title: data.title,
            description: data.description,
            image: data.image,
            author: data.author,
            date: data.date,
            slug: data.slug,
        };
    });

    return <BlogClientComponent blogs={blogs} />;
}

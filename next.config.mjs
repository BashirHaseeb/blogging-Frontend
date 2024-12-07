/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.pixabay.com",
            },
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            },
            {
                protocol: "https",
                hostname: "encrypted-tbn0.gstatic.com",
            },
            {
                protocol: "https",
                hostname: "miro.medium.com",
            },
            {
                protocol: "https",
                hostname: "pulkitgangwar.gallerycdn.vsassets.io",
            },
            {
                protocol: "https",
                hostname: "www.clickslice.co.uk",
            },
            {
                protocol: "https",
                hostname: "as1.ftcdn.net",
            },
            {
                protocol: "https",
                hostname: "onlyweb-formation.com",
            },
            {
                protocol: "https",
                hostname: "ideavalley.my", // Add this hostname
            },
        ],
    },
};

export default nextConfig;

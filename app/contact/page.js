"use client";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import TypewriterEffect from "@/components/Typewritter";
import { useRouter } from "next/navigation"; // Import router for redirect
import { useEffect, useState } from "react";

export default function Contact() {

  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated by looking for a session or token
    const checkAuth = () => {
      const token = localStorage.getItem("token"); // Or check cookies, depending on your method
      if (!token) {
        setIsAuthenticated(false);
        router.push("/login"); // Redirect to login if not authenticated
      } else {
        setIsAuthenticated(true); // Continue if user is authenticated
      }
    };

    checkAuth();
  }, [router]);

  // If not authenticated, do not render the contact page
  if (!isAuthenticated) {
    return null;
  }


  const icons = [
    { icon: <FaLinkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/abdullah-~-6197102a5/" },
    { icon: <FaGithub />, label: "GitHub", href: "https://github.com/BashirHaseeb" },
    { icon: <FaEnvelope />, label: "Email", href: "" },
  ];

  return (
    <motion.div
      className="min-h-[90vh] flex flex-col items-center justify-center p-4 md:mt-0 mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <TypewriterEffect
        texts={[

          " Contact with us!",

        ]}
      />

      <p className="text-center mb-8 mt-5">
        Feel free to reach out through this form or via the platforms below.
      </p>

      <motion.form
        className="p-6 rounded-lg shadow-md w-full max-w-md border-2 border-purple-500 bg-purple-400 bg-opacity-30 backdrop-blur-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        onSubmit={(e) => e.preventDefault()} // Handle submission logic here
      >
        <label className="block mb-2">
          Name
          <input
            type="text"
            className="w-full mt-1 p-2 rounded-md outline-purple-500 border-2"
            required
          />
        </label>
        <label className="block mb-2">
          Email
          <input
            type="email"
            className="w-full mt-1 p-2 rounded-md outline-purple-500 border-2"
            required
          />
        </label>
        <label className="block mb-4">
          Message
          <textarea
            className="w-full mt-1 p-2 rounded-md outline-purple-500 border-2"
            rows="5"
            required
          ></textarea>
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Send Message
        </button>
      </motion.form>

      {/* Icons Section */}
      <div className="fixed top-16 md:top-1/3 left-[-75px] flex flex-col gap-4">
        {icons.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between items-center gap-4 py-2 rounded-r-full transition font-bold bg-purple-600 pl-2"
            initial={{ x: 0 }}
            whileHover={{ x: 75 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {item.label}

            <div className="text-2xl ">{item.icon}</div>
            <motion.span
              className="ml-2 text-sm font-medium whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
            </motion.span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

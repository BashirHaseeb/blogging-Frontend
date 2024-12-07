"use client";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { useState } from "react";


export default function Home() {

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const technologies = [
    { name: "HTML", src: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582747_640.png" },
    { name: "CSS", src: "https://cdn.pixabay.com/photo/2017/08/05/11/16/logo-2582748_640.png" },
    { name: "Node.js", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png" },
    { name: "React.js", src: "https://onlyweb-formation.com/uploads/mod_logo/react.webp" },
    { name: "Next.js", src: "https://pulkitgangwar.gallerycdn.vsassets.io/extensions/pulkitgangwar/nextjs-snippets/1.0.2/1713018281951/Microsoft.VisualStudio.Services.Icons.Default" },
    { name: "Express", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF_SoSddaFVUG1CA7Rd1w5voGi_UebLnDdDV8CzT8rKoQ_96_sS0ihJyvgrFVgRCbK0uc&usqp=CAU" },
    { name: "MongoDB", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHZWO5p3Q2BMhM0SPeYgdjH5QXZZMd2iq5IHu7HK6b_Ed8VolVkmGbF1WwXHHICx0CGnQ&usqp=CAU" },
    { name: "React", src: "https://miro.medium.com/v2/resize:fit:512/1*doAg1_fMQKWFoub-6gwUiQ.png" },
    { name: "Next.js", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiMRos9eQMYOTWKUZ9FpapzDwOwvuRfq9aF2DeryR172MWngfdLQmI3zva5nskZ5f8R_0&usqp=CAU" },
    { name: "python", src: "https://ideavalley.my/wp-content/uploads/2023/05/python.png" },
  ];

  const container = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
    exit: { opacity: 0, scale: 0.5 },
  };

  const item = {
    hidden: {
      opacity: 0,
      x: (index) => (index % 2 === 0 ? -100 : 100),
      y: (index) => (index % 2 === 0 ? -100 : 100),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    float: {
      y: ["0", "-10px", "0"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <main className="flex items-center justify-center h-[85vh] px-3 ">
        <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-8 w-full h-auto p-20 border-b-2">
          {/* Left side: Description with Typewriter effect */}
          <div className="w-full md:w-1/2 flex flex-col justify-center font-mono space-y-5 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-semibold">
              <Typewriter
                options={{
                  strings: [
                    "Hi! It's M.Abdullah Bashir",
                    "I am a Web Developer",
                    "Let’s Build Something Amazing!",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                  deleteSpeed: 60,
                }}
              />
            </h1>
            <p className="md:text-sm text-xs font-mono">
              I’m a BSCS student in my third semester with a strong foundation in Python, Java, JavaScript, C, and C++. I’ve gained experience in AI/ML and the MERN stack, and have worked on projects like a URL shortener, password manager, and music player using React.js and Next.js. My goal is to become a software engineer at a top company or start my own business. I also value meaningful relationships and strive to offer insightful perspectives to those around me.!
            </p>
            {/* Resume and GitHub buttons */}
            <div className="flex justify-center md:justify-start space-x-3 mt-6">
              <Button className="bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700">
                <a href="/cv" download>Download Resume</a>
              </Button>
              <Button>
                <a href="https://github.com/Falcon-Abdullah" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
            </div>
          </div>
          {/* Right side: Image with Framer Motion animation */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0"
            animate={{ y: ["0", "-10px", "0"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/myPhoto.jpeg"
              alt="Your Name"
              width={400}
              height={400}
              className="rounded-full shadow-lg mb-5 md:mb-0"
            />
          </motion.div>
        </div>
      </main>


      <section ref={ref} className="h-auto flex flex-col items-center justify-center  p-5">
        <h2 className="text-3xl md:text-4xl text-center font-semibold my-12">
          Technologies I Work With
        </h2>

        <div className="flex flex-col-reverse md:flex-row items-center md:justify-center w-full border-b-2">

          {/* Left Section: Technologies Grid */}
          <div className="flex flex-col items-center space-y-4 w-full md:w-1/2 mb-10 mt-5 md:mt-0">
            {/* Row 1 */}
            <motion.div
              className="flex space-x-3 flex-wrap justify-center"
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              exit="exit"
            >
              {technologies.slice(0, 4).map((tech, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg shadow-lg flex justify-center items-center m-2"
                  variants={item}
                  initial="hidden"
                  animate="visible"
                  whileInView="float"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Image src={tech.src} alt={tech.name} width={50} height={50} />
                </motion.div>
              ))}
            </motion.div>

            {/* Row 2 */}
            <motion.div
              className="flex space-x-3 flex-wrap justify-center"
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              exit="exit"
            >
              {technologies.slice(4, 7).map((tech, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg shadow-lg flex justify-center items-center m-2"
                  variants={item}
                  initial="hidden"
                  animate="visible"
                  whileInView="float"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Image src={tech.src} alt={tech.name} width={50} height={50} />
                </motion.div>
              ))}
            </motion.div>

            {/* Row 3 */}
            <motion.div
              className="flex space-x-3 flex-wrap justify-center"
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              exit="exit"
            >
              {technologies.slice(7, 9).map((tech, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg shadow-lg flex justify-center items-center m-2"
                  variants={item}
                  initial="hidden"
                  animate="visible"
                  whileInView="float"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Image src={tech.src} alt={tech.name} width={50} height={50} />
                </motion.div>
              ))}
            </motion.div>

            {/* Row 4 */}
            <motion.div
              className="flex space-x-3 flex-wrap justify-center"
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              exit="exit"
            >
              {technologies.slice(9, 10).map((tech, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg shadow-lg flex justify-center items-center m-2"
                  variants={item}
                  initial="hidden"
                  animate="visible"
                  whileInView="float"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Image src={tech.src} alt={tech.name} width={50} height={50} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Section: Description */}
          <div className="w-full md:w-1/2 px-10 text-sm mb-10 md:mr-10 mr-0">
            <div className="text-center mb-2">
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? "max-h-full" : "max-h-20"}`}
              >
                "I have developed a solid foundation in both front-end and back-end technologies, along with experience in data structures and algorithms (DSA) using python. On the front-end, I work with HTML, CSS, and JavaScript to create interactive user interfaces, enhanced by frameworks like React.js and Next.js for building responsive and modern web applications. On the back-end, I use Node.js and Express.js for developing scalable APIs and robust server-side logic, with MongoDB as my go-to database for secure and efficient data management. Additionally, I have a basic understanding of Python and its libraries, such as NumPy, Pandas, scikit-learn, and Matplotlib, which I use for simple data manipulation, visualization, and exploring introductory AI/ML concepts. My proficiency in DSA using C++ helps me optimize algorithms and improve application performance. This diverse skill set allows me to approach projects holistically while continuously expanding my knowledge to stay up-to-date with emerging technologies."
              </div>
            </div>

            <div className="w-full flex justify-center">
              <Button
                onClick={handleToggle}
                className="mb-3 transition-transform transform hover:scale-105"
              >
                {isExpanded ? "Show Less" : "Show More"}
              </Button>
            </div>

            {/* Experience and Projects */}
            <div className="flex justify-center gap-10 mt-5 flex-wrap">
              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">1+</h3>
                <p>Years Experience</p>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">10+</h3>
                <p>Projects Completed</p>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">5+</h3>
                <p>Programming Languages</p>
              </div>
            </div>

            {/* Skills Progress */}
            <div className="space-y-3 mt-5">
              <div className="flex items-center gap-5">
                <p>Frontend</p>
                <div className="grow h-2.5 rounded-full bg-gray-900">
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 h-2.5 w-10/12 rounded-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600"></div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <p>Backend</p>
                <div className="grow h-2.5 rounded-full bg-gray-900">
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 h-2.5 w-10/12 rounded-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600"></div>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <p>Others</p>
                <div className="grow h-2.5 rounded-full bg-gray-900">
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 h-2.5 w-6/12 rounded-full transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>


      {/* Centering the last section properly */}
      <section className="h-auto flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-center my-14">My Projects</h2>
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center gap-10"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {[
            {
              name: "Url Shortener",
              image:
                "https://www.clickslice.co.uk/wp-content/uploads/2022/07/1_Pdw7h5X6vQQNVopIzHBG6A.jpeg",
              description: "A web application in NEXT.js that generates unique short URLs.",
              link: "https://github.com/Falcon-Abdullah/project1",
            },
            {
              name: "Password Manager",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB0DbJVfOBHrWIp-E2Wd8mVuoZvw2Yftm92Q&s",
              description: "A React.js + Express.js project to store passwords securely.",
              link: "https://github.com/Falcon-Abdullah/project2",
            },
            {
              name: "Music Player",
              image:
                "https://as1.ftcdn.net/v2/jpg/05/03/75/98/1000_F_603759828_kadMu7Zxbk9jNrZE1JjFfVwkkgxqe6KS.jpg",
              description: "A React.js project to play music with a sleek user interface.",
              link: "https://github.com/Falcon-Abdullah/project3",
            },
          ].map((project, index) => (
            <motion.div
              key={index}
              className="flex flex-col cursor-pointer mb-5 items-center justify-center space-y-4 w-80 h-[400px] border border-gray-300 rounded-lg p-3"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "",
                borderColor: "#6b46c1", // Purple-700 border on hover
              }}
              style={{ borderWidth: "2px" }}
            >
              <Image
                src={project.image}
                alt={project.name}
                width={280}
                height={280}
                className="rounded-lg object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-center">{project.name}</h3>
              <p className="text-center mb-4">{project.description}</p>
              <Button className="hover:bg-blue-700 transition-colors duration-200 ">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
}

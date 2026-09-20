import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About ShopCart</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A production-grade e-commerce platform built to demonstrate scalable web architecture, 
          secure state management, and seamless user experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        {/* Developer Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 transform transition duration-500 hover:scale-[1.02]">
          <div className="flex items-center space-x-4 mb-6 border-b border-gray-100 pb-6">
            <div className="h-20 w-20 bg-blue-900 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-inner">
              DT
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dhruv Tiwari</h2>
              <p className="text-blue-600 font-medium">Full Stack Developer (MERN)</p>
              <p className="text-sm text-gray-500">Delhi NCR, India</p>
            </div>
          </div>
          
          <p className="text-gray-600 leading-relaxed mb-6">
            I am a motivated Full Stack Developer with a strong problem-solving mindset, specializing in 
            building responsive web applications and secure RESTful APIs. I am currently completing my B.Tech 
            in Computer Science and Engineering at NIET (2021-2025).
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            Beyond standard web development, I am actively advancing my skills with an Executive Post Graduate 
            Certificate in <strong>Generative AI & Agentic AI from IIT Kharagpur</strong>, allowing me to integrate 
            cutting-edge AI solutions into modern applications.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4 pt-4 border-t border-gray-100">
            <a 
              href="https://github.com/Dhruv-Tiwari2002" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              GitHub Profile &rarr;
            </a>
            <a 
              href="https://www.linkedin.com/in/dhruv-tiwari-556097231" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              LinkedIn Profile &rarr;
            </a>
          </div>
        </div>

        {/* Project Tech Stack */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Architecture</h3>
            <p className="text-gray-600 leading-relaxed">
              This platform was engineered from the ground up using the <strong>MERN stack</strong>. It features 
              JWT-based secure authentication, protected React routes, and robust CRUD functionality managing user, 
              product, and order data on a cloud-hosted MongoDB Atlas database.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Core Technologies Used:</h3>
            <div className="flex flex-wrap gap-2">
              {['React.js', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB Atlas', 'JWT Auth', 'RESTful APIs'].map((tech, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-100">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <Link to="/products" className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md">
              Explore the Catalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
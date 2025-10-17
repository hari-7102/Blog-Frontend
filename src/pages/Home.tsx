import  { useState, useEffect } from 'react';
import { Pen, Zap, Palette, Shield, Menu, X, ArrowRight, Github, Linkedin } from 'lucide-react';




export default function BlogLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id : string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navbarItems = [
    // { name: 'Home', id: 'home' },
    // { name: 'Features', id: 'features' },
    // { name: 'Demo', id: 'demo' },
    // { name: 'Contact', id: 'contact' },
    {
      name: 'Login', link : '/login'
    },
    {
      name : 'Sign Up' ,link : '/register'
    }
  ]

  const features = [
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Lightning Fast",
      description: "Optimized backend and frontend for blazing fast performance and seamless user experience."
    },
    {
      icon: <Pen className="w-12 h-12" />,
      title: "Rich Editor",
      description: "Create beautiful content with our intuitive editor supporting markdown and rich formatting."
    },
    {
      icon: <Palette className="w-12 h-12" />,
      title: "Beautiful Design",
      description: "Modern, responsive interface that looks stunning on all devices and screen sizes."
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Secure",
      description: "Built with security best practices to keep your content and data safe and protected."
    }
  ];

  const blogPosts = [
    {
      title: "Getting Started with Web Development",
      excerpt: "Learn the fundamentals of building modern web applications with our comprehensive guide covering HTML, CSS, JavaScript, and more..."
    },
    {
      title: "The Future of Technology",
      excerpt: "Exploring emerging technologies and their impact on our daily lives. Discover what's next in AI, blockchain, and cloud computing..."
    },
    {
      title: "Design Principles for Better UX",
      excerpt: "Creating intuitive and engaging user experiences through thoughtful design decisions and user-centric approaches..."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 via-gray-900 to-indigo-800 text-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
               BlogSpace
            </div>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-8 :">
              {navbarItems.map((item) => (
                <a href={item.link} className='hover:scale-105 transform duration-75'>
                  <li>{item.name}</li>
                  </a>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-16 h-screen overflow-y-auto bg-white/10 backdrop-blur-lg rounded-lg p-4">
              {navbarItems.map((item) => (
                <a href={item.link}>
                <button
                  
                  // onClick={() => scrollToSection(item)}
                  className="block w-full text-center py-2 hover:text-yellow-300 transition-colors capitalize"
                >
                  {item.name}
                </button>
                </a>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-yellow-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent animate-gradient">
            Share Your Story
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            A modern blogging platform built with passion and powerful technology
          </p>
          <button
            onClick={() => scrollToSection('demo')}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-yellow-500/50"
          >
            Explore Platform
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="text-yellow-300 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Platform Preview
          </h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            {/* Browser Header */}
            <div className="bg-gray-200 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            
            {/* Browser Content */}
            <div className="bg-gray-50 p-8 text-gray-800">
              {blogPosts.map((post, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md mb-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <h4 className="text-xl font-bold text-purple-700 mb-2">
                    {post.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black/30 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg mb-6">
            Built with ❤️ using modern web technologies
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://github.com/hari-7102" className="hover:text-yellow-300 transition-colors hover:scale-110 transform duration-300">
              <Github className="w-6 h-6" />
            </a>
            {/* <a href="#" className="hover:text-yellow-300 transition-colors hover:scale-110 transform duration-300">
              <Twitter className="w-6 h-6" />
            </a> */}
            <a href="https://www.linkedin.com/in/hariharan-s-7b3298271/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-yellow-300 transition-colors hover:scale-110 transform duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
          <p className="text-white/70 text-sm">
            © 2025 Hariharan. All rights reserved.
          </p>
        </div>
      </footer>

      <style>
        {`
        @keyframes gradient {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease-in-out infinite;
        }
      `}
      </style>
    </div>
  );
}
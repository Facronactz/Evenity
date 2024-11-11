  import React, { useState, useEffect } from "react";
  import { Link, useLocation } from "react-router-dom";
  import { motion } from "framer-motion";
  import { FiMenu, FiX } from "react-icons/fi";
  import LogoImage from "../assets/logo.png";

  const NavbarLandingPage = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const isLoginPage = location.pathname === "/login";
    const isAboutPage = location.pathname === "/about";
    const isContactPage = location.pathname === "/contact";
    const isHomePage = location.pathname === "/";
    const isTestimonialsPage = location.pathname === "/testimonials";

    const navLinks = [
      { to: "/", label: "Home" },
      { to: "/about", label: "About Us" },
      { to: "/testimonials", label: "Testimonials" },
      { to: "/contact", label: "Contact" },
    ];

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false); 
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [isAboutPage]);

    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (isMenuOpen && !event.target.closest("#nav-menu")) {
          setIsMenuOpen(false);
        }
      };

      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [isMenuOpen]);

    const getNavbarStyle = () => {
        if (isLoginPage) return "bg-white/90 text-black";
        
        if (isAboutPage) {
          return isScrolled 
            ? "bg-white backdrop-blur-sm text-black" 
            : "bg-transparent text-white";
        }
        
        if (isContactPage) {
          return isScrolled 
            ? "bg-white backdrop-blur-sm text-black" 
            : "bg-transparent text-black";
        }
        
        if (isHomePage) {
          return isScrolled 
            ? "bg-white backdrop-blur-sm text-black" 
            : "bg-transparent text-black";
        }
        
        if (isTestimonialsPage) {
          return isScrolled 
            ? "bg-white backdrop-blur-sm text-black" 
            : "bg-transparent text-black";
        }
        
        return "bg-white backdrop-blur-sm text-black";
      };

    const navVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
      },
    };

    return (
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`
          fixed top-0 left-0 w-full z-50
          ${getNavbarStyle()}
          transition-all duration-300
        `}
      >
        <div className="container mx-auto px-4">
          <nav
            className={`
              flex items-center 
              ${isLoginPage ? "justify-center py-6" : "justify-between py-4"}
            `}
          >
            {!isLoginPage && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/" className="flex items-center">
                  <img
                    src={LogoImage}
                    alt="Logo"
                    className="h-10 object-contain"
                  />
                </Link>
              </motion.div>
            )}

            {!isLoginPage && (
              <div className="lg:hidden">
                <button
                  onClick={toggleMenu}
                  className="text-2xl focus:outline-none"
                >
                  {isMenuOpen ? (
                    <FiX className="text-[#00AA55]" />
                  ) : (
                    <FiMenu className="text-[#00AA55]" />
                  )}
                </button>
              </div>
            )}

            <motion.div
              id="nav-menu"
              className={`
                ${
                  isLoginPage
                    ? "flex items-center justify-center w-full "
  : "hidden lg:flex items-center space-x-6"
                }
                ${
                  isMenuOpen && !isLoginPage
                    ? "absolute top-full left-0 w-full bg-white shadow-lg"
                    : ""
                }
              `}
            >
              {isLoginPage && (
                <div className="w-full flex justify-start">
                  <Link to="/" className="flex items-center">
                    <img
                      src={LogoImage}
                      alt="Logo"
                      className="h-10 object-contain"
                    />
                  </Link>
                </div>
              )}

              {!isLoginPage && (
                <>
                  {navLinks.map((link) => (
                    <motion.div key={link.to}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={link.to}
                        className={`
                          relative px-3 py-2 
                          text-base font-medium 
                          hover:text-[#00AA55] 
                          transition duration-300 
                          group
                        `}
                      >
                        {link.label}
                        <span
                          className="
                            absolute bottom-0 left-0 w-0 h-0.5 
                            bg-[#00AA55] 
                            group-hover:w-full 
                            transition-all duration-300
                          "
                        />
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/login"
                      className={`
                        ml-4 px-4 py-2 
                        font-medium rounded-full 
                        border
                        ${
                          isAboutPage
                            ? (isScrolled
                                ? "border-[#00AA55] text-[#00AA55] hover:bg-[#00AA55] hover:text-white"
                                : "border-white text-white hover:bg-white hover:text-black")
                            : "border-[#00AA55] text-[#00AA55] hover:bg-[#00AA55] hover:text-white"
                        } 
                        transition duration-300
                      `}
                    >
                      Login
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>
          </nav>
        </div>
      </motion.header>
    );
  };

  export default NavbarLandingPage;
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmail, MdCheckCircle } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import siteLogo from '../../assets/siteLogo.png';


const Footer = () => {
  return (
    <footer
      className="bg-gradient-to-l from-[#555879] to-[#98A1BC] pt-16 pb-10 px-6"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div className="space-y-0">
          <div className="flex items-center space-x-1">
            <img className="hidden lg:block w-20 h-20" src={siteLogo} alt="logo" />
            <span
              className="text-2xl font-bold text-[#080c3b]"
            >
              Aroggo
            </span>
          </div>
          <p className="text-[#080c3b] text-lg">
            Your trusted online pharmacy. Quality medicines delivered to your
            doorstep with care and convenience.
          </p>
          <div className="flex space-x-4 mt-2">
            {/* Social Icons */}
            {[
              {
                icon: <FaFacebookF />,
                href: "https://www.facebook.com/",
              },
              {
                icon: <BsTwitterX />,
                href: "https://www.x.com/",
              },
              {
                icon: <FaInstagram />,
                href: "https://www.instagram.com/",
              },
              {
                icon: <FaLinkedinIn />,
                href: "https://www.linkedin.com/",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                href={social.href}
                className="transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full border"
                style={{
                  color: "#080c3b",
                  borderColor: "#080c3b",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#555879";
                  e.currentTarget.style.borderColor = "#555879";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#080c3b";
                  e.currentTarget.style.borderColor = "#080c3b";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Shop Categories */}
        <div>
          <h6 className="font-extrabold mb-4 text-[24px]" style={{ color: "#080c3b" }}>
            Shop by Category
          </h6>
          <ul className="space-y-2 text-lg" style={{ color: "#080c3b" }}>
            {[
              { label: "Prescription Medicines", href: "/prescription" },
              { label: "Over-the-Counter", href: "/otc" },
              { label: "Health & Wellness", href: "/wellness" },
              { label: "Medicine Search", href: "/search" },
              { label: "Upload Prescription", href: "/upload" },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="transition-colors duration-200 hover:underline"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#DED3C4")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#080c3b")
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="font-bold mb-4 text-[24px]" style={{ color: "#080c3b" }}>
            Quick Links
          </h6>
          <ul className="space-y-2 text-lg" style={{ color: "#080c3b" }}>
            {[
              { label: "About Us", href: "/about" },
              { label: "Track Order", href: "/track-order" },
              { label: "FAQ", href: "/faq" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms & Conditions", href: "/terms" },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="transition-colors duration-200 hover:underline"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#F4EBD3")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#080c3b")
                  }
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h6 className="font-bold mb-4 text-[24px]" style={{ color: "#080c3b" }}>
            Contact Us
          </h6>
          <ul className="space-y-3 text-lg mb-6" style={{ color: "#DED3C4" }}>
            <li className="flex items-start space-x-2">
              <FaPhoneAlt className="mt-1 flex-shrink-0" size={14} />
              <span>
                +880 1234-567890
                <br />
              [ 24/7 Support ]
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <MdEmail className="mt-1 flex-shrink-0" size={14} />
              <span>nushrathhussain961@gmail.com</span>
            </li>
            <li className="flex items-start space-x-2">
              <FaMapMarkerAlt className="mt-1 flex-shrink-0" size={14} />
              <span>Sylhet, Bangladesh</span>
            </li>
          </ul>

          <h6 className="font-bold mb-3" style={{ color: "#F4EBD3" }}>
            Newsletter
          </h6>
          <p className="text-[18px] mb-3" style={{ color: "#F4EBD3" }}>
            Get health tips & exclusive offers
          </p>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded-lg text-sm focus:outline-none"
              style={{ backgroundColor: "#DED3C4", color: "#080c3b" }}
            />
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
              style={{ backgroundColor: "#98A1BC", color: "#080c3b" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#F4EBD3")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#98A1BC")
              }
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="mt-10 pt-6 text-center text-lg"
        style={{ borderTop: "1px solid #080c3b", color: "#080c3b" }}
      >
        <p className="mb-2">
          © {new Date().getFullYear()} Aroggo. All rights reserved.
        </p>
        <p className="text-lg" style={{ color: "#080c3b" }}>
          Licensed Pharmacy | Safe & Secure Payment | Genuine Medicines
        </p>
      </div>
    </footer>
  );
};

export default Footer;

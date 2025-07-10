import React from "react";
import {
  Bed,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import Dot from './../../Pages/Home/Dot';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/students", label: "Students" },
    { href: "/rooms", label: "Rooms" },
    { href: "/bookings", label: "Bookings" },
    { href: "/payments", label: "Payments" },
  ];

  const supportLinks = [
    { href: "/help", label: "Help Center" },
    { href: "/contact", label: "Contact Us" },
    { href: "/faq", label: "FAQ" },
    { href: "/support", label: "Technical Support" },
    { href: "/documentation", label: "Documentation" },
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/refund", label: "Refund Policy" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
    
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Bed className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-white">HostelPro</span>
            </div>
            <p className="text-sm leading-relaxed">
              Complete hostel management solution for educational institutions.
              Streamline student accommodation, room allocation, and payment
              processing with our comprehensive platform.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>info@hostelpro.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">
                Stay Updated
              </h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} HostelPro Management. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-800 hover:bg-primary transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="text-sm text-gray-400">
              Made with ❤️ in Bangladesh
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

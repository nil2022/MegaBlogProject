import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:grid lg:grid-cols-4">
        {/* Logo and Copyright */}
        <div className="flex flex-col justify-between items-center sm:items-start text-center sm:text-left">
          <div className="mb-6">
            <Logo width="80px" />
          </div>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} MegaBlog. All rights reserved.
          </p>
        </div>

        {/* Company */}
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold text-white uppercase mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">Features</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white">Pricing</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold text-white uppercase mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Account</Link></li>
            <li><Link to="/" className="hover:text-white">Help</Link></li>
            <li><Link to="/" className="hover:text-white">Contact Us</Link></li>
            <li><Link to="/" className="hover:text-white">Customer Support</Link></li>
          </ul>
        </div>

        {/* Legals */}
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-semibold text-white uppercase mb-4">Legals</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-white">Terms &amp; Conditions</Link></li>
            <li><Link to="/" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-white">Licensing</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

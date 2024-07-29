import React from 'react';
// import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaTwitter, FaPinterest, FaLinkedinIn, FaSquareXTwitter, FaXTwitter } from 'react-icons/fa6';




const Footer: React.FC = () => {
  return (
    <div className="bg-[#01031A] text-white p-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-7/12 px-4 mb-10 lg:mb-0">
            <h4 className="font-bold mb-4">About us</h4>
            <p>Use AI to analyze ingredients, tailor nutrition to your health needs, and make informed food choices effortlessly.</p>
            <ul className="flex space-x-4 mt-6">
              <li>
                <a className="w-10 h-10 flex items-center justify-center rounded-full text-dark" href="#">
                  <FaXTwitter className="text-dark text-xl" />
                </a>
              </li>
              <li>
                <a className="w-10 h-10 flex items-center justify-center rounded-full text-dark" href="#">
                  <FaFacebookF className="text-dark text-xl" />
                </a>
              </li>
              <li>
                <a className="w-10 h-10 flex items-center justify-center rounded-full text-dark" href="#">
                  <FaTwitter className="text-dark text-xl" />
                </a>
              </li>
              <li>
                <a className="w-10 h-10 flex items-center justify-center rounded-full text-dark" href="#">
                  <FaPinterest className="text-dark text-xl" />
                </a>
              </li>
              <li>
                <a className="w-10 h-10 flex items-center justify-center rounded-full text-dark" href="#">
                  <FaLinkedinIn className="text-dark text-xl" />
                </a>
              </li>
            </ul>

          </div>
          <div className="w-full lg:w-5/12 px-4">
            <div className="flex">
              <div className="w-1/2">
                <h4 className="font-bold mb-4">Useful links</h4>
                <ul className="list-none space-y-4">
                  <li><a href="#" className="hover:underline hover:underline-offset-8">Clients</a></li>
                  <li><a href="#" className="hover:underline hover:underline-offset-8">Contact</a></li>
                  <li><a href="#" className="hover:underline hover:underline-offset-8">Our Team</a></li>
                  <li><a href="#" className="hover:underline hover:underline-offset-8">Services</a></li>
                </ul>
              </div>
              <div className="w-1/2">
                <h4 className="font-bold mb-4">Additional links</h4>
                <ul className="list-none space-y-4">
                  <li><a href="#" className="hover:underline hover:underline-offset-8">FAQ</a></li>
                  <li><a href="#" className="hover:underline hover:underline-offset-8">Prices</a></li>
                  <li><a href="#" className="hover:underline hover:underline-offset-8">Process</a></li>
                  <li><a href="#" className="hover:underline hover:underline-offset-8">Terms of Use</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

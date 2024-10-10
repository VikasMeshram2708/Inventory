import Link from "next/link";

export default function Footer() {
    return (
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            {/* Company Info */}
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
              <h3 className="text-lg font-semibold mb-4">Inventory Management App</h3>
              <p className="text-sm">
                Simplify your inventory management with our intuitive app. Keep track of your stock and streamline operations effortlessly.
              </p>
            </div>
  
            {/* Quick Links */}
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/" className="hover:underline">Features</Link></li>
                <li><Link href="/" className="hover:underline">Pricing</Link></li>
                <li><Link href="/" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
  
            {/* Social Media Links */}
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 lg:mb-0">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="hover:text-gray-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="hover:text-gray-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="hover:text-gray-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  </svg>
                </a>
              </div>
            </div>
  
            {/* Contact Info */}
            <div className="w-full sm:w-1/2 lg:w-1/4">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-sm">123 Inventory St, Business City, BC 12345</p>
              <p className="text-sm">Email: info@inventoryapp.com</p>
              <p className="text-sm">Phone: (123) 456-7890</p>
            </div>
          </div>
  
          {/* Footer Bottom */}
          <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
            <p>© {new Date().getFullYear()} Inventory Management App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  
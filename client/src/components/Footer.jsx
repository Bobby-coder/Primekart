import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-muted-foreground py-8 md:px-8 lg:px-10 border-t border-muted mx-auto">
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Company</h3>
          <ul className="space-y-1">
            <li>
              <Link className="hover:underline">About Us</Link>
            </li>
            <li>
              <Link className="hover:underline">Careers</Link>
            </li>
            <li>
              <Link className="hover:underline">Blog</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Products</h3>
          <ul className="space-y-1">
            <li>
              <Link className="hover:underline">Fitness</Link>
            </li>
            <li>
              <Link className="hover:underline">Dairy</Link>
            </li>
            <li>
              <Link className="hover:underline">Pantry</Link>
            </li>
            <li>
              <Link className="hover:underline">Meat & Seafood</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Support</h3>
          <ul className="space-y-1">
            <li>
              <Link className="hover:underline">Help Center</Link>
            </li>
            <li>
              <Link className="hover:underline">FAQs</Link>
            </li>
            <li>
              <Link className="hover:underline">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Legal</h3>
          <ul className="space-y-1">
            <li>
              <Link className="hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link className="hover:underline">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        &copy; 2024 Primekart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

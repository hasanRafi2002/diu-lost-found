import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Search, MapPin, Users, Zap, Clock, Shield } from "lucide-react";
import { listItems } from "../services/itemService";

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentItems();
  }, []);

  async function loadRecentItems() {
    try {
      const { items } = await listItems({ page: 1, page_size: 6 });
      setRecentItems(items);
    } catch (err) {
      console.error("Error loading items:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/lost?search=${encodeURIComponent(searchTerm)}`);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">DIU Lost & Found</h1>
          <p className="text-xl text-blue-100 mb-8">
            Help your DIU community find lost items and reunite belongings with their owners
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for lost or found items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/report"
            className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">📍</div>
            <h3 className="text-xl font-bold text-red-700 mb-2">Report Lost Item</h3>
            <p className="text-red-600">Tell the community about something you lost</p>
          </Link>

          <Link
            to="/report"
            className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 text-center hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Report Found Item</h3>
            <p className="text-blue-600">Help return something you found</p>
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8 text-blue-600" />,
                title: "Report Quickly",
                desc: "Post details about lost/found items in seconds"
              },
              {
                icon: <Users className="w-8 h-8 text-green-600" />,
                title: "Get Help",
                desc: "Community members verify and claim items"
              },
              {
                icon: <Shield className="w-8 h-8 text-purple-600" />,
                title: "Verify & Reunite",
                desc: "Approve claims and reunite with owners"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Items */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Recent Reports</h2>
          <Link to="/lost" className="text-blue-600 hover:text-blue-700 font-semibold">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : recentItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentItems.map((item) => (
              <Link
                key={item.id}
                to={`/items/${item.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${
                      item.item_type === "LOST"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {item.item_type}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-1">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            No items reported yet. Be the first!
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">DIU Lost & Found</h4>
              <p className="text-gray-400 text-sm">Helping our community reunite with lost items</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/lost" className="hover:text-white">Lost Items</Link></li>
                <li><Link to="/found" className="hover:text-white">Found Items</Link></li>
                <li><Link to="/report" className="hover:text-white">Report Item</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><a href="mailto:support@diu.com" className="hover:text-white">Email Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4 text-gray-400">
                <a href="#" className="hover:text-white">Facebook</a>
                <a href="#" className="hover:text-white">Twitter</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 DIU Lost & Found. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

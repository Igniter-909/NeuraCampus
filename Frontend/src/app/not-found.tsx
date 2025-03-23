import Link from "next/link";

export default function NotFound() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center space-y-6 p-8 bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-gray-800">Oops! Page Not Found</h2>
            <p className="text-gray-600">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>
  
          <div className="border-t border-gray-200 pt-6">
            <Link 
              href="/" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }
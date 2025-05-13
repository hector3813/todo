export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Tailwind Test Page
        </h1>
        <div className="space-y-4">
          <p className="text-gray-700">
            This is a test paragraph with <span className="text-red-500 font-bold">colored text</span>.
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Test Button
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full"></div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg"></div>
            <div className="w-12 h-12 bg-purple-500 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 
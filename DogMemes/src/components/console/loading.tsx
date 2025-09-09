export function NavigationLoading() {
  return (
    <>
      {/* Navbar loading skeleton */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="h-full flex items-center px-6">
          <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Sidebar loading skeleton */}
      <div className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

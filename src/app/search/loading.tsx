export default function Loading() {
  return (
    <main className="min-h-screen bg-[#fdfdfc] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 animate-pulse">
          <div className="h-10 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-48 bg-gray-100 rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse border border-gray-100 bg-white p-6 rounded-lg">
              <div className="aspect-[4/5] bg-gray-100 rounded-md mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-100 rounded mb-2"></div>
              <div className="h-4 w-1/2 bg-gray-50 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

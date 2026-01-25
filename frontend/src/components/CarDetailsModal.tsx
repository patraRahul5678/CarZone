export default function CarDetailsModal({ car, onClose }: { car: any; onClose: () => void }) {
  if (!car) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-black border-b border-gray-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">{car.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">×</button>
        </div>

        <div className="p-6 space-y-6">
          {car.images?.[0] && (
            <img src={car.images[0].url} alt={car.name} className="w-full h-64 object-cover rounded-lg" />
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Brand</p>
              <p className="text-white font-semibold">{car.brand}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Model</p>
              <p className="text-white font-semibold">{car.model}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Year</p>
              <p className="text-white font-semibold">{car.year}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Category</p>
              <p className="text-white font-semibold">{car.category}</p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Pricing</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Per Hour</p>
                <p className="text-white font-semibold">₹{car.pricePerHour}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Per Day</p>
                <p className="text-white font-semibold">₹{car.pricePerDay}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">12 Hours</p>
                <p className="text-white font-semibold">₹{car.price12Hour}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">24 Hours</p>
                <p className="text-white font-semibold">₹{car.price24Hour}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Seats</p>
                <p className="text-white font-semibold">{car.specifications?.seats}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Transmission</p>
                <p className="text-white font-semibold">{car.specifications?.transmission}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Fuel Type</p>
                <p className="text-white font-semibold">{car.specifications?.fuelType}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Mileage</p>
                <p className="text-white font-semibold">{car.specifications?.mileage} km/l</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Location</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">City: <span className="text-white">{car.location?.city}</span></p>
              <p className="text-gray-400 text-sm">Address: <span className="text-white">{car.location?.address}</span></p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Owner Details</h3>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Name: <span className="text-white">{car.owner?.name}</span></p>
              <p className="text-gray-400 text-sm">Email: <span className="text-white">{car.owner?.email}</span></p>
              <p className="text-gray-400 text-sm">Phone: <span className="text-white">{car.owner?.phone}</span></p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
            <div className="flex flex-wrap gap-2">
              {car.features?.map((feature: string, idx: number) => (
                <span key={idx} className="bg-gray-800 text-gray-300 px-3 py-1 rounded text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Status</h3>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded text-sm font-semibold ${
                car.status === 'approved' ? 'bg-green-800 text-green-200' :
                car.status === 'pending' ? 'bg-yellow-800 text-yellow-200' :
                'bg-red-800 text-red-200'
              }`}>
                {car.status?.charAt(0).toUpperCase() + car.status?.slice(1)}
              </span>
              <span className={`px-3 py-1 rounded text-sm font-semibold ${
                car.availability ? 'bg-blue-800 text-blue-200' : 'bg-gray-800 text-gray-200'
              }`}>
                {car.availability ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-white text-black px-4 py-2 rounded font-medium hover:opacity-80 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

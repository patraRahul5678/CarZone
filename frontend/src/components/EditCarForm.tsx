import { useState } from 'react'

export default function EditCarForm({ car, onSave, onCancel }: { car: any; onSave: (id: string, data: any) => void; onCancel: () => void }) {
  const [data, setData] = useState(car)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleSpecChange = (field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      specifications: { ...prev.specifications, [field]: value }
    }))
  }

  const handleLocChange = (field: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      location: { ...prev.location, [field]: value }
    }))
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(car._id, data) }} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Name" className="input" />
        <input type="text" name="brand" value={data.brand} onChange={handleChange} placeholder="Brand" className="input" />
        <input type="text" name="model" value={data.model} onChange={handleChange} placeholder="Model" className="input" />
        <input type="number" name="year" value={data.year} onChange={handleChange} placeholder="Year" className="input" />
        <select name="category" value={data.category} onChange={handleChange} className="input">
          <option value="Economy">Economy</option>
          <option value="Compact">Compact</option>
          <option value="Premium">Premium</option>
          <option value="Luxury">Luxury</option>
          <option value="SUV">SUV</option>
          <option value="Electric">Electric</option>
        </select>
        <input type="number" name="pricePerHour" value={data.pricePerHour} onChange={handleChange} placeholder="Price/Hour" className="input" />
        <input type="number" name="price12Hour" value={data.price12Hour} onChange={handleChange} placeholder="Price/12Hr" className="input" />
        <input type="number" name="price24Hour" value={data.price24Hour} onChange={handleChange} placeholder="Price/24Hr" className="input" />
        <input type="number" name="pricePerDay" value={data.pricePerDay} onChange={handleChange} placeholder="Price/Day" className="input" />
        <input type="number" value={data.specifications?.seats} onChange={(e) => handleSpecChange('seats', Number(e.target.value))} placeholder="Seats" className="input" />
        <select value={data.specifications?.transmission} onChange={(e) => handleSpecChange('transmission', e.target.value)} className="input">
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
        <select value={data.specifications?.fuelType} onChange={(e) => handleSpecChange('fuelType', e.target.value)} className="input">
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <input type="text" value={data.location?.city} onChange={(e) => handleLocChange('city', e.target.value)} placeholder="City" className="input" />
        <input type="text" value={data.location?.address} onChange={(e) => handleLocChange('address', e.target.value)} placeholder="Address" className="input" />
      </div>
      <div className="flex gap-4 pt-4">
        <button type="button" onClick={onCancel} className="flex-1 btn-secondary">Cancel</button>
        <button type="submit" className="flex-1 btn-primary">Save Changes</button>
      </div>
    </form>
  )
}

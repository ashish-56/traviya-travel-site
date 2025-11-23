// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const [tripType, setTripType] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (destination.trim()) params.set("location", destination.trim());
    if (month) params.set("month", month);
    if (tripType) params.set("type", tripType);

    const query = params.toString();
    navigate(query ? `/search?${query}` : "/search");
  };

  const featuredTrips = [
    {
      title: "Paris Solo Trip",
      description:
        "Discover the beauty of Paris on your own. Explore landmarks, cafés, and museums at your own pace.",
      img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Goa Weekend Chill",
      description:
        "Relax on sunny beaches, enjoy nightlife and water sports, and escape the city for a refreshing break.",
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Bali Adventure",
      description:
        "Experience thrilling adventures in Bali — jungle trekking, surfing, waterfalls, and scenic temples.",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    },
    {
      title: "Varanasi Religious Retreat",
      description:
        "Immerse yourself in spirituality along the Ganges. Witness Ganga Aarti and visit ancient temples.",
      img: "https://media.istockphoto.com/id/1164329797/photo/hindu-sadhu-sitting-on-a-boat-overlooking-varanasi-city-architecture-at-sunset.jpg?s=612x612&w=0&k=20&c=LbpIHRo7kGT7dbUr6b6UuD1d6P0yCaKZ2lbqo3TY988=",
    },
  ];

  return (
    <section className="mt-8">
      {/* force dark text inside this white card so it looks good in dark mode */}
      <div className="rounded-2xl bg-white p-8 shadow-lg text-slate-900">
        <h1 className="text-3xl font-bold mb-4">Find your perfect trip</h1>
        <p className="text-slate-600 mb-6">
          Search by destination, month, and trip type.
        </p>

        {/* Search form */}
        <form
          className="flex items-center gap-4 flex-wrap"
          onSubmit={handleSearch}
        >
          <input
            className="flex-1 min-w-[160px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-300 transition"
            placeholder="Where to?" required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          {/* Month select */}
          <select
            className="p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-300 transition " required
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Month</option>
            <option value="jan">January</option>
            <option value="feb">February</option>
            <option value="mar">March</option>
            <option value="apr">April</option>
            <option value="may">May</option>
            <option value="jun">June</option>
            <option value="jul">July</option>
            <option value="aug">August</option>
            <option value="sep">September</option>
            <option value="oct">October</option>
            <option value="nov">November</option>
            <option value="dec">December</option>
          </select>

          {/* Type select */}
          <select
            className="p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-300 transition required:" required
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
          >
            <option value="">Type</option>
            <option value="adventure">Adventure</option>
            <option value="religious">Religious</option>
            <option value="family">Family</option>
            <option value="honeymoon">Honeymoon</option>
            <option value="solo">Solo</option>
            <option value="weekend">Weekend getaway</option>
          </select>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-lg font-semibold shadow-md transition-transform transform hover:-translate-y-0.5"
          >
            Search
          </button>
        </form>

        {/* Featured cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {featuredTrips.map((trip, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-slate-100 bg-white transform hover:-translate-y-2 transition shadow"
            >
              <img
                src={trip.img}
                alt={trip.title}
                className="h-40 w-full object-cover rounded-lg"
              />

              {/* force dark text on title so it's readable in dark mode */}
              <h3 className="mt-4 font-semibold text-slate-900">
                {trip.title}
              </h3>
              <p className="text-sm text-slate-600">{trip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

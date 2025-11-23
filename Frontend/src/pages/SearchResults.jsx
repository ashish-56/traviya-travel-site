 // src/pages/SearchResults.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { trips } from "../data/trips";

const monthLabels = {
  jan: "January",
  feb: "February",
  mar: "March",
  apr: "April",
  may: "May",
  jun: "June",
  jul: "July",
  aug: "August",
  sep: "September",
  oct: "October",
  nov: "November",
  dec: "December",
};

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const locationQuery = params.get("location") || "";
  const month = params.get("month") || "";
  const type = params.get("type") || "";

  const filteredTrips = trips.filter((trip) => {
    const matchesLocation = locationQuery
      ? trip.location.toLowerCase().includes(locationQuery.toLowerCase())
      : true;
    const matchesMonth = month ? trip.month === month : true;
    const matchesType = type ? trip.type === type : true;
    return matchesLocation && matchesMonth && matchesType;
  });

  const prettyLocation = locationQuery || "Anywhere";
  const prettyMonth = month ? monthLabels[month] : "Any month";
  const prettyType = type || "Any type";

  const suggestions =
    filteredTrips.length === 0 ? trips.slice(0, 3) : [];

  return (
    <section className="mt-8">
      {/* main white card with dark text so it works in dark mode */}
      <div className="rounded-2xl bg-white p-8 shadow-lg text-slate-900">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold">Search results</h1>
            <p className="text-sm text-slate-500 mt-1">
              For{" "}
              <span className="font-semibold">{prettyLocation}</span> •{" "}
              <span className="font-semibold">{prettyMonth}</span> •{" "}
              <span className="font-semibold">{prettyType}</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50"
          >
            Change search
          </button>
        </div>

        {filteredTrips.length > 0 ? (
          <div>
            <p className="text-sm text-slate-500 mb-4">
              {filteredTrips.length} trip
              {filteredTrips.length > 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="p-6 rounded-xl border border-slate-100 bg-white text-slate-900 shadow-sm hover:-translate-y-1 hover:shadow-md transition cursor-pointer"
                >
                  <img
                    src={trip.img}
                    alt={trip.title}
                    className="h-40 w-full rounded-lg object-cover mb-3"
                  />
                  <h3 className="font-semibold mb-1 text-slate-900">
                    {trip.title}
                  </h3>
                  <p className="text-xs text-slate-500 capitalize mb-1">
                    {trip.location} • {monthLabels[trip.month]} • {trip.type}
                  </p>
                  <p className="text-sm text-slate-600 mb-2">
                    {trip.description}
                  </p>
                  <p className="font-bold mb-3 text-slate-900">
                    ₹{trip.price.toLocaleString()}
                  </p>
                  <button className="px-3 py-2 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm text-slate-500 mb-4">
              No trips found for that search. You might like:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestions.map((trip) => (
                <div
                  key={trip.id}
                  className="p-6 rounded-xl border border-slate-100 bg-white text-slate-900 shadow-sm hover:-translate-y-1 hover:shadow-md transition cursor-pointer"
                >
                  <img
                    src={trip.img}
                    alt={trip.title}
                    className="h-40 w-full rounded-lg object-cover mb-3"
                  />
                  <h3 className="font-semibold mb-1 text-slate-900">
                    {trip.title}
                  </h3>
                  <p className="text-xs text-slate-500 capitalize mb-1">
                    {trip.location} • {monthLabels[trip.month]} • {trip.type}
                  </p>
                  <p className="text-sm text-slate-600 mb-2">
                    {trip.description}
                  </p>
                  <p className="font-bold mb-3 text-slate-900">
                    ₹{trip.price.toLocaleString()}
                  </p>
                  <button className="px-3 py-2 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


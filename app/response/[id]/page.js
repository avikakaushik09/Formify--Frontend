"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function ResponsesPage() {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchResponses();
    }
  }, [id]);

  const fetchResponses = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/responses/${id}`);
      setResponses(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-violet-100 flex items-center justify-center">
        <p className="text-purple-600 font-semibold text-xl animate-pulse">
          Loading Responses...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-violet-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900">
            Form Responses 📊
          </h1>
          <p className="text-gray-500 mt-3">
            View all submitted responses for this form.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <p className="text-gray-500">Total Responses</p>
            <h2 className="text-4xl font-bold text-purple-600 mt-2">
              {responses.length}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <p className="text-gray-500">Status</p>
            <h2 className="text-4xl font-bold text-green-600 mt-2">Active</h2>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <p className="text-gray-500">Collection</p>
            <h2 className="text-4xl font-bold text-pink-600 mt-2">Live</h2>
          </div>
        </div>

        {responses.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-700">
              No Responses Yet
            </h2>
            <p className="text-gray-500 mt-3">
              Share your form to start collecting responses.
            </p>
          </div>
        ) : (
          responses.map((response, index) => (
            <div
              key={`response-${index}`}
              className="bg-white rounded-3xl shadow-xl p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-purple-700">
                  Response #{index + 1}
                </h2>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                  Submitted
                </span>
              </div>

              <div className="space-y-3">
                {Object.entries(response.responses || {}).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                  >
                    <p className="text-sm text-gray-500 mb-1">{key}</p>
                    <p className="font-semibold text-gray-800">
                      {String(value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
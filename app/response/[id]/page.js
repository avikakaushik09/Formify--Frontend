"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResponsesPage({ params }) {
  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }

    axios.get(`https://formify-backend-zkl2.onrender.com/api/forms/${params.id}`)
      .then(res => setForm(res.data));

    axios.get(`https://formify-backend-zkl2.onrender.com/api/responses/${params.id}`)
      .then(res => setResponses(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.push("/dashboard")}
          className="text-purple-400 mb-6 hover:text-purple-300">← Back to Dashboard</button>
        <h1 className="text-3xl font-bold mb-2">{form?.title} — Responses</h1>
        <p className="text-gray-400 mb-8">Total: {responses.length} responses</p>

        {responses.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <p className="text-gray-400">No responses yet.</p>
          </div>
        ) : (
          responses.map((r, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-4">
              <p className="text-gray-400 text-sm mb-3">Response #{i + 1}</p>
              {Object.entries(r.answers).map(([key, val]) => (
                <p key={key} className="mb-1">
                  <span className="text-purple-300 font-medium">{key}:</span> {val}
                </p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
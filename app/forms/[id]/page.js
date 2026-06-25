"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function PublicForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (id) {
      fetchForm();
    }
  }, [id]);

  const fetchForm = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/forms/${id}`);
      setForm(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (label, value) => {
    setResponses({
      ...responses,
      [label]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/responses/submit", {
        formId: id,
        responses,
      });
      setSubmitted(true);
      alert("Response Submitted Successfully");
    } catch (error) {
      console.log(error);
      alert("Submission Failed");
    }
  };

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-violet-100 flex items-center justify-center">
        <p className="text-purple-600 font-semibold text-xl animate-pulse">
          Loading Form...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-violet-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-purple-600 mb-2">Formify</h1>
          <p className="text-gray-500">Smart Form Collection Platform</p>
        </div>

        <div className="border-b pb-6 mb-6">
          <h2 className="text-3xl font-bold mb-2">{form.title}</h2>
          <p className="text-gray-600">{form.description}</p>
        </div>

        {submitted ? (
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold text-green-600 mb-3">
              Thank You 🎉
            </h2>
            <p className="text-gray-600">
              Your response has been submitted successfully.
            </p>
          </div>
        ) : (
          <>
            {form.fields?.map((field, index) => (
              <div key={index} className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                <input
                  type={field.type}
                  className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder={`Enter ${field.label}`}
                  value={responses[field.label] || ""}
                  required={field.required}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Submit Response
            </button>
          </>
        )}
      </div>
    </div>
  );
}
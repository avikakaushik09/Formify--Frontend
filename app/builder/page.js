"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Builder() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fields, setFields] = useState([]);
  const router = useRouter();

  const addField = () => {
    setFields([
      ...fields,
      {
        label: "",
        type: "text",
        required: false,
      },
    ]);
  };

  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const saveForm = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/forms/create",
        {
          title,
          description,
          fields,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Form Saved Successfully 🎉");
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Error Saving Form");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-violet-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h1 className="text-5xl font-extrabold text-center text-purple-700">
            Formify Builder ✨
          </h1>
          <p className="text-center text-gray-500 mt-3">
            Create beautiful dynamic forms in minutes
          </p>
        </div>

        {/* Builder */}
        <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 p-10">
          <h2 className="text-3xl font-bold text-purple-700 mb-8">
            Create New Form
          </h2>

          <input
            className="w-full border-2 border-purple-100 p-4 rounded-2xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Form Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows={3}
            className="w-full border-2 border-purple-100 p-4 rounded-2xl mb-8 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Form Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {fields.length === 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-3xl p-10 text-center mb-6">
              <h3 className="text-2xl font-semibold text-purple-700">
                No Fields Added Yet
              </h3>
              <p className="text-gray-500 mt-2">
                Click "Add New Field" to start building your form.
              </p>
            </div>
          )}

          {fields.map((field, index) => (
            <div
              key={`field-${index}`}
              className="bg-purple-50 border border-purple-200 rounded-3xl p-6 mb-5 shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-purple-700 text-lg">
                  Field #{index + 1}
                </h3>
                <button
                  onClick={() => removeField(index)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>

              <input
                className="w-full border p-4 rounded-2xl mb-4"
                placeholder="Field Label"
                value={field.label}
                onChange={(e) => updateField(index, "label", e.target.value)}
              />

              <select
                className="w-full border p-4 rounded-2xl mb-4"
                value={field.type}
                onChange={(e) => updateField(index, "type", e.target.value)}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="dropdown">Dropdown</option>
              </select>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(index, "required", e.target.checked)}
                />
                <label className="text-gray-700 font-medium">Required Field</label>
              </div>
            </div>
          ))}

          <button
            onClick={addField}
            className="w-full border-2 border-dashed border-purple-400 text-purple-700 font-semibold p-4 rounded-2xl hover:bg-purple-50 transition mb-6"
          >
            + Add New Field
          </button>

          {/* Live Preview */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-200 rounded-3xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Live Preview 👀</h2>
            <h3 className="text-2xl font-bold text-gray-800">{title || "Your Form Title"}</h3>
            <p className="text-gray-500 mb-6 mt-2">{description || "Your Form Description"}</p>

            {fields.map((field, index) => (
              <div key={`preview-${index}`} className="mb-4">
                <label className="block mb-2 font-medium text-gray-700">
                  {field.label || `Field ${index + 1}`}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <input
                  disabled
                  placeholder={`Enter ${field.label || "value"}`}
                  className="w-full border p-4 rounded-2xl bg-white"
                />
              </div>
            ))}
          </div>

          <button
            onClick={saveForm}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4 rounded-2xl font-semibold hover:scale-[1.02] hover:shadow-xl transition-all"
          >
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
}
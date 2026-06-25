"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [forms, setForms] = useState([]);
  const [user, setUser] = useState(null);
  const [totalResponses, setTotalResponses] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchForms(token);
  }, []);

  const fetchForms = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/forms/my-forms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForms(res.data);
      let count = 0;
      for (const form of res.data) {
        try {
          const r = await axios.get(`http://localhost:5000/api/responses/${form._id}`);
          count += r.data.length;
        } catch (e) {}
      }
      setTotalResponses(count);
    } catch (error) { console.log(error); }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const copyLink = (id) => {
    navigator.clipboard.writeText(`http://localhost:3000/forms/${id}`);
    alert("Form Link Copied!");
  };

  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "forms", icon: "📝", label: "My Forms" },
    { id: "create", icon: "➕", label: "Create Form" },
    { id: "responses", icon: "📈", label: "Responses" },
    { id: "profile", icon: "👤", label: "User Profile" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  const handleNav = (id) => {
    if (id === "create") { router.push("/builder"); return; }
    setActiveTab(id);
  };

  const MainContent = () => (
    <div className="w-full max-w-7xl px-6 md:px-8 lg:px-10 py-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-14">
        <div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-pink-400 via-purple-300 to-violet-400 bg-clip-text text-transparent mb-4">
            FORMIFY
          </h1>
          <h2 className="text-2xl md:text-3xl font mb-3">
            Welcome Back, {user?.name || "User"} 👋
          </h2>
          <p className="text-gray-400 text-lg">
            Build forms. Collect responses. Analyze data.
          </p>
        </div>
        <div className="flex gap-4 flex-wrap">
          <button onClick={() => router.push("/builder")} className="neon-btn px-6 py-3 rounded-2xl font-semibold">
            + Create Form
          </button>
          <button onClick={logout} className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        <div className="neon-card">
          <p className="text-gray-400 mb-3">Total Forms</p>
          <h2 className="text-5xl font-bold text-purple-300">{forms.length}</h2>
        </div>
        <div className="neon-card">
          <p className="text-gray-400 mb-3">Published Forms</p>
          <h2 className="text-5xl font-bold text-green-400">{forms.length}</h2>
        </div>
        <div className="neon-card">
          <p className="text-gray-400 mb-3">Total Responses</p>
          <h2 className="text-5xl font-bold text-pink-400">{totalResponses}</h2>
        </div>
      </div>

      {/* FORMS SECTION */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold neon-text">My Forms</h2>
      </div>

      {forms.length === 0 ? (
        <div className="neon-card text-center py-16">
          <h2 className="text-3xl font-bold mb-3">No Forms Found</h2>
          <p className="text-gray-400">Create your first form to get started.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {forms.map((form) => (
            <div key={form._id} className="neon-card">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-purple-300 mb-3">{form.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{form.description}</p>
                  <div className="space-y-2">
                    <p className="text-gray-300">Fields: {form.fields?.length || 0}</p>
                    <p className="text-gray-500 text-sm break-all">Form ID: {form._id}</p>
                  </div>
                </div>
                <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full">Active</span>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <button onClick={() => window.open(`http://localhost:3000/forms/${form._id}`, "_blank")}
                  className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl transition">View Form</button>
                <button onClick={() => copyLink(form._id)}
                  className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl transition">Copy Link</button>
                <button onClick={() => router.push(`/responses/${form._id}`)}
                  className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl transition">View Responses</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* SIDEBAR */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-slate-900/80 backdrop-blur border-r border-purple-900/40 flex flex-col min-h-screen fixed left-0 top-0 z-50`}
        style={{ boxShadow: "2px 0 24px 0 rgba(168,85,247,0.10)" }}>

        {/* Toggle */}
        <div className="p-4 border-b border-purple-900/30 flex items-center justify-between">
          {sidebarOpen && (
            <span className="text-lg font-black bg-gradient-to-r from-pink-400 via-purple-300 to-violet-400 bg-clip-text text-transparent">
              FORMIFY
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-purple-300 transition p-1 rounded-lg hover:bg-purple-900/30">
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-purple-600/80 text-white shadow-lg shadow-purple-900/40"
                  : "text-gray-400 hover:bg-purple-900/20 hover:text-white"
              }`}>
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-purple-900/30">
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all">
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-16"} transition-all duration-300 flex-1 flex justify-center`}>
        <MainContent />
      </div>

    </div>
  );
}
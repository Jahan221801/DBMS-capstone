// src/pages/AdminDashboard.tsx

import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage all gym operations from one place</p>
        </div>
        <div className="text-right">
          <span className="text-md font-semibold text-gray-700">Sankar Narayanan</span>
          <p className="text-sm text-gray-400">Admin</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-100 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-green-800 mb-2">Members</h2>
          <p className="text-sm text-green-700 mb-4">Add, edit, or remove gym members</p>
          <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">Manage</button>
        </div>

        <div className="bg-blue-100 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-blue-800 mb-2">Workouts</h2>
          <p className="text-sm text-blue-700 mb-4">Control all workout programs</p>
          <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">View Plans</button>
        </div>

        <div className="bg-yellow-100 rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-yellow-800 mb-2">Payments</h2>
          <p className="text-sm text-yellow-700 mb-4">Track member payments and receipts</p>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">Transactions</button>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Members" value="128" color="text-green-700" />
          <StatCard label="Active Plans" value="6" color="text-blue-700" />
          <StatCard label="Pending Payments" value="5" color="text-red-600" />
          <StatCard label="Trainers" value="3" color="text-purple-700" />
        </div>
      </section>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, color = 'text-gray-800' }) => (
  <div className="bg-white border rounded-xl p-4 shadow-sm">
    <p className="text-sm text-gray-500">{label}</p>
    <h4 className={`text-2xl font-bold ${color}`}>{value}</h4>
  </div>
);

export default AdminDashboard;

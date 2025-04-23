import React from 'react'

const Dashboard = () => {
  return (
    <div>
              {activeView === 'dashboard' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <StatCard 
                      title="Total Educators" 
                      value={totalEducators} 
                      icon={<Users className="h-8 w-8 text-indigo-500" />}
                      darkMode={darkMode}
                    />
                    <StatCard 
                      title="Pending Requests" 
                      value={pendingEducators.length} 
                      icon={<Users className="h-8 w-8 text-yellow-500" />}
                      darkMode={darkMode}
                    />
                    <StatCard 
                      title="Total Learners" 
                      value={totalLearners} 
                      icon={<Users className="h-8 w-8 text-green-500" />}
                      darkMode={darkMode}
                    />
                    <StatCard 
                      title="Monthly Revenue" 
                      value={`$${monthlyRevenue}`} 
                      icon={<DollarSign className="h-8 w-8 text-blue-500" />}
                      darkMode={darkMode}
                    />
                    
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                      <h3 className="text-lg font-semibold mb-4 dark:text-white">Revenue Overview</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={dummyRevenueData}>
                            <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                            <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                                color: darkMode ? '#ffffff' : '#000000',
                                border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
                              }} 
                            />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Revenue ($)" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
    </div>
  )
}

export default Dashboard
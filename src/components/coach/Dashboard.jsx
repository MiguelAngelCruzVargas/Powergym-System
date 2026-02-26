import { motion } from 'framer-motion';

const CoachDashboard = () => {
  const StatCard = ({ title, value, icon, color, trend }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        {trend && (
          <span className={`text-sm font-semibold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-white text-2xl font-bold">{value}</p>
    </motion.div>
  );

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Título */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Bienvenido al panel de entrenador</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Mis Clientes"
            value="24"
            trend={8}
            color="bg-blue-500"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Sesiones Hoy"
            value="8"
            trend={12}
            color="bg-green-500"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            title="Rutinas Activas"
            value="32"
            trend={5}
            color="bg-purple-500"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          />
          <StatCard
            title="Tasa de Asistencia"
            value="92%"
            trend={3}
            color="bg-orange-500"
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
          />
        </div>

        {/* Secciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sesiones de Hoy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Sesiones de Hoy</h3>
            <div className="space-y-3">
              {[
                { cliente: 'Juan Pérez', hora: '08:00 AM', tipo: 'Fuerza', avatar: 'J' },
                { cliente: 'María García', hora: '09:30 AM', tipo: 'Cardio', avatar: 'M' },
                { cliente: 'Carlos López', hora: '11:00 AM', tipo: 'Funcional', avatar: 'C' },
                { cliente: 'Ana Martínez', hora: '02:00 PM', tipo: 'HIIT', avatar: 'A' }
              ].map((sesion, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {sesion.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{sesion.cliente}</p>
                      <p className="text-gray-400 text-sm">{sesion.tipo}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">{sesion.hora}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Progreso Destacado */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Progreso Destacado</h3>
            <div className="space-y-4">
              {[
                { cliente: 'Pedro Sánchez', logro: 'Completó 30 días consecutivos', progreso: 100, color: 'from-green-500 to-emerald-500' },
                { cliente: 'Laura Torres', logro: 'Aumentó peso en press banca +10kg', progreso: 85, color: 'from-blue-500 to-cyan-500' },
                { cliente: 'Miguel Ruiz', logro: 'Mejoró tiempo en 5K -2 min', progreso: 70, color: 'from-purple-500 to-pink-500' }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-medium">{item.cliente}</p>
                    <span className="text-cyan-400 text-sm font-semibold">{item.progreso}%</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{item.logro}</p>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${item.progreso}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
import React from 'react';
import { motion } from 'framer-motion';

const ClienteDashboard = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Bienvenida */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">¡Hola, Juan! 👋</h1>
          <p className="text-gray-400">Aquí está tu resumen de entrenamiento</p>
        </div>

        {/* Estadísticas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Peso Actual</p>
              <div className="p-2 bg-blue-500 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
            </div>
            <p className="text-white text-3xl font-bold">79.5 kg</p>
            <p className="text-green-400 text-sm mt-2">+4.5 kg desde inicio</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Sesiones Este Mes</p>
              <div className="p-2 bg-green-500 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-white text-3xl font-bold">12</p>
            <p className="text-cyan-400 text-sm mt-2">3 esta semana</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Masa Muscular</p>
              <div className="p-2 bg-purple-500 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className="text-white text-3xl font-bold">38.8 kg</p>
            <p className="text-green-400 text-sm mt-2">+3.8 kg</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-sm">Grasa Corporal</p>
              <div className="p-2 bg-orange-500 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
            </div>
            <p className="text-white text-3xl font-bold">15.8%</p>
            <p className="text-green-400 text-sm mt-2">-2.2% reducción</p>
          </motion.div>
        </div>

        {/* Medidas Corporales y Rutina Actual */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Medidas Corporales */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Medidas Corporales</h3>
            <div className="space-y-4">
              {/* Pecho */}
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-3">Pecho</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">95 cm</span>
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-cyan-400 font-bold text-lg">102 cm</span>
                </div>
              </div>

              {/* Brazos */}
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-3">Brazos</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">35 cm</span>
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-cyan-400 font-bold text-lg">38 cm</span>
                </div>
              </div>

              {/* Cintura */}
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-3">Cintura</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">85 cm</span>
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-cyan-400 font-bold text-lg">82 cm</span>
                </div>
              </div>

              {/* Piernas */}
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-gray-400 text-sm mb-3">Piernas</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">58 cm</span>
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-cyan-400 font-bold text-lg">62 cm</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rutina Actual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Mi Rutina Actual</h3>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white text-2xl font-bold">Fuerza Upper Body</p>
                  <p className="text-purple-400 text-sm">Asignada por: Coach Carlos</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300 text-sm">Press Banca</span>
                  <span className="text-white font-medium">4x8-10</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300 text-sm">Remo con Barra</span>
                  <span className="text-white font-medium">4x8-10</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300 text-sm">Press Militar</span>
                  <span className="text-white font-medium">3x10-12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300 text-sm">Curl de Bíceps</span>
                  <span className="text-white font-medium">3x12-15</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300 text-sm">Extensión de Tríceps</span>
                  <span className="text-white font-medium">3x12-15</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Ver Rutina Completa
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ClienteDashboard;
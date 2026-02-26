import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Pagos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [showModal, setShowModal] = useState(false);
  const [selectedPago, setSelectedPago] = useState(null);
  const [showRegistrarModal, setShowRegistrarModal] = useState(false);

  // Datos de ejemplo de pagos
  const [pagos, setPagos] = useState([
    {
      id: 1,
      memberId: '001',
      nombre: 'Juan Pérez',
      tipoMembresia: 'mensual',
      monto: 1000,
      fechaPago: '2024-01-15',
      fechaVencimiento: '2024-02-15',
      estado: 'pagado',
      metodoPago: 'efectivo',
      avatar: 'J'
    },
    {
      id: 2,
      memberId: '045',
      nombre: 'María García',
      tipoMembresia: 'semanal',
      monto: 300,
      fechaPago: '2024-01-10',
      fechaVencimiento: '2024-01-17',
      estado: 'pagado',
      metodoPago: 'tarjeta',
      avatar: 'M'
    },
    {
      id: 3,
      memberId: '123',
      nombre: 'Carlos López',
      tipoMembresia: 'mensual',
      monto: 1000,
      fechaPago: null,
      fechaVencimiento: '2024-01-05',
      estado: 'vencido',
      metodoPago: null,
      avatar: 'C'
    },
    {
      id: 4,
      memberId: '089',
      nombre: 'Ana Martínez',
      tipoMembresia: 'diaria',
      monto: 50,
      fechaPago: '2024-01-02',
      fechaVencimiento: '2024-01-03',
      estado: 'pagado',
      metodoPago: 'efectivo',
      avatar: 'A'
    },
    {
      id: 5,
      memberId: '067',
      nombre: 'Pedro Sánchez',
      tipoMembresia: 'mensual',
      monto: 1000,
      fechaPago: null,
      fechaVencimiento: '2024-01-08',
      estado: 'pendiente',
      metodoPago: null,
      avatar: 'P'
    },
    {
      id: 6,
      memberId: '034',
      nombre: 'Laura Torres',
      tipoMembresia: 'semanal',
      monto: 300,
      fechaPago: null,
      fechaVencimiento: '2024-01-10',
      estado: 'pendiente',
      metodoPago: null,
      avatar: 'L'
    }
  ]);

  // Filtrar pagos
  const pagosFiltrados = pagos.filter((pago) => {
    const matchSearch = pago.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       pago.memberId.includes(searchTerm);
    
    const matchFilter = filterEstado === 'todos' || pago.estado === filterEstado;
    
    return matchSearch && matchFilter;
  });

  const handleVerDetalle = (pago) => {
    setSelectedPago(pago);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setSelectedPago(null);
  };

  const handleRegistrarPago = (pagoId) => {
    const fechaActual = new Date().toISOString().split('T')[0];
    setPagos(pagos.map(pago => 
      pago.id === pagoId 
        ? { ...pago, estado: 'pagado', fechaPago: fechaActual, metodoPago: 'efectivo' }
        : pago
    ));
    handleCerrarModal();
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pagado':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'pendiente':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'vencido':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getTipoMembresiaTexto = (tipo) => {
    switch (tipo) {
      case 'diaria':
        return 'Diaria';
      case 'semanal':
        return 'Semanal';
      case 'mensual':
        return 'Mensual';
      default:
        return tipo;
    }
  };

  const getMetodoPagoTexto = (metodo) => {
    switch (metodo) {
      case 'efectivo':
        return 'Efectivo';
      case 'tarjeta':
        return 'Tarjeta';
      case 'transferencia':
        return 'Transferencia';
      default:
        return '-';
    }
  };

  // Calcular estadísticas
  const totalPagado = pagos.filter(p => p.estado === 'pagado').reduce((sum, p) => sum + p.monto, 0);
  const totalPendiente = pagos.filter(p => p.estado === 'pendiente').reduce((sum, p) => sum + p.monto, 0);
  const totalVencido = pagos.filter(p => p.estado === 'vencido').length;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Pagos</h1>
            <p className="text-gray-400">Gestión de pagos y membresías</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowRegistrarModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Registrar Pago</span>
          </motion.button>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Pagado</p>
                <p className="text-white text-3xl font-bold">${totalPagado.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-500 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Pendiente</p>
                <p className="text-white text-3xl font-bold">${totalPendiente.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-yellow-500 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Pagos Vencidos</p>
                <p className="text-white text-3xl font-bold">{totalVencido}</p>
              </div>
              <div className="p-3 bg-red-500 rounded-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Buscar
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o ID..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Filtro por Estado */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estado
              </label>
              <select
                value={filterEstado}
                onChange={(e) => setFilterEstado(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="todos" className="bg-slate-800">Todos</option>
                <option value="pagado" className="bg-slate-800">Pagado</option>
                <option value="pendiente" className="bg-slate-800">Pendiente</option>
                <option value="vencido" className="bg-slate-800">Vencido</option>
              </select>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-400 text-sm">
              Mostrando <span className="text-white font-semibold">{pagosFiltrados.length}</span> de <span className="text-white font-semibold">{pagos.length}</span> pagos
            </p>
          </div>
        </div>

        {/* Tabla de Pagos */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden">
          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Miembro
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Membresía
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Monto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Vencimiento
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {pagosFiltrados.map((pago, index) => (
                  <motion.tr
                    key={pago.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{pago.avatar}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{pago.nombre}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-300">{pago.memberId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white">{getTipoMembresiaTexto(pago.tipoMembresia)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-cyan-400 font-semibold">${pago.monto}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-300 text-sm">{pago.fechaVencimiento}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoColor(pago.estado)}`}>
                        {pago.estado.charAt(0).toUpperCase() + pago.estado.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleVerDetalle(pago)}
                          className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Ver detalle"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </motion.button>
                        {pago.estado !== 'pagado' && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRegistrarPago(pago.id)}
                            className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                            title="Registrar pago"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </motion.button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden divide-y divide-white/10">
            {pagosFiltrados.map((pago, index) => (
              <motion.div
                key={pago.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">{pago.avatar}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{pago.nombre}</p>
                      <p className="text-gray-400 text-sm">ID: {pago.memberId}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoColor(pago.estado)}`}>
                    {pago.estado.charAt(0).toUpperCase() + pago.estado.slice(1)}
                  </span>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Membresía:</span>
                    <span className="text-white font-medium">{getTipoMembresiaTexto(pago.tipoMembresia)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Monto:</span>
                    <span className="text-cyan-400 font-semibold">${pago.monto}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Vencimiento:</span>
                    <span className="text-white">{pago.fechaVencimiento}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <button
                    onClick={() => handleVerDetalle(pago)}
                    className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                  >
                    Ver detalle
                  </button>
                  {pago.estado !== 'pagado' && (
                    <button
                      onClick={() => handleRegistrarPago(pago.id)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                      Registrar Pago
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sin resultados */}
          {pagosFiltrados.length === 0 && (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-400 text-lg">No se encontraron pagos</p>
              <p className="text-gray-500 text-sm mt-2">Intenta con otros filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalle */}
      <AnimatePresence>
        {showModal && selectedPago && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={handleCerrarModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl max-w-2xl w-full"
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Detalle del Pago</h3>
                <button
                  onClick={handleCerrarModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenido del Modal */}
              <div className="space-y-6">
                {/* Información del Miembro */}
                <div className="flex items-center space-x-4 pb-6 border-b border-white/10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-3xl">{selectedPago.avatar}</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">{selectedPago.nombre}</h4>
                    <p className="text-gray-400">ID: {selectedPago.memberId}</p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold border ${getEstadoColor(selectedPago.estado)}`}>
                      {selectedPago.estado.charAt(0).toUpperCase() + selectedPago.estado.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Información del Pago */}
                <div>
                  <h5 className="text-lg font-semibold text-white mb-4">Información del Pago</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Tipo de Membresía</p>
                      <p className="text-white font-semibold">{getTipoMembresiaTexto(selectedPago.tipoMembresia)}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Monto</p>
                      <p className="text-cyan-400 font-semibold text-xl">${selectedPago.monto}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Fecha de Pago</p>
                      <p className="text-white font-semibold">{selectedPago.fechaPago || '-'}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-1">Fecha de Vencimiento</p>
                      <p className="text-white font-semibold">{selectedPago.fechaVencimiento}</p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg col-span-2">
                      <p className="text-gray-400 text-sm mb-1">Método de Pago</p>
                      <p className="text-white font-semibold">{getMetodoPagoTexto(selectedPago.metodoPago)}</p>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción */}
                {selectedPago.estado !== 'pagado' && (
                  <div className="flex items-center space-x-4 pt-6 border-t border-white/10">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleRegistrarPago(selectedPago.id)}
                      className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                    >
                      Registrar Pago
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pagos;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CoachClientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategoria, setFilterCategoria] = useState('todos');
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [planAlimentacion, setPlanAlimentacion] = useState({
    calorias: '',
    proteinas: '',
    carbohidratos: '',
    grasas: '',
    comidas: [
      { nombre: 'Desayuno', alimentos: '', horario: '' },
      { nombre: 'Media Mañana', alimentos: '', horario: '' },
      { nombre: 'Almuerzo', alimentos: '', horario: '' },
      { nombre: 'Merienda', alimentos: '', horario: '' },
      { nombre: 'Cena', alimentos: '', horario: '' }
    ],
    notas: ''
  });

  // Datos de ejemplo de clientes
  const [clientes, setClientes] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      edad: 28,
      avatar: 'J',
      categoria: 'fuerza',
      objetivo: 'Ganancia muscular',
      fechaInicio: '2024-01-15',
      sesionesCompletadas: 45,
      progreso: {
        peso: [
          { fecha: '2024-01-15', valor: 75 },
          { fecha: '2024-02-15', valor: 76.5 },
          { fecha: '2024-03-15', valor: 78 },
          { fecha: '2024-04-15', valor: 79.5 }
        ],
        masaMuscular: [
          { fecha: '2024-01-15', valor: 35 },
          { fecha: '2024-02-15', valor: 36.2 },
          { fecha: '2024-03-15', valor: 37.5 },
          { fecha: '2024-04-15', valor: 38.8 }
        ],
        grasaCorporal: [
          { fecha: '2024-01-15', valor: 18 },
          { fecha: '2024-02-15', valor: 17.2 },
          { fecha: '2024-03-15', valor: 16.5 },
          { fecha: '2024-04-15', valor: 15.8 }
        ],
        medidas: {
          pecho: { inicial: 95, actual: 102 },
          brazos: { inicial: 35, actual: 38 },
          cintura: { inicial: 85, actual: 82 },
          piernas: { inicial: 58, actual: 62 }
        }
      },
      ultimaSesion: '2024-04-12',
      planAlimentacion: {
        calorias: '3000',
        proteinas: '180',
        carbohidratos: '350',
        grasas: '80',
        comidas: [
          { nombre: 'Desayuno', alimentos: '4 claras de huevo, 1 taza de avena, 1 plátano', horario: '07:00 AM' },
          { nombre: 'Media Mañana', alimentos: 'Batido de proteína, puñado de almendras', horario: '10:00 AM' },
          { nombre: 'Almuerzo', alimentos: '200g pechuga de pollo, 1 taza arroz integral, ensalada', horario: '01:00 PM' },
          { nombre: 'Merienda', alimentos: 'Yogurt griego, frutas', horario: '04:00 PM' },
          { nombre: 'Cena', alimentos: '150g salmón, vegetales al vapor, quinoa', horario: '07:00 PM' }
        ],
        notas: 'Beber mínimo 3 litros de agua al día. Suplementar con creatina post-entrenamiento.'
      }
    },
    {
      id: 2,
      nombre: 'María García',
      edad: 32,
      avatar: 'M',
      categoria: 'cardio',
      objetivo: 'Pérdida de peso',
      fechaInicio: '2024-02-01',
      sesionesCompletadas: 38,
      progreso: {
        peso: [
          { fecha: '2024-02-01', valor: 72 },
          { fecha: '2024-03-01', valor: 70 },
          { fecha: '2024-04-01', valor: 68.5 }
        ],
        masaMuscular: [
          { fecha: '2024-02-01', valor: 28 },
          { fecha: '2024-03-01', valor: 28.5 },
          { fecha: '2024-04-01', valor: 29 }
        ],
        grasaCorporal: [
          { fecha: '2024-02-01', valor: 28 },
          { fecha: '2024-03-01', valor: 26 },
          { fecha: '2024-04-01', valor: 24.5 }
        ],
        medidas: {
          pecho: { inicial: 92, actual: 88 },
          brazos: { inicial: 30, actual: 29 },
          cintura: { inicial: 78, actual: 72 },
          piernas: { inicial: 62, actual: 58 }
        }
      },
      ultimaSesion: '2024-04-10',
      planAlimentacion: null
    },
    {
      id: 3,
      nombre: 'Carlos López',
      edad: 25,
      avatar: 'C',
      categoria: 'funcional',
      objetivo: 'Acondicionamiento general',
      fechaInicio: '2024-01-20',
      sesionesCompletadas: 42,
      progreso: {
        peso: [
          { fecha: '2024-01-20', valor: 82 },
          { fecha: '2024-02-20', valor: 81.5 },
          { fecha: '2024-03-20', valor: 81 },
          { fecha: '2024-04-20', valor: 80.5 }
        ],
        masaMuscular: [
          { fecha: '2024-01-20', valor: 38 },
          { fecha: '2024-02-20', valor: 38.8 },
          { fecha: '2024-03-20', valor: 39.5 },
          { fecha: '2024-04-20', valor: 40 }
        ],
        grasaCorporal: [
          { fecha: '2024-01-20', valor: 20 },
          { fecha: '2024-02-20', valor: 19 },
          { fecha: '2024-03-20', valor: 18.2 },
          { fecha: '2024-04-20', valor: 17.5 }
        ],
        medidas: {
          pecho: { inicial: 98, actual: 100 },
          brazos: { inicial: 36, actual: 38 },
          cintura: { inicial: 88, actual: 84 },
          piernas: { inicial: 60, actual: 62 }
        }
      },
      ultimaSesion: '2024-04-13',
      planAlimentacion: null
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      edad: 29,
      avatar: 'A',
      categoria: 'hiit',
      objetivo: 'Tonificación',
      fechaInicio: '2024-02-10',
      sesionesCompletadas: 35,
      progreso: {
        peso: [
          { fecha: '2024-02-10', valor: 65 },
          { fecha: '2024-03-10', valor: 64 },
          { fecha: '2024-04-10', valor: 63.5 }
        ],
        masaMuscular: [
          { fecha: '2024-02-10', valor: 26 },
          { fecha: '2024-03-10', valor: 27 },
          { fecha: '2024-04-10', valor: 27.8 }
        ],
        grasaCorporal: [
          { fecha: '2024-02-10', valor: 25 },
          { fecha: '2024-03-10', valor: 23.5 },
          { fecha: '2024-04-10', valor: 22 }
        ],
        medidas: {
          pecho: { inicial: 88, actual: 86 },
          brazos: { inicial: 28, actual: 29 },
          cintura: { inicial: 70, actual: 66 },
          piernas: { inicial: 56, actual: 57 }
        }
      },
      ultimaSesion: '2024-04-11',
      planAlimentacion: null
    },
    {
      id: 5,
      nombre: 'Pedro Sánchez',
      edad: 35,
      avatar: 'P',
      categoria: 'fuerza',
      objetivo: 'Aumento de fuerza',
      fechaInicio: '2024-01-10',
      sesionesCompletadas: 48,
      progreso: {
        peso: [
          { fecha: '2024-01-10', valor: 88 },
          { fecha: '2024-02-10', valor: 89 },
          { fecha: '2024-03-10', valor: 90.5 },
          { fecha: '2024-04-10', valor: 92 }
        ],
        masaMuscular: [
          { fecha: '2024-01-10', valor: 42 },
          { fecha: '2024-02-10', valor: 43.5 },
          { fecha: '2024-03-10', valor: 45 },
          { fecha: '2024-04-10', valor: 46.5 }
        ],
        grasaCorporal: [
          { fecha: '2024-01-10', valor: 16 },
          { fecha: '2024-02-10', valor: 15.5 },
          { fecha: '2024-03-10', valor: 15 },
          { fecha: '2024-04-10', valor: 14.5 }
        ],
        medidas: {
          pecho: { inicial: 105, actual: 112 },
          brazos: { inicial: 38, actual: 42 },
          cintura: { inicial: 90, actual: 88 },
          piernas: { inicial: 64, actual: 68 }
        }
      },
      ultimaSesion: '2024-04-12',
      planAlimentacion: null
    },
    {
      id: 6,
      nombre: 'Laura Torres',
      edad: 27,
      avatar: 'L',
      categoria: 'cardio',
      objetivo: 'Resistencia cardiovascular',
      fechaInicio: '2024-02-15',
      sesionesCompletadas: 32,
      progreso: {
        peso: [
          { fecha: '2024-02-15', valor: 58 },
          { fecha: '2024-03-15', valor: 57.5 },
          { fecha: '2024-04-15', valor: 57 }
        ],
        masaMuscular: [
          { fecha: '2024-02-15', valor: 24 },
          { fecha: '2024-03-15', valor: 24.5 },
          { fecha: '2024-04-15', valor: 25 }
        ],
        grasaCorporal: [
          { fecha: '2024-02-15', valor: 22 },
          { fecha: '2024-03-15', valor: 20.5 },
          { fecha: '2024-04-15', valor: 19 }
        ],
        medidas: {
          pecho: { inicial: 85, actual: 83 },
          brazos: { inicial: 26, actual: 27 },
          cintura: { inicial: 65, actual: 62 },
          piernas: { inicial: 52, actual: 53 }
        }
      },
      ultimaSesion: '2024-04-13',
      planAlimentacion: null
    }
  ]);

  // Filtrar clientes
  const clientesFiltrados = clientes.filter((cliente) => {
    const matchSearch = cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter = filterCategoria === 'todos' || cliente.categoria === filterCategoria;
    return matchSearch && matchFilter;
  });

  const handleVerProgreso = (cliente) => {
    setSelectedCliente(cliente);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setSelectedCliente(null);
  };

  const handleAbrirPlanAlimentacion = (e, cliente) => {
    e.stopPropagation();
    setSelectedCliente(cliente);
    
    // Si el cliente ya tiene plan, cargar sus datos
    if (cliente.planAlimentacion) {
      setPlanAlimentacion(cliente.planAlimentacion);
    } else {
      // Resetear formulario
      setPlanAlimentacion({
        calorias: '',
        proteinas: '',
        carbohidratos: '',
        grasas: '',
        comidas: [
          { nombre: 'Desayuno', alimentos: '', horario: '' },
          { nombre: 'Media Mañana', alimentos: '', horario: '' },
          { nombre: 'Almuerzo', alimentos: '', horario: '' },
          { nombre: 'Merienda', alimentos: '', horario: '' },
          { nombre: 'Cena', alimentos: '', horario: '' }
        ],
        notas: ''
      });
    }
    setShowPlanModal(true);
  };

  const handleCerrarPlanModal = () => {
    setShowPlanModal(false);
  };

  const handleGuardarPlan = () => {
    // Actualizar el plan de alimentación del cliente
    setClientes(clientes.map(cliente => 
      cliente.id === selectedCliente.id 
        ? { ...cliente, planAlimentacion: planAlimentacion }
        : cliente
    ));
    setShowPlanModal(false);
  };

  const handleUpdateComida = (index, field, value) => {
    const nuevasComidas = [...planAlimentacion.comidas];
    nuevasComidas[index][field] = value;
    setPlanAlimentacion({ ...planAlimentacion, comidas: nuevasComidas });
  };

  const getCategoriaColor = (categoria) => {
    switch (categoria) {
      case 'fuerza':
        return 'from-red-500 to-orange-500';
      case 'cardio':
        return 'from-blue-500 to-cyan-500';
      case 'funcional':
        return 'from-purple-500 to-pink-500';
      case 'hiit':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoriaTexto = (categoria) => {
    switch (categoria) {
      case 'fuerza':
        return 'Fuerza';
      case 'cardio':
        return 'Cardio';
      case 'funcional':
        return 'Funcional';
      case 'hiit':
        return 'HIIT';
      default:
        return categoria;
    }
  };

  const calcularProgresoPeso = (progreso) => {
    if (progreso.peso.length < 2) return 0;
    const inicial = progreso.peso[0].valor;
    const actual = progreso.peso[progreso.peso.length - 1].valor;
    return ((actual - inicial) / inicial * 100).toFixed(1);
  };

  const calcularProgresoGrasa = (progreso) => {
    if (progreso.grasaCorporal.length < 2) return 0;
    const inicial = progreso.grasaCorporal[0].valor;
    const actual = progreso.grasaCorporal[progreso.grasaCorporal.length - 1].valor;
    return ((actual - inicial) / inicial * 100).toFixed(1);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mis Clientes</h1>
            <p className="text-gray-400">Gestiona y monitorea el progreso de tus clientes</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Nuevo Cliente</span>
          </motion.button>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4">
            <p className="text-gray-400 text-sm mb-1">Total Clientes</p>
            <p className="text-white text-2xl font-bold">{clientes.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4">
            <p className="text-gray-400 text-sm mb-1">Activos este mes</p>
            <p className="text-white text-2xl font-bold">{clientes.length}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4">
            <p className="text-gray-400 text-sm mb-1">Promedio asistencia</p>
            <p className="text-white text-2xl font-bold">92%</p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4">
            <p className="text-gray-400 text-sm mb-1">Con plan nutricional</p>
            <p className="text-white text-2xl font-bold">{clientes.filter(c => c.planAlimentacion).length}</p>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Búsqueda */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Buscar Cliente
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
                  placeholder="Buscar por nombre..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Filtro por Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categoría
              </label>
              <select
                value={filterCategoria}
                onChange={(e) => setFilterCategoria(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              >
                <option value="todos" className="bg-slate-800">Todos</option>
                <option value="fuerza" className="bg-slate-800">Fuerza</option>
                <option value="cardio" className="bg-slate-800">Cardio</option>
                <option value="funcional" className="bg-slate-800">Funcional</option>
                <option value="hiit" className="bg-slate-800">HIIT</option>
              </select>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-4">
            <p className="text-gray-400 text-sm">
              Mostrando <span className="text-white font-semibold">{clientesFiltrados.length}</span> clientes
            </p>
          </div>
        </div>

        {/* Grid de Tarjetas de Clientes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientesFiltrados.map((cliente, index) => (
            <motion.div
              key={cliente.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
            >
              {/* Header de la tarjeta con categoría */}
              <div className={`h-2 bg-gradient-to-r ${getCategoriaColor(cliente.categoria)}`}></div>
              
              <div className="p-6">
                {/* Avatar y nombre */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getCategoriaColor(cliente.categoria)} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold text-2xl">{cliente.avatar}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">{cliente.nombre}</h3>
                    <p className="text-gray-400 text-sm">{cliente.edad} años</p>
                  </div>
                </div>

                {/* Información */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Categoría:</span>
                    <span className="text-white font-medium">{getCategoriaTexto(cliente.categoria)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Objetivo:</span>
                    <span className="text-white font-medium text-right">{cliente.objetivo}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Sesiones:</span>
                    <span className="text-cyan-400 font-semibold">{cliente.sesionesCompletadas}</span>
                  </div>
                </div>

                {/* Indicador de plan nutricional */}
                {cliente.planAlimentacion && (
                  <div className="bg-green-500/20 border border-green-500/50 p-3 rounded-lg mb-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-400 text-sm font-medium">Plan nutricional activo</p>
                    </div>
                  </div>
                )}

                {/* Botones */}
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVerProgreso(cliente)}
                    className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                  >
                    Ver Progreso
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleAbrirPlanAlimentacion(e, cliente)}
                    className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>{cliente.planAlimentacion ? 'Ver Plan' : 'Crear Plan'} Nutricional</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sin resultados */}
        {clientesFiltrados.length === 0 && (
          <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-gray-400 text-lg">No se encontraron clientes</p>
            <p className="text-gray-500 text-sm mt-2">Intenta con otros filtros de búsqueda</p>
          </div>
        )}
      </div>

      {/* Modal de Progreso Detallado */}
      <AnimatePresence>
        {showModal && selectedCliente && (
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
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header del Modal */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getCategoriaColor(selectedCliente.categoria)} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold text-2xl">{selectedCliente.avatar}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedCliente.nombre}</h3>
                    <p className="text-gray-400">{selectedCliente.edad} años • {getCategoriaTexto(selectedCliente.categoria)}</p>
                  </div>
                </div>
                <button
                  onClick={handleCerrarModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Información General */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Objetivo</p>
                  <p className="text-white font-semibold">{selectedCliente.objetivo}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Fecha de Inicio</p>
                  <p className="text-white font-semibold">{selectedCliente.fechaInicio}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Sesiones Completadas</p>
                  <p className="text-cyan-400 font-semibold text-xl">{selectedCliente.sesionesCompletadas}</p>
                </div>
              </div>

              {/* Progreso de Métricas */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">Progreso de Métricas</h4>

                {/* Peso */}
                <div className="bg-white/5 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-semibold text-white">Peso Corporal (kg)</h5>
                    <span className={`text-sm font-semibold ${parseFloat(calcularProgresoPeso(selectedCliente.progreso)) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {calcularProgresoPeso(selectedCliente.progreso)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedCliente.progreso.peso.map((registro, index) => (
                      <div key={index} className="bg-white/5 p-3 rounded-lg text-center">
                        <p className="text-gray-400 text-xs mb-1">{registro.fecha}</p>
                        <p className="text-white text-xl font-bold">{registro.valor} kg</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Masa Muscular */}
                <div className="bg-white/5 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-semibold text-white">Masa Muscular (kg)</h5>
                    <span className="text-green-400 text-sm font-semibold">
                      +{((selectedCliente.progreso.masaMuscular[selectedCliente.progreso.masaMuscular.length - 1].valor - selectedCliente.progreso.masaMuscular[0].valor) / selectedCliente.progreso.masaMuscular[0].valor * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedCliente.progreso.masaMuscular.map((registro, index) => (
                      <div key={index} className="bg-white/5 p-3 rounded-lg text-center">
                        <p className="text-gray-400 text-xs mb-1">{registro.fecha}</p>
                        <p className="text-green-400 text-xl font-bold">{registro.valor} kg</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grasa Corporal */}
                <div className="bg-white/5 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-lg font-semibold text-white">Grasa Corporal (%)</h5>
                    <span className={`text-sm font-semibold ${parseFloat(calcularProgresoGrasa(selectedCliente.progreso)) < 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {calcularProgresoGrasa(selectedCliente.progreso)}%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedCliente.progreso.grasaCorporal.map((registro, index) => (
                      <div key={index} className="bg-white/5 p-3 rounded-lg text-center">
                        <p className="text-gray-400 text-xs mb-1">{registro.fecha}</p>
                        <p className="text-orange-400 text-xl font-bold">{registro.valor}%</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medidas Corporales */}
                <div className="bg-white/5 p-6 rounded-xl">
                  <h5 className="text-lg font-semibold text-white mb-4">Medidas Corporales (cm)</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-2">Pecho</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{selectedCliente.progreso.medidas.pecho.inicial}</span>
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-cyan-400 font-bold">{selectedCliente.progreso.medidas.pecho.actual}</span>
                      </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-2">Brazos</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{selectedCliente.progreso.medidas.brazos.inicial}</span>
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-cyan-400 font-bold">{selectedCliente.progreso.medidas.brazos.actual}</span>
                      </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-2">Cintura</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{selectedCliente.progreso.medidas.cintura.inicial}</span>
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-cyan-400 font-bold">{selectedCliente.progreso.medidas.cintura.actual}</span>
                      </div>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-gray-400 text-sm mb-2">Piernas</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{selectedCliente.progreso.medidas.piernas.inicial}</span>
                        <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-cyan-400 font-bold">{selectedCliente.progreso.medidas.piernas.actual}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                >
                  Actualizar Progreso
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Ver Rutinas
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Plan de Alimentación */}
      <AnimatePresence>
        {showPlanModal && selectedCliente && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={handleCerrarPlanModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Plan de Alimentación</h3>
                  <p className="text-gray-400">{selectedCliente.nombre}</p>
                </div>
                <button
                  onClick={handleCerrarPlanModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Macronutrientes */}
              <div className="bg-white/5 p-6 rounded-xl mb-6">
                <h4 className="text-lg font-semibold text-white mb-4">Macronutrientes Diarios</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Calorías</label>
                    <input
                      type="number"
                      value={planAlimentacion.calorias}
                      onChange={(e) => setPlanAlimentacion({ ...planAlimentacion, calorias: e.target.value })}
                      placeholder="3000"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Proteínas (g)</label>
                    <input
                      type="number"
                      value={planAlimentacion.proteinas}
                      onChange={(e) => setPlanAlimentacion({ ...planAlimentacion, proteinas: e.target.value })}
                      placeholder="180"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Carbohidratos (g)</label>
                    <input
                      type="number"
                      value={planAlimentacion.carbohidratos}
                      onChange={(e) => setPlanAlimentacion({ ...planAlimentacion, carbohidratos: e.target.value })}
                      placeholder="350"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Grasas (g)</label>
                    <input
                      type="number"
                      value={planAlimentacion.grasas}
                      onChange={(e) => setPlanAlimentacion({ ...planAlimentacion, grasas: e.target.value })}
                      placeholder="80"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Comidas */}
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold text-white">Comidas del Día</h4>
                {planAlimentacion.comidas.map((comida, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-xl">
                    <h5 className="text-white font-semibold mb-3">{comida.nombre}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Alimentos</label>
                        <textarea
                          value={comida.alimentos}
                          onChange={(e) => handleUpdateComida(index, 'alimentos', e.target.value)}
                          placeholder="Ej: 4 claras de huevo, 1 taza de avena, 1 plátano"
                          rows="3"
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Horario</label>
                        <input
                          type="time"
                          value={comida.horario}
                          onChange={(e) => handleUpdateComida(index, 'horario', e.target.value)}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notas adicionales */}
              <div className="bg-white/5 p-4 rounded-xl mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Notas Adicionales</label>
                <textarea
                  value={planAlimentacion.notas}
                  onChange={(e) => setPlanAlimentacion({ ...planAlimentacion, notas: e.target.value })}
                  placeholder="Ej: Beber mínimo 3 litros de agua al día. Suplementar con creatina post-entrenamiento."
                  rows="4"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* Botones */}
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGuardarPlan}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                >
                  Guardar Plan
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCerrarPlanModal}
                  className="flex-1 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  Cancelar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoachClientes;
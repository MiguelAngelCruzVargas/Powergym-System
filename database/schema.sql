-- Powergym-System database schema inferred from frontend sample data
-- Adapted for MariaDB. Original version contained SQLite-specific
-- statements such as PRAGMA which are removed here.

-- NOTE: the application currently does not use a database, so this
-- schema is speculative and designed to mirror the shapes seen
-- in the sources under src/components.

-- (MariaDB enables foreign keys by default for InnoDB tables)

-- users table to store coaches, recepcionistas or miembros que se logean
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT NOT NULL,
    email TEXT,
    telefono TEXT,
    role TEXT,        -- e.g. 'coach','miembro','recepcionista'
    avatar TEXT,
    password TEXT      -- hashed password
) ENGINE=InnoDB;

-- an admin account will be inserted programmatically on server startup

-- Miembros managed by recepcionista
CREATE TABLE IF NOT EXISTS members (
    id VARCHAR(50) PRIMARY KEY,   -- se usa un string en la UI
    nombre TEXT NOT NULL,
    email TEXT,
    telefono TEXT,
    avatar TEXT
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS memberships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id VARCHAR(50) NOT NULL,
    tipoMembresia TEXT,
    precio DOUBLE,
    fechaInicio TEXT,
    fechaVencimiento TEXT,
    estado TEXT,
    FOREIGN KEY(member_id) REFERENCES members(id)
) ENGINE=InnoDB;

-- Clientes que un coach observa
CREATE TABLE IF NOT EXISTS clients (
    id INT PRIMARY KEY,
    nombre TEXT NOT NULL,
    edad INT,
    avatar TEXT,
    categoria TEXT,
    objetivo TEXT,
    fechaInicio TEXT
) ENGINE=InnoDB;

-- progreso de cada cliente en distintos parámetros
CREATE TABLE IF NOT EXISTS progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    fecha TEXT,
    peso DOUBLE,
    masaMuscular DOUBLE,
    grasaCorporal DOUBLE,
    FOREIGN KEY(client_id) REFERENCES clients(id)
) ENGINE=InnoDB;

-- medidas corporales de cada cliente
CREATE TABLE IF NOT EXISTS measurements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    fecha TEXT,
    pechoInicial DOUBLE,
    pechoActual DOUBLE,
    brazosInicial DOUBLE,
    brazosActual DOUBLE,
    cinturaInicial DOUBLE,
    cinturaActual DOUBLE,
    piernasInicial DOUBLE,
    piernasActual DOUBLE,
    FOREIGN KEY(client_id) REFERENCES clients(id)
) ENGINE=InnoDB;

-- Sample data from Miembros component
INSERT IGNORE INTO members(id,nombre,email,telefono,avatar) VALUES
('001','Juan Pérez','juan.perez@email.com','1234567890','J'),
('045','María García','maria.garcia@email.com','0987654321','M');

INSERT IGNORE INTO memberships(member_id,tipoMembresia,precio,fechaInicio,fechaVencimiento,estado) VALUES
('001','mensual',1000,'2024-01-15','2024-02-15','activo'),
('045','semanal',300,'2024-01-10','2024-01-17','activo');

-- Sample data from Clients component (first two clients only)
INSERT IGNORE INTO clients(id,nombre,edad,avatar,categoria,objetivo,fechaInicio) VALUES
(1,'Juan Pérez',28,'J','fuerza','Ganancia muscular','2024-01-15'),
(2,'María García',32,'M','cardio','Pérdida de peso','2024-02-01');

-- Progress entries for client 1
INSERT IGNORE INTO progress(client_id,fecha,peso,masaMuscular,grasaCorporal) VALUES
(1,'2024-01-15',75,35,18),
(1,'2024-02-15',76.5,36.2,17.2),
(1,'2024-03-15',78,37.5,16.5),
(1,'2024-04-15',79.5,38.8,15.8);

-- Measurements for client 1 (using only initial/actual snapshot at last date)
INSERT IGNORE INTO measurements(client_id,fecha,pechoInicial,pechoActual,brazosInicial,brazosActual,cinturaInicial,cinturaActual,piernasInicial,piernasActual) VALUES
(1,'2024-04-15',95,102,35,38,85,82,58,62);

-- Progress entries for client 2
INSERT IGNORE INTO progress(client_id,fecha,peso,masaMuscular,grasaCorporal) VALUES
(2,'2024-02-01',72,28,28),
(2,'2024-03-01',70,28.5,26),
(2,'2024-04-01',68.5,29,24.5);

INSERT IGNORE INTO measurements(client_id,fecha,pechoInicial,pechoActual,brazosInicial,brazosActual,cinturaInicial,cinturaActual,piernasInicial,piernasActual) VALUES
(2,'2024-04-01',92,88,30,29,78,72,62,58);

-- additional rows could be added following same pattern

-- attendances (asistencias) table for registrar entradas/salidas
CREATE TABLE IF NOT EXISTS attendances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id VARCHAR(50) NOT NULL,
    fecha DATE,
    horaEntrada TIME,
    horaSalida TIME NULL,
    FOREIGN KEY(member_id) REFERENCES members(id)
) ENGINE=InnoDB;

-- example attendance entries
INSERT IGNORE INTO attendances(member_id,fecha,horaEntrada,horaSalida) VALUES
('001','2024-01-02','08:30:00',NULL),
('045','2024-01-02','09:15:00','11:30:00');

-- end of schema.sql

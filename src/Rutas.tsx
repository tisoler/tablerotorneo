import { Route, Routes } from 'react-router-dom'
import Tablero from './Componentes/Tablero'
import TableroComandos from './Componentes/TableroComandos'
import TableroUsuario from './Componentes/TableroUsuario'

import PartidoFutbol from './Componentes/Partidos/PartidoFutbol'
import PartidoHockey from './Componentes/Partidos/PartidoHockey'

const Rutas = () => {
  return (
    <Routes>
      <Route path={'/'} element={TableroUsuario} />
      <Route path={'/tablero'} element={Tablero} />
      <Route path={'/tableroComandos'} element={<TableroComandos />} />
      <Route path={'/PartidoFutbol'} element={<PartidoFutbol />} />
      <Route path={'/PartidoHockey'} element={<PartidoHockey />} />
    </Routes>
  )
}

export default Rutas

import { Route, Routes } from 'react-router-dom'
import Tablero from './Componentes/Tablero'
import TableroComandos from './Componentes/TableroComandos'
import TableroUsuario from './Componentes/TableroUsuario'

const Rutas = () => {
  return (
    <Routes>
      <Route path={'/'} element={TableroUsuario} />
      <Route path={'/tablero'} element={Tablero} />
      <Route path={'/tableroComandos'} element={<TableroComandos />} />
    </Routes>
  )
}

export default Rutas

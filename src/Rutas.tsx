import { Route, Routes } from 'react-router-dom'
import Partido from './Componentes/Partido'
import TableroComandos from './Componentes/TableroComandos'

const Rutas = () => {
  return (
    <Routes>
      <Route path={'/'} element={Partido} />
      <Route path={'/partido'} element={Partido} />
      <Route path={'/tableroComandos'} element={<TableroComandos />} />
    </Routes>
  )
}

export default Rutas

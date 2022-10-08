import { Route, Routes } from 'react-router-dom'
import Tablero from './Componentes/TenisPadel/Tablero'
import TableroComandos from './Componentes/TenisPadel/TableroComandos'
import Inicio from './Componentes/Comunes/Inicio'

const Rutas = () => {
  return (
    <Routes>
      <Route path={'/'} element={Inicio} />
      <Route path={'/tablero'} element={Tablero} />
      <Route path={'/tableroComandos'} element={<TableroComandos />} />
      <Route path={'/pantallaInicio'} element={Inicio} />
    </Routes>
  )
}

export default Rutas

import { Route, Routes } from 'react-router-dom'
import Tablero from './Componentes/TenisPadel/Tablero'
import Inicio from './Componentes/Comunes/Inicio'
import TableroComandosContenedor from './Componentes/Comunes/TableroComandosContenedor'

const Rutas = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Inicio />} />
      <Route path={'/:idDisciplinaClub'} element={<Inicio />} />
      <Route path={'/tablero'} element={<Tablero />} />
      <Route path={'/tableroComandos'} element={<TableroComandosContenedor />} />
      <Route path={'/pantallaInicio'} element={<Inicio />} />
    </Routes>
  )
}

export default Rutas

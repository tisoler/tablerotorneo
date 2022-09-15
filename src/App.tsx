import './App.css';
import styled from 'styled-components'
import Rutas from './Rutas'

const App = () => {
  return (
    <Contenedor>
      <Rutas />
    </Contenedor>
  )
}

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
`

export default App;

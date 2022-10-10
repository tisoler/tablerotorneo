
import styled from 'styled-components'

const PartidoHockey = () => {

  return (
    <Tablero>
      <Fila>
        <Equipo>
          <Jugadores>
            <Jugador>AAAAAA</Jugador>
            <Jugador>AAAAAA</Jugador>
          </Jugadores>
          
        </Equipo>
          <Game>
            
          </Game>
        
      </Fila>
      <Fila>
        <Equipo>
         <Jugadores>
            <Jugador></Jugador>
            <Jugador></Jugador>
          </Jugadores>
          
        </Equipo>
        
          <Game>
          
        </Game>
        
      </Fila>
    </Tablero>
  )
}

const Tablero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 100px 0;

  @media (max-width: 768px) {
    margin: 50px 0;
  }

  @media (max-width: 600px) {
    margin: 40px 0;
  }
`

const Fila = styled.div`
  display: flex;
  height: 170px;
  width: 80%;

  @media (max-width: 768px) {
    height: 100px;
    width: 85%;
  }

  @media (max-width: 600px) {
    height: 70px;
    width: 95%;
  }
`
const Equipo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid #215d43;
  background-color: #fff;
  width: 47%;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    border: 1px solid #215d43;
  }

  @media (max-width: 600px) {
    padding: 5px;
    border: 1px solid #215d43;
  }
`

const Jugadores = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

const Jugador = styled.div`
  color: #215d43;
  font-weight: bold;
  font-family: Tahoma;
  font-size: 38px;
  line-height: 70px;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 25px;
    margin: 5px 0;
  }

  @media (max-width: 600px) {
    font-size: 15px;
    line-height: 20px;
    margin: 5px 0;
  }
`

const Game = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  background-color: #215d43;
  width: 20%;
  color: #fff;
  font-family: Tahoma;
  font-size: 90px;
  line-height: 170px;

  @media (max-width: 768px) {
    font-size: 50px;
    border: 1px solid #fff;
  }

  @media (max-width: 600px) {
    font-size: 25px;
    border: 1px solid #fff;
  }
`

export default PartidoHockey

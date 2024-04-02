import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import { Jugador } from '../../Tipos'
import { NoHayDatos } from '../../Estilos/Comunes'
import { useContextoGlobal } from '../../Contexto/contextoGlobal'
import { ObtenerJugadoresParaDisciplinaClubCategoria } from '../../Servicios/Jugador'

const Ranking = () => {
  const [jugadores, setJugadores] = useState<Jugador[] | null>()
  const [cargando, setCargando] = useState<boolean>(true)
  
  const { disciplinaClub, categoriaSeleccionada } = useContextoGlobal()

  useEffect(() => {
    setCargando(false)

    const obtenerPartidoActual = async () => {
      setCargando(true)

      if (!disciplinaClub?.id || !categoriaSeleccionada?.id) return
      const jugadoresParaDisciplinaClubCategoria = await ObtenerJugadoresParaDisciplinaClubCategoria(disciplinaClub.id, categoriaSeleccionada.id)
      if (jugadoresParaDisciplinaClubCategoria) {
        setJugadores(jugadoresParaDisciplinaClubCategoria)
      } else {
        setJugadores(null)
      }
      setCargando(false)
    }

    obtenerPartidoActual() // Carga inicial
  }, [disciplinaClub, categoriaSeleccionada])

  if (cargando) return <NoHayDatos>Cargando...</NoHayDatos>
  if (!jugadores?.length) return <NoHayDatos>No hay información sobre ranking para esta categoría.</NoHayDatos>

  return (
    <Tablero>
      <Titulo>{`Ranking categoría ${categoriaSeleccionada?.descripcion}`}</Titulo>
      <ListaJugadores>
        {jugadores.map(jugador =>
          <TarjetaJugador key={jugador.id}>
            <ImagenJugador src={require(`../../Recursos/jugadores/${jugador.foto || 'jugador.png'}`)} />
            <NumeroRanking numero={jugador.ranking}>{jugador.ranking}</NumeroRanking>
            <Datos>
              <div style={{ width: '44%' }}>
                <Localidad>{jugador.localidad ?? '-'}</Localidad>
                <ContenedorPuntos>
                  <TituloPuntos>Pts:</TituloPuntos>
                  <Puntos>{jugador.puntos}</Puntos>
                </ContenedorPuntos>
              </div>
              <div style={{ border: '.5px solid #ffffff', margin: '15px 0' }} />
              <ContenedorNombre>
                <Nombre>{jugador.nombre.toUpperCase()}</Nombre>
                <Apellido>{jugador.apellido.toUpperCase()}</Apellido>
              </ContenedorNombre>
            </Datos>
          </TarjetaJugador>
        )}
      </ListaJugadores>
    </Tablero>
  )
}

const Tablero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  width: 90%;

  @media (max-width: 768px) {
    margin: 40px 0;
  }

  @media (max-width: 600px) {
    margin: 30px 0;
  }
`

const ListaJugadores = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
  grid-auto-rows: minmax(300px, auto);
  width: calc(100% - 40px);
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Titulo = styled.div`
  color: #ffffff;
  font-weight: bold;
  font-family: Tahoma;
  font-size: 30px;
  margin: 0 0 0.8em 0;
  width: 100%;
  text-align: center;
  border: 1px solid white;
  border-radius: 20px;
  padding: 15px 0;
  background-color: #000000;
`

const TarjetaJugador = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 450px;
  border-radius: 20px;
  border: 1px solid #ffffff;
  background-color: #000000;
  overflow-x: hidden;

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 25px;
    margin: 5px 0;
  }

  @media (max-width: 600px) {
    font-size: 15px;
    line-height: 20px;
    margin: 5px 0;
  }
`

const ImagenJugador = styled.img`
  position: absolute;
  top: 50px;
  height: 310px;
  object-fit: cover;
  border-radius: 20px;
`

const NumeroRanking = styled.div<{ numero: number }>`
  font-weight: bold;
  font-family: Tahoma;
  font-size: ${props => props.numero > 9 ? '170' : '205'}px;
  line-height: 205px;
  width: ${props => props.numero > 9 ? 'calc(100% - 20px)' : 'calc(100% - 35px)'};
  text-align: right;
  -webkit-text-stroke: 2px #ffffff;
  padding-right: ${props => props.numero > 9 ? '20' : '35'}px;
  padding-top: 10px;
  z-index: 99;
  letter-spacing: -12px;
  transform: scale(1, 1.3);
`

const Datos = styled.div`
  border-top: 1px solid #ffffff;
  display: flex;
  height: 86px; /* 2px menos por el borde de la tarjeta y 1px menos por el borde superior de los datos */
  width: 100%;
`

const Localidad = styled.div`
  color: #ffffff;
  font-weight: bold;
  font-family: Tahoma;
  font-size: 18px;
  line-height: 25px;
  width: 100%;
  text-align: left;
  padding-left: 12px;
  margin-top: 5px;
`

const ContenedorPuntos = styled.div`
  display: flex;
  align-items: center;
`

const TituloPuntos = styled.div`
  color: #ffffff;
  font-weight: bold;
  font-family: Tahoma;
  font-size: 17px;
  line-height: 20px;
  width: 40%;
  text-align: right;
`

const Puntos = styled.div`
  color: #ffffff;
  font-weight: bold;
  font-family: Tahoma;
  font-size: 45px;
  line-height: 45px;
  width: 60%;
  text-align: left;
  transform: scale(.6, 1.2) translateX(-18px);
`

const ContenedorNombre = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  display: flex;
  flexDirection: column;
  padding-left: 12px;
  overflow: hidden
`

const Nombre = styled.div`
  color: #ffffff;
  font-weight: bold;
  font-family: Tahoma;
  font-size: 16px;
  width: 100%;
  text-align: left;
  transform: scale(1.3, 1) translateX(22px);
  margin-top: 7px;

  @media (max-width: 768px) {
    transform: scale(1.3, 1) translateX(17px);
  }

  @media (max-width: 600px) {
    transform: scale(1.3, 1) translateX(25px);
  }
`
const Apellido = styled.div`
  color: #ffffff;
  font-weight: bold;
  font-family: Tahoma;
  font-size: 21px;
  width: 100%;
  text-align: left;
  transform: scale(1, 2.7) translatey(3px);
  margin-top: 5px;
`

export default Ranking

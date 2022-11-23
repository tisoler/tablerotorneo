import { useEffect, useState } from "react"
import styled from 'styled-components'
import { ObtenerDisciplinasClubes } from "../../Servicios/DisciplinaClub"
import { DisciplinaClub } from "../../Tipos"
import TableroUsuarioPadelTenis from "../TenisPadel/TableroUsuario"
import TableroUsuarioFutbol from "../Futbol/TableroUsuario"
import TableroUsuarioHockey from "../Hockey/TableroUsuario"
import EncabezadoGeneral from './Encabezado'
import EncabezadoPersonalizado from './EncabezadoPersonalizado'
import { ObtenerTorneoActual, ObtenerTorneos } from "../../Servicios/Torneo"
import { NoHayDatos } from "../../Estilos/Comunes"
import { useContextoGlobal } from "../../Contexto/contextoGlobal"

const MenuInicio = () => {
  const [disciplinasClubes, setDisciplinasClubes] = useState<DisciplinaClub[]>()

  const { setDisciplinaClub, disciplinaClub, setTorneos, setTorneoSeleccionado, torneoSeleccionado } = useContextoGlobal()

  useEffect(() => {
    const obtenerDisciplinasClubes = async () => {
      const disciplinasClubesInicial = await ObtenerDisciplinasClubes()
      setDisciplinasClubes(disciplinasClubesInicial ?? [])
    }
    obtenerDisciplinasClubes()
  }, [])

  useEffect(() => {
    const obtenerDatosTorneoActual = async () => {
      if (torneoSeleccionado || !disciplinaClub?.id) return null
      const torneoActualBD = await ObtenerTorneoActual(disciplinaClub.id)
      if (torneoActualBD) setTorneoSeleccionado(torneoActualBD)
    }

    const obtenerDatosTorneos = async () => {
      if (!disciplinaClub?.id) return null
      const torneosBD = await ObtenerTorneos(disciplinaClub.id)
      if (torneosBD) setTorneos(torneosBD)
    }

    obtenerDatosTorneoActual()
    obtenerDatosTorneos()
  }, [disciplinaClub])

  let Encabezado = <EncabezadoGeneral />
  let VistaTableroUsuario
  if (disciplinaClub) {
    Encabezado = torneoSeleccionado?.nombreMostrar ? <EncabezadoPersonalizado {...torneoSeleccionado} /> : <EncabezadoGeneral />
    switch (disciplinaClub.idDisciplina) {
      case 1:
      case 2:
        VistaTableroUsuario = <TableroUsuarioPadelTenis onVolver={() => setDisciplinaClub(null)} />
        break
      case 4:
        VistaTableroUsuario = <TableroUsuarioFutbol onVolver={() => setDisciplinaClub(null)} />
        break
      case 5:
        VistaTableroUsuario = <TableroUsuarioHockey onVolver={() => setDisciplinaClub(null)} />
        break
    }

    if (VistaTableroUsuario) {
      return (
        <>
          {Encabezado}
          {VistaTableroUsuario}
        </>
      )
    }
  }

  if (!disciplinasClubes) return <NoHayDatos>Cargando...</NoHayDatos>
  if(!disciplinasClubes?.length) return <NoHayDatos>No hay clubes y/o disciplinas disponibles.</NoHayDatos>

  return (
    <>
      {Encabezado}
      <Contenedor>
        { disciplinasClubes.map(disciplinaClub => (
          <Boton
            key={disciplinaClub.id}
            onClick={() => { setTorneoSeleccionado(null); setDisciplinaClub(disciplinaClub) }}
            colorPrincipal={disciplinaClub.colorPrincipal}
            colorSecundario={disciplinaClub.colorSecundario}
          >
            <ContenedorTexto>
              <TextoBoton>
                {`${disciplinaClub.nombreDisciplina} - ${disciplinaClub.nombreClub}`}
              </TextoBoton>
              <TextoBoton>
                {`${disciplinaClub.nombreLocalidad}`}
              </TextoBoton>
            </ContenedorTexto>
            <Escudo>
              <img src={require(`../../Recursos/clubes/${disciplinaClub.imagenEscudo || 'escudoDefecto.png'}`)} alt='Escudo club' />
            </Escudo>
          </Boton>
        ))}
      </Contenedor>
    </>
  )
}

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(90% - 30px);
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 65px;
    height: calc(83% - 30px);
  }

  @media (max-width: 600px) {
    margin-top: 40px;
  }
`

const Boton = styled.div<{ colorPrincipal?: string, colorSecundario?: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  height: 70px;
  width: calc(50% - 2.5px);
  background-color: #fff;
  border-left: solid 2.5px ${props => props.colorPrincipal || '#ddd'};
  color: #333;
  font-size: 25px;
  font-weight: bold;
  padding: 10px;
  margin: 5px 0;

  &:active {
    background-color: #ddd;
    color: #000;
  }

  &:hover {
    background-color: ${props => props.colorPrincipal || '#fff'};
    border-left: solid 6px ${props => props.colorSecundario || '#fff'};
    color: ${props => props.colorSecundario ? '#fff' : '#000'};
    width: calc(50% - 6px);
  }

  @media (max-width: 768px) {
    font-size: 18px;
    height: 50px;
    width: calc(60% - 4px);
    border-left: solid 1.5px ${props => props.colorPrincipal || '#ddd'};
    border-top: solid 1.5px ${props => props.colorPrincipal || '#ddd'};
    border-bottom: solid 1.5px ${props => props.colorPrincipal || '#ddd'};
    border-right: solid 3.5px ${props => props.colorSecundario || '#ddd'};

    &:hover {
      background-color: ${props => props.colorPrincipal || '#fff'};
      border: solid 1.5px ${props => props.colorSecundario || '#fff'};
      color: ${props => props.colorSecundario ? '#fff' : '#000'};
      width: calc(60% - 4px);
    }
  }

  @media (max-width: 600px) {
    font-size: 16px;
    height: 45px;
    width: calc(85% - 2.5px);

    &:hover {
      width: calc(85% - 2.5px);
    }
  }
`

const ContenedorTexto = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`

const TextoBoton = styled.div`
  width: 100%;
`

const Escudo = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  background-color: #fff;
  border-radius: 50%;
  right: 15px;

  & img {
    height: 50px;
  }

  @media (max-width: 768px) {\
    height: 45px;
    width: 45px;
    right: 5px;

    & img {
      height: 35px;
    }
  }

  @media (max-width: 600px) {
    height: 45px;
    width: 45px;
    right: 5px;

    & img {
      height: 35px;
    }
  }
`


export default MenuInicio

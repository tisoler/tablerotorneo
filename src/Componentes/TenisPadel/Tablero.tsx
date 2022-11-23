import { useEffect, useState } from "react"
import { ObtenerConfiguracion } from "../../Servicios/Configuracion"
import { Configuracion } from "../../Tipos"
import Grupos from "./Grupos"
import Partido from "./Partido"
import Cuadro from './Cuadro'
import EncabezadoPersonalizado from "../Comunes/EncabezadoPersonalizado"
import PartidosJugados from "./PartidosJugados"

const CONFIGURACION_INICIAL: Configuracion = {
  pantallaMostrar: 'grupo',
}

const Tablero = () => {
  const [configuracion, setConfiguracion] = useState<Configuracion>()

  useEffect(() => {
    const obtenerConfiguracion = async () => {
      const configuracion = await ObtenerConfiguracion(1)
      if (configuracion) {
        setConfiguracion(configuracion || CONFIGURACION_INICIAL)
      }
    }
    const intervalo = setInterval(obtenerConfiguracion, 2000) // Refresco de datos
    obtenerConfiguracion() // Carga inicial

    return () => { if (intervalo) clearInterval(intervalo) }
  }, [])

  const renderPantalla = () => {
    switch(configuracion?.pantallaMostrar) {
      case 'partido':
        return <Partido /> // HACER: Agregar login para setear disciplinaClub
      case 'partidosJugados':
        return <PartidosJugados />
      case 'cuadro':
        return <Cuadro />
      default:
        return <Grupos />
    }
  }

  return (
    <>
      <EncabezadoPersonalizado />
      {renderPantalla()}
    </>
  )
}

export default Tablero

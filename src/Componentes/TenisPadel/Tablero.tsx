import { useEffect, useState } from "react"
import { ObtenerConfiguracion } from "../../Servicios/Configuracion"
import { Configuracion, PANTALLA_MOSTRAR } from "../../Tipos"
import Grupos from "./Grupos"
import Partido from "./Partido"
import Cuadro from './Cuadro'
import EncabezadoPersonalizado from "../Comunes/EncabezadoPersonalizado"
import PartidosJugados from "./PartidosJugados"
import Ranking from "./Ranking"

const CONFIGURACION_INICIAL: Configuracion = {
  pantallaMostrar: PANTALLA_MOSTRAR.grupo,
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
      case PANTALLA_MOSTRAR.partido:
        return <Partido /> // HACER: Agregar login para setear disciplinaClub
      case PANTALLA_MOSTRAR.partidosJugados:
        return <PartidosJugados />
      case PANTALLA_MOSTRAR.cuadro:
        return <Cuadro />
      case PANTALLA_MOSTRAR.ranking:
        return <Ranking />
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

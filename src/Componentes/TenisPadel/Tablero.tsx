import { useEffect, useState } from "react"
import { ObtenerConfiguracion } from "../../Servicios/Configuracion"
import { Configuracion } from "../../Tipos"
import Grupos from "./Grupos"
import Partido from "./Partido"
import Cuadro from './Cuadro'
import EncabezadoPersonalizado from "../Comunes/EncabezadoPersonalizado"

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
        return <Partido />
      case 'cuadro':
        return <Cuadro />
      default:
        return <Grupos idDisciplinaClub={1} />
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

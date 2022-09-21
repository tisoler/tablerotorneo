import { useEffect, useState } from "react"
import { ObtenerConfiguracion } from "../Servicios/Configuracion"
import { Configuracion } from "../Tipos"
import Grupos from "./Grupos"
import Partido from "./Partido"
import Cuadro from './Cuadro'
import ConEncabezado from '../hoc/ConEncabezado'

const CONFIGURACION_INICIAL: Configuracion = {
  pantallaMostrar: 'grupos',
}

const Tablero = () => {
  const [configuracion, setConfiguracion] = useState(CONFIGURACION_INICIAL)

  useEffect(() => {
    const obtenerConfiguracion = async () => {
      const configuracion = await ObtenerConfiguracion()
      if (configuracion) {
        setConfiguracion(configuracion)
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
        return <Grupos />
    }
  }

  return (renderPantalla())
}

export default ConEncabezado(Tablero)

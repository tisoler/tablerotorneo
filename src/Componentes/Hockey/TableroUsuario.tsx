import { useEffect, useState } from "react"
import Partido from "./Partido"
import Torneo from './Torneo'
import { ObtenerConfiguracion } from "../../Servicios/Configuracion"
import BotonVolver from "../Comunes/BotonVolver"
import { PANTALLA_MOSTRAR, PantallaMostrar } from "../../Tipos"
import { BotonMenu, BotonMenuDerecha, BotonMenuIzquierda, ContenedorTableroUsuario, EncabezadoPantalla, Menu } from "../../Estilos/Comunes"
import Cuadro from "./Cuadro"
import { useContextoGlobal } from "../../Contexto/contextoGlobal"

interface TableroUsuarioProps {
  onVolver: () => void,
}

const TableroUsuario = ({ onVolver }: TableroUsuarioProps) => {
  const [vista, setVista] = useState<PantallaMostrar>()

  const { disciplinaClub } = useContextoGlobal()

  useEffect(() => {
    const obtenerConfiguracion = async () => {
      if (!disciplinaClub) return
      const configuracionInicial = await ObtenerConfiguracion(disciplinaClub.id)
      setVista(configuracionInicial?.pantallaMostrar ?? PANTALLA_MOSTRAR.torneo)
    }
    obtenerConfiguracion()
  }, [disciplinaClub])

  const renderPantalla = () => {
    switch(vista) {
      case PANTALLA_MOSTRAR.partido:
        return <Partido />
      case PANTALLA_MOSTRAR.cuadro:
        return <Cuadro />
      default:
        return <Torneo />
    }
  }

  return (
    <ContenedorTableroUsuario>
      <EncabezadoPantalla>
        <BotonVolver onVolver={onVolver} />
        <Menu>
          <BotonMenuIzquierda seleccionado={vista === PANTALLA_MOSTRAR.partido} onClick={() => setVista(PANTALLA_MOSTRAR.partido)}>Partido en curso</BotonMenuIzquierda>
          <BotonMenu seleccionado={vista === PANTALLA_MOSTRAR.torneo}  onClick={() => setVista(PANTALLA_MOSTRAR.torneo)}>Torneo</BotonMenu>
          <BotonMenuDerecha seleccionado={vista === PANTALLA_MOSTRAR.cuadro}  onClick={() => setVista(PANTALLA_MOSTRAR.cuadro)}>Cuadro</BotonMenuDerecha>
        </Menu>
      </EncabezadoPantalla>
      { vista && renderPantalla() }
    </ContenedorTableroUsuario>
  )
}

export default TableroUsuario

import { useEffect, useState } from "react"
import Grupos from "./Grupos"
import Partido from "./Partido"
import Cuadro from './Cuadro'
import { ObtenerConfiguracion } from "../../Servicios/Configuracion"
import BotonVolver from "../Comunes/BotonVolver"
import { PANTALLA_MOSTRAR, PantallaMostrar } from "../../Tipos"
import { BotonMenu, BotonMenuDerecha, BotonMenuIzquierda, ContenedorTableroUsuario, EncabezadoPantalla, Menu } from "../../Estilos/Comunes"
import PartidosJugados from "./PartidosJugados"
import { useContextoGlobal } from "../../Contexto/contextoGlobal"
import SelectorTorneo from "../Comunes/SelectorTorneo"
import Ranking from "./Ranking"
import SelectorCategoria from "../Comunes/SelectorCategoria"

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
      setVista(configuracionInicial?.pantallaMostrar ?? PANTALLA_MOSTRAR.grupo)
    }
    obtenerConfiguracion()
  }, [disciplinaClub])

  const renderPantalla = () => {
    switch(vista) {
      case PANTALLA_MOSTRAR.partido:
        return <Partido />
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
    <ContenedorTableroUsuario>
      <EncabezadoPantalla>
        <BotonVolver onVolver={onVolver} />
        <Menu>
          <BotonMenuIzquierda seleccionado={vista === PANTALLA_MOSTRAR.partido} onClick={() => setVista(PANTALLA_MOSTRAR.partido)}>Partido en curso</BotonMenuIzquierda>
          <BotonMenu seleccionado={vista === PANTALLA_MOSTRAR.partidosJugados}  onClick={() => setVista(PANTALLA_MOSTRAR.partidosJugados)}>Partidos jugados</BotonMenu>
          <BotonMenu seleccionado={vista === PANTALLA_MOSTRAR.grupo}  onClick={() => setVista(PANTALLA_MOSTRAR.grupo)}>Grupos</BotonMenu>
          <BotonMenu seleccionado={vista === PANTALLA_MOSTRAR.cuadro}  onClick={() => setVista(PANTALLA_MOSTRAR.cuadro)}>Cuadro final</BotonMenu>
          <BotonMenuDerecha seleccionado={vista === PANTALLA_MOSTRAR.ranking}  onClick={() => setVista(PANTALLA_MOSTRAR.ranking)}>Ranking</BotonMenuDerecha>
        </Menu>
        {vista === PANTALLA_MOSTRAR.ranking ? <SelectorCategoria /> : <SelectorTorneo />}
      </EncabezadoPantalla>
      { vista && renderPantalla() }
    </ContenedorTableroUsuario>
  )
}

export default TableroUsuario

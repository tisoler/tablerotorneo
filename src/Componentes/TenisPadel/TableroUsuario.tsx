import { useEffect, useState } from "react"
import Grupos from "./Grupos"
import Partido from "./Partido"
import Cuadro from './Cuadro'
import { ObtenerConfiguracion } from "../../Servicios/Configuracion"
import BotonVolver from "../Comunes/BotonVolver"
import { PantallaMostrar } from "../../Tipos"
import { BotonMenu, BotonMenuDerecha, BotonMenuIzquierda, ContenedorTableroUsuario, EncabezadoPantalla, Menu } from "../../Estilos/Comunes"
import PartidosJugados from "./PartidosJugados"
import { useContextoGlobal } from "../../Contexto/contextoGlobal"
import SelectorTorneo from "../Comunes/SelectorTorneo"

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
      setVista(configuracionInicial?.pantallaMostrar ?? 'grupo')
    }
    obtenerConfiguracion()
  }, [disciplinaClub])

  const renderPantalla = () => {
    switch(vista) {
      case 'partido':
        return <Partido />
      case 'partidosJugados':
        return <PartidosJugados />
      case 'cuadro':
        return <Cuadro />
      default:
        return <Grupos />
    }
  }

  return (
    <ContenedorTableroUsuario>
      <EncabezadoPantalla>
        <BotonVolver onVolver={onVolver} />
        <Menu>
          <BotonMenuIzquierda seleccionado={vista === 'partido'} onClick={() => setVista('partido')}>Partido en curso</BotonMenuIzquierda>
          <BotonMenu seleccionado={vista === 'partidosJugados'}  onClick={() => setVista('partidosJugados')}>Partidos jugados</BotonMenu>
          <BotonMenu seleccionado={vista === 'grupo'}  onClick={() => setVista('grupo')}>Grupos</BotonMenu>
          <BotonMenuDerecha seleccionado={vista === 'cuadro'}  onClick={() => setVista('cuadro')}>Cuadro final</BotonMenuDerecha>
        </Menu>
        <SelectorTorneo />
      </EncabezadoPantalla>
      { vista && renderPantalla() }
    </ContenedorTableroUsuario>
  )
}

export default TableroUsuario

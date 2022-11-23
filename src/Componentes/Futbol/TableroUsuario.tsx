import { useEffect, useState } from "react"
import Partido from "./Partido"
import Torneo from './Torneo'
import { ObtenerConfiguracion } from "../../Servicios/Configuracion"
import BotonVolver from "../Comunes/BotonVolver"
import { PantallaMostrar } from "../../Tipos"
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
      setVista(configuracionInicial?.pantallaMostrar ?? 'torneo')
    }
    obtenerConfiguracion()
  }, [disciplinaClub])

  const renderPantalla = () => {
    switch(vista) {
      case 'partido':
        return <Partido />
      case 'cuadro':
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
          <BotonMenuIzquierda seleccionado={vista === 'partido'} onClick={() => setVista('partido')}>Partido en curso</BotonMenuIzquierda>
          <BotonMenu seleccionado={vista === 'torneo'}  onClick={() => setVista('torneo')}>Torneo</BotonMenu>
          <BotonMenuDerecha seleccionado={vista === 'cuadro'}  onClick={() => setVista('cuadro')}>Cuadro</BotonMenuDerecha>
        </Menu>
      </EncabezadoPantalla>
      { vista && renderPantalla() }
    </ContenedorTableroUsuario>
  )
}

export default TableroUsuario

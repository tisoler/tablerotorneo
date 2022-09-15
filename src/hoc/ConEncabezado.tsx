import Encabezado from "../Componentes/Encabezado"

export default (Component: React.ElementType) => {
  return (
    <>
      <Encabezado />
      <Component />
    </>
  )
}

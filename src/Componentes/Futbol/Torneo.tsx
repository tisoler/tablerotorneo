import styled from "styled-components"

const Torneo = () => {
  return (
    <NoTorneo>No hay información sobre torneos.</NoTorneo>
  )
}

const NoTorneo = styled.div`
  margin-top: 50px;
  color: #fff;
  font-size: 25px;
`

export default Torneo

import styled from 'styled-components'

export const Aside = styled.aside`
  padding: 16px;
  background-color: #eee;
  height: 100vh;
`

export const Filtros = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  margin-top: 16px;
`

export const CampoBuscarContainer = styled.div`
  position: relative;
  width: 100%;
`

export const IconeBuscar = styled.i`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #666666;
  cursor: pointer;
`

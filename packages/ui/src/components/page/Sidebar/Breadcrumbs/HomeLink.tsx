import React from 'react'
import styled from 'styled-components'
import { HomeSymbol } from '../../../../components/icons/symbols/HomeSymbol'
import { Colors } from '../../../../constants/styles'

export function HomeLink() {
  return (
    <ToHomeLink href="#">
      <HomeSymbol />
    </ToHomeLink>
  )
}

const ToHomeLink = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover {
    .blackPart {
      fill: ${Colors.Blue[500]};
    }
    .primaryPart {
      fill: ${Colors.Black[900]};
    }
  }
`
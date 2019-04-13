import 'reset-css';
import styled from 'styled-components';

export const Global = styled.div`
  * {
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.fonts.family.system};
  }
`;

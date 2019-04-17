import styled from 'styled-components';

export const Letters = styled.div`
  width: 100%;
  display: flex;
`;

export const Letter = styled.div`
  padding: 0 4px;
  color: ${({ hasEnterprises }) =>
    hasEnterprises ? '#000' : 'rgba(0, 0, 0, 0.2)'};
  cursor: ${({ hasEnterprises }) =>
    hasEnterprises ? 'pointer' : 'not-allowed'};
`;

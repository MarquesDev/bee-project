import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 24px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  background-color: white;
  border-radius: 4px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

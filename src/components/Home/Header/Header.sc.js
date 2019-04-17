import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  display: flex;
  height: 50px;
  align-items: center;
  padding: 0 24px;
`;

export const Logo = styled.div`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.grey[900]};
`;

export const Links = styled.div`
  display: flex;
  margin-left: auto;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.grey[800]};
  text-decoration: none;
  font-size: 14px;
  padding-left: 16px;
`;

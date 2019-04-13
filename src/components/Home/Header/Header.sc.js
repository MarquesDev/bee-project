import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
  height: 50px;
  align-items: center;
  padding: 0 24px;
`;

export const Logo = styled.div``;

export const Links = styled.a`
  display: flex;
  margin-left: auto;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.grey[600]};
  text-decoration: none;
  font-size: 14px;
`;

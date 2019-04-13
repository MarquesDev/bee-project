import styled from 'styled-components';

export const Container = styled.footer`
  width: 100%;
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.colors.grey[200]};
  padding: 40px 0;
`;

export const MiddleAlignment = styled.div`
  margin: auto;
  display: flex;
  width: 100%;
  max-width: 1080px;
  justify-content: space-between;
`;

export const Column = styled.div`
  padding: ${({ theme }) => theme.spacing.unit}px;
`;

export const Title = styled.h3`
  padding-bottom: ${({ theme }) => theme.spacing.unit}px;
  color: ${({ theme }) => theme.colors.grey[900]};
  font-size: 14px;
  font-weight: 500;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.grey[600]};
  text-decoration: none;
  font-size: 14px;
`;

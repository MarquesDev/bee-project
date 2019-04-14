import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 24px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  background-color: white;
  border-radius: 4px;
  margin-top: ${({ margin, theme }) => (margin ? theme.spacing.unit * 2 : 0)}px;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EnterpriseName = styled.div`
  margin-top: 8px;
`;

export const SubTitle = styled.div`
  padding-bottom: 8px;
`;

export const Image = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.grey[100]};
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${({ src }) => src});
`;

export const Info = styled.div``;
export const InfoLabel = styled.span`
  font-weight: bold;
`;
export const InfoValue = styled.span``;

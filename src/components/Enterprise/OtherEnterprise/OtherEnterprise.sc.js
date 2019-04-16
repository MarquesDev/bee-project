import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 24px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  background-color: white;
  border-radius: 4px;
  margin-top: ${({ margin, theme }) => (margin ? theme.spacing.unit * 2 : 0)}px;
  display: flex;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Left = styled.div``;
export const Right = styled.div`
  padding-left: 16px;
`;

export const EnterpriseName = styled.div``;

export const SubTitle = styled.div`
  padding-bottom: 8px;
`;

export const Image = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.grey[100]};
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 100%;
  background-image: url(${({ src }) => src});
`;

export const Info = styled.div``;
export const InfoLabel = styled.span`
  font-weight: bold;
`;
export const InfoValue = styled.span``;

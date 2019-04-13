import styled from 'styled-components';

export const Container = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  background-color: white;
  overflow: hidden;
  border-radius: 8px;
  margin-top: 20px;
`;

export const Input = styled.input`
  border: 0;
  height: 100%;
  width: 100%;
  margin: 0;
  background-color: transparent;
  padding: 0 16px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
`;

export const Button = styled.button`
  border: 0;
  height: 100%;
  margin: 0;
  flex-shrink: 0;
  text-transform: uppercase;
  font-size: 12px;
  padding: 0 24px;
  color: #3e2216;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.amber[500]};
`;

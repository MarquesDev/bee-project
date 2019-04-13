import styled from 'styled-components';

const getColor = ({ color, theme }) => {
  if (color === 'orange') return theme.colors.amber[500];
  if (color === 'grey') return theme.colors.grey[50];
  return 'white';
};

export const Background = styled.div`
  background-color: ${getColor};
`;

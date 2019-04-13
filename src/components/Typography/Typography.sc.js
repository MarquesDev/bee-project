import styled from 'styled-components';

const getWeight = (weight = 'regular') => {
  const weights = {
    regular: 400,
    medium: 500,
    'semi-bold': 600,
    bold: 700,
  };

  return weights[weight] || weights.regular;
};

const getBaseStyle = ({ theme, ...props }) => ({
  color: theme.colors.grey[900],
  fontFamily: theme.fonts.family.system,
  fontWeight: getWeight(props.weight),
  fontSize: '14px',
  lineHeight: '21px',
});

export const Base = styled.span(props => ({
  ...getBaseStyle(props),
}));

export const Small = styled.span(props => ({
  ...getBaseStyle(props),
  fontSize: '12px',
  lineHeight: '18px',
}));

export const Large = styled.span(props => ({
  ...getBaseStyle(props),
  fontSize: '16px',
  lineHeight: '24px',
}));

const getSize = (fontSize, lineHeight, fontWeight = 'medium') => ({
  fontSize,
  lineHeight,
  fontWeight: getWeight(fontWeight),
});

const getTitleVariant = ({ variant }) => {
  const variants = {
    '1': getSize('32px', '40px', 'bold'),
    '2': getSize('28px', '36px', 'bold'),
    '3': getSize('21px', '30px', 'bold'),
    '4': getSize('21px', '30px'),
  };

  return variants[variant] || variants[4];
};

export const Title = styled.span(props => ({
  ...getBaseStyle(props),
  ...getTitleVariant(props),
}));

const getBrandingVariant = ({ variant }) => {
  const variants = {
    '1': getSize('42px', '48px', 'semi-bold'),
    '2': getSize('28px', '36px', 'medium'),
  };

  return variants[variant] || variants[4];
};

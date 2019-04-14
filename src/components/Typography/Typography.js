import React from 'react';

import { Base, Small, Large, Title } from './Typography.sc';

// export type TypographyType = {
//   /** The size */
//   type?: 'base' | 'small' | 'large' | 'title' | 'branding',
//   /** The font-weigth */
//   weight?: 'regular' | 'semi-bold' | 'bold',
//   /** Title & branding size */
//   variant?: '1' | '2' | '3' | '4',
// };

export function Typography(props) {
  if (props.type === 'base') return <Base {...props} />;
  if (props.type === 'small') return <Small {...props} />;
  if (props.type === 'large') return <Large {...props} />;
  if (props.type === 'title') return <Title {...props} />;

  return <Base {...props} />;
}

Typography.defaultProps = {
  type: 'base',
  weight: 'regular',
  variant: '4',
};

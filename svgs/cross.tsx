import React, { ReactElement } from 'react';
import { SVGProps } from './type';

export default function CrossIcon(props: SVGProps): ReactElement {
  const { fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      style={{
        position: 'relative',
        left: 4,
        top: 4,
      }}
      {...props}
    >
      <circle fill={fill ?? '#d75a4a'} cx="25" cy="25" r="25" />
      <path fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeMiterlimit="10" d="m16 34 9-9 9-9M16 16l9 9 9 9" />
    </svg>
  );
}

import React, { ReactElement } from 'react';
import { SVGProps } from './type';

export default function ErrorIcon(props: SVGProps): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 488"
      style={{
        position: 'relative',
        left: 4,
        top: 4,
      }}
      {...props}
    >
      <path d="m484.125 412.013-212.2-367.6c-12.3-21.3-43.1-21.3-55.4 0l-212.2 367.6c-12.3 21.3 3.1 48 27.7 48h424.4c24.6 0 40-26.7 27.7-48zm-239.6-254.4c13.6 0 24.6 11.3 24.2 24.9l-4 139.6c-.3 11-9.3 19.7-20.3 19.7s-20-8.8-20.3-19.7l-3.9-139.6c-.3-13.6 10.6-24.9 24.3-24.9zm-.3 252.5c-13.9 0-25.2-11.3-25.2-25.2 0-13.9 11.3-25.2 25.2-25.2s25.2 11.3 25.2 25.2-11.3 25.2-25.2 25.2z" />
    </svg>
  );
}

import React, { ReactElement } from 'react';
import { SVGProps } from './type';

export default function XBOXIcon(props: SVGProps): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      {...props}
    >
      <path d="M40 32.08C40.04 32.08 40.1 32.12 40.13 32.15C52.09 41.25 72.58 63.76 66.33 70.11C59.29 76.27 50.08 80 40 80C29.92 80 20.71 76.27 13.67 70.11C7.42 63.75 27.91 41.24 39.87 32.15C39.9 32.12 39.95 32.08 40 32.08V32.08ZM60.84 5.85C54.71 2.21 48.07 0 40 0C31.93 0 25.29 2.21 19.16 5.85C19.1259 5.86907 19.1 5.89992 19.0871 5.93675C19.0743 5.97359 19.0753 6.01386 19.09 6.05C19.12 6.12 19.2 6.14 19.28 6.12C27.03 4.45 38.79 11.14 39.91 11.81C39.94 11.82 39.96 11.84 39.99 11.84C40.02 11.84 40.05 11.82 40.07 11.81C41.19 11.14 52.95 4.45 60.7 6.12C60.78 6.14 60.86 6.12 60.89 6.05C60.94 5.98 60.91 5.89 60.84 5.85V5.85ZM12 11.48C11.93 11.51 11.88 11.56 11.82 11.62C4.52 18.86 0 28.9 0 40C0 49.11 3.05 57.51 8.18 64.23C8.23 64.29 8.32 64.34 8.39 64.29C8.46 64.25 8.46 64.16 8.44 64.08C5.39 54.65 20.98 31.8 29.03 22.21C29.06 22.18 29.08 22.14 29.08 22.09C29.08 22.03 29.05 21.99 29.01 21.96C16.82 9.84 12.67 11.13 12 11.48ZM50.98 21.98C50.9593 21.995 50.9423 22.0145 50.9302 22.037C50.918 22.0595 50.9111 22.0845 50.91 22.11C50.91 22.16 50.94 22.19 50.96 22.23C59.01 31.81 74.6 54.67 71.55 64.1C71.52 64.18 71.53 64.27 71.6 64.31C71.67 64.35 71.76 64.31 71.81 64.25C77.1326 57.2874 80.0112 48.7641 80 40C80 28.9 75.48 18.86 68.18 11.61C68.1265 11.5556 68.0659 11.5085 68 11.47C67.33 11.13 63.18 9.84 50.98 21.98Z" />
    </svg>
  );
}

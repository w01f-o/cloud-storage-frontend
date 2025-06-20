import { Locale } from 'next-intl';
import { FC, ReactNode, SVGAttributes } from 'react';

interface FlagIconProps extends SVGAttributes<HTMLOrSVGElement> {
  locale: Locale;
}

export const IconFlag: FC<FlagIconProps> = ({ locale, ...props }) => {
  const icons: Record<Locale, ReactNode> = {
    ru: (
      <svg
        width='40'
        height='26.75'
        viewBox='0 0 513 343'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <g clipPath='url(#clip0_301_429)'>
          <path d='M0 0.986328V342.985H513V0.986328H0Z' fill='white' />
          <path d='M0 0.989258H513V342.993H0V0.989258Z' fill='#0052B4' />
          <path d='M0 0.989258H513V114.986H0V0.989258Z' fill='white' />
          <path d='M0 228.984H513V342.982H0V228.984Z' fill='#D80027' />
        </g>
        <defs>
          <clipPath id='clip0_301_429'>
            <rect y='0.989258' width='513' height='342' rx='52' fill='white' />
          </clipPath>
        </defs>
      </svg>
    ),
    en: (
      <svg
        width='40'
        height='26.75'
        viewBox='0 0 513 343'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <g clipPath='url(#clip0_301_131)'>
          <path d='M0 0.957031H513V342.957H0V0.957031Z' fill='white' />
          <path
            d='M0 0.957031H513V27.257H0V0.957031ZM0 53.557H513V79.857H0V53.557ZM0 106.157H513V132.457H0V106.157ZM0 158.757H513V185.057H0V158.757ZM0 211.457H513V237.757H0V211.457ZM0 264.057H513V290.357H0V264.057ZM0 316.657H513V342.957H0V316.657Z'
            fill='#D80027'
          />
          <path d='M0 0.957031H256.5V185.057H0V0.957031Z' fill='#2E52B2' />
          <path
            d='M47.8002 139.857L43.8002 127.057L39.4002 139.857H26.2002L36.9002 147.557L32.9002 160.357L43.8002 152.457L54.4002 160.357L50.3002 147.557L61.2002 139.857H47.8002ZM104.1 139.857L100 127.057L95.8002 139.857H82.6002L93.3002 147.557L89.3002 160.357L100 152.457L110.8 160.357L106.8 147.557L117.5 139.857H104.1ZM160.6 139.857L156.3 127.057L152.3 139.857H138.8L149.8 147.557L145.6 160.357L156.3 152.457L167.3 160.357L163.1 147.557L173.8 139.857H160.6ZM216.8 139.857L212.8 127.057L208.6 139.857H195.3L206.1 147.557L202.1 160.357L212.8 152.457L223.6 160.357L219.3 147.557L230.3 139.857H216.8ZM100 76.2572L95.8002 89.0572H82.6002L93.3002 96.9572L89.3002 109.557L100 101.757L110.8 109.557L106.8 96.9572L117.5 89.0572H104.1L100 76.2572ZM43.8002 76.2572L39.4002 89.0572H26.2002L36.9002 96.9572L32.9002 109.557L43.8002 101.757L54.4002 109.557L50.3002 96.9572L61.2002 89.0572H47.8002L43.8002 76.2572ZM156.3 76.2572L152.3 89.0572H138.8L149.8 96.9572L145.6 109.557L156.3 101.757L167.3 109.557L163.1 96.9572L173.8 89.0572H160.6L156.3 76.2572ZM212.8 76.2572L208.6 89.0572H195.3L206.1 96.9572L202.1 109.557L212.8 101.757L223.6 109.557L219.3 96.9572L230.3 89.0572H216.8L212.8 76.2572ZM43.8002 25.6572L39.4002 38.2572H26.2002L36.9002 46.1572L32.9002 58.8572L43.8002 50.9572L54.4002 58.8572L50.3002 46.1572L61.2002 38.2572H47.8002L43.8002 25.6572ZM100 25.6572L95.8002 38.2572H82.6002L93.3002 46.1572L89.3002 58.8572L100 50.9572L110.8 58.8572L106.8 46.1572L117.5 38.2572H104.1L100 25.6572ZM156.3 25.6572L152.3 38.2572H138.8L149.8 46.1572L145.6 58.8572L156.3 50.9572L167.3 58.8572L163.1 46.1572L173.8 38.2572H160.6L156.3 25.6572ZM212.8 25.6572L208.6 38.2572H195.3L206.1 46.1572L202.1 58.8572L212.8 50.9572L223.6 58.8572L219.3 46.1572L230.3 38.2572H216.8L212.8 25.6572Z'
            fill='white'
          />
        </g>
        <defs>
          <clipPath id='clip0_301_131'>
            <rect y='0.957031' width='513' height='342' rx='52' fill='white' />
          </clipPath>
        </defs>
      </svg>
    ),
  };

  return icons[locale];
};

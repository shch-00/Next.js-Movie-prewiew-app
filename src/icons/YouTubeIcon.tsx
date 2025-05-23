import React from "react";

interface OkIconProps extends React.SVGProps<SVGSVGElement> {}

const PassIcon: React.FC<OkIconProps> = (props) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.0013 13.0496C24.6622 13.2309 25.1827 13.7653 25.3593 14.4439C25.6803 15.6738 25.6803 18.24 25.6803 18.24C25.6803 18.24 25.6803 20.8061 25.3593 22.036C25.1827 22.7146 24.6622 23.249 24.0013 23.4305C22.8035 23.76 18.0003 23.76 18.0003 23.76C18.0003 23.76 13.1971 23.76 11.9993 23.4305C11.3383 23.249 10.8179 22.7146 10.6412 22.036C10.3203 20.8061 10.3203 18.24 10.3203 18.24C10.3203 18.24 10.3203 15.6738 10.6412 14.4439C10.8179 13.7653 11.3383 13.2309 11.9993 13.0496C13.1971 12.72 18.0003 12.72 18.0003 12.72C18.0003 12.72 22.8035 12.72 24.0013 13.0496ZM16.5603 16.0802V20.8802L20.4003 18.4803L16.5603 16.0802Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
  </svg>
);

export default PassIcon;

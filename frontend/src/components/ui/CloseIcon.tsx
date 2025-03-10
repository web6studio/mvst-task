type CloseIconProps = {
  onClick?: () => void;
  width?: number;
  height?: number;
};

export const CloseIcon = ({
  onClick,
  width = 20,
  height = 20,
}: CloseIconProps) => (
  <button
    onClick={onClick}
    className="flex-shrink-0 hover:opacity-80 transition-opacity"
  >
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

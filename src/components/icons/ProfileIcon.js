export default function ProfileIcon({ color = "currentColor", size = 24, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip_path_profile)">
        <path 
          d="M24 0C10.7466 0 0 10.7449 0 24C0 37.2551 10.7455 48 24 48C37.2556 48 48 37.2551 48 24C48 10.7449 37.2556 0 24 0ZM24.0001 7.17628C28.3856 7.17628 31.9393 10.7312 31.9393 15.1148C31.9393 19.4994 28.3856 23.0533 24.0001 23.0533C19.6167 23.0533 16.063 19.4994 16.063 15.1148C16.063 10.7312 19.6167 7.17628 24.0001 7.17628ZM23.9947 41.7251C19.6208 41.7251 15.6148 40.1321 12.5249 37.4954C11.7722 36.8534 11.3379 35.912 11.3379 34.9241C11.3379 30.4784 14.9359 26.9203 19.3825 26.9203C19.3825 26.9203 28.6194 26.9203 28.6194 26.9203C33.0671 26.9203 36.6514 30.4784 36.6514 34.9241C36.6514 35.913 36.2192 36.8523 35.4654 37.4944C32.3766 40.1321 28.3696 41.7251 23.9947 41.7251Z" 
          fill={color === "white" ? "#FFFFFF" : color} 
          transform="translate(0.185 -0.185)" 
        />
      </g>
      <defs>
        <clipPath id="clip_path_profile">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}


const BilibiliIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* 天线 */}
    <path d="M7 4 L9 7" />
    <path d="M17 4 L15 7" />
    {/* 电视机外框 */}
    <rect x="4" y="7" width="16" height="13" rx="3" />
    {/* 眼睛 */}
    <circle cx="9" cy="13" r="1" fill="currentColor" />
    <circle cx="15" cy="13" r="1" fill="currentColor" />
    {/* 微笑嘴巴 */}

  </svg>
);

export default BilibiliIcon;

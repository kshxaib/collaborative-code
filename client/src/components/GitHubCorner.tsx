import { useSettings } from "@/context/SettingContext";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { RiTeamFill } from "react-icons/ri";

export default function TeamCorner() {
  const { showGitHubCorner } = useSettings();
  const { width } = useWindowDimensions();
  if (!showGitHubCorner || width <= 640) return null;

  return (
    <a
      href="/team-info"
      className="team-corner absolute right-0 top-0 z-10"
      aria-label="View Team Info"
      target="_blank"
      rel="noreferrer"
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 250 250"
        className="text-white fill-background"
        aria-hidden="true"
      >
        {/* Background Triangle Similar to GitHub Corner */}
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />

        {/* Team Icon - Adjusted Downward */}
        <g
          className="team-icon"
          style={{
            transformOrigin: "150px 60px", // Moved slightly downward
            transform: "rotate(45deg)", // Tilts the icon
          }}
        >
          <foreignObject x="150" y="50" width="80" height="80">  
            {/* 'y' value increased to move it down */}
            <RiTeamFill size={80} className="text-white" />
          </foreignObject>
        </g>
      </svg>
    </a>
  );
}

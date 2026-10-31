import React from 'react';
import { GoalSide, SportType } from '../types';

interface FieldCanvasProps {
  sport: SportType;
  goalSide: GoalSide;
  children?: React.ReactNode;
}

export const FieldCanvas: React.FC<FieldCanvasProps> = ({ sport, goalSide, children }) => {
  // We define the half field on a coordinate system of 1000 x 600
  // If goalSide is 'left', goal is at x=0, half-line is at x=1000.
  // If goalSide is 'right', goal is at x=1000, half-line is at x=0.
  const isLeft = goalSide === 'left';

  return (
    <div className="relative w-full h-full select-none overflow-hidden touch-none">
      {/* Background SVG Field Markings */}
      <svg
        className="w-full h-full block"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soccer Grass Pattern */}
          <pattern id="soccerStripes" width="100" height="600" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="50" height="600" fill="#15803d" />
            <rect x="50" y="0" width="50" height="600" fill="#166534" />
          </pattern>

          {/* Field Hockey Turf Texture */}
          <pattern id="hockeyTurf" width="80" height="600" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="40" height="600" fill="#0284c7" />
            <rect x="40" y="0" width="40" height="600" fill="#0369a1" />
          </pattern>

          {/* Lacrosse Turf Pattern */}
          <pattern id="lacrosseStripes" width="100" height="600" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="50" height="600" fill="#047857" />
            <rect x="50" y="0" width="50" height="600" fill="#065f46" />
          </pattern>

          {/* Goal Net Pattern */}
          <pattern id="netMesh" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 12 12 M 12 0 L 0 12" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* SPORT 1: SOCCER */}
        {sport === 'soccer' && (
          <g>
            {/* Field surface */}
            <rect width="1000" height="600" fill="url(#soccerStripes)" />
            {/* Outer touchlines border */}
            <rect x="15" y="15" width="970" height="570" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="5" />

            {isLeft ? (
              // Goal on Left, Halfway line on Right
              <>
                {/* Halfway line (Right edge) */}
                <line x1="985" y1="15" x2="985" y2="585" stroke="rgba(255,255,255,0.9)" strokeWidth="6" />
                {/* Center circle arc at halfway line */}
                <path d="M 985 200 A 100 100 0 0 0 985 400" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="5" />
                <circle cx="985" cy="300" r="5" fill="#ffffff" />

                {/* 18-yard Penalty Box */}
                <rect x="15" y="120" width="220" height="360" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="5" />
                {/* 6-yard Goal Box */}
                <rect x="15" y="210" width="80" height="180" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="5" />
                {/* Penalty Spot */}
                <circle cx="160" cy="300" r="5" fill="#ffffff" />
                {/* Penalty Arc (D) */}
                <path d="M 235 240 A 80 80 0 0 1 235 360" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="5" />
                {/* Goal structure */}
                <rect x="2" y="250" width="13" height="100" fill="url(#netMesh)" stroke="#ffffff" strokeWidth="3" />
                {/* Corner arcs */}
                <path d="M 15 45 A 30 30 0 0 0 45 15" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="4" />
                <path d="M 15 555 A 30 30 0 0 1 45 585" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="4" />
              </>
            ) : (
              // Goal on Right, Halfway line on Left
              <>
                {/* Halfway line (Left edge) */}
                <line x1="15" y1="15" x2="15" y2="585" stroke="rgba(255,255,255,0.9)" strokeWidth="6" />
                {/* Center circle arc */}
                <path d="M 15 200 A 100 100 0 0 1 15 400" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="5" />
                <circle cx="15" cy="300" r="5" fill="#ffffff" />

                {/* 18-yard Penalty Box */}
                <rect x="765" y="120" width="220" height="360" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="5" />
                {/* 6-yard Goal Box */}
                <rect x="905" y="210" width="80" height="180" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="5" />
                {/* Penalty Spot */}
                <circle cx="840" cy="300" r="5" fill="#ffffff" />
                {/* Penalty Arc (D) */}
                <path d="M 765 240 A 80 80 0 0 0 765 360" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="5" />
                {/* Goal structure */}
                <rect x="985" y="250" width="13" height="100" fill="url(#netMesh)" stroke="#ffffff" strokeWidth="3" />
                {/* Corner arcs */}
                <path d="M 985 45 A 30 30 0 0 1 955 15" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="4" />
                <path d="M 985 555 A 30 30 0 0 0 955 585" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="4" />
              </>
            )}
          </g>
        )}

        {/* SPORT 2: ICE HOCKEY */}
        {sport === 'hockey' && (
          <g>
            {/* Ice rink background */}
            <rect width="1000" height="600" fill="#e0f2fe" />

            {/* Board surrounds with curved corners on the goal side */}
            {isLeft ? (
              <>
                <path
                  d="M 985 20 L 150 20 Q 20 20 20 150 L 20 450 Q 20 580 150 580 L 985 580 Z"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="8"
                />
                {/* Red center line at right */}
                <line x1="980" y1="20" x2="980" y2="580" stroke="#dc2626" strokeWidth="10" strokeDasharray="25 15" />
                {/* Center faceoff circle */}
                <path d="M 980 200 A 100 100 0 0 0 980 400" fill="none" stroke="#0284c7" strokeWidth="4" />
                <circle cx="980" cy="300" r="8" fill="#0284c7" />

                {/* Blue line */}
                <line x1="650" y1="20" x2="650" y2="580" stroke="#2563eb" strokeWidth="12" />

                {/* Red goal line */}
                <line x1="120" y1="50" x2="120" y2="550" stroke="#dc2626" strokeWidth="5" />
                {/* Goal crease */}
                <path d="M 120 260 A 40 40 0 0 1 120 340 Z" fill="#93c5fd" fillOpacity="0.6" stroke="#dc2626" strokeWidth="4" />
                {/* Goal cage */}
                <rect x="90" y="275" width="30" height="50" fill="url(#netMesh)" stroke="#dc2626" strokeWidth="3" rx="4" />
                {/* Trapezoid behind goal */}
                <polygon points="120,200 20,160 20,440 120,400" fill="none" stroke="#dc2626" strokeWidth="3" />

                {/* Faceoff circles (top & bottom offensive zone) */}
                <circle cx="360" cy="160" r="85" fill="none" stroke="#dc2626" strokeWidth="4" />
                <circle cx="360" cy="160" r="6" fill="#dc2626" />
                <circle cx="360" cy="440" r="85" fill="none" stroke="#dc2626" strokeWidth="4" />
                <circle cx="360" cy="440" r="6" fill="#dc2626" />
              </>
            ) : (
              <>
                <path
                  d="M 15 20 L 850 20 Q 980 20 980 150 L 980 450 Q 980 580 850 580 L 15 580 Z"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="8"
                />
                {/* Red center line at left */}
                <line x1="20" y1="20" x2="20" y2="580" stroke="#dc2626" strokeWidth="10" strokeDasharray="25 15" />
                {/* Center faceoff circle */}
                <path d="M 20 200 A 100 100 0 0 1 20 400" fill="none" stroke="#0284c7" strokeWidth="4" />
                <circle cx="20" cy="300" r="8" fill="#0284c7" />

                {/* Blue line */}
                <line x1="350" y1="20" x2="350" y2="580" stroke="#2563eb" strokeWidth="12" />

                {/* Red goal line */}
                <line x1="880" y1="50" x2="880" y2="550" stroke="#dc2626" strokeWidth="5" />
                {/* Goal crease */}
                <path d="M 880 260 A 40 40 0 0 0 880 340 Z" fill="#93c5fd" fillOpacity="0.6" stroke="#dc2626" strokeWidth="4" />
                {/* Goal cage */}
                <rect x="880" y="275" width="30" height="50" fill="url(#netMesh)" stroke="#dc2626" strokeWidth="3" rx="4" />
                {/* Trapezoid */}
                <polygon points="880,200 980,160 980,440 880,400" fill="none" stroke="#dc2626" strokeWidth="3" />

                {/* Faceoff circles */}
                <circle cx="640" cy="160" r="85" fill="none" stroke="#dc2626" strokeWidth="4" />
                <circle cx="640" cy="160" r="6" fill="#dc2626" />
                <circle cx="640" cy="440" r="85" fill="none" stroke="#dc2626" strokeWidth="4" />
                <circle cx="640" cy="440" r="6" fill="#dc2626" />
              </>
            )}
          </g>
        )}

        {/* SPORT 3: LACROSSE */}
        {sport === 'lacrosse' && (
          <g>
            <rect width="1000" height="600" fill="url(#lacrosseStripes)" />
            {/* Field boundary */}
            <rect x="20" y="20" width="960" height="560" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="5" />

            {isLeft ? (
              <>
                {/* Centerline at right */}
                <line x1="975" y1="20" x2="975" y2="580" stroke="#ffffff" strokeWidth="6" />
                {/* Center "X" faceoff mark */}
                <line x1="960" y1="285" x2="990" y2="315" stroke="#ffffff" strokeWidth="4" />
                <line x1="960" y1="315" x2="990" y2="285" stroke="#ffffff" strokeWidth="4" />
                {/* Wing Lines */}
                <line x1="975" y1="140" x2="880" y2="140" stroke="#ffffff" strokeWidth="4" />
                <line x1="975" y1="460" x2="880" y2="460" stroke="#ffffff" strokeWidth="4" />

                {/* Restraining line (solid) */}
                <line x1="600" y1="20" x2="600" y2="580" stroke="#ffffff" strokeWidth="5" />

                {/* Goal Area / Crease (9ft radius circle) */}
                <circle cx="160" cy="300" r="75" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeWidth="5" />
                {/* Goal Line across crease */}
                <line x1="160" y1="230" x2="160" y2="370" stroke="#ffffff" strokeWidth="4" />
                {/* Triangular net cage */}
                <polygon points="160,270 120,300 160,330" fill="url(#netMesh)" stroke="#f97316" strokeWidth="4" />
                {/* Attack / Def Goal area box / box marks */}
                <line x1="380" y1="20" x2="380" y2="580" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeDasharray="10 10" />
              </>
            ) : (
              <>
                {/* Centerline at left */}
                <line x1="25" y1="20" x2="25" y2="580" stroke="#ffffff" strokeWidth="6" />
                {/* Center "X" faceoff mark */}
                <line x1="10" y1="285" x2="40" y2="315" stroke="#ffffff" strokeWidth="4" />
                <line x1="10" y1="315" x2="40" y2="285" stroke="#ffffff" strokeWidth="4" />
                {/* Wing Lines */}
                <line x1="25" y1="140" x2="120" y2="140" stroke="#ffffff" strokeWidth="4" />
                <line x1="25" y1="460" x2="120" y2="460" stroke="#ffffff" strokeWidth="4" />

                {/* Restraining line */}
                <line x1="400" y1="20" x2="400" y2="580" stroke="#ffffff" strokeWidth="5" />

                {/* Goal Area / Crease */}
                <circle cx="840" cy="300" r="75" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeWidth="5" />
                {/* Goal Line */}
                <line x1="840" y1="230" x2="840" y2="370" stroke="#ffffff" strokeWidth="4" />
                {/* Triangular net cage */}
                <polygon points="840,270 880,300 840,330" fill="url(#netMesh)" stroke="#f97316" strokeWidth="4" />
                <line x1="620" y1="20" x2="620" y2="580" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeDasharray="10 10" />
              </>
            )}
          </g>
        )}

        {/* SPORT 4: FIELD HOCKEY */}
        {sport === 'field_hockey' && (
          <g>
            <rect width="1000" height="600" fill="url(#hockeyTurf)" />
            {/* Outer border */}
            <rect x="20" y="20" width="960" height="560" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="5" />

            {isLeft ? (
              <>
                {/* Centerline on right */}
                <line x1="975" y1="20" x2="975" y2="580" stroke="#ffffff" strokeWidth="6" />
                <circle cx="975" cy="300" r="6" fill="#ffffff" />

                {/* 23m line (Quarter line) */}
                <line x1="520" y1="20" x2="520" y2="580" stroke="#ffffff" strokeWidth="4" strokeDasharray="20 10" />

                {/* Striking circle (the 'D' - 16 yard shooting circle) */}
                <path
                  d="M 20 140 L 100 140 A 160 160 0 0 1 100 460 L 20 460"
                  fill="rgba(255,255,255,0.15)"
                  stroke="#ffffff"
                  strokeWidth="5"
                />
                {/* 5-meter broken dotted circle outside D */}
                <path
                  d="M 20 90 L 110 90 A 210 210 0 0 1 110 510 L 20 510"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeDasharray="12 12"
                />
                {/* Penalty stroke spot (6.4m from goal) */}
                <circle cx="180" cy="300" r="5" fill="#ffffff" />
                {/* Goal cage on left */}
                <rect x="6" y="260" width="14" height="80" fill="url(#netMesh)" stroke="#f97316" strokeWidth="3" />
              </>
            ) : (
              <>
                {/* Centerline on left */}
                <line x1="25" y1="20" x2="25" y2="580" stroke="#ffffff" strokeWidth="6" />
                <circle cx="25" cy="300" r="6" fill="#ffffff" />

                {/* 23m line */}
                <line x1="480" y1="20" x2="480" y2="580" stroke="#ffffff" strokeWidth="4" strokeDasharray="20 10" />

                {/* Striking circle */}
                <path
                  d="M 975 140 L 895 140 A 160 160 0 0 0 895 460 L 975 460"
                  fill="rgba(255,255,255,0.15)"
                  stroke="#ffffff"
                  strokeWidth="5"
                />
                {/* 5-meter broken circle */}
                <path
                  d="M 975 90 L 885 90 A 210 210 0 0 0 885 510 L 975 510"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeDasharray="12 12"
                />
                {/* Penalty stroke spot */}
                <circle cx="820" cy="300" r="5" fill="#ffffff" />
                {/* Goal cage on right */}
                <rect x="975" y="260" width="14" height="80" fill="url(#netMesh)" stroke="#f97316" strokeWidth="3" />
              </>
            )}
          </g>
        )}
      </svg>

      {/* Goal Direction Subtle Badge / Visual Helper */}
      <div
        className={`absolute top-1.5 ${isLeft ? 'left-1.5' : 'right-1.5'} pointer-events-none px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-black/50 text-white/80 backdrop-blur-xs border border-white/20`}
      >
        {isLeft ? '← Goal' : 'Goal →'}
      </div>

      <div
        className={`absolute top-1.5 ${isLeft ? 'right-1.5' : 'left-1.5'} pointer-events-none px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-black/50 text-white/80 backdrop-blur-xs border border-white/20`}
      >
        Halfway
      </div>

      {/* Interactive layer on top for player tokens & drag target */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

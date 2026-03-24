"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

type Node = {
  slug: string;
  title: string;
  type: string;
  description: string;
  connections: { slug: string; label: string }[];
  x: number;
  y: number;
};

type ExploreGraphProps = {
  posts: {
    slug: string;
    title: string;
    type: string;
    description: string;
    connections: { slug: string; label: string }[];
  }[];
};

const TYPE_COLORS: Record<string, string> = {
  photo: "var(--accent)",
  technical: "var(--text-muted)",
  thought: "var(--text)",
};

function layoutNodes(
  posts: ExploreGraphProps["posts"],
  width: number,
  height: number
): Node[] {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.3;

  return posts.map((post, i) => {
    const angle = (i / posts.length) * Math.PI * 2 - Math.PI / 2;
    return {
      ...post,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    };
  });
}

export function ExploreGraph({ posts }: ExploreGraphProps) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    function updateSize() {
      if (svgRef.current?.parentElement) {
        const rect = svgRef.current.parentElement.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: Math.max(500, Math.min(rect.width * 0.75, 700)),
        });
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { width, height } = dimensions;
  const nodes = layoutNodes(posts, width, height);
  const nodeMap = new Map(nodes.map((n) => [n.slug, n]));

  // Build edges from connections
  const edges: { from: Node; to: Node; label: string }[] = [];
  const edgeSet = new Set<string>();
  for (const node of nodes) {
    for (const conn of node.connections) {
      const target = nodeMap.get(conn.slug);
      if (!target) continue;
      const key = [node.slug, target.slug].sort().join("--");
      if (edgeSet.has(key)) continue;
      edgeSet.add(key);
      edges.push({ from: node, to: target, label: conn.label });
    }
  }

  const isConnected = useCallback(
    (slug: string) => {
      if (!hoveredNode) return false;
      if (slug === hoveredNode) return true;
      const hovered = nodeMap.get(hoveredNode);
      if (!hovered) return false;
      return hovered.connections.some((c) => c.slug === slug);
    },
    [hoveredNode, nodeMap]
  );

  const nodeRadius = Math.max(6, Math.min(8, width / 100));

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full select-none"
      style={{ height: `${height}px` }}
    >
      {/* Edges */}
      {edges.map((edge) => {
        const active =
          hoveredNode &&
          (edge.from.slug === hoveredNode || edge.to.slug === hoveredNode);
        const dimmed = hoveredNode && !active;

        return (
          <g key={`${edge.from.slug}-${edge.to.slug}`}>
            <line
              x1={edge.from.x}
              y1={edge.from.y}
              x2={edge.to.x}
              y2={edge.to.y}
              stroke="var(--border)"
              strokeWidth={active ? 2 : 1}
              style={{
                opacity: dimmed ? 0.15 : active ? 1 : 0.4,
                transition: "opacity 0.3s, stroke-width 0.3s",
              }}
            />
            {/* Edge label on hover */}
            {active && (
              <text
                x={(edge.from.x + edge.to.x) / 2}
                y={(edge.from.y + edge.to.y) / 2 - 8}
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="11"
                fontStyle="italic"
                style={{ fontFamily: "var(--font-caption), Georgia, serif" }}
              >
                {edge.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((node) => {
        const active = !hoveredNode || isConnected(node.slug);
        const isHovered = hoveredNode === node.slug;

        return (
          <g
            key={node.slug}
            style={{
              cursor: "pointer",
              opacity: active ? 1 : 0.2,
              transition: "opacity 0.3s",
            }}
            onMouseEnter={() => setHoveredNode(node.slug)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => router.push(`/blog/${node.slug}`)}
          >
            {/* Halo on hover */}
            {isHovered && (
              <circle
                cx={node.x}
                cy={node.y}
                r={nodeRadius + 8}
                fill="none"
                stroke={TYPE_COLORS[node.type] || "var(--accent)"}
                strokeWidth="1"
                opacity="0.3"
              />
            )}

            {/* Node dot */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isHovered ? nodeRadius + 2 : nodeRadius}
              fill={TYPE_COLORS[node.type] || "var(--accent)"}
              style={{ transition: "r 0.2s" }}
            />

            {/* Title label */}
            <text
              x={node.x}
              y={node.y + nodeRadius + 18}
              textAnchor="middle"
              fill={isHovered ? "var(--text)" : "var(--text-muted)"}
              fontSize={isHovered ? "14" : "12"}
              fontWeight={isHovered ? "500" : "400"}
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                transition: "fill 0.3s, font-size 0.3s",
              }}
            >
              {node.title}
            </text>

            {/* Description on hover */}
            {isHovered && (
              <text
                x={node.x}
                y={node.y + nodeRadius + 36}
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="11"
                style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              >
                {node.description.length > 60
                  ? node.description.slice(0, 57) + "..."
                  : node.description}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

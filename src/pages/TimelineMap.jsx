import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import PageTransition from '../components/PageTransition';
import { entries } from '../data/mcuData';
import './TimelineMap.css';

// ---------------------------------------------------------------------------
// Custom Node Component: TVA Monitor Style
// ---------------------------------------------------------------------------
const TvaNode = ({ data }) => {
  return (
    <div className={`tva-node ${data.isBranch ? 'branch-node' : ''}`}>
      <Handle type="target" position={Position.Left} style={{ background: '#555', opacity: 0 }} />
      <span className="tva-node-type">{data.type}</span>
      <h3 className="tva-node-title">{data.title}</h3>
      <span className="tva-node-year">{data.year}</span>
      <Handle type="source" position={Position.Right} style={{ background: '#555', opacity: 0 }} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Generate Nodes and Edges Programmatically
// ---------------------------------------------------------------------------
const BRANCH_IDS = [
  'loki-season-1',
  'what-if-season-1',
  'spider-man-no-way-home',
  'doctor-strange-in-the-multiverse-of-madness',
  'loki-season-2',
  'what-if-season-2',
  'deadpool-and-wolverine'
];

const DEFENDERS_IDS = [
  'daredevil-season-1',
  'jessica-jones-season-1',
  'daredevil-season-2',
  'luke-cage-season-1',
  'iron-fist-season-1',
  'the-defenders',
  'the-punisher-season-1',
  'jessica-jones-season-2',
  'luke-cage-season-2',
  'iron-fist-season-2',
  'daredevil-season-3',
  'the-punisher-season-2',
  'jessica-jones-season-3'
];

// Sort entries by release order for the layout
const sortedEntries = [...entries].sort((a, b) => a.releaseOrder - b.releaseOrder);

const generateLayout = () => {
  const initialNodes = [];
  const initialEdges = [];

  let trunkIndex = 0;
  let branchIndex = 0;
  let defendersIndex = 0;

  let lastTrunkId = null;

  sortedEntries.forEach((entry, i) => {
    const isBranch = BRANCH_IDS.includes(entry.id);
    const isDefender = DEFENDERS_IDS.includes(entry.id);
    const isTrunk = !isBranch && !isDefender;

    // Determine Y position based on timeline "lane"
    let yPos = 250; // Main trunk
    if (isBranch) {
      yPos = 550; // Multiverse branch goes down
      branchIndex++;
    } else if (isDefender) {
      yPos = -50; // Defenders street-level goes up
      defendersIndex++;
    }

    // Determine X position
    const xPos = isTrunk ? trunkIndex * 350 : (isBranch ? branchIndex * 350 + 7500 /* Push variants later in timeline */ : defendersIndex * 350 + 2000);
    
    if (isTrunk) trunkIndex++;

    initialNodes.push({
      id: entry.id,
      type: 'tvaNode',
      position: { x: xPos, y: yPos },
      data: {
        title: entry.title,
        type: entry.type,
        year: entry.releaseYear,
        isBranch
      }
    });

    // Create edges connecting the main trunk sequentially
    if (isTrunk) {
      if (lastTrunkId) {
        initialEdges.push({
          id: `e-${lastTrunkId}-${entry.id}`,
          source: lastTrunkId,
          target: entry.id,
          type: 'smoothstep',
        });
      }
      lastTrunkId = entry.id;
    }
  });

  // Manually attach branch entry points
  const connectBranch = (sourceId, targetId) => {
    if (initialNodes.some(n => n.id === targetId)) {
      initialEdges.push({
        id: `e-${sourceId}-${targetId}`,
        source: sourceId,
        target: targetId,
        type: 'smoothstep',
        className: 'branch-edge',
        animated: true,
      });
    }
  };

  // Connect specific branches
  connectBranch('avengers-endgame', 'loki-season-1');
  connectBranch('avengers-age-of-ultron', 'daredevil-season-1');
  // Connect Loki back to the multiverse saga
  connectBranch('loki-season-1', 'spider-man-no-way-home');
  connectBranch('spider-man-no-way-home', 'doctor-strange-in-the-multiverse-of-madness');

  return { initialNodes, initialEdges };
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
const TimelineMap = () => {
  const nodeTypes = useMemo(() => ({ tvaNode: TvaNode }), []);
  
  const { initialNodes, initialEdges } = useMemo(() => generateLayout(), []);
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <PageTransition>
      <div className="timeline-map-container">
        {/* Header Overlay */}
        <header className="map-header">
          <Link to="/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13l-5-5 5-5" />
            </svg>
            TVA Mainframe
          </Link>
          <div style={{ textAlign: 'right' }}>
            <h1 className="map-title">Timeline Map</h1>
            <span className="map-subtitle">TEMPORAL MONITOR // MULTIVERSE TOPOLOGY</span>
          </div>
        </header>

        {/* Interactive React Flow Canvas */}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2, minZoom: 0.2 }}
          minZoom={0.1}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        >
          <Background color="rgba(237, 230, 214, 0.05)" gap={32} />
          <Controls />
          <MiniMap 
            nodeColor={(n) => {
              if (n.data?.isBranch) return '#c1440e';
              return '#f2a93b';
            }}
          />
        </ReactFlow>
      </div>
    </PageTransition>
  );
};

export default TimelineMap;

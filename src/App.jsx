import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css'; 

const styles = {
  background: 'blue grey',
  width: '100%',
  height:900,
};

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* Componente ReactFlow que renderiza o gráfico com os nós e arestas */}
      <ReactFlow
        style={styles}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        {/* TODO: Adicionar controles de interação com o gráfico (zoom, reset, etc.) */}
        <Controls />
        
        {/* TODO: Adicionar mini mapa que exibe uma visão geral reduzida do gráfico */}
        <MiniMap />
        
        {/* TODO: Adicionar fundo com padrão de pontos para ajudar na visualização e organização do gráfico */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

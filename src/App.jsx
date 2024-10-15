import { useState } from 'react';
import {
  ReactFlowProvider,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  NodeToolbar,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';
import CubeNode from './cubo';
import TriangleNode from './triangulo';

const styles = {
  background: 'blue grey',
  width: '100%',
  height: 900,
};

const initialNodes = [
  { id: '1', position: { x: 100, y: 100 }, data: { label: 'Nó 1', shape: 'cubo' }, type: 'cubeNode' },
  { id: '2', position: { x: 300, y: 200 }, data: { label: 'Nó 2', shape: 'triângulo' }, type: 'triangleNode' },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
];

const nodeTypes = {
  cubeNode: CubeNode,
  triangleNode: TriangleNode,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [mostrarPropriedades, setMostrarPropriedades] = useState(false);
  const [novaForma, setNovaForma] = useState('cubo');

  const aoClicarNoNo = (event, node) => {
    setSelectedNode(node);
    setMostrarPropriedades(false);
  };

  const aoConectar = (params) => setEdges((eds) => addEdge(params, eds));

  const excluirNo = () => {
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setSelectedNode(null);
  };

  const salvarForma = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            type: novaForma === 'cubo' ? 'cubeNode' : 'triangleNode',
            data: { ...node.data, shape: novaForma },
          };
        }
        return node;
      })
    );
    setMostrarPropriedades(false);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlowProvider>
        <ReactFlow
          style={styles}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={aoConectar}
          fitView
          nodeTypes={nodeTypes}
          onNodeClick={aoClicarNoNo}
        >
          {selectedNode && (
            <NodeToolbar
              nodeId={selectedNode.id}
              isVisible={true}
              position="top"
            >
              {!mostrarPropriedades ? (
                <div>
                  <button onClick={excluirNo}>Excluir</button>
                  <button onClick={() => setMostrarPropriedades(true)}>Propriedades</button>
                </div>
              ) : (
                <div>
                  <label>
                    <input
                      type="radio"
                      name="shape"
                      value="cubo"
                      checked={novaForma === 'cubo'}
                      onChange={(e) => setNovaForma(e.target.value)}
                    />
                    Cubo
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="shape"
                      value="triangulo"
                      checked={novaForma === 'triangulo'}
                      onChange={(e) => setNovaForma(e.target.value)}
                    />
                    Triângulo
                  </label>
                  <button onClick={salvarForma}>Salvar</button>
                  <button onClick={() => setMostrarPropriedades(false)}>Voltar</button>
                </div>
              )}
            </NodeToolbar>
          )}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

import { useCallback, useState } from 'react';
import {
  ReactFlowProvider,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  NodeToolbar
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
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1', shape: 'cubo' }, type: 'cubeNode', },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2', shape: 'triangulo' }, type: 'triangleNode'}
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [newShape, setNewShape] = useState('cubo');

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = (event, node) => {
    setSelectedNode(node);
    setNewShape(node.data.shape);
  };

  const salvarForma = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            type: newShape === 'cubo' ? 'cubeNode' : 'triangleNode',
            data: { ...node.data, shape: newShape },
          };
        }
        return node;
      })
    );
    setModalOpen(false);
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
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          preventScrolling={false}
          onNodeDoubleClick={onNodeClick}
        >

        </ReactFlow>

        {selectedNode && (
          <NodeToolbar
            nodeId={selectedNode.id}  // Conecta a toolbar ao nó selecionado
            isVisible={true}  // Mostra a toolbar sempre que um nó for selecionado
            position="top"
          >
            <div>
              <label>
                <input
                  type="radio"
                  name="shape"
                  value="cubo"
                  checked={newShape === 'cubo'}
                  onChange={(e) => setNewShape(e.target.value)}
                />
                Cubo
              </label>
              <label>
                <input
                  type="radio"
                  name="shape"
                  value="triangulo"
                  checked={newShape === 'triangulo'}
                  onChange={(e) => setNewShape(e.target.value)}
                />
                Triângulo
              </label>
              <button onClick={salvarForma}>Salvar</button>
            </div>
          </NodeToolbar>
        )}
      </ReactFlowProvider>

    </div>
  );
}

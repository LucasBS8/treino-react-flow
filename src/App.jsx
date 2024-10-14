import { useCallback, useState } from 'react';
import {
  ReactFlowProvider,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import PropTypes from 'prop-types';
import '@xyflow/react/dist/style.css';
import './App.css';

const styles = {
  background: 'blue grey',
  width: '100%',
  height: 900,
};
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1', shape: 'cubo' }, type: 'node-with-toolbar' },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2', shape: 'circulo' }, type: 'node-with-toolbar' }
];
const initialEdges = [{ source: '1', target: '2' }];

const nodeTypes = {
  'node-with-toolbar': NodeWithToolbar,
};

function NodeWithToolbar({ data }) {

  const nodeStyle = {
    height: 100,
    width: 100,
    padding: '20px',
    border: '1px solid black',
    textAlign: 'center',
    backgroundColor: 'lightgray',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };
  
  if (data.shape === 'circulo') {
    nodeStyle.borderRadius = '50%';
  }else{
    nodeStyle.borderRadius = '0%';
  }

  return (
    <>
      <div style={nodeStyle}>
        {data?.label}
      </div>
    </>
  );
}

NodeWithToolbar.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
    shape: PropTypes.string,
    toolbarPosition: PropTypes.string,
  }).isRequired,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [newShape, setNewShape] = useState('cubo');

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDoubleClick = (event, node) => {
    setSelectedNode(node);
    setNewLabel(node.data.label);
    setNewShape(node.data.shape);
    setModalOpen(true);
  };

  const salvarForma = () => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
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
          onNodeDoubleClick={onDoubleClick}
          fitView
          nodeTypes={nodeTypes}
          preventScrolling={false}
        >

        </ReactFlow>

        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <div>
                  <input
                    type="radio"
                    name="shape"
                    //serve para mudar a forma do objeto
                    value="cubo"
                    checked={newShape === 'cubo'}
                    onChange={(e) => setNewShape(e.target.value)}
                  />
                  Cubo
                <label>
                  <input
                    type="radio"
                    name="shape"
                    //serve para mudar a forma do objeto
                    value="circulo"
                    checked={newShape === 'circulo'}
                    onChange={(e) => setNewShape(e.target.value)}
                  />
                  Circulo
                </label>
              </div>

              <button onClick={salvarForma}>salvar</button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        )}
      </ReactFlowProvider>

    </div>
  );
}

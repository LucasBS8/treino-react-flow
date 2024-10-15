import PropTypes from 'prop-types';
import { Handle } from '@xyflow/react';

const CubeNode = ({ data }) => {
  return (
    <div style={{ 
      width: '100px', 
      height: '100px', 
      border: '5px solid black', 
      borderRadius: '0',  // Borda de cubo
      position: 'relative',
      backgroundColor: 'white'
    }}>
      <Handle 
        type="target" 
        position="top" 
        style={{ background: '#221345' }} 
      />
      <div style={{ padding: '10px' }}>
        <strong>{data.label}</strong>
      </div>
      <Handle 
        type="source" 
        position="bottom" 
        style={{ background: '#221345' }} 
      />
    </div>
  );
};
CubeNode.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default CubeNode;

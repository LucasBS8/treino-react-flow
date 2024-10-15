import PropTypes from 'prop-types';
import {Handle } from '@xyflow/react';

const TriangleNode = ({ data }) => {
  return (
    <div style={{
      width: '0',
      height: '0',
      borderLeft: '50px solid transparent',
      borderRight: '50px solid transparent',
      borderBottom: '100px solid black',  // Triângulo
      position: 'relative'
    }}>
      <Handle 
        type="target" 
        position="top" 
        style={{ background: '#221345' }} 
      />
      <div style={{
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        color: 'white'
      }}>
        <strong>{data.label}</strong>
      </div>
      <Handle 
        type="source" 
        position="left" 
        style={{ background: '#221345' }} 
      />
    </div>
  );
};
TriangleNode.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default TriangleNode;

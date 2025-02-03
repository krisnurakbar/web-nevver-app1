import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const Drawer = ({ isOpen, onClose, children }) => {
  return (
    <div className={`drawer ${isOpen ? 'open' : ''}`}>
      <div className={`drawer-overlay ${isOpen ? 'open' : ''}`}></div>
      <div className="drawer-content">
        <button className="drawer-close-btn" onClick={onClose}>
          <Icon icon="ic:baseline-close" className="icon text-xl" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
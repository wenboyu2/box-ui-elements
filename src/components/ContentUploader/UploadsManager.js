/**
 * @flow
 * @file Droppable area containing upload item list
 */

import React from 'react';
import ItemList from './ItemList';
import OverallProgressBar from './OverallProgressBar';
import './UploadsManager.scss';

const UploadsManager = ({ items, view, onClick }) =>
    <div className='upload-manager-container' style={{ height: '500px' }}>
        <OverallProgressBar items={items} view={view} />
        <ItemList showProgressBar={false} showFileIcon={false} items={items} view={view} onClick={onClick} />
    </div>;

export default UploadsManager;

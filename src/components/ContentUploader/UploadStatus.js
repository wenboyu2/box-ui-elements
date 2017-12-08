/**
 * @flow
 * @file Droppable area containing upload item list
 */

import React from 'react';
import ItemList from './ItemList';
import OverallProgressBar from './OverallProgressBar';
import { VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS } from '../../constants';

const UploadStatus = ({ view }) =>
    <div className='upload-manager-container' style={{ height: '500px' }}>
        <OverallProgressBar items={items} />
        <ItemList items={items} view={view} onClick={onClick} />
    </div>;

export default UploadStatus;

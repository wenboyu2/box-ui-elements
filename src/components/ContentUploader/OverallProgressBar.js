/**
 * @flow
 * @file Overall progress bar
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';
import ProgressBar from '../ProgressBar';
import { VIEW_UPLOAD_IN_PROGRESS, VIEW_UPLOAD_SUCCESS } from '../../constants';
import './OverallProgressBar.scss';

const getUploadStatus = (view) => {
    switch (view) {
        case VIEW_UPLOAD_IN_PROGRESS:
            return <FormattedMessage {...messages.uploadManagerUploadInProgress} />;
        case VIEW_UPLOAD_SUCCESS:
            return <FormattedMessage {...messages.uploadManagerUploadComplete} />;
        default:
            return '';
    }
};

const OverallProgressBar = ({ items, view }) => {
    const totalSize = items.reduce((updatedSize, item) => updatedSize + item.size, 0);
    const totalUploaded = items.reduce((updatedSize, item) => updatedSize + item.size * item.progress / 100.0, 0);
    const uploadProgress = totalUploaded / totalSize * 100;

    return (
        <div className='overall-progress-bar'>
            <span className='upload-status'>
                {getUploadStatus(view)}
            </span>
            <ProgressBar resetOnComplete={false} percent={uploadProgress} />
            <span className='uploads-manager-toggle' />
        </div>
    );
};

export default OverallProgressBar;

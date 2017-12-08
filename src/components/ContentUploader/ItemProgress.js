/**
 * @flow
 * @file Upload item progress component
 */

import React from 'react';
import ProgressBar from './ProgressBar';
import './ItemProgress.scss';

type Props = {
    progress: number,
    showProgressBar: boolean
};

const ItemProgress = ({ progress, showProgressBar }: Props) =>
    <div className='bcu-item-progress'>
        {showProgressBar && <ProgressBar percent={progress} />}
        <div className='bcu-progress-label'>
            {progress}%
        </div>
    </div>;

export default ItemProgress;

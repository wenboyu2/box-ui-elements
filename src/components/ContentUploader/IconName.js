/**
 * @flow
 * @file Component for file icon and name
 */

import React from 'react';
import ItemName from './ItemName';
import FileIcon from '../icons/file';
import './IconName.scss';

type Props = {
    name: string,
    extension: string,
    showFileIcon: boolean
};

const IconName = ({ name, extension, showFileIcon = true }: Props) =>
    <div className='bcu-item-icon-name'>
        {showFileIcon &&
            <div className='bcu-item-icon'>
                <FileIcon extension={extension} />
            </div>}
        <div className='bcu-item-name'>
            <ItemName name={name} />
        </div>
    </div>;

export default IconName;

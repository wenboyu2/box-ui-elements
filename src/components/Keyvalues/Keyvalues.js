/**
 * @flow
 * @file File Key Values Skill Data component
 * @author Box
 */

import React from 'react';
import type { SkillData, SkillDataEntry } from '../../flowTypes';
import './Keyvalues.scss';

type Props = {
    skill: SkillData
};

const Keyvalues = ({ skill: { entries } }: Props) => (
    <div className='be-keyvalues'>
        {Array.isArray(entries) &&
            entries.map(
                ({ label, text }: SkillDataEntry, index) =>
                    !!label &&
                    !!text && (
                        /* eslint-disable react/no-array-index-key */
                        <dl className='be-keyvalue' key={index}>
                            <dt>{label}</dt>
                            <dd>{text}</dd>
                        </dl>
                    )
                /* eslint-enable react/no-array-index-key */
            )}
    </div>
);

export default Keyvalues;

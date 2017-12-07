/**
 * @flow
 * @file Base helper for the Box Upload APIs
 * @author Box
 */

import Base from '../Base';

class BaseUpload extends Base {
    fileName: string;
    fileId: ?string;
    overwrite: boolean;

    resolveConflict = async (response) => {
        if (this.overwrite) {
            this.fileId = response.context_info.conflicts.id;
            return;
        }

        const extension = this.fileName.substr(this.fileName.lastIndexOf('.')) || '';
        this.fileName = `${this.fileName.substr(0, this.fileName.lastIndexOf('.'))}-${Date.now()}${extension}`;
    };

    getErrorResponse = async (error: Error) => {
        const { response } = error;
        if (response.status === 401 || response.status === 403) {
            return response;
        }

        return response.json();
    };
}

export default BaseUpload;

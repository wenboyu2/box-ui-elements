/**
 * @flow
 * @file Base class for the Box UI Elements ES6 wrapper
 * @author Box
 */

import EventEmitter from 'events';
import ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';
import 'regenerator-runtime/runtime';
import { DEFAULT_CONTAINER } from '../constants';
import i18n from '../i18n';
import type { StringMap, Token } from '../flowTypes';

declare var __VERSION__: string;

class ES6Wrapper extends EventEmitter {
    /**
     * @property {Function}
     */
    emit: Function;

    /**
     * @property {HTMLElement}
     */
    container: HTMLElement;

    /**
     * @property {string}
     */
    id: string;

    /**
     * @property {string}
     */
    token: Token;

    /**
     * @property {string}
     */
    options: { [key: string]: any };

    /**
     * @property {string}
     */
    language: string = i18n.language;

    /**
     * @property {Object}
     */
    localeData: any = i18n.localeData;

    /**
     * @property {Object}
     */
    messages: StringMap = i18n.messages;

    /**
     * @property {Element}
     */
    component: any;

    /**
     * [constructor]
     *
     * @private
     * @return {ES6Wrapper}
     */
    constructor() {
        super();
        addLocaleData(this.localeData);
    }

    /**
     * Shows the content picker.
     *
     * @public
     * @param {string} id - The folder or file id.
     * @param {string} token - The API access token.
     * @param {Object|void} [options] Optional options.
     * @return {void}
     */
    show(id: string, token: Token, options: { [key: string]: any } = {}): void {
        this.id = id;
        this.token = token;
        this.options = options;
        this.options.version = __VERSION__;
        this.emit = this.emit.bind(this);
        const container = options.container || DEFAULT_CONTAINER;
        this.container =
            container instanceof HTMLElement ? container : ((document.querySelector(container): any): HTMLElement);
        this.render();
    }

    /**
     * Hides the content picker.
     * Removes all event listeners.
     * Clears out the DOM inside container.
     *
     * @public
     * @return {void}
     */
    hide(): void {
        this.removeAllListeners();
        ReactDOM.unmountComponentAtNode(this.container);
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    /**
     * Renders the component.
     * Should be overriden.
     *
     * @protected
     * @return {void}
     */
    render() {
        throw new Error('Unimplemented!');
    }

    /**
     * Sets reference to the inner component
     *
     * @protected
     * @return {void}
     */
    setComponent = (component: any) => {
        this.component = component;
    };

    /**
     * Gets reference to the inner component
     *
     * @public
     * @return {Element}
     */
    getComponent(): any {
        return this.component;
    }

    /**
     * Clears out the cache used by the component
     *
     * @public
     * @return {Element}
     */
    clearCache(): void {
        const component = this.getComponent();
        if (component && typeof component.clearCache === 'function') {
            component.clearCache();
        }
    }

    /**
     * Wrapper for emit to prevent JS exceptions
     * in the listeners own code.
     *
     * @public
     * @param {string} eventName - name of the event
     * @param {Object} data - event data
     * @return {boolean} true if the event had listeners, false otherwise.
     */
    emit(eventName: string, data: any): boolean {
        try {
            return super.emit(eventName, data);
        } catch (e) {
            // do nothing
        }
        return false;
    }
}

export default ES6Wrapper;

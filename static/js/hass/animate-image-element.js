import { LitElement, html, css } from 'https://unpkg.com/lit-element@2/lit-element?module';
import { classMap } from 'https://unpkg.com/lit-html/directives/class-map?module';
import { styleMap } from 'https://unpkg.com/lit-html/directives/style-map?module';
import { hasAction, handleAction } from 'https://unpkg.com/custom-card-helpers?module';
import { actionHandler } from './action-handler-directive.js';

class AnimateImageElement extends LitElement {

    setConfig(config) {
        let cfg = config || {};
        let action = cfg.entity ? 'more-info' : 'none';
        this._config = Object.assign({
            tap_action: { action },
            hold_action: { action },
            double_tap_action: { action },
        }, cfg);

        // eslint-disable-next-line wc/no-self-class
        this.classList.toggle(
            'clickable',
            this._config.tap_action && this._config.tap_action.action !== 'none'
        );
    }

    render() {
        if (!this.hass) {
            return html``;
        }

        const entity = this._config.entity;
        const state = entity ? this.hass.states[entity] : undefined;

        let cfg = this._config;
        let sta = state ? state.state : null;
        let src = cfg.image || '';
        let cls = cfg.class || {};
        let sts = Object.assign({
            display: 'block',
            'max-width': '100%',
            'max-height': '100%',
        }, cfg.image_style || {});
        if(sta)
        {
            if(cfg.state_image && cfg.state_image[sta])
            {
                src = cfg.state_image[sta];
            }
            if(cfg.state_class && cfg.state_class[sta])
            {
                Object.assign(cls, cfg.state_class[sta] || {});
            }
            if(cfg.state_style && cfg.state_style[sta])
            {
                Object.assign(sts, cfg.state_style[sta] || {});
            }
        }

        return html`
          <img
            src="${src}"
            class="${classMap(cls)}"
            style="${styleMap(sts)}"
            data-entity="${entity}"
            data-state="${sta}"
            @action=${this._handleAction}
            .actionHandler=${actionHandler({
                hasHold: hasAction(this._config.hold_action),
                hasDoubleClick: hasAction(this._config.double_tap_action),
            })}
          >
        `;
    }

    _handleAction(evt) {
        console.log('_handleAction', evt.detail, arguments);
        if (evt.detail) {
            handleAction(this, this.hass, this._config, evt.detail.action);
        }
    }

    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
        return 1;
    }

    _toggle(state) {
        this.hass.callService('homeassistant', 'toggle', {
            entity_id: state.entity_id
        });
    }

    static get styles() {
        return css`
            @keyframes spin {
              000% { transform: rotate(000deg);}
              100% { transform: rotate(359deg); }
            }
            @keyframes fadeOutRightBig {
              000% { opacity: 1; }
              100% { opacity: 0; translate3d(2000px, 0, 0); }
            }
            @keyframes rollOut {
              000% { opacity: 1; }
              100% { opacity: 0; transform: translate3d(2000px, 0, 0) rotate3d(0, 0, 1, 720deg); }
            }
            @keyframes rollInRight {
              000% { opacity: 0; transform: translate3d(2000px, 0, 0) rotate3d(0, 0, 1, 720deg); }
              100% { opacity: 1; }
            }
            @keyframes rollBack {
              000% { transform:translateX(000%) rotateZ(0000deg); }
              050% { transform:translateX(400%) rotateZ(0720deg); }
              100% { transform:translateX(000%) rotateZ(1440deg); }
            }
        `;
    }
}

customElements.define('animate-image-element', AnimateImageElement);
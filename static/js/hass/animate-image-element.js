import {
    LitElement,
    classMap,
    styleMap,
    html,
    css
} from 'https://cdn.jsdelivr.net/npm/lit-element@2/lit-element.js?module';

class AnimateImageElement extends LitElement {

    setConfig(config) {
        this._config = Object.assign({
            hold_action: { action: 'more-info' }
        }, config || {});

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
        let src = cfg.image;
        let cls = cfg.class || {};
        let sts = Object.assign({ display: 'block' },cfg.style || {});
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
                Object.assign(cls, cfg.state_style[sta] || {});
            }
        }

        return html`
          <img
            src="${src}"
            class="${classMap(cls)}"
            style="${styleMap(sts)}"
          >
        `;
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
            @keyframes slidein {
              from { transform: scaleX(0); }
              to   { transform: scaleX(1); }
            }
        `;
    }
}

customElements.define('animate-image-element', AnimateImageElement);
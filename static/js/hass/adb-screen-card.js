import { LitElement, html, css } from "https://unpkg.com/lit-element@2/lit-element.js?module";
import {
  hasAction,
  handleAction
} from "https://unpkg.com/custom-card-helpers?module";
import { actionHandler } from "./action-handler-directive.js";

class AdbScreenCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {}
    };
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define entity");
    }
    this._config = config;
  }

  render() {
    return html`
      <ha-card>
        <hui-image
          .hass=${this.hass}
          .entity=${this._config.entity}
          .image=${this._config.image}
          .stateImage=${this._config.state_image}
          .stateFilter=${this._config.state_filter}
          .cameraImage=${this._config.entity}
          .cameraView=${this._config.camera_view || "live"}
          .aspectRatio=${this._config.aspect_ratio + ''}
          @load=${this._onMediaLoad}
          @click=${this._handleClick}
          @mousedown=${this._handleClick}
          @mouseup=${this._handleClick}
          @action=${this._handleAction}
          .actionHandler=${actionHandler({
            hasHold: hasAction(this._config.hold_action),
            hasDoubleClick: hasAction(this._config.double_tap_action),
          })}
        ></hui-image>
      </ha-card>
    `;
  }

  _handleAction(ev) {
    if (this.hass && this.config && ev.detail.action) {
      handleAction(this, this.hass, this.config, ev.detail.action);
    }
  }

  _handleClick(evt) {
    var ele = evt.target,
        eos = this._getElementOffset(ele),
        evx = evt.pageX - eos.x,
        evy = evt.pageY - eos.y;
    console.log(evt.type, {ele, evx, evy, evt});
    if(evt.type === "click")
    {
        let dsp = this._getOriginalPoint(evx, evy, ele);
        this._adbInput(`tap ${dsp.x} ${dsp.y}`);
    }
  }

  _onMediaLoad(evt) {
    console.log("onMediaLoad", evt);
  }

  _getElementOffset(ele) {
    var e = ele,
        x = 0,
        y = 0;
    while (e) {
      x += e.offsetLeft;
      y += e.offsetTop;
      if (e.tagName == "BODY") {
        break;
      }
      e = e.offsetParent || null;
    }
    return {x, y};
  }

  _getOriginalPoint(x, y, ele) {
    var ratio = this._config.screen_ratio || 1,
        size = this._config.screen_size || null;
    if (size) {
      let [width, height] = size.split("x");
      let [xr, yr] = [width / ele.offsetWidth, height / ele.offsetHeight];
      x *= xr;
      y *= yr;
    }
    else {
      x *= ratio;
      y *= ratio;
    }
    return {
      x: parseInt(x),
      y: parseInt(y),
    };
  }

  _toggle(state) {
    this.hass.callService("homeassistant", "toggle", {
      entity_id: state.entity_id
    });
  }

  _adbInput(input) {
    var eid = this._config.adb_entity,
        cmd = 'input ' + input;
    if (!eid) {
      throw new Error("You need to define android_tv entity: adb_entity");
    }
    this.hass.callService("androidtv", "adb_command", {
      entity_id: eid,
      command: cmd
    });
    console.log('adb command', eid, cmd);
  }
}

customElements.define("adb-screen-card", AdbScreenCard);

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressClassProfilesForm = void 0;

var _core = require("@blueprintjs/core");

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class AddressClassProfilesForm extends React.Component {
  render() {
    const formStyle = {
      padding: "15px",
      backgroundColor: "white",
      borderRadius: "15px"
    };
    return React.createElement(React.Fragment, null, React.createElement("div", {
      style: formStyle
    }, React.createElement(_core.FormGroup, {
      inline: true,
      label: "Description",
      style: {
        backgroundColor: "red"
      }
    }, React.createElement(_core.InputGroup, {
      id: "description",
      placeholder: "Description..."
    })), React.createElement(_core.FormGroup, {
      inline: true,
      label: "Type"
    }, React.createElement(_core.InputGroup, {
      id: "type",
      placeholder: "Type..."
    })), React.createElement(_core.FormGroup, {
      inline: true,
      label: "Localization"
    }, React.createElement(_core.InputGroup, {
      id: "localization",
      placeholder: "Localization..."
    })), React.createElement(_core.FormGroup, {
      inline: true,
      label: "Time to Live"
    }, React.createElement(_core.InputGroup, {
      id: "timeToLive",
      placeholder: "Time to Live..."
    })), React.createElement(_core.FormGroup, {
      inline: true,
      label: "Validity"
    }, React.createElement(_core.InputGroup, {
      id: "Validity",
      placeholder: "Validity..."
    }))));
  }

}

exports.AddressClassProfilesForm = AddressClassProfilesForm;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressClassProfilePanel = void 0;

var _core = require("@blueprintjs/core");

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class AddressClassProfilePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement(AddressClassProfileList, {
      items: this.props.addressClassProfiles
    }));
  }

}

exports.AddressClassProfilePanel = AddressClassProfilePanel;

class AddressClassProfileForm extends React.Component {}

class AddressClassProfileList extends React.Component {
  render() {
    return React.createElement(React.Fragment, null, this.props.items.map(item => React.createElement(AddressClassProfileListItem, {
      key: item.id,
      item: item
    })));
  }

}

class AddressClassProfileListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleEditProfile = () => {
      // if(this.state.isEditingForm) {
      //     this.saveDataToDb()
      // }
      this.setState({
        isEditingForm: !this.state.isEditingForm
      });
    };

    this.state = {
      // Form state
      isEditingForm: false,
      // Profile Data
      id: this.props.item.id,
      type: this.props.item.type,
      description: this.props.item.description,
      localization: this.props.item.localization,
      signature: this.props.item.signature,
      areaApplicability: this.props.item.areaApplicability,
      timeToLive: this.props.item.timeToLive,
      validity: this.props.item.validity
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleTypeChange(event) {
    this.setState({
      type: event.target.value
    });
  }

  render() {
    const itemStyle = {
      marginTop: "10px",
      borderRadius: "5px",
      background: "#FFFFFF"
    };
    const itemHeadStyle = {
      padding: "7px 5px 30px 5px",
      height: "15px",
      fontSize: "20px",
      width: "100%"
    };
    const itemHeadButtonStyle = {
      padding: "5px",
      float: "right"
    };
    const itemHrStyle = {
      width: "100%",
      margin: "0 0 7px 0"
    };
    const itemBodyStyle = {
      padding: "5px",
      width: "100%"
    };
    return React.createElement("div", {
      style: itemStyle
    }, React.createElement("div", {
      style: itemHeadButtonStyle
    }, this.state.isEditingForm ? React.createElement(React.Fragment, null, React.createElement(_core.AnchorButton, {
      onClick: this.handleEditProfile,
      intent: "success",
      icon: "floppy-disk",
      text: "Save Change"
    }), React.createElement(_core.AnchorButton, {
      onClick: this.handleEditProfile,
      intent: "danger",
      icon: "cross",
      text: "Discard Change",
      style: {
        marginLeft: "5px"
      }
    })) : React.createElement(_core.AnchorButton, {
      onClick: this.handleEditProfile,
      intent: "success",
      icon: "edit",
      text: "Edit Profile"
    })), React.createElement("div", {
      style: itemHeadStyle
    }, this.props.item.id), React.createElement("hr", {
      style: itemHrStyle
    }), React.createElement("div", {
      style: itemBodyStyle
    }, React.createElement("table", null, React.createElement("tr", null, React.createElement("td", null, "Type"), React.createElement("td", null, ":"), React.createElement("td", null, this.state.isEditingForm ? React.createElement(_core.InputGroup, {
      value: this.state.type,
      onChange: event => {
        this.setState({
          type: event.target.value
        });
      }
    }) : React.createElement(React.Fragment, null, this.state.type))), React.createElement("tr", null, React.createElement("td", null, "Description"), React.createElement("td", null, ":"), React.createElement("td", null, this.state.isEditingForm ? React.createElement(_core.InputGroup, {
      value: this.state.description,
      onChange: event => {
        this.setState({
          description: event.target.value
        });
      }
    }) : React.createElement(React.Fragment, null, this.state.description))), React.createElement("tr", null, React.createElement("td", null, "Localization"), React.createElement("td", null, ":"), React.createElement("td", null, this.state.isEditingForm ? React.createElement(_core.InputGroup, {
      value: this.state.localization,
      onChange: event => {
        this.setState({
          localization: event.target.value
        });
      }
    }) : React.createElement(React.Fragment, null, this.state.localization))), React.createElement("tr", null, React.createElement("td", null, "Signature"), React.createElement("td", null, ":"), React.createElement("td", null, this.state.isEditingForm ? React.createElement(_core.InputGroup, {
      value: this.state.signature,
      onChange: event => {
        this.setState({
          signature: event.target.value
        });
      }
    }) : React.createElement(React.Fragment, null, this.state.signature))), React.createElement("tr", null, React.createElement("td", null, "Area Applicability"), React.createElement("td", null, ":"), React.createElement("td", null, this.state.isEditingForm ? React.createElement(_core.TagInput, {
      values: this.state.areaApplicability,
      onChange: values => {
        this.setState({
          areaApplicability: values
        });
      }
    }) : React.createElement(React.Fragment, null, this.state.areaApplicability.map(item => React.createElement("span", {
      key: item
    }, item, " "))))), React.createElement("tr", null, React.createElement("td", null, "Time To Live"), React.createElement("td", null, ":"), React.createElement("td", null, this.state.isEditingForm ? React.createElement(_core.NumericInput, {
      allowNumericCharactersOnly: true,
      value: this.state.timeToLive,
      onValueChange: (_v, value) => {
        this.setState({
          timeToLive: value
        });
      }
    }) : React.createElement(React.Fragment, null, this.state.timeToLive))), React.createElement("tr", null, React.createElement("td", null, "Validity"), React.createElement("td", null, ":"), React.createElement("td", null, this.state.isEditingForm ? React.createElement(_core.InputGroup, {
      value: this.state.validity,
      onChange: event => {
        this.setState({
          validity: event.target.value
        });
      }
    }) : React.createElement(React.Fragment, null, this.state.validity))), React.createElement("tr", null, React.createElement("td", {
      colSpan: 3
    })))));
  }

}
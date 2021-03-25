import { AnchorButton, Collapse, Icon, InputGroup, Intent, NumericInput, TagInput } from "@blueprintjs/core";
import * as React from "react";
import { AddressComponentProfile, AddressProfile, AttributeProfile } from "./AddressProfile";
import { AttributeProfilePanel } from "./AttributeProfilePanel";

import log from "electron-log"
Object.assign(console, log);

export class AddressComponentProfilePanel extends React.Component<AddressComponentProfilePanelProps> {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                {
                    this.props.currentAddressProfile == null
                        ? <></>
                        : <>
                            <AddressComponentProfileForm
                                changeStateHandler={this.props.changeStateHandler}
                                attributeProfiles={this.props.currentAddressProfile.attributeProfiles}
                                currentAddressProfile={this.props.currentAddressProfile}
                            />
                            <AddressComponentProfileList
                                componentProfiles={this.props.currentAddressProfile.componentProfiles}
                                attributeProfiles={this.props.currentAddressProfile.attributeProfiles}
                                changeStateHandler={this.props.changeStateHandler}
                            />
                        </>
                }
            </>
        );
    }
}

class AddressComponentProfileForm extends React.Component<AddressComponentProfileFormProps> {
    constructor(props) {
        super(props);
        this.state = {
            isOpeningForm: false,

            // Profile Data
            key: "",
            description: "",
            example: "",
            attributeProfiles: [],

            //A.I. Parser
            isParserWindowOpen: false,
        }
    }

    handleOpenForm = () => {
        this.setState({ isOpeningForm: !this.state.isOpeningForm });
    }


    handleAddChange = () => {
        // If the "Profile key" or "Description" field is empty
        if (!this.state.key) {
            alert("\"Profile Key\" cannot not be empty");

            return;
        } else if (!this.state.description) {
            alert("\"Description\" cannot not be empty");

            return;
        }

        // If some optional field is missing
        if (!this.state.example) {
            if (!window.confirm("Optional field \"Example\" are missing.\nConfirm to create?")) {
                return;
            }
        }

        // All form checking is Done
        // Check if the Unique ID (i.e. Profile key) is being 
        let isIdUsed = false;

        this.props.currentAddressProfile.componentProfiles.forEach((componentProfile) => {
            if ((componentProfile.key.toLowerCase()) === (this.state.key.toLowerCase())) {
                isIdUsed = true;
                return;
            }
        });

        if (isIdUsed) {
            alert("\"" + this.state.key + "\"" + " is being used.\nTry another one");

            return;
        }

        const dataToBeAdded: AddressComponentProfile = {
            key: this.state.key,
            description: this.state.description,
            example: this.state.example,
            attributeProfiles: this.state.attributeProfiles,
        }

        this.props.changeStateHandler("component", "add", dataToBeAdded);

        this.setState({
            isOpeningForm: !this.state.isOpeningForm,
            key: "",
            description: "",
            example: "",
            attributeProfiles: [],
        });
    }

    handleBundleAddProfiles = (parserForms: any) => {
        let dataSetToBeAdded: any = [];

        parserForms.forEach((form: any) => {
            // If the "Profile key" or "Description" field is empty
            if (!form.key) {
                alert("\"Profile Key\" cannot not be empty");

                return;
            } else if (!form.description) {
                alert("\"Description\" cannot not be empty");

                return;
            }

            // If some optional field is missing
            if (!form.example) {
                if (!window.confirm("Optional field \"Example\" are missing.\nConfirm to create?")) {
                    return;
                }
            }

            // All form checking is Done
            // Check if the Unique ID (i.e. Profile key) is being 
            let isIdUsed = false;

            this.props.currentAddressProfile.componentProfiles.forEach((componentProfile) => {
                if ((componentProfile.key.toLowerCase()) === (form.key.toLowerCase())) {
                    isIdUsed = true;
                    return;
                }
            });

            if (isIdUsed) {
                alert("\"" + form.key + "\"" + " is being used.\nTry another one");

                return;
            }

            const dataToBeAdded: AddressComponentProfile = {
                key: form.key,
                description: form.description,
                example: form.example,
                attributeProfiles: [],
            }
            dataSetToBeAdded.push(dataToBeAdded);
            // this.props.changeStateHandler( "component", "add", dataToBeAdded);

        });
        this.props.changeStateHandler("components", "addSet", dataSetToBeAdded);
        this.handleParserOpen();
    }

    handleDiscardForm = () => {
        // If one of the field is not empty
        if (this.state.key || this.state.description || this.state.example) {
            if (!window.confirm("Form data will be clear.\nConfirm to discard?")) {
                return;
            }

        }

        // Clear the form data when Discard
        this.setState({
            isOpeningForm: !this.state.isOpeningForm,
            key: "",
            description: "",
            example: "",
            attributeProfiles: [],

        });
    }

    handleParserOpen = () => {
        this.setState({
            isParserWindowOpen: !this.state.isParserWindowOpen,
        })
    }

    render() {

        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
            background: "#FFFFFF",
        } as React.CSSProperties;

        const itemHeadStyle = {
            padding: "7px 5px 30px 5px",
            height: "15px",
            fontSize: "20px",
            width: "100%",
        } as React.CSSProperties;

        const itemHeadButtonStyle = {
            padding: "5px",
        } as React.CSSProperties;

        const rightStyle = {
            float: "right",
        } as React.CSSProperties;

        const itemHrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
        } as React.CSSProperties;

        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        } as React.CSSProperties;

        const tdStyle = {
            fontWeight: "bold",
        }

        const backDivStyle = {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            opacity: "50%",
            zIndex: "998",
        }

        return (
            <div style={itemStyle}>
                <div style={{ ...itemHeadButtonStyle, ...rightStyle }}>
                    {this.state.isOpeningForm
                        ? <AnchorButton onClick={this.handleAddChange} intent="success" icon="add" text="Confirm Create" />
                        : <></>
                    }
                </div>
                <div style={itemHeadButtonStyle}>
                    {this.state.isOpeningForm
                        ? <AnchorButton onClick={this.handleDiscardForm} intent="danger" icon="delete" text="Discard Profile" />
                        :
                        <>
                            <AnchorButton onClick={this.handleOpenForm} intent="success" icon="add" text="Create New Component Profile" />

                            <AnchorButton text="A.I. Address Parser" intent="primary" icon="comment" onClick={this.handleParserOpen} style={{ marginLeft: "5px" } as React.CSSProperties} />
                        </>
                    }
                </div>
                {
                    this.state.isOpeningForm
                        ? <>
                            <hr style={itemHrStyle} />
                            <div style={itemBodyStyle}>
                                <table>
                                    <tr>
                                        <td style={tdStyle}>Profile Key<span style={{ color: "red" }}>*</span></td>
                                        <td>:</td>
                                        <td>
                                            <InputGroup value={this.state.key} onChange={(event) => { this.setState({ key: event.target.value }) }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={tdStyle}>Description<span style={{ color: "red" }}>*</span></td>
                                        <td>:</td>
                                        <td>
                                            <InputGroup value={this.state.description} onChange={(event) => { this.setState({ description: event.target.value }) }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={tdStyle}>Example</td>
                                        <td>:</td>
                                        <td>
                                            <InputGroup value={this.state.example} onChange={(event) => { this.setState({ example: event.target.value }) }} />
                                        </td>
                                    </tr>
                                    {/* todo - add the attribute selector */}
                                </table>
                            </div>
                        </>
                        : <></>
                }
                {this.state.isParserWindowOpen
                    ? <>
                        <div style={backDivStyle} onClick={this.handleParserOpen}></div>
                        <AddressParserWindow parserOpenHandler={this.handleParserOpen} bundleAddProfilesHandler={this.handleBundleAddProfiles} />
                    </>
                    : <></>
                }
            </div>
        );
    }
}

class AddressParserWindow extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            parserInput: "casa del gelato, 10A 24-26 high street road mount waverley vic 3183",
            parserResult: {},
            selectedAttribute: [],
            isSpinning: false,
            isCreateFormOpen: false,

            parserForm: [],
        }
    }

    async getParsedAddress(address: string) {
        console.log(`Sending ${address} to Server for parsing...`);

        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({ address: address })
        };
        const url = "http://34.92.169.157:8080/"

        const response = await fetch(url, requestOptions);
        const data = await response.json();
        this.setState({ parserResult: data, isSpinning: false });
    }

    fillParserForm() {
        this.state.selectedAttribute.forEach((selectedKey: any) => {
            const obj = {
                key: selectedKey,
                description: "",
                example: this.state.parserResult[selectedKey],
            }
            this.setState({
                parserForm: [...this.state.parserForm, obj]
            })
        })
    }

    render() {
        const mainDivStyle = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 0%)",
            backgroundColor: "white",
            width: "60%",
            borderRadius: "10px",
            padding: "15px 25px",
            zIndex: 999,
            overflowY: "auto",
            maxHeight: "70vh",
        } as React.CSSProperties;

        const parserTable = {
            textAlign: "left",
            width: "100%",
        } as React.CSSProperties;

        const parserFormStyle = {
            top: "50%",
            left: "50%",
        } as React.CSSProperties;

        const handleParserSubmit = (ev: any) => {
            this.setState({ isSpinning: true }); // Start the spinner
            this.setState({ selectedAttribute: [] }) // Clear the array in case of re-search
            this.setState({ parserForm: [] }) // Clear the array in case of re-search

            this.getParsedAddress(this.state.parserInput);
        }

        const handleCloseWindow = (ev: any) => {
            this.props.parserOpenHandler();
        }

        const handleOpenCreateForm = () => {
            this.setState({ isCreateFormOpen: !this.state.isCreateFormOpen });
        }

        const handleSelectAttribute = (ev: any) => {
            const index = this.state.selectedAttribute.indexOf(ev.target.value);

            // if the selected is not yet in the state
            if (index === -1) {
                this.setState({
                    selectedAttribute: [...this.state.selectedAttribute, ev.target.value],
                    parserForm: [...this.state.parserForm,
                    {
                        id: ev.target.value,
                        key: ev.target.value,
                        description: "",
                        example: this.state.parserResult[ev.target.value]
                    }]
                })

            } else {
                let copy = [...this.state.selectedAttribute];
                copy.splice(index, 1);
                this.setState({ selectedAttribute: copy });

                this.state.parserForm.forEach((obj: any, index: any) => {
                    if (obj.id === ev.target.value) {
                        let copy = [...this.state.parserForm];
                        copy.splice(index, 1);
                        this.setState({ parserForm: copy });
                    }
                });
            }
        }

        const handleChangeStateForm = (stateFromHandler: any) => {
            this.state.parserForm.forEach((obj: any, index: any) => {
                if (obj.id === stateFromHandler.id) {
                    let copy = [...this.state.parserForm];
                    copy.splice(index, 1, stateFromHandler);
                    this.setState({ parserForm: copy });
                }
            });
        }

        const handleCreateProfiles = () => {
            this.props.bundleAddProfilesHandler(this.state.parserForm);
        }

        const handleImageBtnClick = (ev:any) => {
            const inputTag = document.getElementById("fileInput");
            inputTag?.click();
        }

        const handleFileChange = (event:any) => {
            const imageFile = event.target.files.item(0);
            console.log(imageFile);
            
            let formData = new FormData();
            console.log(formData);
            formData.append("file", imageFile);

            // Simple POST request with a JSON body using fetch
            const requestOptions = {
                method: "POST",
                body: formData,
                // ****** Not need any header here, from the Internet: https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
            };
            const url = "http://34.92.169.157:3000/api"

            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => {console.log(data)})
                .catch(err => {console.error(err)})
        }

        const imageButton = (
            <AnchorButton 
                icon="media"
                intent={Intent.PRIMARY}
                minimal={true}
                onClick={handleImageBtnClick}
            />
        );


        return (
            <div style={mainDivStyle}>
                <div>
                    <span style={{ fontWeight: "bold", fontSize: "1.3rem" }}>A.I. Address Parser</span>
                    <span style={{ float: "right", cursor: "pointer" }}><Icon icon="cross" intent="danger" iconSize={25} onClick={handleCloseWindow} /></span>
                </div>

                <hr />
                {this.state.isCreateFormOpen
                    ?
                    <div>
                        {this.state.selectedAttribute.map((selectedKey: any) => (
                            <>
                                <AddressComponentForm profileKey={selectedKey} example={this.state.parserResult[selectedKey]} changeStateFormHandler={handleChangeStateForm} />
                                <hr />
                            </>
                        ))
                        }
                        <br />

                        <AnchorButton text="Create Component Profiles" intent="success" icon="new-object" loading={this.state.isSpinning} fill={true} onClick={handleCreateProfiles} />
                    </div>
                    :
                    <>
                        <div style={parserFormStyle}>
                            <span style={{ fontWeight: "bold", marginBottom: "5px" }}>Enter your address in ENGLISH</span>
                            <br />
                            <InputGroup
                                placeholder="Enter address..."
                                onChange={(event: any) => { this.setState({ parserInput: event.target.value }) }}
                                fill={true}
                                type="text"
                                value={this.state.parserInput}
                                style={{ marginBottom: "5px" }}
                                rightElement={imageButton}
                            />
                            <form id="imageForm" action="" method="post" style={{display: "none"}}>
                                <input type="file" id="fileInput" onChange={handleFileChange} style={{display: "none"}} />

                            </form>
                            <AnchorButton text="Parse" intent="primary" icon="direction-right" loading={this.state.isSpinning} fill={true} onClick={handleParserSubmit} />
                        </div>

                        {/* <pre>{JSON.stringify(this.state.parserResult, null, 2)}</pre> */}
                        {Object.keys(this.state.parserResult).length !== 0
                            ?
                            <div>
                                <table style={parserTable}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Component Type</th>
                                            <th>Component Value</th>
                                        </tr>
                                    </thead>
                                    {
                                        Object.keys(this.state.parserResult).map((key) => (
                                            <tr>
                                                <td style={{ display: "inline-block" }}><input type="checkbox" name={key} value={key} onChange={handleSelectAttribute} /></td>
                                                <td>{key}</td>
                                                <td>{this.state.parserResult[key]}</td>
                                            </tr>
                                        ))
                                    }
                                </table>
                                <AnchorButton text="Next" intent="success" icon="arrow-right" fill={true} onClick={handleOpenCreateForm} />

                            </div>
                            : <></>
                        }
                    </>

                }
            </div>
        )
    }
}

class AddressComponentForm extends React.Component<any, any, any> {
    constructor(props) {
        super(props);
        this.state = {
            key: this.props.profileKey,
            description: "",
            example: this.props.example,
        }
    }

    render() {
        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        } as React.CSSProperties;

        const tdStyle = {
            fontWeight: "bold",
        } as React.CSSProperties;

        const handleChangeKey = (ev: any) => {
            this.setState({ key: ev.target.value }, () => {
                this.props.changeStateFormHandler({ ...this.state, id: this.props.profileKey });
            })
        }

        const handleChangeDescription = (ev: any) => {
            this.setState({ description: ev.target.value }, () => {
                this.props.changeStateFormHandler({ ...this.state, id: this.props.profileKey });
            });
        }

        const handleChangeExample = (ev: any) => {
            this.setState({ example: ev.target.value }, () => {
                this.props.changeStateFormHandler({ ...this.state, id: this.props.profileKey });
            });
        }

        return (
            <div style={itemBodyStyle}>
                <table>
                    <tr>
                        <td style={tdStyle}>Profile Key<span style={{ color: "red" }}>*</span></td>
                        <td>:</td>
                        <td>
                            <InputGroup value={this.state.key} onChange={handleChangeKey} />
                        </td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>Description<span style={{ color: "red" }}>*</span></td>
                        <td>:</td>
                        <td>
                            <InputGroup value={this.state.description} onChange={handleChangeDescription} />
                        </td>
                    </tr>
                    <tr>
                        <td style={tdStyle}>Example</td>
                        <td>:</td>
                        <td>
                            <InputGroup value={this.state.example} onChange={handleChangeExample} />
                        </td>
                    </tr>
                    {/* todo - add the attribute selector */}
                </table>
            </div>
        )
    }
}

class AddressComponentProfileList extends React.Component<AddressComponentProfileListProps> {
    render() {
        return (
            <>
                {this.props.componentProfiles.map((component) => (
                    <AddressComponentProfileListItem
                        key={component.key}
                        componentProfile={component}
                        attributeProfiles={this.props.attributeProfiles}
                        changeStateHandler={this.props.changeStateHandler}
                    />
                ))}
            </>
        );
    }
}

class AddressComponentProfileListItem extends React.Component<AddressComponentProfileListItemProps> {
    constructor(props) {
        super(props);
        this.state = {
            // Form state
            isListOpen: false,
            isEditingForm: false,

            // Profile Data
            key: this.props.componentProfile.key,
            description: this.props.componentProfile.description,
            example: this.props.componentProfile.example,
            attributeProfiles: this.props.componentProfile.attributeProfiles,

            dataBeforeEdit: {
                description: null,
                example: null,
                attributeProfiles: null,
            },

            addAttributeName: "select",
        }
    }

    handleListOpen = () => {
        this.setState({ isListOpen: !this.state.isListOpen });
    }

    handleEditProfile = () => {
        this.setState({
            dataBeforeEdit: {
                description: this.state.description,
                example: this.state.example,
                attributeProfiles: this.state.attributeProfiles,
            }
        })

        this.setState({ isEditingForm: !this.state.isEditingForm, isListOpen: true });
    }

    handleDiscardChange = () => {
        // If one of the input field changed but user clicked discard
        if (
            this.state.description != this.state.dataBeforeEdit.description ||
            this.state.example != this.state.dataBeforeEdit.example
        ) {
            if (!window.confirm("Some fields are changed.\nConfirm to discard?")) {
                return;
            }
        }

        this.setState({
            description: this.state.dataBeforeEdit.description,
            example: this.state.dataBeforeEdit.example,
            attributeProfiles: this.state.dataBeforeEdit.attributeProfiles,
        });

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleSaveChange = () => {

        // If the "Description" field is empty
        if (!this.state.description) {
            alert("\"Description\" cannot not be empty");

            return;
        }

        const dataToBeSaved: AddressComponentProfile = {
            key: this.state.key,
            description: this.state.description,
            example: this.state.example,
            attributeProfiles: this.state.attributeProfiles,
        }

        this.props.changeStateHandler("component", "edit", dataToBeSaved);

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    handleDeleteChange = () => {
        // Alert before deleting
        if (!window.confirm("Confirm to delete this Component Profile?")) {
            return;
        }

        const dataToBeDeleted: AddressComponentProfile = {
            key: this.state.key,
            description: this.state.description,
            example: this.state.example,
            attributeProfiles: this.state.attributeProfiles,
        }

        const includedClasses = this.props.changeStateHandler("component", "checkIncludedInClass", dataToBeDeleted);
        if (includedClasses != null) {
            let message = "";
            includedClasses.forEach((addressClass) => {
                message += "\n   " + addressClass.id.toString();
            });

            if (!window.confirm("This Component is included in Class Profile:" + message + "\n confirm to remove the component from the above Class Profile?")) {
                return;
            }
        }

        this.props.changeStateHandler("component", "delete", dataToBeDeleted);

        this.setState({ isEditingForm: !this.state.isEditingForm });
    }

    removeIncludedAttribute = (attributeName: string) => {
        const newAttributeProfiles = JSON.parse(JSON.stringify(this.state.attributeProfiles));//deep copy the state.addressProfiles
        newAttributeProfiles.forEach((newAttribute) => {
            if (attributeName == newAttribute.attributeProfileName) {
                const index = newAttributeProfiles.indexOf(newAttribute);
                newAttributeProfiles.splice(index, 1);
            }
        });
        this.setState({ attributeProfiles: newAttributeProfiles });
    }

    addIncludedAttribute = (attributeName: string) => {
        log.info(attributeName);
        if (attributeName != "select") {
            const newAttributeProfiles = JSON.parse(JSON.stringify(this.state.attributeProfiles));//deep copy the state.addressProfiles
            const index = newAttributeProfiles.length;
            newAttributeProfiles.splice(index, 0, { attributeProfileName: attributeName });
            this.setState({ attributeProfiles: newAttributeProfiles, addAttributeName: "select" });
        }
    }

    render() {

        const itemStyle = {
            marginTop: "10px",
            borderRadius: "5px",
            background: "#FFFFFF",
        } as React.CSSProperties;

        const itemHeadStyle = {
            padding: "7px 5px 30px 5px",
            height: "15px",
            fontSize: "20px",
            width: "100%",
        } as React.CSSProperties;

        const itemHeadButtonStyle = {
            padding: "5px",
            float: "right",
        } as React.CSSProperties;

        const itemHrStyle = {
            width: "100%",
            margin: "0 0 7px 0",
        } as React.CSSProperties;

        const itemBodyStyle = {
            padding: "5px",
            width: "100%",
        } as React.CSSProperties;

        const subItemSytle = {
            backgroundColor: "#99BB99",
            // color: "#FFF",
        }

        const subItemHeadSytle = {
            padding: "0.5em 0 1.5em 0",
            fontSize: "1.1em",
            textAlign: "center"
        }

        const centerStyle = {
            fontSize: "1.2em",
            textAlign: "center",
            cursor: "pointer",
            paddingBottom: "1em",
            lineHeight: "0",
        }

        const addButtonStyle = {
            backgroundColor: "#509970",
            paddingBottom: "0",
            lineHeight: "normal",
            padding: "5px 0",
            borderRadius: "5px",
        }

        const rightDivStyle = {
            float: "right",
        }

        const subSubItemSytle = {
            backgroundColor: "#779977",
            marginLeft: "5px",
            marginRight: "5px",
            // color: "#FFF",
        }

        const subSubItemHeadStyle = {
            padding: "7px 5px 5px",
            fontSize: "15px",
            height: "unset",
        }

        const subSubitemBodyStyle = {
            fontSize: "15px",
        }

        const selectStyle = {
            width: "100%",
            marginBottom: "5px",
            padding: "5px",
            borderRadius: "5px",
        }

        const tdStyle = {
            fontWeight: "bold",
        }

        const insideFormStyle = {
            color: "white",
        }

        return (
            <div style={itemStyle}>
                <div style={itemHeadButtonStyle}>
                    {this.state.isEditingForm
                        ?
                        <>
                            <AnchorButton onClick={this.handleSaveChange} intent="success" icon="floppy-disk" text="Save Change" />
                            <AnchorButton onClick={this.handleDiscardChange} intent="danger" icon="cross" text="Discard Change" style={{ marginLeft: "5px" }} />
                        </>
                        :
                        <>
                            <AnchorButton onClick={this.handleEditProfile} intent="success" icon="edit" text="Edit Profile" />
                            <AnchorButton onClick={this.handleDeleteChange} intent="danger" icon="delete" text="Delete Profile" style={{ marginLeft: "5px" }} />
                        </>
                    }
                </div>
                <div style={itemHeadStyle}>
                    {this.props.componentProfile.key}
                </div>
                <hr style={itemHrStyle} />
                <div style={itemBodyStyle}>
                    <table>
                        <tr>
                            <td style={tdStyle}>Description</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                        ? <InputGroup value={this.state.description} onChange={(event) => { this.setState({ description: event.target.value }) }} />
                                        : <>{this.state.description}</>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td style={tdStyle}>Example</td>
                            <td>:</td>
                            <td>
                                {
                                    this.state.isEditingForm
                                        ? <InputGroup value={this.state.example} onChange={(event) => { this.setState({ example: event.target.value }) }} />
                                        : <>{this.state.example}</>
                                }
                            </td>
                        </tr>
                    </table>
                    <div style={{ ...itemStyle, ...subItemSytle, ...insideFormStyle }}>
                        <div style={{ ...itemHeadStyle, ...subItemHeadSytle, fontWeight: "bold" }}>Attribute Profile</div>
                        <hr style={itemHrStyle} />
                        <Collapse isOpen={this.state.isListOpen} style={itemBodyStyle}>
                            {
                                this.state.attributeProfiles.map((attribute) => (
                                    <ComponentIncludedAttributeItem
                                        key={attribute.attributeProfileName}
                                        attributeName={attribute.attributeProfileName}
                                        attributeProfiles={this.props.attributeProfiles}
                                        isEditingForm={this.state.isEditingForm}
                                        removeIncludedAttribute={this.removeIncludedAttribute}
                                    />
                                ))
                            }
                        </Collapse>
                        {this.state.isEditingForm
                            ? <div style={{ ...itemStyle, ...subSubItemSytle }}>
                                <div style={{ padding: "5px" }}>
                                    <select style={selectStyle} value={this.state.addAttributeName} onChange={(event) => { this.setState({ addAttributeName: event.target.value }) }}>
                                        <option value="select">Please select attribute</option>
                                        {
                                            this.props.attributeProfiles.map((attribute) => (
                                                // <option key={attribute.name} value={attribute.name}>{attribute.name}</option>
                                                <AttributeOption key={attribute.name} attributeName={attribute.name} attributeIncluded={this.state.attributeProfiles} />
                                            ))
                                        }
                                    </select>
                                    <div style={{ ...centerStyle, ...addButtonStyle, fontWeight: "bold" }} onClick={() => { this.addIncludedAttribute(this.state.addAttributeName) }}>Add Included Attribute</div>
                                </div>
                            </div>
                            : <></>
                        }
                        <div style={centerStyle} onClick={this.handleListOpen}>...</div>
                    </div>
                </div>
            </div>
        );
    }
}

const AttributeOption = (props) => {
    var isIncluded = false;

    props.attributeIncluded.forEach(element => {
        if (element.attributeProfileName == props.attributeName) {
            isIncluded = true;
        }
    });

    return <option disabled={isIncluded} value={props.attributeName}>{props.attributeName}{isIncluded ? " (already included)" : ""}</option>

}

const ComponentIncludedAttributeItem = (props: ComponentIncludedAttributeItemProps) => {
    const itemStyle = {
        marginTop: "10px",
        borderRadius: "5px",
        background: "#FFFFFF",
    } as React.CSSProperties;

    const itemHeadStyle = {
        padding: "7px 5px 30px 5px",
        height: "15px",
        fontSize: "20px",
        width: "100%",
    } as React.CSSProperties;

    const itemHeadButtonStyle = {
        padding: "5px",
        float: "right",
    } as React.CSSProperties;

    const itemHrStyle = {
        width: "100%",
        margin: "0 0 7px 0",
        clear: "both",
    } as React.CSSProperties;

    const itemBodyStyle = {
        padding: "5px",
        width: "100%",
    } as React.CSSProperties;

    const rightDivStyle = {
        float: "right",
    }

    const subSubItemSytle = {
        backgroundColor: "#779977",
        marginLeft: "5px",
        marginRight: "5px",
        // color: "#FFF",
    }

    const subSubItemHeadStyle = {
        padding: "10px 5px 5px",
        fontSize: "15px",
        height: "unset",
    }

    const subSubitemBodyStyle = {
        fontSize: "15px",
    }

    let output = <></>

    props.attributeProfiles.forEach((attribute) => {
        if (attribute.name == props.attributeName) {
            output =
                <div style={{ ...itemStyle, ...subSubItemSytle }} key={props.attributeName}>
                    <div style={itemHeadButtonStyle}>
                        {
                            props.isEditingForm
                                ? <AnchorButton onClick={() => { props.removeIncludedAttribute(props.attributeName) }} intent="danger" icon="delete" style={{ marginLeft: "5px" }} />
                                : <></>
                        }
                    </div>
                    <div style={{ ...itemHeadStyle, ...subSubItemHeadStyle }}>
                        <span style={{ fontWeight: "bold" }}>{attribute.name}</span>
                        <div style={rightDivStyle}>
                            min: {attribute.minCardinality} | max: {attribute.maxCardinality}
                        </div>
                    </div>
                    <hr style={itemHrStyle} />
                    <div style={{ ...itemBodyStyle, ...subSubitemBodyStyle }}>
                        <table>
                            <tr>
                                <td>Value Type</td><td>:</td><td>{attribute.valueType}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                ;
        }
    });
    return output;
}

export interface AddressComponentProfilePanelProps {
    currentAddressProfile: AddressProfile,
    changeStateHandler: any,
}

interface AddressComponentProfileFormProps {
    changeStateHandler: any,
    attributeProfiles: AttributeProfile[],
    currentAddressProfile: AddressProfile,
}

interface AddressComponentProfileListProps {
    componentProfiles: AddressComponentProfile[],
    attributeProfiles: AttributeProfile[],
    changeStateHandler: any,
}

interface AddressComponentProfileListItemProps {
    componentProfile: AddressComponentProfile,
    attributeProfiles: AttributeProfile[],
    changeStateHandler: any,
}

interface ComponentIncludedAttributeItemProps {
    attributeName: string,
    attributeProfiles: AttributeProfile[],
    isEditingForm: boolean,
    removeIncludedAttribute: any,
}
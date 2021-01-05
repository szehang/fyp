let addressProfiles = [];
let currentAddressProfile;

//--FOR ADDRESS PROFILE LIST PAGE START--
//to show the form for add a new address profile and hide the add btn
document.querySelector("#new-address-profile-btn").addEventListener("click", (event) => {
    document.querySelector("#new-address-profile-btn").classList.add("hide");
    document.querySelector("#new-address-profile-form").classList.remove("hide");
});
//add a new address profile to the memory
document.querySelector("#create-new-address-profile-btn").addEventListener("click", (event) => {



    // addressProfiles.push({
    //     code: document.querySelector("#create-new-address-profile-country").value,
    //     addressClassProfiles: [],
    //     addressComponentProfiles: [],
    //     attributeProfiles: []
    // });




    //////demo data//////
    addressProfiles.push({
        code: document.querySelector("#create-new-address-profile-country").value,
        addressClassProfiles: [{
                id: "streetAddress",
                type: "regular",
                description: "normal street address",
                locatization: "locatization 1",
                timeToLive: "10",
                validity: "validity 1",
                addressComponentProfiles: [{
                        component: {
                            key: "addressNumber",
                            description: "Address number",
                            example: "23",
                            attributeProfiles: [{
                                attribute: {
                                    name: "number",
                                    valueType: "int",
                                    minCardinality: 0,
                                    maxCardinality: 99
                                },
                                minCardinality: 1,
                                maxCardinality: 5
                            }]
                        },
                        minCardinality: 1,
                        maxCardinality: 1,
                    },
                    {
                        component: {
                            key: "localityName",
                            description: "Locality name",
                            example: "Yuen Long",
                            attributeProfiles: [{
                                attribute: {
                                    name: "name",
                                    valueType: "String",
                                    minCardinality: 0,
                                    maxCardinality: 99
                                },
                                minCardinality: 1,
                                maxCardinality: 1
                            }]
                        },
                        minCardinality: 1,
                        maxCardinality: 1
                    }
                ]
            },
            {
                id: "boxAddress",
                type: "regular",
                description: "mailbox address",
                locatization: "locatization 2",
                timeToLive: "30",
                validity: "validity 2",
                addressComponentProfiles: [{
                        component: {
                            key: "addressNumber",
                            description: "Address number",
                            example: "23",
                            attributeProfiles: [{
                                attribute: {
                                    name: "number",
                                    valueType: "int",
                                    minCardinality: 0,
                                    maxCardinality: 99
                                },
                                minCardinality: 1,
                                maxCardinality: 5
                            }]
                        },
                        minCardinality: 1,
                        maxCardinality: 1,
                    },
                    {
                        component: {
                            key: "localityName",
                            description: "Locality name",
                            example: "Yuen Long",
                            attributeProfiles: [{
                                attribute: {
                                    name: "name",
                                    valueType: "String",
                                    minCardinality: 0,
                                    maxCardinality: 99
                                },
                                minCardinality: 1,
                                maxCardinality: 1
                            }]
                        },
                        minCardinality: 1,
                        maxCardinality: 1
                    },
                    {
                        component: {
                            key: "postOfficeName",
                            description: "Post office name",
                            example: "HK GOV Post Office 32",
                            attributeProfiles: [{
                                    attribute: {
                                        name: "name",
                                        valueType: "string",
                                        minCardinality: 1,
                                        maxCardinality: 50
                                    },
                                    minCardinality: 1,
                                    maxCardinality: 1
                                },
                                {
                                    attribute: {
                                        name: "number",
                                        valueType: "int",
                                        minCardinality: 0,
                                        maxCardinality: 99
                                    },
                                    minCardinality: 0,
                                    maxCardinality: 1
                                }
                            ]
                        },
                        minCardinality: 1,
                        maxCardinality: 1
                    }
                ]
            }
        ],
        addressComponentProfiles: [{
            key: "addressNumber",
            description: "Address number",
            example: "23",
            attributeProfiles: [{
                attribute: {
                    name: "number",
                    valueType: "int",
                    minCardinality: 0,
                    maxCardinality: 99
                },
                minCardinality: 1,
                maxCardinality: 5
            }]
        }, {
            key: "localityName",
            description: "Locality name",
            example: "Yuen Long",
            attributeProfiles: [{
                attribute: {
                    name: "name",
                    valueType: "String",
                    minCardinality: 0,
                    maxCardinality: 99
                },
                minCardinality: 1,
                maxCardinality: 1
            }]
        }, {
            key: "postOfficeName",
            description: "Post office name",
            example: "HK GOV Post Office 32",
            attributeProfiles: [{
                    attribute: {
                        name: "name",
                        valueType: "string",
                        minCardinality: 1,
                        maxCardinality: 50
                    },
                    minCardinality: 1,
                    maxCardinality: 1
                },
                {
                    attribute: {
                        name: "number",
                        valueType: "int",
                        minCardinality: 0,
                        maxCardinality: 99
                    },
                    minCardinality: 0,
                    maxCardinality: 1
                }
            ]
        }],
        attributeProfiles: [{
                name: "name",
                valueType: "string",
                minCardinality: 1,
                maxCardinality: 50
            },
            {
                name: "number",
                valueType: "int",
                minCardinality: 0,
                maxCardinality: 99
            }
        ]
    });
    ////////////







    refreshAddressProfileList();
    document.querySelector("#new-address-profile-btn").classList.remove("hide");
    document.querySelector("#new-address-profile-form").classList.add("hide");
});

const refreshAddressProfileList = () => {
    addressProfiles.forEach((addressProfileItem) => {
        const addressProfileLi = document.createElement("li");
        addressProfileLi.appendChild(document.createTextNode(addressProfileItem.code));
        addressProfileLi.addEventListener("click", (event) => {
            //change the current address profile to the selected one
            currentAddressProfile = addressProfileItem;
            //display information in a address profile
            displayAddressProfile();

        });
        document.querySelector("#address-profile-list").appendChild(addressProfileLi);
    });
};

const displayAddressProfile = () => {
    //show the content of this address profile and hide the address profile list page
    document.querySelector("#address-profile-list-section").classList.add("hide");
    document.querySelector("#address-profile-section").classList.remove("hide");
    refreshAddressProfile();
};

//--FOR ADDRESS PROFILE LIST PAGE END--


//--FOR ADDRESS PROFILE PAGE START--

const refreshAddressProfile = () => {
    closeHoverSection();
    document.querySelector("#currentAddressProfileName").innerHTML = currentAddressProfile.code;

    //for display address class profile list of the current address profile
    document.querySelector("#address-class-profiles").innerHTML = "";
    currentAddressProfile.addressClassProfiles.forEach((addressClassProfileItem) => {
        const addressClassProfileLi = document.createElement("li");
        addressClassProfileLi.innerHTML =
            `
                <div>
                    <span>${addressClassProfileItem.id}</span><span class="show-more-btn">...</span>
                </div>
                <div>
                    <span class="expend-span">desc: ${addressClassProfileItem.description}</span>
                </div>
                <div>
                    <span>type: ${addressClassProfileItem.type}</span>
                </div>
                <div>
                    <span>localization: ${addressClassProfileItem.locatization}</span>
                </div>
                <div>
                    <span>time to live: ${addressClassProfileItem.timeToLive}</span>
                </div>
                <div>
                    <span>validity: ${addressClassProfileItem.validity}</span>
                </div>
                <div>
                    <span>components:</span>

                </div>
            `;

        addressClassProfileLi.querySelector(".show-more-btn").addEventListener("click", (event) => {
            addressClassProfileLi.classList.contains("expend-li") ?
                addressClassProfileLi.classList.remove("expend-li") :
                addressClassProfileLi.classList.add(("expend-li"));
        });

        // addressClassProfileLi.addEventListener("click", (event) => {
        //     addressClassProfileLi.classList.contains("expend-li") ?
        //         addressClassProfileLi.classList.remove("expend-li") :
        //         addressClassProfileLi.classList.add(("expend-li"));
        // });

        const addressComponentDiv = document.createElement("div");
        const addressComponentUl = document.createElement("ul");
        addressClassProfileItem.addressComponentProfiles.forEach((addressComponentItem) => {
            const addressComponentLi = document.createElement("li");
            addressComponentLi.innerHTML =
                `
                    <div>${addressComponentItem.component.name}</div>
                    <div>valueType: ${addressComponentItem.component.valueType}</div>
                    <div>example: ${addressComponentItem.component.example}</div>
                    <div>
                        <div>min: ${addressComponentItem.minCardinality}</div>
                        <div>max: ${addressComponentItem.maxCardinality}</div>
                    </div>
                    `;
            addressComponentUl.appendChild(addressComponentLi);
        });
        addressComponentDiv.appendChild(addressComponentUl);

        const addressComponentAddBtn = document.createElement("div");
        addressComponentAddBtn.innerHTML = `<div class="add-item-btn">+</div>`;
        addressComponentAddBtn.classList.add("add-item-btn-div");
        addressComponentAddBtn.querySelector(".add-item-btn").addEventListener("click", (event) => {
            document.querySelector("#hover-section").classList.remove("hide");
            document.querySelector("#add-address-conponent-profile-to-address-class-profile-div").classList.remove("hide");
            document.querySelector("#add-address-conponent-profile-to-address-class-profile-address-class-profile-name").innerHTML = addressClassProfileItem.id;
            const addressComponentsSelect = document.querySelector("#add-address-conponent-profile-to-address-class-profile-components-select");
            addressComponentsSelect.innerHTML = "";
            currentAddressProfile.addressComponentProfiles.forEach((addressComponentItem) => {
                addressComponentsSelect.innerHTML += `
                    <option value="${addressComponentItem.key}">${addressComponentItem.key}</option>
                `;
            });
            document.querySelector("#add-address-conponent-profile-to-address-class-profile-add-btn").addEventListener("click", (event) => {
                event.preventDefault();
                const key = document.querySelector("#add-address-conponent-profile-to-address-class-profile-components-select").value;
                const minCardinality = document.querySelector("#add-address-conponent-profile-to-address-class-profile-minCardinality").value;
                const maxCardinality = document.querySelector("#add-address-conponent-profile-to-address-class-profile-maxCardinality").value;
                currentAddressProfile.addressComponentProfiles.forEach((addressComponentProfileItem) => {
                    if (key == addressComponentProfileItem.key) {
                        addressClassProfileItem.addressComponentProfiles.push({
                            component: addressComponentProfileItem,
                            minCardinality: minCardinality,
                            maxCardinality: maxCardinality
                        });
                        console.log(addressComponentProfileItem);
                        refreshAddressProfile();
                    }
                });
            });
        });


        addressClassProfileLi.appendChild(addressComponentDiv);
        addressClassProfileLi.appendChild(addressComponentAddBtn);


        document.querySelector("#address-class-profiles").appendChild(addressClassProfileLi);
    });

    //for display address component profile list of the current address profile
    document.querySelector("#address-component-profiles").innerHTML = "";
    currentAddressProfile.addressComponentProfiles.forEach((addressComponentProfileItem) => {
        const addressComponentProfileLi = document.createElement("li");
        addressComponentProfileLi.innerHTML =
            `
                <div>
                    <span>${addressComponentProfileItem.key}</span><span class="show-more-btn">...</span>
                </div>
                <div>
                    <span>desc: ${addressComponentProfileItem.description}</span>
                </div>
                <div>
                    <span>desc: ${addressComponentProfileItem.example}</span>
                </div>
                <div>
                    <span>attributes:</span>
                </div>
               `;
        addressComponentProfileLi.querySelector(".show-more-btn").addEventListener("click", (event) => {
            addressComponentProfileLi.classList.contains("expend-li") ?
                addressComponentProfileLi.classList.remove("expend-li") :
                addressComponentProfileLi.classList.add(("expend-li"));
        });
        // addressComponentProfileLi.addEventListener("click", (event) => {
        //     addressComponentProfileLi.classList.contains("expend-li") ?
        //         addressComponentProfileLi.classList.remove("expend-li") :
        //         addressComponentProfileLi.classList.add(("expend-li"));
        // });


        //////////////////////////////////////////////////////
        const attributeDiv = document.createElement("div");
        const attributeUl = document.createElement("ul");
        addressComponentProfileItem.attributeProfiles.forEach((attributeItem) => {
            const attributeLi = document.createElement("li");
            attributeLi.innerHTML =
                `
                    <div>${attributeItem.attribute.name}</div>
                    <div>valueType: ${attributeItem.attribute.valueType}</div>
                    <div>
                        <div>min: ${attributeItem.minCardinality}</div>
                        <div>max: ${attributeItem.maxCardinality}</div>
                    </div>
                    `;
            attributeUl.appendChild(attributeLi);
        });
        attributeDiv.appendChild(attributeUl);

        const attributeAddBtn = document.createElement("div");
        attributeAddBtn.innerHTML = `<div class="add-item-btn">+</div>`;
        attributeAddBtn.classList.add("add-item-btn-div");
        attributeAddBtn.querySelector(".add-item-btn").addEventListener("click", (event) => {
            document.querySelector("#hover-section").classList.remove("hide");
            document.querySelector("#add-attribute-profile-to-address-component-profile-div").classList.remove("hide");
            document.querySelector("#add-attribute-profile-to-address-component-profile-attribute-profile-name").innerHTML = addressComponentProfileItem.id;
            const attributesSelect = document.querySelector("#add-attribute-profile-to-address-component-profile-attributes-select");
            attributesSelect.innerHTML = "";
            currentAddressProfile.attributeProfiles.forEach((attributeItem) => {
                attributesSelect.innerHTML += `
                    <option value="${attributeItem.name}">${attributeItem.name}</option>
                `;
            });
            document.querySelector("#add-attribute-profile-to-address-component-profile-add-btn").addEventListener("click", (event) => {
                event.preventDefault();
                const name = document.querySelector("#add-attribute-profile-to-address-component-profile-attributes-select").value;
                const minCardinality = document.querySelector("#add-attribute-profile-to-address-component-profile-minCardinality").value;
                const maxCardinality = document.querySelector("#add-attribute-profile-to-address-component-profile-maxCardinality").value;
                currentAddressProfile.attributeProfiles.forEach((attributeProfileItem) => {
                    if (name == attributeProfileItem.name) {
                        addressComponentProfileItem.attributeProfiles.push({
                            attribute: attributeProfileItem,
                            minCardinality: minCardinality,
                            maxCardinality: maxCardinality
                        });
                        console.log(attributeProfileItem);
                        refreshAddressProfile();
                    }
                });
            });
        });
        addressComponentProfileLi.appendChild(attributeDiv);
        addressComponentProfileLi.appendChild(attributeAddBtn);

        /////////////////////////////////////////////////////



        document.querySelector("#address-component-profiles").appendChild(addressComponentProfileLi);
    });

    //for display attribute profile list of the current address profile
    document.querySelector("#attribute-profiles").innerHTML = "";
    currentAddressProfile.attributeProfiles.forEach((attributeProfileItem) => {
        const attributeProfileLi = document.createElement("li");
        attributeProfileLi.innerHTML =
            `
                <div>
                    <span>${attributeProfileItem.name}</span>
                    <div>min: ${attributeProfileItem.minCardinality}</div>
                </div>
                <div>
                    <div>valueType: ${attributeProfileItem.valueType}</div>
                    <div>max: ${attributeProfileItem.maxCardinality}</div>
                </div>
               `;
        // attributeProfileLi.addEventListener("click", (event) => {
        //     attributeProfileLi.classList.contains("expend-li") ?
        //         attributeProfileLi.classList.remove("expend-li") :
        //         attributeProfileLi.classList.add(("expend-li"));
        // });
        document.querySelector("#attribute-profiles").appendChild(attributeProfileLi);
    });
};

//to show the add address class profile form and hide the add btn 
document.querySelector("#new-address-class-profile-btn").addEventListener("click", (even) => {
    document.querySelector("#new-address-class-profile-div").classList.remove("hide");
    document.querySelector("#new-address-class-profile-btn").classList.add("hide");
});

//to show the add address component profile form and hide the add btn 
document.querySelector("#new-address-component-profile-btn").addEventListener("click", (even) => {
    document.querySelector("#new-address-component-profile-div").classList.remove("hide");
    document.querySelector("#new-address-component-profile-btn").classList.add("hide");
});

//to show the add attribute profile form and hide the add btn 
document.querySelector("#new-attribute-profile-btn").addEventListener("click", (even) => {
    document.querySelector("#new-attribute-profile-div").classList.remove("hide");
    document.querySelector("#new-attribute-profile-btn").classList.add("hide");
});

//assign the btn for create a new address class profile
document.querySelector("#create-new-address-class-profile-btn").addEventListener("click", (event) => {
    currentAddressProfile.addressClassProfiles.push({
        id: document.querySelector("#address-class-profile-id").value,
        type: document.querySelector("#address-class-profile-type").value,
        description: document.querySelector("#address-class-profile-description").value,
        locatization: document.querySelector("#address-class-profile-localization").value,
        timeToLive: document.querySelector("#address-class-profile-timeToLive").value,
        validity: document.querySelector("#address-class-profile-validity").value,
        addressComponentProfiles: []
    });
    //hide the form and show the add button again
    document.querySelector("#new-address-class-profile-div").classList.add("hide");
    document.querySelector("#new-address-class-profile-btn").classList.remove("hide");
    refreshAddressProfile();
});

//assign the btn for create a new address component profile
document.querySelector("#create-new-address-component-profile-btn").addEventListener("click", (event) => {
    currentAddressProfile.addressComponentProfiles.push({
        key: document.querySelector("#address-component-profile-key").value,
        description: document.querySelector("#address-component-profile-description").value,
        example: document.querySelector("#address-component-profile-example").value,
        attributeProfiles: []
    });
    //hide the form and show the add button again
    document.querySelector("#new-address-component-profile-div").classList.add("hide");
    document.querySelector("#new-address-component-profile-btn").classList.remove("hide");
    refreshAddressProfile();
});

//assign the btn for create a new attribute profile
document.querySelector("#create-new-attribute-profile-btn").addEventListener("click", (event) => {
    currentAddressProfile.attributeProfiles.push({
        name: document.querySelector("#attribute-profile-name").value,
        valueType: document.querySelector("#attribute-profile-valueType").value,
        minCardinality: document.querySelector("#attribute-profile-minCardinality").value,
        maxCardinality: document.querySelector("#attribute-profile-maxCardinality").value
    });
    //hide the form and show the add button again
    document.querySelector("#new-attribute-profile-div").classList.add("hide");
    document.querySelector("#new-attribute-profile-btn").classList.remove("hide");
    refreshAddressProfile();
});

//close all element on hover-section
const closeHoverSection = () => {
    document.querySelector("#hover-section").classList.add("hide");
    document.querySelectorAll(".hover-section-div").forEach((item) => {
        item.classList.add("hide");
    });
}



document.querySelectorAll(".hover-section-close-btn").forEach((item) => {
    item.addEventListener("click", (event) => {
        closeHoverSection();
    });
});


//--FOR ADDRESS PROFILE PAGE END--
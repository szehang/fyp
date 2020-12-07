let addressProfiles = [];
let currentAddressProfile;

//--FOR ADDRESS PROFILE LIST PAGE START--
//to show the form for add a new address profile and hide the add btn
document
  .querySelector("#new-address-profile-btn")
  .addEventListener("click", (event) => {
    document.querySelector("#new-address-profile-btn").classList.add("hide");
    document
      .querySelector("#new-address-profile-form")
      .classList.remove("hide");
  });
//add a new address profile to the memory
document
  .querySelector("#create-new-address-profile-btn")
  .addEventListener("click", (event) => {
    addressProfiles.push({
      code: document.querySelector("#create-new-address-profile-country").value,
      addressClassProfiles: [],
      addressComponentProfiles: [],
    });
    refreshAddressProfileList();
    document.querySelector("#new-address-profile-btn").classList.remove("hide");
    document.querySelector("#new-address-profile-form").classList.add("hide");
  });

const refreshAddressProfileList = () => {
  //clean all profile first
  document.querySelector("#address-profile-list").innerHTML = "";
  
  addressProfiles.forEach((addressProfileItem) => {
    //append profile to #address-profile-list
    const addressProfileLi = document.createElement("li");
    addressProfileLi.appendChild(
      document.createTextNode(addressProfileItem.code)
    );
    addressProfileLi.addEventListener("click", (event) => {
      //change the current address profile to the selected one
      currentAddressProfile = addressProfileItem;
      //display information in a address profile
      displayAddressProfile();
    });
    document
      .querySelector("#address-profile-list")
      .appendChild(addressProfileLi);
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
  document.querySelector("#currentAddressProfileName").innerHTML =
    currentAddressProfile.code;

  //for display address class profile list of the current address profile
  document.querySelector("#address-class-profiles").innerHTML = "";
  currentAddressProfile.addressClassProfiles.forEach(
    (addressClassProfileItem) => {
      const addressClassProfileLi = document.createElement("li");
      addressClassProfileLi.innerHTML = `
                <div>
                    <span>${addressClassProfileItem.id}</span>
                    <span>type: ${addressClassProfileItem.type}</span>
                </div>
                <div>
                    <span class="expend-span">desc: ${addressClassProfileItem.description}</span>
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
                    <span>component:</span>

                </div>
            `;

      addressClassProfileLi.addEventListener("click", (event) => {
        addressClassProfileLi.classList.contains("expend-li")
          ? addressClassProfileLi.classList.remove("expend-li")
          : addressClassProfileLi.classList.add("expend-li");
      });

      const addressComponentDiv = document.createElement("div");
      const addressComponentUl = document.createElement("ul");
      addressClassProfileItem.addressComponentProfiles.forEach(
        (addressComponentItem) => {
          const addressComponentLi = document.createElement("li");
          addressComponentLi.innerHTML = `
                    <div>${addressComponentItem.name}</div>
                    <div>valueType: ${addressComponentItem.valueType}</div>
                    <div>
                        <div>min: ${/*hold on*/ "min"}</div>
                        <div>max: ${/*hold on*/ "max"}</div>
                    </div>
                    `;
          addressComponentUl.appendChild(addressProfileLi);
        }
      );
      addressComponentDiv.appendChild(addressComponentUl);

      const addressComponentAddBtn = document.createElement("div");
      addressComponentAddBtn.innerHTML = `<div class="add-item-btn">+</div>`;
      addressComponentAddBtn.classList.add("add-item-btn-div");

      addressClassProfileLi.appendChild(addressComponentDiv);
      addressClassProfileLi.appendChild(addressComponentAddBtn);

      document
        .querySelector("#address-class-profiles")
        .appendChild(addressClassProfileLi);
    }
  );

  //for display address component profile list of the current address profile
  document.querySelector("#address-component-profiles").innerHTML = "";
  currentAddressProfile.addressComponentProfiles.forEach(
    (addressComponentProfileItem) => {
      const addressComponentProfileLi = document.createElement("li");
      addressComponentProfileLi.innerHTML = `
                <div>
                    <span>${addressComponentProfileItem.key}</span>
                </div>
                <div>
                    <span>desc: ${addressComponentProfileItem.description}</span>
                </div>
                <div>
                    <span>desc: ${addressComponentProfileItem.example}</span>
                </div>
               `;
      addressComponentProfileLi.addEventListener("click", (event) => {
        addressComponentProfileLi.classList.contains("expend-li")
          ? addressComponentProfileLi.classList.remove("expend-li")
          : addressComponentProfileLi.classList.add("expend-li");
      });
      document
        .querySelector("#address-component-profiles")
        .appendChild(addressComponentProfileLi);
    }
  );
};

//to show the add address class profile form and hide the add btn
document
  .querySelector("#new-address-class-profile-btn")
  .addEventListener("click", (even) => {
    document
      .querySelector("#new-address-class-profile-div")
      .classList.remove("hide");
    document
      .querySelector("#new-address-class-profile-btn")
      .classList.add("hide");
  });

//to show the add address component profile form and hide the add btn
document
  .querySelector("#new-address-component-profile-btn")
  .addEventListener("click", (even) => {
    document
      .querySelector("#new-address-component-profile-div")
      .classList.remove("hide");
    document
      .querySelector("#new-address-component-profile-btn")
      .classList.add("hide");
  });

//assign the btn for create a new address class profile
document
  .querySelector("#create-new-address-class-profile-btn")
  .addEventListener("click", (event) => {
    currentAddressProfile.addressClassProfiles.push({
      id: document.querySelector("#address-class-profile-id").value,
      type: document.querySelector("#address-class-profile-type").value,
      description: document.querySelector("#address-class-profile-description")
        .value,
      locatization: document.querySelector(
        "#address-class-profile-localization"
      ).value,
      timeToLive: document.querySelector("#address-class-profile-timeToLive")
        .value,
      validity: document.querySelector("#address-class-profile-validity").value,
      addressComponentProfiles: [],
    });
    //hide the form and show the add button again
    document
      .querySelector("#new-address-class-profile-div")
      .classList.add("hide");
    document
      .querySelector("#new-address-class-profile-btn")
      .classList.remove("hide");
    refreshAddressProfile();
  });

//assign the btn for create a new address component profile
document
  .querySelector("#create-new-address-component-profile-btn")
  .addEventListener("click", (event) => {
    currentAddressProfile.addressComponentProfiles.push({
      key: document.querySelector("#address-component-profile-key").value,
      description: document.querySelector(
        "#address-component-profile-description"
      ).value,
      example: document.querySelector("#address-component-profile-example")
        .value,
    });
    //hide the form and show the add button again
    document
      .querySelector("#new-address-component-profile-div")
      .classList.add("hide");
    document
      .querySelector("#new-address-component-profile-btn")
      .classList.remove("hide");
    refreshAddressProfile();
  });

//--FOR ADDRESS PROFILE PAGE END--

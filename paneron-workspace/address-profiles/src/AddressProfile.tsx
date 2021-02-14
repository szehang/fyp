import { Data } from "electron/renderer";

export interface AddressProfile {
    id: string, //as index
    countries?: string[], //iso3166 alpha-3 code
    addressProfiles: AddressClassProfile[],
    componentProfiles: AddressComponentProfile[],
    attributeProfiles: AttributeProfile[],
}

export interface AddressClassProfile {
    id: string,
    type: string,
    localization: string, //Localization
    description: string,
    signature?: string, //Signature
    areaApplicability?: string[], //iso19115MD_SpatialRresentation
    timeToLive: number,
    validity: string, //Validity
    componentProfiles: {addressComponentProfileKey: string, attributeProfile:AddressComponentSpecification,}[],        
}

export interface AddressComponentProfile {
    key: string,
    description: string,
    example?: string,
    attributeProfiles: {attributeProfileName: string}[],
}

export interface AttributeProfile {
    name: string,
    maxCardinality?: number,
    minCardinality?: number,
    valueType?: string,
}

export interface AddressComponentSpecification {
    maxCardinality: number,
    minCardinality: number,
}

// InterchangeAddressClassProfile Interface
export interface LayoutTemplate { // Docs 14.1
    id: string, 
    name: string,
    description: string,
    localization: string, // Data type: Localization,
    dimension?: LayoutDimension[], 
    orientation?: LayoutOrientation, 
    lines?: LayoutLine[], // Data type: LayoutLine
}

export interface LayoutDimension { // Docs 14.2
    width?: number,
    height?: number,
}

enum Orientation {
    horizontal = "horizontal",
    vertical = "vertical",
}
export interface LayoutOrientation { // Docs 14.3
    orientation: Orientation,
}

export interface LayoutLine { // Docs 15.1
    dimensions: LayoutDimension,
}

// START: Interface about Display Template
export interface DisplayTemplate extends LayoutTemplate {
    formLines: FormLine[], // Not Sure, see docs Part.16
}

export interface DisplayLine extends LayoutLine { // Docs 15.1 and 16
    elements: DisplayLineElement[],
}

export interface DisplayLineElement { // Docs 16.3
    textElements: TextElement[], // Should be 1..* or 1?
    dataElements: DisplayDataElement[] // Should be 1..* or 1?
}

export interface TextElement extends DisplayLineElement{ // Docs 16.5
    text: string,
}

export interface DisplayDataElement extends DisplayLineElement { // Docs 16.4
    value: string,
}
// END: Interface about Display Template

// START: Interface about Form Template
export interface FormTemplate extends LayoutTemplate {
    formLines: FormLine[], // Note Sure, see docs Part.17
}

export interface FormLine extends LayoutLine { // Docs 15.1 and 16
    elements: FormLineElement[],
}

export interface FormLineElement {
    selectionElements: SelectionElement[],
    staticTextElement: StaticTextElement,
    dataElement: FormDataElement, // Namespace: "Form", Original: "DataElement"
}
export interface SelectionPair { // Docs 17.4
    key: string,
    displayAs: string,
}

export interface SelectionElement extends FormLineElement { // Docs 17.5
    maps: SelectionPair[],
}

export interface FormDataElement extends FormLineElement { // Docs 17.6
    value: string,
}

export interface StaticTextElement extends FormLineElement { // Docs 17.7
    value: string,
}

export interface DataElementWithConditions extends FormDataElement { // Docs 17.8
    value: string, // Data Type: iso19115MD_Constraints
}
export interface AddressProfile {
    country?: string[], //iso3166 alpha-3 code
    addressProfiles: AddressClassProfile[],
    conponentProfiles: AddressClassProfile[],
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
    attributeProfiles: {attributeProfilesName: string}[],
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
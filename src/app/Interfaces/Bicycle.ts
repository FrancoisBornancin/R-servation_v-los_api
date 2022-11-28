export interface Bicycle{
  contractName: string,
  name: string,
  number: number,
  status: string,
  position: {
    latitude: string,
    longitude: string
  },
  accessType: string,
  lockerType: string,
  hasSurveillance: boolean,
  isFree: boolean,
  address: string,
  zipCode: string,
  city: string,
  isOffStreet: boolean,
  hasElectricSupport: boolean,
  hasPhysicalReception: boolean
}
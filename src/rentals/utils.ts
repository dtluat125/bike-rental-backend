import { BikeType } from '../bike/constants';
export function getDeposit(type: BikeType) {
  switch (type) {
    case BikeType.ELECTRICAL:
      return 700000;
    case BikeType.TWIN:
      return 550000;
    default:
      return 400000;
  }
}

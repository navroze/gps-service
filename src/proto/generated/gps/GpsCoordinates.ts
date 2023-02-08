// Original file: src/proto/gps.proto


export interface GpsCoordinates {
  'latitude'?: (number | string);
  'longitude'?: (number | string);
  'email'?: (string);
}

export interface GpsCoordinates__Output {
  'latitude'?: (number);
  'longitude'?: (number);
  'email'?: (string);
}

import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GpsServiceClient as _gps_GpsServiceClient, GpsServiceDefinition as _gps_GpsServiceDefinition } from './gps/GpsService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  gps: {
    GpsCoordinates: MessageTypeDefinition
    GpsResponse: MessageTypeDefinition
    GpsService: SubtypeConstructor<typeof grpc.Client, _gps_GpsServiceClient> & { service: _gps_GpsServiceDefinition }
  }
}


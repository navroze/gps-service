// Original file: src/proto/gps.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GpsCoordinates as _gps_GpsCoordinates, GpsCoordinates__Output as _gps_GpsCoordinates__Output } from '../gps/GpsCoordinates';
import type { GpsResponse as _gps_GpsResponse, GpsResponse__Output as _gps_GpsResponse__Output } from '../gps/GpsResponse';

export interface GpsServiceClient extends grpc.Client {
  CreateGpsRecord(argument: _gps_GpsCoordinates, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gps_GpsResponse__Output>): grpc.ClientUnaryCall;
  CreateGpsRecord(argument: _gps_GpsCoordinates, metadata: grpc.Metadata, callback: grpc.requestCallback<_gps_GpsResponse__Output>): grpc.ClientUnaryCall;
  CreateGpsRecord(argument: _gps_GpsCoordinates, options: grpc.CallOptions, callback: grpc.requestCallback<_gps_GpsResponse__Output>): grpc.ClientUnaryCall;
  CreateGpsRecord(argument: _gps_GpsCoordinates, callback: grpc.requestCallback<_gps_GpsResponse__Output>): grpc.ClientUnaryCall;
  createGpsRecord(argument: _gps_GpsCoordinates, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_gps_GpsResponse__Output>): grpc.ClientUnaryCall;
  createGpsRecord(argument: _gps_GpsCoordinates, metadata: grpc.Metadata, callback: grpc.requestCallback<_gps_GpsResponse__Output>): grpc.ClientUnaryCall;
  createGpsRecord(argument: _gps_GpsCoordinates, options: grpc.CallOptions, callback: grpc.requestCallback<_gps_GpsResponse__Output>): grpc.ClientUnaryCall;
  createGpsRecord(argument: _gps_GpsCoordinates, callback: grpc.requestCallback<_gps_GpsResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface GpsServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateGpsRecord: grpc.handleUnaryCall<_gps_GpsCoordinates__Output, _gps_GpsResponse>;
  
}

export interface GpsServiceDefinition extends grpc.ServiceDefinition {
  CreateGpsRecord: MethodDefinition<_gps_GpsCoordinates, _gps_GpsResponse, _gps_GpsCoordinates__Output, _gps_GpsResponse__Output>
}

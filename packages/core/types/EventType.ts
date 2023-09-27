export enum EventType {
  LOG = "log", // Send by the source to the monitor
  SHARED_LOG = "shared_log", // Send by the server to the monitor
  ERROR = "error",
}
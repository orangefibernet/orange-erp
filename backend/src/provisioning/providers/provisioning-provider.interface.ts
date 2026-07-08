export interface ProvisioningProvider {
  activateConnection(connectionId: string): Promise<void>;

  suspendConnection(connectionId: string): Promise<void>;

  resumeConnection(connectionId: string): Promise<void>;

  disconnectConnection(connectionId: string): Promise<void>;

  syncConnection(connectionId: string): Promise<void>;
}
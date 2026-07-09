export interface NetworkDevice {
  connect(nasId: string): Promise<void>;

  disconnect(): Promise<void>;

  testConnection(): Promise<boolean>;

  createUser(
    username: string,
    password: string,
    profile?: string,
  ): Promise<void>;

  updatePassword(
    username: string,
    password: string,
  ): Promise<void>;

  changeProfile(
    username: string,
    profile: string,
  ): Promise<void>;

  enableUser(
    username: string,
  ): Promise<void>;

  disableUser(
    username: string,
  ): Promise<void>;

  deleteUser(
    username: string,
  ): Promise<void>;

  disconnectUser(
    username: string,
  ): Promise<boolean>;

  // ===== Monitoring =====

  getActiveSessions(): Promise<any[]>;

  getSystemResource(): Promise<any>;

  getInterfaces(): Promise<any[]>;

  getSimpleQueues(): Promise<any[]>;
}
export interface DeploymentRecord {
  id: string; project: string; status: string; branch: string;
  commitHash: string; message: string; author: string; time: string; duration: string;
}
export interface ContainerRecord {
  id: string; name: string; image: string; status: string; cpu: number;
  ram: number; ports: string; uptime: string;
}
export interface DatabaseRecord {
  id: string; name: string; type: string; health: string; storage: string;
  connections: number; lastBackup: string;
}
export interface StorageRecord {
  id: string; name: string; type: string; size: string; modified: string;
}
export interface TeamRecord {
  id: string; name: string; email: string; role: string; status: string; joined: string;
}
export interface NotificationRecord {
  id: string; type: string; title: string; message: string; time: string; unread: boolean;
}
export interface ActivityRecord {
  id: string; user: string; action: string; target: string; time: string;
}
export interface WorkspaceFile {
  name: string; type: string; children?: WorkspaceFile[]; content?: string;
}
export interface WorkspaceRecord {
  id: string; name: string; branch: string; files: WorkspaceFile[];
  terminalHistory: string[]; collaborators: Array<{ name: string; color: string }>;
}
export interface TemplateRecord {
  id: string; name: string; category: string; desc: string; tags: string[];
  stars: number; downloads: number;
}
export interface AuditEventRecord {
  id: string; type: string; severity: string; title: string; desc: string;
  user: string; time: string; metadata: { ip: string; region: string; traceId: string };
}
export interface ApiKeyRecord {
  id: string; name: string; prefix: string; permissions: string; created: string;
  expires: string; lastUsed: string; usage: number;
}
export interface NodeRecord {
  id: string; hostname: string; ip: string; region: string; status: string;
  cpu: number; ram: number; docker: string; uptime: string;
}
export interface EnvVarRecord {
  id: string; name: string; value: string; env: string; modified: string; by: string;
}
export interface TerminalSessionRecord {
  id: string; name: string; user: string; status: string; duration: string; lastCmd: string;
}

/**
 * @deprecated These exports remain temporarily for page compatibility.
 * They are intentionally empty until each page is connected to an authenticated,
 * live API endpoint. Do not add sample or fabricated operational records here.
 */
export const mockDeployments: DeploymentRecord[] = [];
export const mockContainers: ContainerRecord[] = [];
export const mockDatabases: DatabaseRecord[] = [];
export const mockStorage: StorageRecord[] = [];
export const mockTeam: TeamRecord[] = [];
export const mockNotifications: NotificationRecord[] = [];
export const mockActivity: ActivityRecord[] = [];
export const mockWorkspaces: WorkspaceRecord[] = [];
export const mockTemplates: TemplateRecord[] = [];
export const mockAuditEvents: AuditEventRecord[] = [];
export const mockApiKeys: ApiKeyRecord[] = [];
export const mockNodes: NodeRecord[] = [];
export const mockEnvVars: EnvVarRecord[] = [];
export const mockTerminalSessions: TerminalSessionRecord[] = [];

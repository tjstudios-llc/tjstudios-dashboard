export const mockDeployments = [
  { id: 'dep-1', project: 'api.tjstudios.xyz', status: 'deployed', branch: 'main', commitHash: 'a1b2c3d', message: 'feat: update auth logic', author: 'Alex Chen', time: '10m ago', duration: '2m 14s' },
  { id: 'dep-2', project: 'dashboard.tjstudios.xyz', status: 'building', branch: 'feat/new-ui', commitHash: 'f9e8d7c', message: 'ui: redesign dashboard', author: 'Jordan Lee', time: 'Just now', duration: 'In progress' },
  { id: 'dep-3', project: 'worker-bot-01', status: 'failed', branch: 'main', commitHash: 'b4c5d6e', message: 'fix: memory leak', author: 'Sam Taylor', time: '1h ago', duration: '4m 02s' },
  { id: 'dep-4', project: 'landing-page', status: 'deployed', branch: 'main', commitHash: '9a8b7c6', message: 'content: update pricing', author: 'Alex Chen', time: '3h ago', duration: '1m 45s' },
  { id: 'dep-5', project: 'internal-tooling', status: 'queued', branch: 'chore/deps', commitHash: '5d4e3f2', message: 'chore: update react', author: 'Jordan Lee', time: 'Pending', duration: '-' },
];

export const mockContainers = [
  { id: 'cont-1', name: 'prod-postgres-01', image: 'postgres:15-alpine', status: 'running', cpu: 12, ram: 45, ports: '5432:5432', uptime: '45d 12h' },
  { id: 'cont-2', name: 'api-gateway', image: 'tjstudios/api-gateway:latest', status: 'running', cpu: 34, ram: 60, ports: '80:80, 443:443', uptime: '12d 4h' },
  { id: 'cont-3', name: 'redis-cache', image: 'redis:7-alpine', status: 'running', cpu: 2, ram: 15, ports: '6379:6379', uptime: '45d 12h' },
  { id: 'cont-4', name: 'worker-process-A', image: 'tjstudios/worker:v2.1', status: 'error', cpu: 0, ram: 0, ports: '-', uptime: 'Stopped' },
  { id: 'cont-5', name: 'staging-db', image: 'postgres:15-alpine', status: 'stopped', cpu: 0, ram: 0, ports: '5433:5432', uptime: 'Stopped' },
];

export const mockDatabases = [
  { id: 'db-1', name: 'prod-main-db', type: 'PostgreSQL', health: 'healthy', storage: '245 GB / 500 GB', connections: 142, lastBackup: '2 hours ago' },
  { id: 'db-2', name: 'analytics-warehouse', type: 'MySQL', health: 'healthy', storage: '890 GB / 1 TB', connections: 24, lastBackup: '12 hours ago' },
  { id: 'db-3', name: 'session-cache', type: 'Redis', health: 'healthy', storage: '12 GB / 32 GB', connections: 840, lastBackup: '-' },
  { id: 'db-4', name: 'document-store', type: 'MongoDB', health: 'degraded', storage: '4.2 TB / 5 TB', connections: 315, lastBackup: '1 day ago' },
];

export const mockStorage = [
  { id: 'f-1', name: 'Project_Alpha_Assets', type: 'folder', size: '1.2 GB', modified: 'Oct 12, 2023' },
  { id: 'f-2', name: 'Database_Backups', type: 'folder', size: '45.8 GB', modified: 'Today, 02:00 AM' },
  { id: 'f-3', name: 'Q3_Financial_Report.pdf', type: 'file', size: '4.2 MB', modified: 'Oct 10, 2023' },
  { id: 'f-4', name: 'hero_background_v2.png', type: 'image', size: '12.4 MB', modified: 'Oct 08, 2023' },
  { id: 'f-5', name: 'archive_2022.zip', type: 'archive', size: '2.4 GB', modified: 'Jan 01, 2023' },
];

export const mockTeam = [
  { id: 't-1', name: 'Alex Chen', email: 'alex@tjstudios.xyz', role: 'Owner', status: 'online', joined: 'Jan 2021' },
  { id: 't-2', name: 'Jordan Lee', email: 'jordan@tjstudios.xyz', role: 'Admin', status: 'online', joined: 'Mar 2021' },
  { id: 't-3', name: 'Sam Taylor', email: 'sam@tjstudios.xyz', role: 'Developer', status: 'offline', joined: 'Aug 2022' },
  { id: 't-4', name: 'Casey Smith', email: 'casey@tjstudios.xyz', role: 'Developer', status: 'online', joined: 'Nov 2022' },
  { id: 't-5', name: 'Jamie Doe', email: 'jamie@tjstudios.xyz', role: 'Viewer', status: 'offline', joined: 'Feb 2023' },
];

export const mockNotifications = [
  { id: 'n-1', type: 'success', title: 'Deployment Successful', message: 'api.tjstudios.xyz deployed to production', time: '10m ago', unread: true },
  { id: 'n-2', type: 'warning', title: 'High Memory Usage', message: 'Container prod-postgres-01 is using 90% of allocated memory', time: '32m ago', unread: true },
  { id: 'n-3', type: 'info', title: 'New Team Member', message: 'Casey Smith joined the workspace', time: '2h ago', unread: false },
  { id: 'n-4', type: 'error', title: 'Build Failed', message: 'worker-bot-01 failed to build on branch main', time: '4h ago', unread: false },
];

export const mockActivity = [
  { id: 'a-1', user: 'Alex Chen', action: 'pushed to main', target: 'api.tjstudios.xyz', time: '10m ago' },
  { id: 'a-2', user: 'System', action: 'restarted container', target: 'redis-cache', time: '2h ago' },
  { id: 'a-3', user: 'Jordan Lee', action: 'created a new database', target: 'analytics-warehouse', time: '1d ago' },
];

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Terminal as TerminalIcon, 
  RefreshCcw, 
  Play, 
  Square,
  Network,
  Lock,
  FileCode,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { mockContainers } from '@/mock/data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function ContainerDetail() {
  const { id } = useParams();
  const container = mockContainers.find(c => c.id === id) || mockContainers[0];
  
  const [metrics, setMetrics] = useState(
    Array.from({ length: 20 }).map((_, i) => ({
      time: i,
      cpu: Math.floor(Math.random() * 20) + 10,
      ram: Math.floor(Math.random() * 30) + 40,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const next = [...prev.slice(1), {
          time: prev[prev.length - 1].time + 1,
          cpu: Math.max(0, Math.min(100, prev[prev.length - 1].cpu + (Math.random() * 10 - 5))),
          ram: Math.max(0, Math.min(100, prev[prev.length - 1].ram + (Math.random() * 4 - 2))),
        }];
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary`}>
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{container.name}</h1>
              <Badge className={container.status === 'running' ? 'bg-chart-3/10 text-chart-3 border-chart-3/20' : 'bg-destructive/10 text-destructive border-destructive/20'}>
                {container.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground font-mono">{container.image}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <RefreshCcw className="w-4 h-4" /> Restart
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-destructive hover:bg-destructive/10">
            <Square className="w-4 h-4" /> Stop
          </Button>
          <Button size="sm" className="gap-2 bg-primary">
            <TerminalIcon className="w-4 h-4" /> Shell
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Status</CardTitle>
            <Activity className="w-4 h-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{container.status}</div>
            <p className="text-xs text-muted-foreground mt-1">Uptime: {container.uptime}</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">CPU Usage</CardTitle>
            <Cpu className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics[metrics.length-1].cpu)}%</div>
            <Progress value={metrics[metrics.length-1].cpu} className="h-1.5 mt-2" />
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Memory</CardTitle>
            <HardDrive className="w-4 h-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(metrics[metrics.length-1].ram)}%</div>
            <Progress value={metrics[metrics.length-1].ram} className="h-1.5 mt-2 [&>div]:bg-chart-2" />
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Ports</CardTitle>
            <Network className="w-4 h-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-mono font-bold">{container.ports}</div>
            <p className="text-xs text-muted-foreground mt-1">TCP Protocol</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-card/50 border border-border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="environment">Environment</TabsTrigger>
          <TabsTrigger value="networking">Networking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <Card className="bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metrics}>
                    <defs>
                      <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                    />
                    <Area type="monotone" dataKey="cpu" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorCpu)" />
                    <Area type="monotone" dataKey="ram" stroke="hsl(var(--chart-2))" fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="mt-4">
          <Card className="bg-[#0d1117] border-white/5 font-mono text-sm h-[500px] overflow-hidden flex flex-col">
            <div className="p-2 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs text-muted-foreground px-2">container logs</span>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] text-muted-foreground">Clear</Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-1">
              <div className="text-muted-foreground">[2023-10-27 14:20:01] <span className="text-chart-3">INFO</span> Starting PostgreSQL 15.4...</div>
              <div className="text-muted-foreground">[2023-10-27 14:20:01] <span className="text-chart-3">INFO</span> Database system is shut down</div>
              <div className="text-muted-foreground">[2023-10-27 14:20:02] <span className="text-chart-3">INFO</span> Database system is ready to accept connections</div>
              <div className="text-muted-foreground">[2023-10-27 14:35:12] <span className="text-chart-4">WARN</span> Slow query detected: SELECT * FROM analytics WHERE...</div>
              <div className="text-muted-foreground">[2023-10-27 15:10:45] <span className="text-chart-3">INFO</span> Autovacuum launcher started</div>
              <div className="text-muted-foreground">[2023-10-27 15:45:22] <span className="text-destructive">ERROR</span> Connection pool saturated (max 100)</div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="mt-4">
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="p-0">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-medium text-muted-foreground">Variable</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Value</th>
                    <th className="w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'POSTGRES_DB', val: 'tjstudios_prod' },
                    { key: 'POSTGRES_USER', val: 'admin_master' },
                    { key: 'POSTGRES_PASSWORD', val: '••••••••••••••••' },
                    { key: 'MAX_CONNECTIONS', val: '200' },
                  ].map((env) => (
                    <tr key={env.key} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="p-4 font-mono font-medium">{env.key}</td>
                      <td className="p-4 font-mono text-muted-foreground">{env.val}</td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon" className="w-8 h-8"><Lock className="w-3 h-3" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

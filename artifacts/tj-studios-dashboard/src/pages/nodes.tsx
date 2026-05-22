import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Network, 
  Plus, 
  Activity, 
  Cpu, 
  HardDrive, 
  Globe, 
  Server,
  Filter,
  ArrowUpRight,
  MoreVertical,
  Layers,
  Zap
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { mockNodes } from '@/mock/data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Nodes() {
  const [filter, setFilter] = useState('All');

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cluster Nodes</h1>
          <p className="text-muted-foreground">Compute infrastructure across your global regions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Layers className="w-4 h-4" /> Cluster Map
          </Button>
          <Button className="bg-primary text-primary-foreground gap-2">
            <Plus className="w-4 h-4" /> Add Node
          </Button>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-card/40 border border-border flex flex-col items-center gap-12 relative overflow-hidden">
        {/* Visual Topology Mockup */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="flex items-center justify-center gap-24 relative z-10 py-8 scale-75 md:scale-100">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              <Globe className="w-10 h-10" />
            </div>
            <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-widest">Global Load Balancer</p>
          </div>
          
          <div className="flex flex-col gap-12">
            <div className="w-16 h-16 rounded-xl bg-chart-3/20 border border-chart-3/50 flex items-center justify-center text-chart-3">
              <Server className="w-8 h-8" />
            </div>
            <div className="w-16 h-16 rounded-xl bg-chart-4/20 border border-chart-4/50 flex items-center justify-center text-chart-4">
              <Server className="w-8 h-8" />
            </div>
            <div className="w-16 h-16 rounded-xl bg-chart-2/20 border border-chart-2/50 flex items-center justify-center text-chart-2">
              <Server className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex bg-muted rounded-md p-1 gap-1">
          {['All', 'us-east-1', 'eu-west-1', 'ap-southeast-1'].map(region => (
            <Button 
              key={region}
              size="sm"
              variant={filter === region ? 'secondary' : 'ghost'}
              onClick={() => setFilter(region)}
              className="text-xs h-7"
            >
              {region}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="w-3 h-3" /> 8 Nodes Online
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {mockNodes.filter(n => filter === 'All' || n.region === filter).map((node) => (
          <motion.div key={node.id} variants={itemVariants}>
            <Card className="bg-card/50 backdrop-blur hover:border-primary/50 transition-all group relative overflow-hidden">
              {node.status === 'maintenance' && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Maintenance</Badge>
                </div>
              )}
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                    <Server className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">{node.region}</Badge>
                </div>
                <CardTitle className="text-base font-bold flex items-center justify-between">
                  {node.hostname}
                  <div className={`w-2 h-2 rounded-full ${node.status === 'online' ? 'bg-chart-3' : 'bg-yellow-500'}`} />
                </CardTitle>
                <p className="text-xs text-muted-foreground font-mono">{node.ip}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground uppercase tracking-widest font-semibold">CPU</span>
                    <span className="font-bold">{node.cpu}%</span>
                  </div>
                  <Progress value={node.cpu} className="h-1.5" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground uppercase tracking-widest font-semibold">Memory</span>
                    <span className="font-bold">{node.ram}%</span>
                  </div>
                  <Progress value={node.ram} className="h-1.5 [&>div]:bg-chart-2" />
                </div>
                
                <div className="pt-2 flex justify-between items-center text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Docker {node.docker}
                  </div>
                  <span>Up {node.uptime}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

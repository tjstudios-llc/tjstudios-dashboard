import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDeployments } from '@/mock/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GitBranch, GitCommit, Clock, Terminal, RotateCcw, PlayCircle, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Deployments() {
  const [filter, setFilter] = useState('All');

  const filteredDeployments = mockDeployments.filter(d => {
    if (filter === 'All') return true;
    if (filter === 'Building' && d.status === 'building') return true;
    if (filter === 'Deployed' && d.status === 'deployed') return true;
    if (filter === 'Failed' && d.status === 'failed') return true;
    if (filter === 'Queued' && d.status === 'queued') return true;
    return false;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
      case 'building': return 'bg-chart-4/10 text-chart-4 border-chart-4/20';
      case 'failed': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'queued': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deployments</h1>
          <p className="text-muted-foreground">Manage and monitor your application deployments.</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="btn-create-deployment">
          <PlayCircle className="w-4 h-4 mr-2" /> Create Deployment
        </Button>
      </div>

      <Tabs defaultValue="All" className="w-full" onValueChange={setFilter}>
        <TabsList className="mb-4">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Building">Building</TabsTrigger>
          <TabsTrigger value="Deployed">Deployed</TabsTrigger>
          <TabsTrigger value="Failed">Failed</TabsTrigger>
          <TabsTrigger value="Queued">Queued</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="space-y-4">
            {filteredDeployments.map((dep) => (
              <motion.div
                key={dep.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="hover:border-primary/50 transition-colors bg-card/40 backdrop-blur group">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-6 justify-between">
                      
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between sm:justify-start sm:gap-4">
                          <h3 className="font-semibold text-lg">{dep.project}</h3>
                          <Badge variant="outline" className={`${getStatusColor(dep.status)} capitalize flex items-center gap-1.5`}>
                            {dep.status === 'building' && <Loader2 className="w-3 h-3 animate-spin" />}
                            {dep.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <GitBranch className="w-4 h-4" />
                            <span>{dep.branch}</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono text-xs bg-muted px-2 py-0.5 rounded">
                            <GitCommit className="w-3 h-3" />
                            {dep.commitHash}
                          </div>
                          <div className="hidden sm:block text-border">•</div>
                          <div className="text-foreground truncate max-w-[200px] sm:max-w-md">
                            {dep.message}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center lg:items-end justify-between lg:flex-col gap-4 lg:w-48 shrink-0">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{dep.time}</span>
                          <span className="hidden sm:inline">({dep.duration})</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-6 h-6 border border-border">
                            <AvatarFallback className="text-[10px]">{dep.author.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium hidden sm:inline">{dep.author}</span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-6 justify-center">
                        <Button variant="outline" size="sm" className="w-full justify-start" data-testid={`btn-logs-${dep.id}`}>
                          <Terminal className="w-4 h-4 mr-2" /> Logs
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start" data-testid={`btn-redeploy-${dep.id}`}>
                          <RotateCcw className="w-4 h-4 mr-2" /> Redeploy
                        </Button>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { mockContainers } from '@/mock/data';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Box, Play, Square, RotateCw, Trash2, Cpu, HardDrive, Terminal } from 'lucide-react';
import { SiDocker } from 'react-icons/si';

export default function Docker() {
  const getStatusColor = (status: string) => {
    if (status === 'running') return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
    if (status === 'stopped') return 'bg-muted text-muted-foreground border-border';
    if (status === 'error') return 'bg-destructive/10 text-destructive border-destructive/20';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <SiDocker className="text-[#2496ED]" /> Docker Swarm
          </h1>
          <p className="text-muted-foreground">Manage and monitor containerized applications.</p>
        </div>
        <div className="flex items-center gap-3 bg-card border border-border rounded-md px-4 py-2 text-sm font-medium">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-chart-3" /> 3 Running</div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-muted-foreground" /> 1 Stopped</div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-destructive" /> 1 Error</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockContainers.map((container, i) => (
          <motion.div
            key={container.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Card className="h-full flex flex-col bg-card/40 backdrop-blur hover-elevate transition-all border-border overflow-hidden relative group">
              {container.status === 'running' && (
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-chart-3/50 to-transparent" />
              )}
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2 truncate pr-2">
                      <Box className="w-4 h-4 text-muted-foreground" />
                      {container.name}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground font-mono mt-1 truncate">{container.image}</p>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(container.status)} capitalize shrink-0`}>
                    {container.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground flex items-center gap-1"><Cpu className="w-3 h-3"/> CPU</span>
                    <span className="font-mono">{container.cpu}%</span>
                  </div>
                  <Progress value={container.cpu} className="h-1.5" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground flex items-center gap-1"><HardDrive className="w-3 h-3"/> RAM</span>
                    <span className="font-mono">{container.ram}%</span>
                  </div>
                  <Progress value={container.ram} className="h-1.5 [&>div]:bg-chart-2" />
                </div>

                <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted rounded p-2 border border-border/50">
                    <span className="text-muted-foreground block mb-0.5">Ports</span>
                    <span className="font-mono">{container.ports}</span>
                  </div>
                  <div className="bg-muted rounded p-2 border border-border/50">
                    <span className="text-muted-foreground block mb-0.5">Uptime</span>
                    <span className="font-mono">{container.uptime}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t border-border/50 bg-muted/20 gap-2 flex-wrap">
                {container.status !== 'running' ? (
                  <Button variant="outline" size="sm" className="flex-1 hover:bg-chart-3/10 hover:text-chart-3 hover:border-chart-3/50" data-testid={`btn-start-${container.id}`}>
                    <Play className="w-4 h-4 mr-1" /> Start
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1 hover:bg-muted" data-testid={`btn-stop-${container.id}`}>
                    <Square className="w-4 h-4 mr-1" /> Stop
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1" data-testid={`btn-restart-${container.id}`}>
                  <RotateCw className="w-4 h-4 mr-1" /> Restart
                </Button>
                <Button variant="outline" size="sm" className="px-3 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50" data-testid={`btn-remove-${container.id}`}>
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="w-full mt-2" data-testid={`btn-logs-${container.id}`}>
                  <Terminal className="w-4 h-4 mr-2" /> View Logs
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

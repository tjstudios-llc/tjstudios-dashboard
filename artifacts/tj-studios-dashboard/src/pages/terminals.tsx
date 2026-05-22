import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Terminal as TerminalIcon, 
  Plus, 
  Monitor, 
  User, 
  Clock, 
  XCircle,
  PlayCircle,
  LayoutGrid,
  Search,
  ChevronRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { mockTerminalSessions } from '@/mock/data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

export default function Terminals() {
  const [activeSession, setActiveSession] = useState(mockTerminalSessions[0]);

  return (
    <motion.div 
      className="h-[calc(100vh-8rem)] flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Active Terminals</h1>
          <p className="text-muted-foreground">Remote shell access to your cloud containers.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <LayoutGrid className="w-4 h-4" /> Manage
          </Button>
          <Button className="bg-primary text-primary-foreground gap-2">
            <Plus className="w-4 h-4" /> New Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] flex-1 gap-6 overflow-hidden">
        {/* Sidebar Sessions List */}
        <aside className="flex flex-col gap-4 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search sessions..." className="pl-10 h-9 bg-card/50" />
          </div>

          <Card className="flex-1 bg-card/50 backdrop-blur border-border overflow-y-auto">
            <div className="p-2 space-y-1">
              {mockTerminalSessions.map((session) => (
                <div 
                  key={session.id}
                  onClick={() => setActiveSession(session)}
                  className={`p-3 rounded-lg cursor-pointer transition-all border ${
                    activeSession.id === session.id 
                      ? 'bg-primary/10 border-primary/30 text-primary' 
                      : 'border-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <TerminalIcon className="w-4 h-4" />
                      <span className="text-sm font-semibold truncate">{session.name}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${session.status === 'active' ? 'bg-chart-3 animate-pulse' : 'bg-muted-foreground'}`} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] opacity-70">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {session.user}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-primary/5 border-primary/20 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Live Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold">12</p>
                <p className="text-[10px] text-muted-foreground uppercase">Active</p>
              </div>
              <div>
                <p className="text-lg font-bold">4</p>
                <p className="text-[10px] text-muted-foreground uppercase">Idle</p>
              </div>
            </div>
          </Card>
        </aside>

        {/* Terminal Output Area */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <Card className="flex-1 bg-[#0d1117] border-white/5 overflow-hidden flex flex-col font-mono">
            <div className="h-10 bg-[#161b22] border-b border-white/10 px-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-chart-3" />
                  <span className="text-xs text-white/80">{activeSession.name}</span>
                </div>
                <Badge variant="outline" className="text-[10px] py-0 h-5 bg-white/5 text-white/40 border-white/10">{activeSession.user}@cloud-host</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white"><XCircle className="w-4 h-4" /></Button>
              </div>
            </div>
            
            <div className="flex-1 p-6 text-sm text-white/90 overflow-y-auto space-y-2">
              <div className="flex gap-2">
                <span className="text-chart-3">alexchen@tj-cloud:~$</span>
                <span>{activeSession.lastCmd}</span>
              </div>
              <div className="text-white/60">
                Oct 27 15:20:01 node-01 systemd[1]: Starting Periodic Command Scheduler...{'\n'}
                Oct 27 15:20:01 node-01 systemd[1]: Started Periodic Command Scheduler.{'\n'}
                Oct 27 15:20:01 node-01 CRON[124502]: (root) CMD (   cd / && run-parts --report /etc/cron.hourly){'\n'}
                Oct 27 15:20:01 node-01 CRON[124501]: pam_unix(cron:session): session opened for user root(uid=0) by (uid=0){'\n'}
                Oct 27 15:20:01 node-01 CRON[124501]: pam_unix(cron:session): session closed for user root
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-chart-3">alexchen@tj-cloud:~$</span>
                <span className="w-2 h-5 bg-primary animate-pulse" />
              </div>
            </div>

            <div className="p-3 bg-[#161b22] border-t border-white/10 flex items-center gap-3">
              <ChevronRight className="w-4 h-4 text-chart-3" />
              <input 
                type="text" 
                className="bg-transparent border-none outline-none text-white text-sm flex-1" 
                placeholder="Type a command..."
                autoFocus
              />
              <div className="flex items-center gap-2 text-[10px] text-white/40 px-2 uppercase tracking-widest font-bold">
                SSH: Secure
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

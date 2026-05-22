import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ScrollText, 
  Search, 
  Download, 
  Filter, 
  ChevronDown, 
  AlertTriangle, 
  Info, 
  ShieldAlert,
  Clock,
  User,
  ExternalLink
} from 'lucide-react';
import { mockAuditEvents } from '@/mock/data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export default function AuditLogs() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getSeverityColor = (sev: string) => {
    switch(sev.toLowerCase()) {
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'error': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'warning': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default: return 'bg-chart-3/10 text-chart-3 border-chart-3/20';
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">Detailed activity trail for security and troubleshooting.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', val: '2,405', icon: ScrollText, color: 'text-primary' },
          { label: 'Critical Errors', val: '12', icon: ShieldAlert, color: 'text-destructive' },
          { label: 'Warnings', val: '84', icon: AlertTriangle, color: 'text-yellow-500' },
          { label: 'Info Logs', val: '2,309', icon: Info, color: 'text-chart-3' },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card/50 backdrop-blur">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.val}</p>
              </div>
              <stat.icon className={`w-8 h-8 opacity-20 ${stat.color}`} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card/50 backdrop-blur border-border overflow-hidden">
        <div className="p-4 border-b border-border flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 flex-1 min-w-[300px]">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search logs..." className="pl-10 bg-muted/50 border-none h-9" />
            </div>
            <Button variant="outline" size="sm" className="gap-2 h-9">
              <Filter className="w-4 h-4" /> Filters
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-muted text-xs">Last 24 Hours</Badge>
            <Badge variant="outline" className="bg-muted text-xs">All Severities</Badge>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {mockAuditEvents.map((event) => (
              <motion.div 
                key={event.id} 
                variants={itemVariants}
                className="group border-b border-border/50 last:border-0"
              >
                <div 
                  className={`flex items-center gap-4 p-4 hover:bg-muted/30 cursor-pointer transition-colors ${expandedRow === event.id ? 'bg-muted/20' : ''}`}
                  onClick={() => setExpandedRow(expandedRow === event.id ? null : event.id)}
                >
                  <div className={`w-1 h-8 rounded-full ${event.severity === 'Critical' ? 'bg-destructive' : event.severity === 'Error' ? 'bg-orange-500' : event.severity === 'Warning' ? 'bg-yellow-500' : 'bg-chart-3'}`} />
                  
                  <div className="w-24 shrink-0">
                    <Badge variant="outline" className={`${getSeverityColor(event.severity)} text-[10px] w-full justify-center`}>
                      {event.severity}
                    </Badge>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{event.desc}</p>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-muted-foreground w-64 shrink-0">
                    <div className="flex items-center gap-2 w-28">
                      <User className="w-3 h-3" />
                      <span className="truncate">{event.user}</span>
                    </div>
                    <div className="flex items-center gap-2 w-24">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedRow === event.id ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                <AnimatePresence>
                  {expandedRow === event.id && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-muted/10"
                    >
                      <div className="p-6 pt-0 ml-12 grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-muted-foreground uppercase">Event Metadata</h4>
                          <div className="rounded-lg bg-[#0d1117] p-4 font-mono text-xs text-blue-300">
                            <pre>{JSON.stringify(event.metadata, null, 2)}</pre>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-muted-foreground uppercase">Actions</h4>
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" className="gap-2">
                              <ExternalLink className="w-3 h-3" /> View Trace
                            </Button>
                            <Button size="sm" variant="outline" className="gap-2">
                              <Info className="w-3 h-3" /> System Info
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

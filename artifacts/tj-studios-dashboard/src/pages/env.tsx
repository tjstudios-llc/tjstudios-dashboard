import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Lock, 
  Plus, 
  Search, 
  Eye, 
  EyeOff, 
  Trash2, 
  Edit2, 
  Upload, 
  Globe, 
  Database,
  History,
  Check,
  ChevronRight
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEnvVars } from '@/mock/data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function EnvVars() {
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('Production');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleReveal = (id: string) => {
    setShowValues(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredVars = mockEnvVars.filter(ev => ev.env === activeTab);

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Environment Variables</h1>
          <p className="text-muted-foreground">Manage secrets and configuration for your deployments.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" /> Bulk Import
          </Button>
          <Button className="bg-primary text-primary-foreground gap-2">
            <Plus className="w-4 h-4" /> Add Variable
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Tabs defaultValue="Production" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-card/50 border border-border">
                <TabsTrigger value="Development">Development</TabsTrigger>
                <TabsTrigger value="Staging">Staging</TabsTrigger>
                <TabsTrigger value="Production">Production</TabsTrigger>
              </TabsList>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Filter variables..." className="pl-10 h-9 bg-card/50" />
              </div>
            </div>

            <Card className="bg-card/50 backdrop-blur border-border overflow-hidden">
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/20 text-muted-foreground">
                      <th className="text-left p-4 font-medium w-1/3">Variable</th>
                      <th className="text-left p-4 font-medium">Value</th>
                      <th className="text-left p-4 font-medium">Modified</th>
                      <th className="w-24"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVars.map((v) => (
                      <React.Fragment key={v.id}>
                        <tr 
                          className={`border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer ${expandedId === v.id ? 'bg-muted/40' : ''}`}
                          onClick={() => setExpandedId(expandedId === v.id ? null : v.id)}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Lock className="w-3.5 h-3.5 text-primary" />
                              <span className="font-mono font-bold">{v.name}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 font-mono text-xs">
                              <span className="bg-muted px-2 py-0.5 rounded text-muted-foreground">
                                {showValues[v.id] ? v.value : '••••••••••••••••'}
                              </span>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6" 
                                onClick={(e) => { e.stopPropagation(); toggleReveal(v.id); }}
                              >
                                {showValues[v.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </Button>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-xs text-muted-foreground">
                              <p>{v.modified}</p>
                              <p className="opacity-70">by {v.by}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Edit2 className="w-3.5 h-3.5" /></Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                            </div>
                          </td>
                        </tr>
                        <AnimatePresence>
                          {expandedId === v.id && (
                            <tr>
                              <td colSpan={4} className="p-0">
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-muted/10 border-b border-border/50"
                                >
                                  <div className="p-6 ml-4 space-y-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase">
                                      <History className="w-3.5 h-3.5" /> Change History
                                    </div>
                                    <div className="space-y-3">
                                      {[
                                        { action: 'Modified value', time: '2d ago', user: 'Alex Chen' },
                                        { action: 'Created variable', time: '10d ago', user: 'Jordan Lee' },
                                      ].map((log, i) => (
                                        <div key={i} className="flex items-center gap-4 text-xs">
                                          <div className="w-2 h-2 rounded-full bg-primary/30" />
                                          <span className="font-medium">{log.action}</span>
                                          <span className="text-muted-foreground">{log.time}</span>
                                          <span className="text-muted-foreground ml-auto">by {log.user}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </Tabs>
        </div>

        <aside className="w-full md:w-80 space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Deployment Sync</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Changes to environment variables require a redeploy to take effect.</p>
              <div className="p-3 rounded-lg bg-background border border-border flex items-center justify-between">
                <span className="text-xs font-medium">Automatic Redeploy</span>
                <Check className="w-4 h-4 text-chart-3" />
              </div>
              <Button className="w-full gap-2 bg-primary text-primary-foreground">
                Apply & Restart All
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-sm">Usage Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span>Variables</span>
                  <span className="text-muted-foreground">18 / 100</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '18%' }} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span>Storage</span>
                  <span className="text-muted-foreground">12KB / 1MB</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-chart-4" style={{ width: '2%' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </motion.div>
  );
}

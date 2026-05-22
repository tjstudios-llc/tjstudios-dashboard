import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  UserCircle, 
  Github, 
  Mail, 
  Globe, 
  Key, 
  Shield, 
  LogOut, 
  Settings,
  Plus,
  Monitor,
  Calendar,
  Zap,
  Check
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Profile() {
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Left Side: Basic Info */}
        <aside className="space-y-6">
          <Card className="bg-card/50 backdrop-blur border-border overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/20 to-chart-4/20" />
            <CardContent className="pt-0 flex flex-col items-center -mt-12">
              <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">AC</AvatarFallback>
              </Avatar>
              <div className="text-center mt-4">
                <h2 className="text-xl font-bold">Alex Chen</h2>
                <p className="text-sm text-muted-foreground">@alexchen</p>
                <Badge className="mt-2 bg-primary/10 text-primary border-primary/20">Owner</Badge>
              </div>
              <div className="w-full mt-6 space-y-3 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" /> alex@tjstudios.xyz
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Globe className="w-4 h-4" /> San Francisco, CA
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" /> Joined Jan 2021
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Usage Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Deployments</span>
                <span className="font-bold">142</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Projects</span>
                <span className="font-bold">8</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Teams</span>
                <span className="font-bold">3</span>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Right Side: Detailed Tabs */}
        <div className="space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-card/50 border border-border">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ssh-keys">SSH Keys</TabsTrigger>
              <TabsTrigger value="linked-accounts">Linked Accounts</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Activity Heatmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-12 gap-1.5 h-32">
                    {Array.from({ length: 84 }).map((_, i) => {
                      const intensity = Math.random();
                      return (
                        <div 
                          key={i} 
                          className="w-full h-full rounded-sm"
                          style={{ 
                            backgroundColor: intensity > 0.8 ? 'hsl(var(--primary))' : 
                                             intensity > 0.5 ? 'rgba(var(--primary-rgb), 0.6)' :
                                             intensity > 0.2 ? 'rgba(var(--primary-rgb), 0.3)' :
                                             'hsl(var(--muted)/0.3)'
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                    <span>Oct 2022</span>
                    <span>Oct 2023</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: 'Pushed to production', target: 'api-server', time: '2h ago' },
                    { action: 'Updated environment variables', target: 'dashboard', time: '1d ago' },
                    { action: 'Invited Jordan Lee to team', target: 'marketing', time: '3d ago' },
                  ].map((act, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm border-b border-border/50 pb-3 last:border-0 last:pb-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{act.action}</p>
                        <p className="text-xs text-muted-foreground">{act.target}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{act.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ssh-keys" className="mt-6">
              <Card className="bg-card/50 backdrop-blur border-border overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Authorized SSH Keys</CardTitle>
                    <p className="text-xs text-muted-foreground">Manage keys for secure server access.</p>
                  </div>
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" /> Add Key
                  </Button>
                </div>
                <CardContent className="p-0">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground bg-muted/20">
                        <th className="text-left p-4 font-medium">Name</th>
                        <th className="text-left p-4 font-medium">Fingerprint</th>
                        <th className="w-10"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 hover:bg-muted/30">
                        <td className="p-4 font-medium">MacBook Pro M2</td>
                        <td className="p-4 font-mono text-xs text-muted-foreground">SHA256:4x9...vL8</td>
                        <td className="p-4">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><LogOut className="w-4 h-4" /></Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="mt-6 space-y-4">
              {[
                { device: 'MacBook Pro', os: 'macOS 14.1', browser: 'Chrome', ip: '192.168.1.42', current: true },
                { device: 'iPhone 15 Pro', os: 'iOS 17.0', browser: 'Safari', ip: '10.0.0.8', current: false },
              ].map((session, i) => (
                <Card key={i} className="bg-card/50 backdrop-blur border-border">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                      <Monitor className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold truncate">{session.device} • {session.browser}</h4>
                        {session.current && <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20 text-[10px]">Current Session</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{session.os} • {session.ip}</p>
                    </div>
                    <Button variant="outline" size="sm" className={session.current ? 'hidden' : ''}>Revoke</Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  );
}

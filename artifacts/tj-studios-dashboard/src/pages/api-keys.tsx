import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Key, 
  Plus, 
  Copy, 
  Trash2, 
  ShieldCheck, 
  ExternalLink,
  Github,
  Search,
  Check,
  Zap,
  MoreVertical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { mockApiKeys } from '@/mock/data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const usageData = [
  { day: 'Mon', reqs: 1200 },
  { day: 'Tue', reqs: 1900 },
  { day: 'Wed', reqs: 1500 },
  { day: 'Thu', reqs: 2100 },
  { day: 'Fri', reqs: 2400 },
  { day: 'Sat', reqs: 1100 },
  { day: 'Sun', reqs: 900 },
];

export default function ApiKeys() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
          <h1 className="text-3xl font-bold tracking-tight">API Management</h1>
          <p className="text-muted-foreground">Manage access tokens and third-party integrations.</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> Generate New Key
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          <Card className="bg-card/50 backdrop-blur border-border overflow-hidden">
            <CardHeader className="pb-0 flex flex-row items-center justify-between">
              <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Your secret keys for authenticating API requests.</CardDescription>
              </div>
              <div className="relative w-48">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search keys..." className="pl-9 h-8 text-xs bg-muted/50" />
              </div>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground bg-muted/20">
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Key Prefix</th>
                      <th className="text-left p-4 font-medium">Permissions</th>
                      <th className="text-left p-4 font-medium">Usage</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockApiKeys.map((key) => (
                      <tr key={key.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Key className="w-3.5 h-3.5 text-primary" />
                            <span className="font-medium">{key.name}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">Created {key.created}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{key.prefix}••••••••</code>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(key.id, key.prefix + '-full-mock-key')}>
                              {copiedId === key.id ? <Check className="w-3.5 h-3.5 text-chart-3" /> : <Copy className="w-3.5 h-3.5" />}
                            </Button>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-[10px]">{key.permissions}</Badge>
                        </td>
                        <td className="p-4">
                          <span className="font-mono text-xs">{key.usage.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Usage Analytics</CardTitle>
              <CardDescription>API requests per day across all keys.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                      cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                    />
                    <Bar dataKey="reqs" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <Card className="bg-card/50 backdrop-blur border-border">
            <CardHeader>
              <CardTitle className="text-lg">Integrations</CardTitle>
              <CardDescription>Connect with external services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">GitHub</p>
                    <p className="text-xs text-muted-foreground">Connected as @alexchen</p>
                  </div>
                </div>
                <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Discord</p>
                    <p className="text-xs text-muted-foreground">Push notifications</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-24 h-24" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Security Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 relative z-10">
              <p className="text-xs text-muted-foreground">Never share your API keys in client-side code or public repositories.</p>
              <ul className="text-xs space-y-2 text-muted-foreground list-disc pl-4">
                <li>Rotate keys every 90 days</li>
                <li>Use environment variables</li>
                <li>Restrict permissions per key</li>
              </ul>
              <Button variant="link" className="text-xs p-0 h-auto text-primary gap-1">
                Security Guide <ExternalLink className="w-3 h-3" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

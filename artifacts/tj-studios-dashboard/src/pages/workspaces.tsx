import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from '@/components/ui/resizable';
import { 
  Code2, 
  Folder, 
  FileCode, 
  ChevronRight, 
  Play, 
  Square, 
  Share2, 
  GitBranch, 
  Terminal as TerminalIcon,
  Search,
  Plus
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockWorkspaces } from '@/mock/data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Workspaces() {
  const ws = mockWorkspaces[0];

  return (
    <motion.div 
      className="h-[calc(100vh-8rem)] flex flex-col gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Code2 className="w-6 h-6 text-primary" />
              {ws.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="flex items-center gap-1">
                <GitBranch className="w-3 h-3" />
                {ws.branch}
              </Badge>
              <Badge variant="outline" className="text-xs text-muted-foreground">
                Last commit: 5m ago
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2 mr-4">
            {ws.collaborators.map((c, i) => (
              <Avatar key={i} className={`w-8 h-8 border-2 border-background ${c.color}`}>
                <AvatarFallback className="text-[10px] text-white">
                  {c.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            <Button variant="outline" size="icon" className="w-8 h-8 rounded-full">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <div className="flex bg-muted rounded-md p-1 gap-1">
            <Button size="sm" className="bg-chart-3 hover:bg-chart-3/90 text-white gap-2">
              <Play className="w-4 h-4" /> Run
            </Button>
            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/10">
              <Square className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <Card className="flex-1 overflow-hidden bg-card/50 backdrop-blur border-border">
        <ResizablePanelGroup direction="horizontal">
          {/* File Explorer */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full flex flex-col border-r border-border">
              <div className="p-3 border-b border-border flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explorer</span>
                <Search className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                {ws.files.map((file, i) => (
                  <FileTreeNode key={i} item={file} depth={0} />
                ))}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Editor and Terminal */}
          <ResizablePanel defaultSize={60}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={70}>
                <div className="h-full flex flex-col">
                  <div className="flex items-center bg-muted/30 border-b border-border px-2">
                    {['App.tsx', 'package.json', 'tsconfig.json'].map((tab) => (
                      <div 
                        key={tab} 
                        className={`px-4 py-2 text-sm cursor-pointer border-r border-border flex items-center gap-2 ${
                          tab === 'App.tsx' ? 'bg-background border-t-2 border-t-primary' : 'text-muted-foreground hover:bg-muted/50'
                        }`}
                      >
                        <FileCode className="w-4 h-4" />
                        {tab}
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 overflow-auto p-4 font-mono text-sm relative">
                    <pre>
                      <code className="text-blue-400">import</code> <code className="text-yellow-200">React</code> <code className="text-blue-400">from</code> <code className="text-green-400">"react"</code>;{'\n'}
                      <code className="text-blue-400">import</code> {'{'} <code className="text-yellow-200">Switch</code>, <code className="text-yellow-200">Route</code> {'}'} <code className="text-blue-400">from</code> <code className="text-green-400">"wouter"</code>;{'\n\n'}
                      <code className="text-blue-400">export default function</code> <code className="text-yellow-200">App</code>() {'{'}{'\n'}
                      {'  '}<code className="text-blue-400">return</code> ({'\n'}
                      {'    '}<code className="text-pink-400">&lt;Switch&gt;</code>{'\n'}
                      {'      '}<code className="text-pink-400">&lt;Route</code> <code className="text-orange-300">path</code>=<code className="text-green-400">"/"</code> <code className="text-orange-300">component</code>={'{'}<code className="text-yellow-200">Dashboard</code>{'}'} <code className="text-pink-400">/&gt;</code>{'\n'}
                      {'    '}<code className="text-pink-400">&lt;/Switch&gt;</code>{'\n'}
                      {'  '});{'\n'}
                      {'}'}
                    </pre>
                    <div className="absolute top-4 left-[28ch] w-0.5 h-5 bg-primary animate-pulse" />
                  </div>
                </div>
              </ResizablePanel>
              
              <ResizableHandle />
              
              <ResizablePanel defaultSize={30}>
                <div className="h-full flex flex-col bg-[#0d1117]">
                  <div className="p-2 border-b border-white/5 flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Terminal</span>
                  </div>
                  <div className="flex-1 p-4 font-mono text-xs text-white/80 overflow-y-auto">
                    {ws.terminalHistory.map((line, i) => (
                      <div key={i} className="mb-1">{line}</div>
                    ))}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Rail */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full flex flex-col border-l border-border p-4 gap-6">
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Deployment</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge className="bg-chart-3/10 text-chart-3 border-chart-3/20">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Runtime</span>
                    <span>Node.js 18.x</span>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Environment</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-between">
                    <span>Manage Variables</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </section>

              <section className="flex-1">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Git Info</h3>
                <div className="p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">main</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Up to date with origin/main</p>
                </div>
              </section>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </motion.div>
  );
}

function FileTreeNode({ item, depth }: { item: any, depth: number }) {
  const Icon = item.type === 'folder' ? Folder : FileCode;
  
  return (
    <div className="select-none">
      <div 
        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer text-sm"
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {item.type === 'folder' && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
        <Icon className={`w-4 h-4 ${item.type === 'folder' ? 'text-primary/70' : 'text-muted-foreground'}`} />
        <span className={item.type === 'folder' ? 'font-medium' : ''}>{item.name}</span>
      </div>
      {item.children?.map((child: any, i: number) => (
        <FileTreeNode key={i} item={child} depth={depth + 1} />
      ))}
    </div>
  );
}

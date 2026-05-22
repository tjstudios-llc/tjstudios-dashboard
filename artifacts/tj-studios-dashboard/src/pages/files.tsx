import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  FolderOpen, 
  Search, 
  Upload, 
  Plus, 
  Grid, 
  List, 
  ChevronRight, 
  Folder, 
  File, 
  FileText, 
  Image as ImageIcon,
  MoreVertical,
  HardDrive
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { mockStorage } from '@/mock/data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 }
};

export default function Files() {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">File Browser</h1>
          <p className="text-muted-foreground">Manage persistent storage and project assets.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" /> Upload
          </Button>
          <Button className="bg-primary text-primary-foreground gap-2">
            <Plus className="w-4 h-4" /> New Folder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-6">
          <Card className="bg-card/50 backdrop-blur border-border p-4">
            <div className="flex items-center gap-3 mb-4">
              <HardDrive className="w-5 h-5 text-primary" />
              <span className="font-semibold text-sm">Storage Usage</span>
            </div>
            <Progress value={45} className="h-2 mb-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>45.2 GB used</span>
              <span>100 GB</span>
            </div>
          </Card>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-2">Folders</h3>
            <div className="space-y-1">
              {['Root', 'Assets', 'Backups', 'Config', 'Logs'].map(folder => (
                <div key={folder} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted/50 cursor-pointer text-sm transition-colors">
                  <Folder className="w-4 h-4 text-primary/70" />
                  {folder}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="hover:text-primary cursor-pointer">Storage</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">Project_Alpha</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search files..." className="pl-10 h-9 bg-card/50" />
              </div>
              <div className="flex bg-muted rounded-md p-1">
                <Button 
                  size="icon" 
                  variant={view === 'grid' ? 'secondary' : 'ghost'} 
                  className="h-7 w-7"
                  onClick={() => setView('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant={view === 'list' ? 'secondary' : 'ghost'} 
                  className="h-7 w-7"
                  onClick={() => setView('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockStorage.map((file) => (
                <motion.div key={file.id} variants={itemVariants}>
                  <Card className="hover:border-primary/50 transition-all bg-card/50 backdrop-blur group cursor-pointer">
                    <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                      <div className="w-full aspect-square rounded-lg bg-muted flex items-center justify-center relative overflow-hidden">
                        {file.type === 'folder' && <Folder className="w-12 h-12 text-primary/40" />}
                        {file.type === 'file' && <FileText className="w-12 h-12 text-muted-foreground/40" />}
                        {file.type === 'image' && <div className="w-full h-full bg-chart-2/20 flex items-center justify-center"><ImageIcon className="w-12 h-12 text-chart-2/40" /></div>}
                        {file.type === 'archive' && <File className="w-12 h-12 text-chart-4/40" />}
                        
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="h-7 w-7"><MoreVertical className="w-4 h-4" /></Button>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium truncate w-full">{file.name}</p>
                        <p className="text-[10px] text-muted-foreground">{file.size}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="bg-card/50 backdrop-blur">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Size</th>
                    <th className="text-left p-4 font-medium">Modified</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockStorage.map((file) => (
                    <tr key={file.id} className="border-b border-border/50 hover:bg-muted/30 group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {file.type === 'folder' ? <Folder className="w-4 h-4 text-primary/70" /> : <FileText className="w-4 h-4 text-muted-foreground" />}
                          <span className="font-medium">{file.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{file.size}</td>
                      <td className="p-4 text-muted-foreground">{file.modified}</td>
                      <td className="p-4">
                        <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}

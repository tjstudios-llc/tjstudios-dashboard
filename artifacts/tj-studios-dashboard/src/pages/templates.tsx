import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  LayoutTemplate, 
  Search, 
  Star, 
  Download, 
  Rocket, 
  Plus, 
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockTemplates } from '@/mock/data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const categories = ['All', 'Frontend', 'Backend', 'Database', 'Bot', 'DevOps', 'AI'];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTemplates = activeCategory === 'All' 
    ? mockTemplates 
    : mockTemplates.filter(t => t.category === activeCategory);

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">Jumpstart your next project with pre-configured templates.</p>
        </div>
        <Button className="bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
        {/* Sidebar Filters */}
        <aside className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Categories</h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <Button 
                  key={cat}
                  variant={activeCategory === cat ? 'secondary' : 'ghost'}
                  className="w-full justify-start text-sm"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="text-sm font-bold mb-2">Want more?</h4>
            <p className="text-xs text-muted-foreground mb-4">Submit your own templates to the community marketplace.</p>
            <Button variant="outline" size="sm" className="w-full text-xs">Learn More</Button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search templates..." className="pl-10 bg-card/50" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" /> Sort
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <motion.div key={template.id} variants={itemVariants}>
                <Card className="h-full hover:border-primary/50 transition-all bg-card/50 backdrop-blur group flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <LayoutTemplate className="w-6 h-6" />
                      </div>
                      <Badge variant="secondary" className="bg-muted text-[10px]">{template.category}</Badge>
                    </div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{template.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col pt-0">
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {template.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px] py-0 px-1.5">{tag}</Badge>
                      ))}
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          <span>{template.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          <span>{template.downloads.toLocaleString()}</span>
                        </div>
                      </div>
                      <Button size="sm" className="gap-2 text-xs">
                        Deploy <Rocket className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

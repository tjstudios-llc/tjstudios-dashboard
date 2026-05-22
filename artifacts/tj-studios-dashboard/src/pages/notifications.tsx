import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Check, 
  Trash2, 
  Server, 
  AlertTriangle, 
  CreditCard, 
  Info,
  ChevronRight,
  Filter,
  CheckCheck
} from 'lucide-react';
import { mockNotifications } from '@/mock/data';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 }
};

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('All');

  const getIcon = (type: string) => {
    switch(type) {
      case 'success': return <Server className="w-4 h-4 text-chart-3" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'info': return <Info className="w-4 h-4 text-primary" />;
      case 'billing': return <CreditCard className="w-4 h-4 text-chart-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with your deployments and system alerts.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="gap-2">
            <CheckCheck className="w-4 h-4" /> Mark all read
          </Button>
          <Button variant="outline" className="gap-2">
            <Trash2 className="w-4 h-4" /> Clear all
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 p-1 bg-muted rounded-lg w-fit">
        {['All', 'Unread', 'Deployments', 'Billing', 'Alerts'].map(tab => (
          <Button 
            key={tab}
            variant={activeTab === tab ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab(tab)}
            className="text-xs h-8 px-4"
          >
            {tab}
          </Button>
        ))}
      </div>

      <div className="space-y-8">
        {['Today', 'Yesterday', 'This Week'].map(group => (
          <div key={group} className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground px-1">{group}</h3>
            <div className="space-y-3">
              {mockNotifications.map((notif) => (
                <motion.div key={notif.id} variants={itemVariants}>
                  <Card className={`bg-card/50 backdrop-blur hover:border-primary/30 transition-all cursor-pointer group ${notif.unread ? 'border-l-4 border-l-primary' : ''}`}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${notif.unread ? 'bg-primary/10' : 'bg-muted'}`}>
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-sm font-semibold truncate ${notif.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{notif.title}</h4>
                          <span className="text-[10px] text-muted-foreground">{notif.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{notif.message}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

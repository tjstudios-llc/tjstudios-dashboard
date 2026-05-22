import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Wand2, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Rocket, 
  Database, 
  Globe, 
  Cpu, 
  Plus, 
  Trash2,
  Layers
} from 'lucide-react';

const steps = [
  'Template',
  'Configuration',
  'Database',
  'Environment',
  'Domain',
  'Deploy'
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 }
};

export default function Wizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    template: '',
    name: '',
    region: 'us-east-1',
    tier: 'basic',
    database: 'none',
    envVars: [{ key: '', value: '' }],
    domain: '',
    customDomain: false
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['React', 'Node.js', 'Python', 'Go', 'Rust', 'PHP', 'Static'].map((t) => (
              <Card 
                key={t}
                className={`cursor-pointer transition-all hover:border-primary ${formData.template === t ? 'border-primary ring-1 ring-primary' : 'bg-card/50'}`}
                onClick={() => setFormData({...formData, template: t})}
              >
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                    <Layers className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">{t} Starter</h3>
                  <p className="text-xs text-muted-foreground">A clean, production-ready {t} environment.</p>
                  <div className="flex gap-1 mt-2">
                    <Badge variant="secondary" className="text-[10px]">popular</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input placeholder="my-awesome-app" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Region</Label>
              <Select value={formData.region} onValueChange={v => setFormData({...formData, region: v})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  <SelectItem value="eu-west-1">EU West (Ireland)</SelectItem>
                  <SelectItem value="ap-southeast-1">AP Southeast (Singapore)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Resource Tier</Label>
              <div className="grid grid-cols-3 gap-3">
                {['Basic', 'Pro', 'Enterprise'].map(tier => (
                  <Button 
                    key={tier} 
                    variant={formData.tier === tier.toLowerCase() ? 'default' : 'outline'}
                    onClick={() => setFormData({...formData, tier: tier.toLowerCase()})}
                    className="flex flex-col h-auto py-3 gap-1"
                  >
                    <span className="text-sm">{tier}</span>
                    <span className="text-[10px] opacity-70">{tier === 'Basic' ? '$5/mo' : tier === 'Pro' ? '$25/mo' : 'Custom'}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'None'].map(db => (
              <Card 
                key={db}
                className={`cursor-pointer transition-all hover:border-primary ${formData.database === db.toLowerCase() ? 'border-primary ring-1 ring-primary' : 'bg-card/50'}`}
                onClick={() => setFormData({...formData, database: db.toLowerCase()})}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{db}</h3>
                    <p className="text-xs text-muted-foreground">{db === 'None' ? 'No database managed' : 'Managed high-availability instance'}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-4 max-w-2xl mx-auto">
            {formData.envVars.map((env, i) => (
              <div key={i} className="flex gap-2">
                <Input placeholder="KEY" value={env.key} onChange={e => {
                  const newEnv = [...formData.envVars];
                  newEnv[i].key = e.target.value;
                  setFormData({...formData, envVars: newEnv});
                }} />
                <Input placeholder="VALUE" type="password" value={env.value} onChange={e => {
                  const newEnv = [...formData.envVars];
                  newEnv[i].value = e.target.value;
                  setFormData({...formData, envVars: newEnv});
                }} />
                <Button variant="ghost" size="icon" onClick={() => {
                  const newEnv = formData.envVars.filter((_, idx) => idx !== i);
                  setFormData({...formData, envVars: newEnv});
                }}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2" onClick={() => setFormData({...formData, envVars: [...formData.envVars, {key: '', value: ''}]})}>
              <Plus className="w-4 h-4" /> Add Variable
            </Button>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 max-w-xl mx-auto">
            <div className="space-y-2">
              <Label>Project Domain</Label>
              <div className="flex items-center gap-2">
                <Input placeholder="my-app" value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})} />
                <span className="text-muted-foreground">.tjstudios.app</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
              <div className="space-y-0.5">
                <Label>Custom Domain</Label>
                <p className="text-xs text-muted-foreground">Connect your own domain name (e.g. example.com)</p>
              </div>
              <Switch checked={formData.customDomain} onCheckedChange={v => setFormData({...formData, customDomain: v})} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5 text-chart-3" /> Review Configuration
                </h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Template</p>
                    <p className="font-medium">{formData.template} Starter</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Region</p>
                    <p className="font-medium">{formData.region}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Database</p>
                    <p className="font-medium capitalize">{formData.database}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Domain</p>
                    <p className="font-medium">{formData.domain || 'pending'}.tjstudios.app</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-bounce">
                <Rocket className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold">Ready to Launch?</h3>
              <p className="text-muted-foreground text-center max-w-sm">Your infrastructure will be provisioned instantly. This typically takes about 30 seconds.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center justify-center gap-3">
          <Wand2 className="w-8 h-8 text-primary" />
          Deployment Wizard
        </h1>
        <p className="text-muted-foreground">Follow the steps to launch your new application on TJ Studios Cloud.</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-widest px-1">
          {steps.map((step, i) => (
            <span key={step} className={currentStep === i + 1 ? 'text-primary' : ''}>{step}</span>
          ))}
        </div>
        <Progress value={(currentStep / 6) * 100} className="h-2" />
      </div>

      <Card className="bg-card/50 backdrop-blur border-border min-h-[500px] flex flex-col">
        <CardHeader>
          <CardTitle>Step {currentStep}: {steps[currentStep-1]}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Choose a foundation for your new project."}
            {currentStep === 2 && "Configure the basic details and location."}
            {currentStep === 3 && "Select a managed database if needed."}
            {currentStep === 4 && "Add secrets and configuration variables."}
            {currentStep === 5 && "Set up your application access URL."}
            {currentStep === 6 && "Last look before we launch."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <div className="p-6 border-t border-border flex justify-between">
          <Button 
            variant="ghost" 
            onClick={prevStep} 
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <Button 
            onClick={currentStep === 6 ? undefined : nextStep}
            className="gap-2 bg-primary text-primary-foreground"
          >
            {currentStep === 6 ? (
              <>Deploy Now <Rocket className="w-4 h-4" /></>
            ) : (
              <>Continue <ChevronRight className="w-4 h-4" /></>
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

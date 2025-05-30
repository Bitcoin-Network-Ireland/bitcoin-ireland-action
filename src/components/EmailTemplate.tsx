
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';

interface EmailTemplateProps {
  customMessage: string;
  onMessageChange: (message: string) => void;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ 
  customMessage, 
  onMessageChange 
}) => {
  return (
    <Card className="shadow-lg border-slate-200">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-emerald-50 border-b border-slate-200">
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Mail className="w-5 h-5 text-emerald-600" />
          Email Template
        </CardTitle>
        <CardDescription>
          Customize your message with brackets for dynamic fields like [Your Full Name], [Deputy NAME], etc.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customMessage" className="text-slate-700 font-medium">Email Message</Label>
          <Textarea
            id="customMessage"
            placeholder="Your email message with [brackets] for dynamic fields..."
            value={customMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 min-h-[400px] font-mono text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
};

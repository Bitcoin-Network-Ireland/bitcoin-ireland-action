
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3, Eye, Mail } from 'lucide-react';
import { TD } from '@/data/tds';

interface FormData {
  name: string;
  email: string;
  constituency: string;
  job: string;
  customMessage: string;
}

interface EmailPreviewProps {
  formData: FormData;
  selectedTDs: TD[];
  onEditMessage: (message: string) => void;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ 
  formData, 
  selectedTDs, 
  onEditMessage 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableMessage, setEditableMessage] = useState(formData.customMessage);

  const generatePersonalizedEmail = (td: TD) => {
    let email = formData.customMessage
      .replace(/\[Deputy NAME\]/g, td.name)
      .replace(/\[Your Full Name\]/g, formData.name)
      .replace(/\[Town \/ Constituency \/ County\]/g, formData.constituency)
      .replace(/\[Your Job \/ Industry\]/g, formData.job)
      .replace(/\[Constituency \/ County\]/g, formData.constituency)
      .replace(/\[Your Job or Organisation \(optional\)\]/g, formData.job)
      .replace(/\[Optional Contact Info\]/g, formData.email);

    // Handle custom message insertion
    if (email.includes('[CUSTOM_MESSAGE]')) {
      email = email.replace('[CUSTOM_MESSAGE]', '');
    }

    return email;
  };

  const handleSaveMessage = () => {
    onEditMessage(editableMessage);
    setIsEditing(false);
  };

  const getPartyColor = (party: string) => {
    const colors: { [key: string]: string } = {
      'Fianna Fáil': 'bg-green-100 text-green-800',
      'Fine Gael': 'bg-blue-100 text-blue-800',
      'Sinn Féin': 'bg-emerald-100 text-emerald-800',
      'Labour Party': 'bg-red-100 text-red-800',
      'Social Democrats': 'bg-purple-100 text-purple-800',
      'Green Party': 'bg-green-200 text-green-900',
      'Independent': 'bg-gray-100 text-gray-800',
      'Independent Ireland': 'bg-orange-100 text-orange-800',
      'People Before Profit-Solidarity': 'bg-rose-100 text-rose-800',
      'Aontú': 'bg-yellow-100 text-yellow-800',
      '100% RDR': 'bg-indigo-100 text-indigo-800'
    };
    return colors[party] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Email Previews */}
      <Tabs defaultValue={selectedTDs[0]?.email} className="w-full">
        <TabsList className="grid w-full grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-1 h-auto p-1 bg-slate-100">
          {selectedTDs.map(td => (
            <TabsTrigger 
              key={td.email} 
              value={td.email}
              className="flex flex-col items-start gap-1 p-3 h-auto data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <div className="font-medium text-sm truncate w-full text-left">{td.name}</div>
              <Badge className={`text-xs ${getPartyColor(td.party)}`}>
                {td.party}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {selectedTDs.map(td => (
          <TabsContent key={td.email} value={td.email} className="mt-4">
            <Card className="border-slate-200">
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  Email to {td.name}
                </CardTitle>
                <div className="flex flex-col gap-2 text-sm text-slate-600">
                  <div><strong>To:</strong> {td.email}</div>
                  <div><strong>Subject:</strong> Seeking Your Position on Bitcoin Policy for Ireland</div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-white border border-slate-200 rounded-lg p-6 font-mono text-sm">
                  <pre className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                    {generatePersonalizedEmail(td)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

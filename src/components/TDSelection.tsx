
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Users, Mail } from 'lucide-react';
import { TD, getTDsByConstituency } from '@/data/tds';

interface TDSelectionProps {
  constituency: string;
  selectedTDs: TD[];
  onTDSelection: (td: TD, checked: boolean) => void;
}

export const TDSelection: React.FC<TDSelectionProps> = ({ 
  constituency, 
  selectedTDs, 
  onTDSelection 
}) => {
  const availableTDs = constituency ? getTDsByConstituency(constituency) : [];

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

  if (!constituency || availableTDs.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-lg border-slate-200">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-slate-200">
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <Users className="w-5 h-5 text-emerald-600" />
          Select TDs in {constituency}
        </CardTitle>
        <CardDescription>
          Choose which TDs you'd like to contact
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableTDs.map(td => (
            <div key={td.email} className="flex items-start space-x-3 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Checkbox
                checked={selectedTDs.some(selectedTD => selectedTD.email === td.email)}
                onCheckedChange={(checked) => onTDSelection(td, checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-slate-900 truncate">{td.name}</h3>
                  <Badge className={`text-xs ${getPartyColor(td.party)}`}>
                    {td.party}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {td.email}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {selectedTDs.length > 0 && (
          <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-emerald-800 font-medium">
              {selectedTDs.length} TD{selectedTDs.length > 1 ? 's' : ''} selected
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

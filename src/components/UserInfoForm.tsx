
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { getUniqueConstituencies } from '@/data/tds';

interface FormData {
  name: string;
  email: string;
  constituency: string;
  job: string;
  customMessage: string;
}

interface UserInfoFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({ formData, onInputChange }) => {
  const constituencies = getUniqueConstituencies();

  return (
    <Card className="shadow-lg border-slate-200">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50 border-b border-slate-200">
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <User className="w-5 h-5 text-emerald-600" />
          Your Information
        </CardTitle>
        <CardDescription>
          Tell us about yourself to personalize your outreach
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-700 font-medium">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="constituency" className="text-slate-700 font-medium">Constituency *</Label>
            <Select value={formData.constituency} onValueChange={(value) => onInputChange('constituency', value)}>
              <SelectTrigger className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500">
                <SelectValue placeholder="Select your constituency" />
              </SelectTrigger>
              <SelectContent className="bg-white border-slate-300 shadow-lg max-h-60">
                {constituencies.map(constituency => (
                  <SelectItem key={constituency} value={constituency} className="hover:bg-slate-50">
                    {constituency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="job" className="text-slate-700 font-medium">Job/Industry *</Label>
            <Input
              id="job"
              type="text"
              placeholder="e.g., Software Developer, Teacher, Entrepreneur"
              value={formData.job}
              onChange={(e) => onInputChange('job', e.target.value)}
              className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

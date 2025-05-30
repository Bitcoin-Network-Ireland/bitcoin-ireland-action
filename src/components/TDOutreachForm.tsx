
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, User, MapPin, Building, Send, Users } from 'lucide-react';
import { getUniqueConstituencies, getTDsByConstituency, TD } from '@/data/tds';
import { EmailPreview } from './EmailPreview';
import { toast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  constituency: string;
  job: string;
  customMessage: string;
}

const DEFAULT_EMAIL_TEMPLATE = `Dear [Deputy NAME],

My name is [Your Full Name], I live in [Town / Constituency / County], and I work as a [Your Job / Industry].

I'm writing to ask for your position on Bitcoin — and whether you believe Ireland should be giving it more serious attention at the policy level.

Allow me to explain why I believe this is important.

There are now over 500,000 people in Ireland who hold or engage with Bitcoin — more than the number of first-preference votes received by any single political party in the last general election (Fianna Fáil: 481,000; Fine Gael: 458,000; Sinn Féin: 415,000).

Many of these individuals are between the ages of 20 and 45, often highly informed about economic matters, and feel deeply disenfranchised from the current political system. They are frequently absent from the polls or voting independent. For a growing number of them, Bitcoin has become a single-issue lens, rooted in the belief that fixing the money is the first step toward fixing much else. This demographic is growing, increasingly networked, and pays close attention to which political voices are engaging in good faith with the topic.

Ireland also ranks 12th in the world for Bitcoin interest per capita, according to Bitcoin Magazine, the world's foremost Bitcoin-focused publication. This level of interest places Ireland well ahead of most of Europe and signals a national conversation that deserves to be heard at the policy level.

Globally, countries like the United States, China, and Russia are actively developing Bitcoin-related strategies — whether through mining, regulatory clarity, or strategic accumulation. Even governments that don't yet endorse it are acknowledging Bitcoin's rising importance as a monetary and geopolitical asset class. As a neutral, censorship-resistant, digitally-native bearer asset with a fixed supply, Bitcoin is increasingly viewed not as a passing trend, but as a serious contender for the next evolution of money.

Bitcoin builds upon the monetary foundations of gold — scarcity, neutrality, durability — while introducing the programmability, divisibility, and global reach of digital money. Even if it never fully replaces existing systems, the simple fact that it might do so credibly is enough to merit national-level discussion.

This is not just theory. In practice:
– Bitcoin mining is helping reduce methane emissions by over 90% in oil and gas fields by converting flare gas into productive energy.
– It is the only scalable demand-response technology available today that can dynamically stabilise power grids — making renewable energy more efficient and cost-effective for taxpayers.
– Businesses accepting Bitcoin can save 50–99% on payment processing fees by avoiding traditional card networks.
– With Square (Jack Dorsey's payments company) preparing to enable Bitcoin payments globally, this is a rare and timely opportunity for Ireland to adopt modern payment infrastructure aligned with open networks.

If you're unfamiliar with the subject, I recommend this clear and concise introductory paper:
📄 "A Sound Punt – The Case for Ireland's Interest in Bitcoin"
https://bitcoinnetwork.ie

Common concerns around volatility, climate, or criminal use are addressed in full here:
🔍 https://bitcoinnetwork.ie/common-concerns-misconceptions/

This article provides a quick but thoughtful overview of why Bitcoin is being taken seriously by individuals and institutions alike:
📰 https://bitcoinnetwork.ie/why-we-should-take-bitcoin-seriously/

If this is a subject you've already explored, I'd be keen to hear your view. If not, I hope this message is a helpful first step toward understanding an issue that many Irish citizens now consider critical to the future.

[CUSTOM_MESSAGE]

Kind regards,
[Your Full Name]
[Constituency / County]
[Your Job or Organisation (optional)]
[Optional Contact Info]`;

export const TDOutreachForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    constituency: '',
    job: '',
    customMessage: DEFAULT_EMAIL_TEMPLATE
  });

  const [selectedTDs, setSelectedTDs] = useState<TD[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const constituencies = getUniqueConstituencies();
  const availableTDs = formData.constituency ? getTDsByConstituency(formData.constituency) : [];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset selected TDs when constituency changes
    if (field === 'constituency') {
      setSelectedTDs([]);
    }
  };

  const handleTDSelection = (td: TD, checked: boolean) => {
    if (checked) {
      setSelectedTDs(prev => [...prev, td]);
    } else {
      setSelectedTDs(prev => prev.filter(selectedTD => selectedTD.email !== td.email));
    }
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

  const canShowPreview = formData.name && formData.email && formData.constituency && selectedTDs.length > 0;
  const canSendEmails = canShowPreview && formData.job;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSendEmails) return;

    setIsSubmitting(true);
    
    try {
      // Simulate email sending - in real implementation, this would call an API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Emails Sent Successfully!",
        description: `Your message has been sent to ${selectedTDs.length} TD${selectedTDs.length > 1 ? 's' : ''}.`,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        constituency: '',
        job: '',
        customMessage: DEFAULT_EMAIL_TEMPLATE
      });
      setSelectedTDs([]);
      setShowPreview(false);
      
    } catch (error) {
      toast({
        title: "Error Sending Emails",
        description: "There was a problem sending your emails. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
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
                onChange={(e) => handleInputChange('name', e.target.value)}
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
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="constituency" className="text-slate-700 font-medium">Constituency *</Label>
              <Select value={formData.constituency} onValueChange={(value) => handleInputChange('constituency', value)}>
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
                onChange={(e) => handleInputChange('job', e.target.value)}
                className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {formData.constituency && availableTDs.length > 0 && (
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-slate-200">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Users className="w-5 h-5 text-emerald-600" />
              Select TDs in {formData.constituency}
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
                    onCheckedChange={(checked) => handleTDSelection(td, checked as boolean)}
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
      )}

      {selectedTDs.length > 0 && (
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
                value={formData.customMessage}
                onChange={(e) => handleInputChange('customMessage', e.target.value)}
                className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 min-h-[400px] font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {canShowPreview && (
        <Card className="shadow-lg border-slate-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50 border-b border-slate-200">
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Mail className="w-5 h-5 text-emerald-600" />
              Email Preview
            </CardTitle>
            <CardDescription>
              Review your personalized message before sending
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <EmailPreview 
              formData={formData}
              selectedTDs={selectedTDs}
              onEditMessage={(message) => handleInputChange('customMessage', message)}
            />
            
            <form onSubmit={handleSubmit} className="mt-6">
              <Button 
                type="submit" 
                disabled={!canSendEmails || isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Emails...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Emails to {selectedTDs.length} TD{selectedTDs.length > 1 ? 's' : ''}
                  </>
                )}
              </Button>
              
              {!formData.job && (
                <p className="text-sm text-amber-600 mt-2 text-center">
                  Please fill in your job/industry to send emails
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};


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

const EMAIL_TEMPLATE = `Dear [Deputy NAME],

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

export const EmailPreview: React.FC<EmailPreviewProps> = ({ 
  formData, 
  selectedTDs, 
  onEditMessage 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableMessage, setEditableMessage] = useState(formData.customMessage);

  const generatePersonalizedEmail = (td: TD) => {
    let email = EMAIL_TEMPLATE
      .replace(/\[Deputy NAME\]/g, td.name)
      .replace(/\[Your Full Name\]/g, formData.name)
      .replace(/\[Town \/ Constituency \/ County\]/g, formData.constituency)
      .replace(/\[Your Job \/ Industry\]/g, formData.job)
      .replace(/\[Constituency \/ County\]/g, formData.constituency)
      .replace(/\[Your Job or Organisation \(optional\)\]/g, formData.job)
      .replace(/\[Optional Contact Info\]/g, formData.email);

    if (formData.customMessage) {
      email = email.replace('[CUSTOM_MESSAGE]', `\n${formData.customMessage}\n`);
    } else {
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
      {/* Custom Message Editor */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-amber-800 flex items-center gap-2">
            <Edit3 className="w-4 h-4" />
            Additional Personal Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editableMessage}
                onChange={(e) => setEditableMessage(e.target.value)}
                placeholder="Add any personal context or message you'd like to include..."
                className="min-h-[120px] border-amber-300 focus:border-amber-500 focus:ring-amber-500"
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveMessage} size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                  Save Message
                </Button>
                <Button 
                  onClick={() => {
                    setEditableMessage(formData.customMessage);
                    setIsEditing(false);
                  }} 
                  variant="outline" 
                  size="sm"
                  className="border-amber-300 text-amber-700 hover:bg-amber-100"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {formData.customMessage ? (
                <div className="p-3 bg-white border border-amber-200 rounded-lg">
                  <p className="text-slate-700 whitespace-pre-wrap">{formData.customMessage}</p>
                </div>
              ) : (
                <p className="text-amber-600 italic">No additional message added</p>
              )}
              <Button 
                onClick={() => setIsEditing(true)} 
                variant="outline" 
                size="sm"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                {formData.customMessage ? 'Edit Message' : 'Add Message'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

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

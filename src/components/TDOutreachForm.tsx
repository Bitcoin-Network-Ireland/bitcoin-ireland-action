
import React, { useState } from 'react';
import { TD } from '@/data/tds';
import { UserInfoForm } from './UserInfoForm';
import { TDSelection } from './TDSelection';
import { EmailTemplate } from './EmailTemplate';
import { EmailPreview } from './EmailPreview';

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

  const canShowPreview = formData.name && formData.email && formData.constituency && selectedTDs.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <UserInfoForm 
        formData={formData}
        onInputChange={handleInputChange}
      />

      <TDSelection
        constituency={formData.constituency}
        selectedTDs={selectedTDs}
        onTDSelection={handleTDSelection}
      />

      {selectedTDs.length > 0 && (
        <EmailTemplate
          customMessage={formData.customMessage}
          onMessageChange={(message) => handleInputChange('customMessage', message)}
        />
      )}

      {canShowPreview && (
        <EmailPreview 
          formData={formData}
          selectedTDs={selectedTDs}
          onEditMessage={(message) => handleInputChange('customMessage', message)}
        />
      )}
    </div>
  );
};

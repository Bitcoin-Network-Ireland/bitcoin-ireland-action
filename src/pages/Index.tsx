
import { TDOutreachForm } from "@/components/TDOutreachForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-800">
                Contact Your TD About Bitcoin
              </h1>
            </div>
            <div className="text-sm text-slate-600">
              Irish Citizens Bitcoin Outreach
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Make Your Voice Heard on Bitcoin Policy
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Connect with your local TDs to discuss Bitcoin's importance for Ireland's future. 
            Over 500,000 Irish citizens engage with Bitcoin - more than any single party's first-preference votes.
          </p>
        </div>

        <TDOutreachForm />
      </main>

      <footer className="bg-slate-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-300">
              Supporting informed dialogue on Bitcoin policy in Ireland
            </p>
            <div className="mt-4 text-sm text-slate-400">
              <a href="https://bitcoinnetwork.ie" className="hover:text-emerald-400 transition-colors">
                Learn more at bitcoinnetwork.ie
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

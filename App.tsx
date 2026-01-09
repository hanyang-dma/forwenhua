import React, { useState, useRef, useEffect } from 'react';
import { DATA } from './constants';
import { Language, Concept } from './types';
import { ConceptVisualization } from './components/Visualizations';
import { explainConcept } from './services/geminiService';
import { Brain, Clock, BookOpen, Globe, ArrowRight, Loader2, Menu, X, ChevronDown, Bot, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState<'timeline' | 'acronyms' | 'concepts'>('timeline');
  const [selectedConcept, setSelectedConcept] = useState<Concept>(DATA.concepts[0]);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll to top when section changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  }, [activeSection]);

  const handleAskAI = async () => {
    setLoadingAi(true);
    setAiExplanation(null);
    const result = await explainConcept(lang === 'en' ? selectedConcept.title_en : selectedConcept.title_cn, lang);
    setAiExplanation(result);
    setLoadingAi(false);
  };

  const NavItem = ({ section, label, icon: Icon }: { section: typeof activeSection, label: string, icon: any }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
        activeSection === section 
          ? 'text-black border-b-2 border-black' 
          : 'text-zinc-500 hover:text-black'
      }`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-zinc-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-black text-white p-1.5 rounded-sm">
                <Brain size={20} />
              </div>
              <h1 className="text-lg font-bold tracking-tight">AI CHRONOS</h1>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              <NavItem section="timeline" label={lang === 'en' ? 'Timeline' : '年表'} icon={Clock} />
              <NavItem section="acronyms" label={lang === 'en' ? 'Acronyms' : '缩略语'} icon={BookOpen} />
              <NavItem section="concepts" label={lang === 'en' ? 'Concepts' : '核心概念'} icon={Sparkles} />
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLang(l => l === 'en' ? 'cn' : 'en')}
                className="flex items-center space-x-1 text-sm font-medium hover:opacity-70 transition-opacity"
              >
                <Globe size={16} />
                <span>{lang === 'en' ? 'EN' : '中文'}</span>
              </button>
              
              <button 
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-100 bg-white px-4 py-4 space-y-4">
            <button onClick={() => setActiveSection('timeline')} className="block w-full text-left py-2">{lang === 'en' ? 'Timeline' : '年表'}</button>
            <button onClick={() => setActiveSection('acronyms')} className="block w-full text-left py-2">{lang === 'en' ? 'Acronyms' : '缩略语'}</button>
            <button onClick={() => setActiveSection('concepts')} className="block w-full text-left py-2">{lang === 'en' ? 'Concepts' : '核心概念'}</button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Timeline View */}
        {activeSection === 'timeline' && (
          <div className="max-w-3xl mx-auto relative border-l border-zinc-200 ml-4 md:ml-8 space-y-12">
            {DATA.timeline.map((event, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 group">
                {/* Dot */}
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-white border-2 border-zinc-300 rounded-full group-hover:border-black group-hover:bg-black transition-colors" />
                
                {/* Year */}
                <span className="text-xs font-mono font-bold text-zinc-400 mb-1 block">
                  {event.year}
                </span>
                
                {/* Card */}
                <div className="bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-lg p-6 border border-zinc-100">
                  <h3 className="text-xl font-bold mb-2">
                    {lang === 'en' ? event.title_en : event.title_cn}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {lang === 'en' ? event.description_en : event.description_cn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Acronyms View */}
        {activeSection === 'acronyms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.acronyms.map((acronym, idx) => (
              <div key={idx} className="p-6 border border-zinc-200 rounded-lg hover:border-black hover:shadow-lg transition-all group bg-white">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl font-black tracking-tighter group-hover:text-black text-zinc-800">
                    {acronym.abbr}
                  </span>
                  <div className="h-px flex-grow bg-zinc-100 mx-4 mt-3" />
                </div>
                <h4 className="font-semibold text-sm mb-2 text-zinc-900">{acronym.full}</h4>
                <p className="text-sm text-zinc-500">
                  {lang === 'en' ? acronym.meaning_en : acronym.meaning_cn}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Concepts View */}
        {activeSection === 'concepts' && (
          <div className="grid lg:grid-cols-12 gap-8 h-full">
            {/* Sidebar List */}
            <div className="lg:col-span-4 space-y-2 h-fit lg:sticky lg:top-28">
               <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400 mb-4 px-2">
                {lang === 'en' ? 'Select Concept' : '选择概念'}
               </h2>
               {DATA.concepts.map((concept) => (
                 <button
                  key={concept.id}
                  onClick={() => {
                    setSelectedConcept(concept);
                    setAiExplanation(null);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-all flex justify-between items-center ${
                    selectedConcept.id === concept.id
                      ? 'bg-black text-white'
                      : 'hover:bg-zinc-100 text-zinc-600'
                  }`}
                 >
                   <span>{lang === 'en' ? concept.title_en : concept.title_cn}</span>
                   {selectedConcept.id === concept.id && <ArrowRight size={14} />}
                 </button>
               ))}
            </div>

            {/* Display Area */}
            <div className="lg:col-span-8 space-y-6">
               {/* Visual Stage */}
               <div className="bg-white p-1 rounded-xl shadow-sm border border-zinc-100">
                 <ConceptVisualization type={selectedConcept.type} isActive={true} />
               </div>

               {/* Description */}
               <div className="prose prose-zinc max-w-none">
                 <h2 className="text-3xl font-bold mb-4">
                   {lang === 'en' ? selectedConcept.title_en : selectedConcept.title_cn}
                 </h2>
                 <p className="text-lg text-zinc-700 leading-relaxed border-l-4 border-black pl-4">
                   {lang === 'en' ? selectedConcept.description_en : selectedConcept.description_cn}
                 </p>
               </div>

               {/* Extended Reading / AI Chat */}
               <div className="mt-8 pt-8 border-t border-zinc-100">
                 <div className="flex items-center space-x-2 mb-4">
                    <Bot size={20} />
                    <h3 className="font-bold text-lg">{lang === 'en' ? 'Extended Reading' : '延伸阅读'}</h3>
                 </div>
                 
                 <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-100">
                   {!aiExplanation ? (
                     <div className="text-center py-6">
                        <p className="text-sm text-zinc-500 mb-4">
                          {lang === 'en' 
                            ? "Want to learn more? Ask our AI model to explain this concept in detail." 
                            : "想了解更多？让 AI 模型为您详细解释这个概念。"}
                        </p>
                        <button 
                          onClick={handleAskAI}
                          disabled={loadingAi}
                          className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 transition-colors flex items-center mx-auto space-x-2"
                        >
                          {loadingAi ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                          <span>{lang === 'en' ? 'Explain with Gemini' : '使用 Gemini 解释'}</span>
                        </button>
                     </div>
                   ) : (
                     <div className="animate-in fade-in duration-500">
                       <p className="text-sm text-zinc-800 leading-relaxed whitespace-pre-wrap">
                         {aiExplanation}
                       </p>
                       <button 
                          onClick={() => setAiExplanation(null)}
                          className="mt-4 text-xs text-zinc-400 hover:text-black underline"
                        >
                          {lang === 'en' ? 'Clear' : '清除'}
                        </button>
                     </div>
                   )}
                 </div>
               </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-zinc-400 font-mono">
          &copy; {new Date().getFullYear()} AI CHRONOS. DESIGNED BY GEMINI.
        </div>
      </footer>
    </div>
  );
};

export default App;
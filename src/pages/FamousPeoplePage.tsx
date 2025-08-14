import React, { useState, useEffect } from 'react';
import { Users, Star, Search, Award } from 'lucide-react';
import { trackPageView, trackFamousPersonSearch } from '../utils/analytics';
import { FamousPeopleLibrary, FamousPerson } from '../data/famousChinesePeople';

const eraLabels = {
  ancient: '古代',
  imperial: '帝国时期',
  modern: '现代',
  contemporary: '当代'
};
const categoryLabels = {
  philosopher: '哲学家',
  poet: '诗人',
  emperor: '帝王',
  scientist: '科学家',
  artist: '艺术家',
  politician: '政治家',
  business: '企业家',
  entertainer: '演艺家',
  military: '军事家',
  scholar: '学者',
  inventor: '发明家',
  explorer: '探险家'
};
const genderLabels = {
  male: '男性',
  female: '女性',
  neutral: '通用'
};

const FamousPeoplePage: React.FC = () => {
  // SEO optimization for famous people page
  React.useEffect(() => {
    document.title = '中国名人库 - 历史名人传记与成就 | 中华文化名人录';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', '探索中国历史名人库，收录从古代圣贤到现代精英的完整传记。了解孔子、老子、李白、毛泽东等历史名人的生平、成就和文化影响，感受中华文明的深厚底蕴。');
    }
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', '中国名人库, 历史名人, 中华文化, 孔子, 老子, 李白, 毛泽东, 历史传记, 文化名人, 中华文明, 历史人物, 名人成就');
    
    // Track page view
    trackPageView('Famous People Page', '/famous-people');
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEra, setSelectedEra] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'name' | 'era'>('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [famousPeople, setFamousPeople] = useState<FamousPerson[]>([]);
  const [stats, setStats] = useState<{
    total: number;
    byEra: { ancient?: number; imperial?: number };
    averagePopularity: number;
  } | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<FamousPerson | null>(null);

  useEffect(() => {
    setStats(FamousPeopleLibrary.getStatistics());
  }, []);
  useEffect(() => {
    const filtered = FamousPeopleLibrary.filterPeople({
      era: selectedEra || undefined,
      category: selectedCategory || undefined,
      gender: selectedGender || undefined,
      searchTerm: searchTerm || undefined
    });
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity); break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'era':
        filtered.sort((a, b) => (a.birthYear || 0) - (b.birthYear || 0)); break;
    }
    setFamousPeople(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedEra, selectedCategory, selectedGender, sortBy]);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return famousPeople.slice(startIndex, startIndex + itemsPerPage);
  };
  const totalPages = Math.ceil(famousPeople.length / itemsPerPage);
  const clearFilters = () => {
    setSearchTerm(''); setSelectedEra(''); setSelectedCategory(''); setSelectedGender(''); setSortBy('popularity');
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-6 border border-yellow-400/20 shadow-2xl">
            <Users className="w-10 h-10 text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-4 leading-tight drop-shadow-lg">中国名人库</h1>
          <h2 className="text-2xl font-semibold text-white/90 mb-4">探索中华文明的历史名人</h2>
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">收录中国历史名人，从古代圣贤到现代精英，了解他们的生平、成就和历史文化影响，感受中华文明的深厚底蕴。</p>
        </div>
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 rounded-xl border border-white/20 p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.total}</div>
              <div className="text-white/70 text-sm">总名人数量</div>
            </div>
            <div className="bg-white/10 rounded-xl border border-white/20 p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.byEra.ancient || 0}</div>
              <div className="text-white/70 text-sm">古代名人</div>
            </div>
            <div className="bg-white/10 rounded-xl border border-white/20 p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.byEra.imperial || 0}</div>
              <div className="text-white/70 text-sm">帝国时期</div>
            </div>
            <div className="bg-white/10 rounded-xl border border-white/20 p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.averagePopularity.toFixed(1)}</div>
              <div className="text-white/70 text-sm">平均影响力</div>
            </div>
          </div>
        )}
        <div className="bg-white/10 rounded-2xl border border-white/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <input type="text" placeholder="搜索名人..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50" />
            </div>
            <select value={selectedEra} onChange={e => setSelectedEra(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white">
              <option value="">所有时代</option>
              {Object.entries(eraLabels).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
            </select>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white">
              <option value="">所有类别</option>
              {Object.entries(categoryLabels).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
            </select>
            <select value={selectedGender} onChange={e => setSelectedGender(e.target.value)} className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white">
              <option value="">所有性别</option>
              {Object.entries(genderLabels).map(([key, label]) => (<option key={key} value={key}>{label}</option>))}
            </select>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-white/70">排序:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as 'popularity' | 'name' | 'era')} className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm">
                <option value="popularity">按影响力</option>
                <option value="name">按姓名</option>
                <option value="era">按时代</option>
              </select>
            </div>
            <button onClick={clearFilters} className="text-white/70 hover:text-white transition-colors text-sm">清除筛选</button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="text-white/70">找到 {famousPeople.length} 位名人</div>
          <div className="text-white/70">第 {currentPage} 页，共 {totalPages} 页</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {getCurrentPageData().map(person => (
            <div key={person.id} className="bg-white/10 rounded-2xl border border-white/20 p-6 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 group relative overflow-hidden hover:scale-105 cursor-pointer" onClick={() => setSelectedPerson(person)}>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">{person.name}</h3>
                    <p className="text-yellow-400 font-medium">{person.pinyin}</p>
                    {person.englishName && (<p className="text-white/60 text-sm">{person.englishName}</p>)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-white/70 text-sm">{person.popularity}/10</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1 bg-yellow-500/20 border border-yellow-400/30 rounded-full px-2 py-1">
                    <span className="text-yellow-300 text-xs">{categoryLabels[person.category]}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-blue-500/20 border border-blue-400/30 rounded-full px-2 py-1">
                    <span className="text-blue-300 text-xs">{eraLabels[person.era]}</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">{person.briefIntroduction}</p>
                <div className="mb-4">
                  <h4 className="text-white/70 font-medium text-sm mb-2 flex items-center"><Award className="w-3 h-3 mr-1" />主要成就</h4>
                  <div className="flex flex-wrap gap-1">
                    {person.achievements.slice(0, 3).map((achievement, index) => (
                      <span key={index} className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white/70">{achievement}</span>
                    ))}
                    {person.achievements.length > 3 && (<span className="text-white/50 text-xs">+{person.achievements.length - 3}</span>)}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-white/70 font-medium text-sm mb-2">性格特征</h4>
                  <div className="flex flex-wrap gap-1">
                    {person.personality.slice(0, 4).map((trait, index) => (
                      <span key={index} className="bg-green-500/20 border border-green-400/30 rounded px-2 py-1 text-xs text-green-300">{trait}</span>
                    ))}
                  </div>
                </div>
                {person.famousQuotes && person.famousQuotes.length > 0 && (
                  <div className="border-t border-white/10 pt-3">
                    <blockquote className="text-white/60 text-sm italic">"{person.famousQuotes[0]}"</blockquote>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors">上一页</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`px-3 py-2 rounded-lg text-sm transition-colors ${currentPage === pageNum ? 'bg-yellow-500 text-black' : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'}`}>{pageNum}</button>
              );
            })}
            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-colors">下一页</button>
          </div>
        )}
        {selectedPerson && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 rounded-2xl border border-white/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedPerson.name}</h2>
                  <p className="text-yellow-400 text-xl">{selectedPerson.pinyin}</p>
                  {selectedPerson.englishName && (<p className="text-white/60">{selectedPerson.englishName}</p>)}
                </div>
                <button onClick={() => setSelectedPerson(null)} className="text-white/60 hover:text-white text-2xl">×</button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">基本信息</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2"><span className="text-white/70">时代:</span><span className="text-white">{eraLabels[selectedPerson.era]}</span></div>
                    <div className="flex items-center space-x-2"><span className="text-white/70">类别:</span><span className="text-white">{categoryLabels[selectedPerson.category]}</span></div>
                    <div className="flex items-center space-x-2"><span className="text-white/70">影响力:</span><div className="flex items-center space-x-1"><Star className="w-4 h-4 text-yellow-400" /><span className="text-white">{selectedPerson.popularity}/10</span></div></div>
                    {selectedPerson.birthYear && (<div className="flex items-center space-x-2"><span className="text-white/70">生卒年:</span><span className="text-white">{selectedPerson.birthYear} - {selectedPerson.deathYear || '至今'}</span></div>)}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 mt-6">详细介绍</h3>
                  <p className="text-white/80 leading-relaxed mb-4">{selectedPerson.briefIntroduction}</p>
                  <h3 className="text-xl font-bold text-white mb-4">主要成就</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/80">{selectedPerson.achievements.map((achievement, index) => (<li key={index}>{achievement}</li>))}</ul>
                  <h3 className="text-xl font-bold text-white mb-4 mt-6">性格特征</h3>
                  <div className="flex flex-wrap gap-2">{selectedPerson.personality.map((trait, index) => (<span key={index} className="bg-green-500/20 border border-green-400/30 rounded px-3 py-1 text-green-300">{trait}</span>))}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">历史影响</h3>
                  <p className="text-white/80 leading-relaxed mb-6">{selectedPerson.historicalImpact}</p>
                  <h3 className="text-xl font-bold text-white mb-4">主要贡献</h3>
                  <ul className="list-disc list-inside space-y-2 text-white/80 mb-6">{selectedPerson.keyContributions.map((contribution, index) => (<li key={index}>{contribution}</li>))}</ul>
                  {selectedPerson.famousQuotes && selectedPerson.famousQuotes.length > 0 && (<><h3 className="text-xl font-bold text-white mb-4">名人名言</h3><div className="space-y-3">{selectedPerson.famousQuotes.map((quote, index) => (<blockquote key={index} className="bg-white/5 border-l-4 border-yellow-400 pl-4 py-2 text-white/80 italic">"{quote}"</blockquote>))}</div></>)}
                  <h3 className="text-xl font-bold text-white mb-4 mt-6">名字含义</h3>
                  <p className="text-white/80 leading-relaxed mb-4">{selectedPerson.nameMeaning}</p>
                  <h3 className="text-xl font-bold text-white mb-4">文化意义</h3>
                  <p className="text-white/80 leading-relaxed">{selectedPerson.culturalSignificance}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamousPeoplePage;
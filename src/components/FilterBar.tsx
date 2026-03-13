'use client'

interface FilterBarProps {
  sources: string[]
  selectedSources: string[]
  onSourceChange: (sources: string[]) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: 'date' | 'hotness'
  onSortChange: (sort: 'date' | 'hotness') => void
}

export default function FilterBar({
  sources,
  selectedSources,
  onSourceChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  const toggleSource = (source: string) => {
    if (selectedSources.includes(source)) {
      onSourceChange(selectedSources.filter(s => s !== source))
    } else {
      onSourceChange([...selectedSources, source])
    }
  }

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <button
          className={`filter-btn ${sortBy === 'date' ? 'active' : ''}`}
          onClick={() => onSortChange('date')}
        >
          最新
        </button>
        <button
          className={`filter-btn ${sortBy === 'hotness' ? 'active' : ''}`}
          onClick={() => onSortChange('hotness')}
        >
          热门
        </button>
      </div>

      <div className="filter-group">
        {sources.map(source => (
          <button
            key={source}
            className={`filter-btn ${selectedSources.includes(source) ? 'active' : ''}`}
            onClick={() => toggleSource(source)}
          >
            {source}
          </button>
        ))}
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="搜索文章..."
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  )
}

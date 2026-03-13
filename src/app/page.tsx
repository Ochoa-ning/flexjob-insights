'use client'

import { useState, useEffect, useMemo } from 'react'
import { articles, Article } from '@/data/articles'
import ArticleCard from '@/components/ArticleCard'
import ArticleModal from '@/components/ArticleModal'
import FilterBar from '@/components/FilterBar'

const SOURCES = ['微信公众号', '今日头条', '百家号', '行业网站']

export default function Home() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'hotness'>('date')

  // 从 localStorage 加载收藏
  useEffect(() => {
    const saved = localStorage.getItem('flexjob-favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  // 保存收藏到 localStorage
  const toggleFavorite = (id: string) => {
    let newFavorites: string[]
    if (favorites.includes(id)) {
      newFavorites = favorites.filter(f => f !== id)
    } else {
      newFavorites = [...favorites, id]
    }
    setFavorites(newFavorites)
    localStorage.setItem('flexjob-favorites', JSON.stringify(newFavorites))
  }

  // 筛选和排序文章
  const filteredArticles = useMemo(() => {
    let result = [...articles]

    // 来源筛选
    if (selectedSources.length > 0) {
      result = result.filter(article => selectedSources.includes(article.source))
    }

    // 搜索筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // 排序
    if (sortBy === 'hotness') {
      result.sort((a, b) => b.hotness - a.hotness)
    } else {
      result.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    }

    return result
  }, [selectedSources, searchQuery, sortBy])

  return (
    <>
      <h1 className="page-title">全部文章</h1>

      <FilterBar
        sources={SOURCES}
        selectedSources={selectedSources}
        onSourceChange={setSelectedSources}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {filteredArticles.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p className="empty-text">没有找到匹配的文章</p>
        </div>
      ) : (
        <div className="article-grid">
          {filteredArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onSelect={setSelectedArticle}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(article.id)}
            />
          ))}
        </div>
      )}

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.includes(selectedArticle.id)}
        />
      )}
    </>
  )
}

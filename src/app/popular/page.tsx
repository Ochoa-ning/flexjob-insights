'use client'

import { useState, useEffect } from 'react'
import { articles, Article } from '@/data/articles'
import ArticleCard from '@/components/ArticleCard'
import ArticleModal from '@/components/ArticleModal'

export default function PopularPage() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('flexjob-favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

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

  // 按热度排序，取前 6 篇
  const popularArticles = [...articles]
    .sort((a, b) => b.hotness - a.hotness)
    .slice(0, 6)

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">热门推荐</h1>
        <span className="page-stats">根据阅读热度排序</span>
      </div>

      <div className="article-grid">
        {popularArticles.map(article => (
          <ArticleCard
            key={article.id}
            article={article}
            onSelect={setSelectedArticle}
            onToggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(article.id)}
          />
        ))}
      </div>

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

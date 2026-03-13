'use client'

import { useState, useEffect } from 'react'
import { articles, Article } from '@/data/articles'
import ArticleCard from '@/components/ArticleCard'
import ArticleModal from '@/components/ArticleModal'

export default function FavoritesPage() {
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

  // 获取收藏的文章
  const favoriteArticles = articles
    .filter(article => favorites.includes(article.id))
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">我的收藏</h1>
        <span className="page-stats">{favoriteArticles.length} 篇文章</span>
      </div>

      {favoriteArticles.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <p className="empty-text">还没有收藏任何文章</p>
          <p style={{ fontSize: '14px', marginTop: '8px', color: '#6b7280' }}>
            点击文章卡片上的星标即可收藏
          </p>
        </div>
      ) : (
        <div className="article-grid">
          {favoriteArticles.map(article => (
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

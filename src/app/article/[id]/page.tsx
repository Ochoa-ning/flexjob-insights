'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { articles, Article } from '@/data/articles'
import ArticleModal from '@/components/ArticleModal'

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<Article | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const id = params.id as string
    const found = articles.find(a => a.id === id)
    if (found) {
      setArticle(found)
    }

    const saved = localStorage.getItem('flexjob-favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [params.id])

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

  if (!article) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <p className="empty-text">文章不存在</p>
        <Link href="/" style={{ color: '#1a56db', marginTop: '16px', display: 'inline-block' }}>
          返回首页
        </Link>
      </div>
    )
  }

  return (
    <>
      <Link href="/" className="back-btn">
        ← 返回列表
      </Link>

      <ArticleModal
        article={article}
        onClose={() => router.push('/')}
        onToggleFavorite={toggleFavorite}
        isFavorite={favorites.includes(article.id)}
      />
    </>
  )
}

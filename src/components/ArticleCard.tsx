'use client'

import { useState } from 'react'
import { Article } from '@/data/articles'

interface ArticleCardProps {
  article: Article
  onSelect: (article: Article) => void
  onToggleFavorite: (id: string) => void
  isFavorite: boolean
}

export default function ArticleCard({
  article,
  onSelect,
  onToggleFavorite,
  isFavorite,
}: ArticleCardProps) {
  const getSourceIconClass = (source: string) => {
    switch (source) {
      case '微信公众号':
        return 'article-source-icon weixin'
      case '今日头条':
        return 'article-source-icon toutiao'
      case '百家号':
        return 'article-source-icon baijiahao'
      default:
        return 'article-source-icon industry'
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }

  const formatHotness = (hotness: number) => {
    if (hotness >= 1000) {
      return `${(hotness / 1000).toFixed(1)}k`
    }
    return hotness.toString()
  }

  return (
    <article className="article-card" onClick={() => onSelect(article)}>
      <div className="article-source">
        <span className={getSourceIconClass(article.source)} />
        {article.source}
      </div>
      <h3 className="article-title">{article.title}</h3>
      <p className="article-summary">{article.summary}</p>
      <div className="article-meta">
        <div className="article-date">
          {formatDate(article.publishDate)}
        </div>
        <div className="article-hotness">
          <span>🔥</span>
          {formatHotness(article.hotness)}
        </div>
      </div>
    </article>
  )
}

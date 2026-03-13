'use client'

import { useState, useEffect } from 'react'
import { Article } from '@/data/articles'

interface ArticleModalProps {
  article: Article
  onClose: () => void
  onToggleFavorite: (id: string) => void
  isFavorite: boolean
}

export default function ArticleModal({
  article,
  onClose,
  onToggleFavorite,
  isFavorite,
}: ArticleModalProps) {
  const [copied, setCopied] = useState<string | null>(null)

  // 生成摘要
  const generateSummary = () => {
    const sentences = article.content.split('。').filter(s => s.trim())
    if (sentences.length <= 3) return article.content
    return sentences.slice(0, 3).join('。') + '。'
  }

  // 提取关键要点
  const extractKeyPoints = () => {
    const lines = article.content.split('\n').filter(line => {
      const trimmed = line.trim()
      return trimmed && (trimmed.startsWith('一、') || trimmed.startsWith('1.') || trimmed.startsWith('二、') || trimmed.startsWith('三、') || trimmed.startsWith('四、') || trimmed.match(/^\d+\./))
    })
    return lines.map(line => line.replace(/^[一二三四五六七八九十]+、\s*/, '').replace(/^\d+\.\s*/, ''))
  }

  // 生成改写建议
  const generateRewriteSuggestions = () => {
    return [
      `从"监管趋严"角度切入：面对${article.source}的政策变化，人力资源公司如何应对？`,
      `从"行业趋势"角度切入：${article.title.replace(/^[^：]+：/, '')}的深层逻辑`,
      `从"实操指南"角度切入：人力资源公司必看的${article.tags[0]}指南`,
    ]
  }

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 2000)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  const keyPoints = extractKeyPoints()
  const suggestions = generateRewriteSuggestions()

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{article.title}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="modal-source">
            <span>{article.source}</span>
            <span>·</span>
            <span>{formatDate(article.publishDate)}</span>
            <span>·</span>
            <span>热度 {article.hotness}</span>
            <button
              className={`article-favorite ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(article.id)}
              style={{ marginLeft: 'auto' }}
            >
              {isFavorite ? '★ 已收藏' : '☆ 收藏'}
            </button>
          </div>

          <div className="modal-tags">
            {article.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="modal-text">{article.content}</div>

          {/* 洗稿辅助面板 */}
          <div className="rewrite-panel">
            <h3 className="rewrite-title">
              <span>✍️</span> 洗稿辅助
            </h3>

            <div className="rewrite-section">
              <div className="rewrite-label">📝 文章摘要</div>
              <div className="rewrite-text">{generateSummary()}</div>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(generateSummary(), 'summary')}
              >
                {copied === 'summary' ? '已复制' : '复制'}
              </button>
            </div>

            <div className="rewrite-section">
              <div className="rewrite-label">📌 关键要点</div>
              <div className="rewrite-text">
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {keyPoints.map((point, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{point}</li>
                  ))}
                </ul>
              </div>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(keyPoints.join('\n'), 'points')}
              >
                {copied === 'points' ? '已复制' : '复制'}
              </button>
            </div>

            <div className="rewrite-section">
              <div className="rewrite-label">💡 标题改写建议</div>
              <div className="rewrite-text">
                {suggestions.map((suggestion, idx) => (
                  <div key={idx} style={{ marginBottom: '8px' }}>
                    {suggestion}
                  </div>
                ))}
              </div>
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(suggestions.join('\n'), 'suggestions')}
              >
                {copied === 'suggestions' ? '已复制' : '复制'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useState, useMemo } from 'react'

type Token = {
  name: string
  symbol: string
  price: number
  marketCap: number
  volume24h: number
}

type Props = {
  tokens: Token[]
}

export default function HeatmapTable({ tokens }: Props) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<'price' | 'marketCap' | 'volume24h'>('marketCap')
  const [sortAsc, setSortAsc] = useState(false)

  const filtered = useMemo(() => {
    return tokens
      .filter(token =>
        token.name.toLowerCase().includes(search.toLowerCase()) ||
        token.symbol.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const valA = a[sortKey]
        const valB = b[sortKey]
        if (valA === valB) return 0
        return sortAsc ? valA - valB : valB - valA
      })
  }, [tokens, search, sortKey, sortAsc])

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  return (
    <div className="w-full mt-8">
      <input
        type="text"
        placeholder="Filter by name or symbol..."
        className="w-full mb-4 px-4 py-2 rounded-xl bg-surface text-textPrimary placeholder:text-textSecondary border border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/40"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm bg-surface text-textPrimary rounded-2xl overflow-hidden">
          <thead>
            <tr className="text-left text-accent border-b border-accent/20">
              <th className="p-3">Token</th>
              <th className="p-3 cursor-pointer" onClick={() => toggleSort('price')}>
                Price {sortKey === 'price' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => toggleSort('marketCap')}>
                Market Cap {sortKey === 'marketCap' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => toggleSort('volume24h')}>
                Volume (24h) {sortKey === 'volume24h' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((token, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-[#151515] transition">
                <td className="p-3 font-medium">
                  {token.name} <span className="text-textSecondary">({token.symbol})</span>
                </td>
                <td className="p-3">${token.price.toLocaleString()}</td>
                <td className="p-3">${token.marketCap.toLocaleString()}</td>
                <td className="p-3">${token.volume24h.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

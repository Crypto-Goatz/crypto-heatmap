'use client'

import React, { useState, useMemo } from 'react'

type Token = {
  name: string
  symbol: string
  price: number
  marketCap: number
  volume24h: number
  volatility: number
  type: string
}

type Props = {
  tokens: Token[]
}

const types = ['all', 'layer1', 'defi', 'meme', 'exchange', 'stablecoin']

export default function HeatmapTable({ tokens }: Props) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<'price' | 'marketCap' | 'volume24h' | 'volatility'>('marketCap')
  const [sortAsc, setSortAsc] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [timezone, setTimezone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone)

  const filtered = useMemo(() => {
    return tokens
      .filter(token => {
        const matchesSearch =
          token.name.toLowerCase().includes(search.toLowerCase()) ||
          token.symbol.toLowerCase().includes(search.toLowerCase())
        const matchesType = selectedType === 'all' || token.type === selectedType
        return matchesSearch && matchesType
      })
      .sort((a, b) => {
        const valA = a[sortKey]
        const valB = b[sortKey]
        if (valA === valB) return 0
        return sortAsc ? valA - valB : valB - valA
      })
  }, [tokens, search, sortKey, sortAsc, selectedType])

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search token or symbol..."
          className="w-full md:w-1/2 px-4 py-2 rounded-xl bg-surface text-textPrimary placeholder:text-textSecondary border border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/40"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="w-full md:w-1/4 px-4 py-2 rounded-xl bg-surface text-textPrimary border border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/40"
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
        >
          {types.map(t => (
            <option key={t} value={t}>
              {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
        <select
          className="w-full md:w-1/4 px-4 py-2 rounded-xl bg-surface text-textPrimary border border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/40"
          value={timezone}
          onChange={e => setTimezone(e.target.value)}
        >
          {Intl.supportedValuesOf('timeZone').map(tz => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>

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
              <th className="p-3 cursor-pointer" onClick={() => toggleSort('volatility')}>
                Volatility {sortKey === 'volatility' ? (sortAsc ? '↑' : '↓') : ''}
              </th>
              <th className="p-3">Type</th>
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
                <td className="p-3">{token.volatility.toFixed(2)}%</td>
                <td className="p-3 capitalize">{token.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


type Props = {
  tickets: number[]
  maxShown?: number
}

export default function SelectedTicketsSummary({ tickets, maxShown = 8 }: Props) {
  const sorted = [...tickets].sort((a, b) => a - b)
  const visible = sorted.slice(0, maxShown)
  const extra = tickets.length - visible.length

  return (
    <div className="flex flex-wrap gap-1 max-w-[200px]">
      {visible.map((n) => (
        <span key={n} className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
          #{n}
        </span>
      ))}
      {extra > 0 && (
        <span className="text-blue-600 text-xs font-medium">+{extra}</span>
      )}
    </div>
  )
}

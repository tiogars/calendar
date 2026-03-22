import { Box, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { type UiLanguage } from '../types'

interface MonthCalendarProps {
  year: number
  month: number // 0-indexed
  language: UiLanguage
}

export default function MonthCalendar({ year, month, language }: MonthCalendarProps) {
  const { t } = useTranslation()
  const firstDay = dayjs(new Date(year, month, 1))
  const daysInMonth = firstDay.daysInMonth()
  const startDayOfWeek = firstDay.day() // 0 = Sunday

  const cells: (number | null)[] = []
  for (let i = 0; i < startDayOfWeek; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null)

  const monthName = firstDay.locale(language).format('MMMM YYYY')
  const dayNames = [
    t('calendar.dayNames.su'),
    t('calendar.dayNames.mo'),
    t('calendar.dayNames.tu'),
    t('calendar.dayNames.we'),
    t('calendar.dayNames.th'),
    t('calendar.dayNames.fr'),
    t('calendar.dayNames.sa'),
  ]

  return (
    <Box className="month-calendar">
      <Typography
        variant="subtitle1"
        align="center"
        fontWeight="bold"
        className="month-header"
        sx={{ mb: 0.5, fontSize: '0.85rem' }}
      >
        {monthName}
      </Typography>
      <Box
        className="day-grid"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0,
        }}
      >
        {dayNames.map((d) => (
          <Box
            key={d}
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '0.65rem',
              py: 0.25,
              color: '#555',
            }}
          >
            {d}
          </Box>
        ))}
        {cells.map((day, idx) => (
          <Box
            key={idx}
            sx={{
              textAlign: 'center',
              fontSize: '0.7rem',
              py: 0.25,
              color: day ? '#333' : 'transparent',
            }}
          >
            {day ?? '.'}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

import { useState, useEffect, useRef } from 'react'
import {
  Box,
  Button,
  Fab,
  Paper,
  Tooltip,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import PrintIcon from '@mui/icons-material/Print'
import EditIcon from '@mui/icons-material/Edit'
import { useTranslation } from 'react-i18next'
import { type CalendarConfig, type UiLanguage } from '../types'
import MonthCalendar from './MonthCalendar'
import dayjs from 'dayjs'

interface CalendarPreviewProps {
  config: CalendarConfig
  onEdit: () => void
  language: UiLanguage
}

function getMonths(fromDate: string, toDate: string): { year: number; month: number }[] {
  const start = dayjs(fromDate + '-01')
  const end = dayjs(toDate + '-01')
  const months: { year: number; month: number }[] = []
  let current = start
  while (current.isBefore(end) || current.isSame(end, 'month')) {
    months.push({ year: current.year(), month: current.month() })
    current = current.add(1, 'month')
  }
  return months
}

export default function CalendarPreview({ config, onEdit, language }: CalendarPreviewProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const {
    title,
    freeText,
    freeTextBelowCalendars,
    fromDate,
    toDate,
    orientation,
    gridLayout,
    firstDayOfWeek,
  } = config
  const months = getMonths(fromDate, toDate)

  const cols = gridLayout === '4x3' ? 4 : 3
  const rows = gridLayout === '4x3' ? 3 : 4

  const [printDateTime, setPrintDateTime] = useState(new Date().toLocaleString())

  const handlePrint = () => {
    setPrintDateTime(new Date().toLocaleString())
    window.print()
  }

  // A4 dimensions
  const pageWidth = orientation === 'landscape' ? '297mm' : '210mm'
  const pageHeight = orientation === 'landscape' ? '210mm' : '297mm'

  // A4 dimensions in pixels at 96 dpi (1 mm = 96 / 25.4 px)
  const MM_TO_PX = 96 / 25.4
  const pageWidthPx = Math.round((orientation === 'landscape' ? 297 : 210) * MM_TO_PX)
  const pageHeightPx = Math.round((orientation === 'landscape' ? 210 : 297) * MM_TO_PX)

  // Scale the preview page to fit the available screen width
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [previewScale, setPreviewScale] = useState(1)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width
      setPreviewScale(width < pageWidthPx ? width / pageWidthPx : 1)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [pageWidthPx])

  return (
    <Box>
      {/* Action buttons - hidden on print */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ p: 2, justifyContent: 'center' }}
        className="no-print"
      >
        <Button variant="outlined" startIcon={<EditIcon />} onClick={onEdit}>
          {t('preview.actions.backToEdit')}
        </Button>
        <Button variant="contained" startIcon={<PrintIcon />} onClick={handlePrint}>
          {t('preview.actions.print')}
        </Button>
      </Stack>

      {/* Calendar page */}
      <Box ref={wrapperRef} sx={{ width: '100%', overflow: 'hidden' }}>
        <Paper
          className={`calendar-page ${orientation}`}
          elevation={3}
          sx={{
            width: pageWidth,
            minHeight: pageHeight,
            mx: previewScale < 1 ? 0 : 'auto',
            p: 3,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            ...(previewScale < 1 && {
              transform: `scale(${previewScale})`,
              transformOrigin: 'top left',
              // Negative margin collapses the empty layout space left by transform: scale
              mb: `${-(1 - previewScale) * pageHeightPx}px`,
            }),
          }}
        >
        {/* Header */}
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          className="calendar-title"
        >
          {title}
        </Typography>

        {freeText.trim() && (
          <Typography
            variant="body1"
            sx={{ mb: 2, whiteSpace: 'pre-line', textAlign: 'justify' }}
            className="calendar-free-text"
          >
            {freeText}
          </Typography>
        )}

        {/* Month grid */}
        <Box
          className="months-grid"
          sx={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: 2,
            flex: 1,
          }}
        >
          {months.map(({ year, month }) => (
            <Box
              key={`${year}-${month}`}
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 1,
                bgcolor: '#fafafa',
              }}
            >
              <MonthCalendar
                year={year}
                month={month}
                language={language}
                firstDayOfWeek={firstDayOfWeek}
              />
            </Box>
          ))}
        </Box>

        {freeTextBelowCalendars.trim() && (
          <Typography
            variant="body1"
            sx={{ mt: 2, whiteSpace: 'pre-line', textAlign: 'justify' }}
            className="calendar-free-text-below"
          >
            {freeTextBelowCalendars}
          </Typography>
        )}

        {/* Print footer with datetime */}
        <Box
          className="print-footer"
          sx={{
            mt: 2,
            pt: 1,
            borderTop: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {t('preview.footer.printedOn')} {printDateTime}
          </Typography>
        </Box>
      </Paper>
      </Box>

      {isMobile && (
        <>
          <Tooltip title={t('preview.actions.backToEdit')} placement="right">
            <Fab
              color="default"
              aria-label={t('preview.actions.backToEdit')}
              onClick={onEdit}
              sx={{ position: 'fixed', bottom: 16, left: 16 }}
              className="no-print"
            >
              <EditIcon />
            </Fab>
          </Tooltip>
          <Tooltip title={t('preview.actions.print')} placement="left">
            <Fab
              color="primary"
              aria-label={t('preview.actions.print')}
              onClick={handlePrint}
              sx={{ position: 'fixed', bottom: 16, right: 16 }}
              className="no-print"
            >
              <PrintIcon />
            </Fab>
          </Tooltip>
        </>
      )}
    </Box>
  )
}

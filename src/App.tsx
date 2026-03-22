import { useState } from 'react'
import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { enUS, frFR } from '@mui/x-date-pickers/locales'
import 'dayjs/locale/fr'
import EditionForm from './components/EditionForm'
import CalendarPreview from './components/CalendarPreview'
import { type CalendarConfig, type UiLanguage } from './types'

const defaultConfig: CalendarConfig = {
  title: 'My Calendar',
  fromDate: new Date().getFullYear() + '-01',
  toDate: new Date().getFullYear() + '-12',
  orientation: 'landscape',
  gridLayout: '4x3',
}

type Mode = 'edition' | 'preview'

const supportedLanguageMap: Record<string, UiLanguage> = {
  en: 'en',
  fr: 'fr',
}

function detectBrowserLanguage(): UiLanguage {
  if (typeof navigator === 'undefined') {
    return 'en'
  }

  const browserLanguage = navigator.language?.split('-')[0]?.toLowerCase() ?? 'en'
  return supportedLanguageMap[browserLanguage] ?? 'en'
}

function getMuiLocaleText(language: UiLanguage) {
  if (language === 'fr') {
    return frFR.components.MuiLocalizationProvider.defaultProps.localeText
  }

  return enUS.components.MuiLocalizationProvider.defaultProps.localeText
}

function App() {
  const [mode, setMode] = useState<Mode>('edition')
  const [config, setConfig] = useState<CalendarConfig>(defaultConfig)
  const [language, setLanguage] = useState<UiLanguage>(detectBrowserLanguage)

  const handlePreview = (newConfig: CalendarConfig) => {
    setConfig(newConfig)
    setMode('preview')
  }

  const handleEdit = () => {
    setMode('edition')
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={language}
      localeText={getMuiLocaleText(language)}
    >
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <AppBar position="static" className="no-print">
          <Toolbar>
            <CalendarMonthIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Calendar Print
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {mode === 'edition' ? 'Edition Mode' : 'Preview Mode'}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box>
          {mode === 'edition' ? (
            <EditionForm
              initialConfig={config}
              onPreview={handlePreview}
              language={language}
              onLanguageChange={setLanguage}
            />
          ) : (
            <CalendarPreview config={config} onEdit={handleEdit} />
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  )
}

export default App

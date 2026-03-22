import { useState } from 'react'
import { Box, AppBar, Toolbar, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import EditionForm from './components/EditionForm'
import CalendarPreview from './components/CalendarPreview'
import { type CalendarConfig } from './types'

const defaultConfig: CalendarConfig = {
  title: 'My Calendar',
  fromDate: new Date().getFullYear() + '-01',
  toDate: new Date().getFullYear() + '-12',
  orientation: 'landscape',
  gridLayout: '4x3',
}

type Mode = 'edition' | 'preview'

function App() {
  const [mode, setMode] = useState<Mode>('edition')
  const [config, setConfig] = useState<CalendarConfig>(defaultConfig)

  const handlePreview = (newConfig: CalendarConfig) => {
    setConfig(newConfig)
    setMode('preview')
  }

  const handleEdit = () => {
    setMode('edition')
  }

  return (
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
          <EditionForm initialConfig={config} onPreview={handlePreview} />
        ) : (
          <CalendarPreview config={config} onEdit={handleEdit} />
        )}
      </Box>
    </Box>
  )
}

export default App

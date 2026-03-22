import { Controller, useForm, useWatch } from 'react-hook-form'
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Paper,
  Select,
  MenuItem,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { type CalendarConfig, type GridLayout, type Orientation, type UiLanguage } from '../types'
import PreviewIcon from '@mui/icons-material/Preview'
import { useTranslation } from 'react-i18next'

interface EditionFormProps {
  initialConfig: CalendarConfig
  onPreview: (config: CalendarConfig) => void
  language: UiLanguage
  onLanguageChange: (language: UiLanguage) => void
}

export default function EditionForm({
  initialConfig,
  onPreview,
  language,
  onLanguageChange,
}: EditionFormProps) {
  const { t } = useTranslation()
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<CalendarConfig>({
    defaultValues: initialConfig,
  })

  const orientation = useWatch({ control, name: 'orientation' })
  const gridLayout = useWatch({ control, name: 'gridLayout' })

  const onSubmit = (data: CalendarConfig) => {
    onPreview(data)
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          {t('edition.title')}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="app-language-label">{t('edition.languageLabel')}</InputLabel>
              <Select
                labelId="app-language-label"
                value={language}
                label={t('edition.languageLabel')}
                onChange={(event) => onLanguageChange(event.target.value as UiLanguage)}
              >
                <MenuItem value="en">{t('languages.english')}</MenuItem>
                <MenuItem value="fr">{t('languages.french')}</MenuItem>
              </Select>
            </FormControl>

            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('edition.fields.calendarTitle')}
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title ? t('edition.errors.titleRequired') : undefined}
                />
              )}
            />

            <Controller
              name="fromDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  label={t('edition.fields.fromDate')}
                  views={['year', 'month']}
                  value={field.value ? dayjs(field.value + '-01') : null}
                  onChange={(val: Dayjs | null) => {
                    if (val) {
                      field.onChange(val.format('YYYY-MM'))
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.fromDate,
                      helperText: errors.fromDate ? t('edition.errors.fromDateRequired') : undefined,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="toDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  label={t('edition.fields.toDate')}
                  views={['year', 'month']}
                  value={field.value ? dayjs(field.value + '-01') : null}
                  onChange={(val: Dayjs | null) => {
                    if (val) {
                      field.onChange(val.format('YYYY-MM'))
                    }
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.toDate,
                      helperText: errors.toDate ? t('edition.errors.toDateRequired') : undefined,
                    },
                  }}
                />
              )}
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                {t('edition.orientation.label')}
              </Typography>
              <ToggleButtonGroup
                value={orientation}
                exclusive
                onChange={(_, val) => {
                  if (val) setValue('orientation', val as Orientation)
                }}
                fullWidth
              >
                <ToggleButton value="portrait">{t('edition.orientation.portrait')}</ToggleButton>
                <ToggleButton value="landscape">{t('edition.orientation.landscape')}</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                {t('edition.gridLayout.label')}
              </Typography>
              <ToggleButtonGroup
                value={gridLayout}
                exclusive
                onChange={(_, val) => {
                  if (val) setValue('gridLayout', val as GridLayout)
                }}
                fullWidth
              >
                <ToggleButton value="4x3">{t('edition.gridLayout.option4x3')}</ToggleButton>
                <ToggleButton value="3x4">{t('edition.gridLayout.option3x4')}</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<PreviewIcon />}
              fullWidth
            >
              {t('edition.actions.preview')}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}

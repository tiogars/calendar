import { Controller, useForm, useWatch } from 'react-hook-form'
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  IconButton,
  Paper,
  Select,
  MenuItem,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import {
  type CalendarConfig,
  type FirstDayOfWeek,
  type GridLayout,
  type Orientation,
  type UiLanguage,
} from '../types'
import PreviewIcon from '@mui/icons-material/Preview'
import ShareIcon from '@mui/icons-material/Share'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EmailIcon from '@mui/icons-material/Email'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { buildShareUrl } from '../shareLink'

interface EditionFormProps {
  initialConfig: CalendarConfig
  onPreview: (config: CalendarConfig) => void
  language: UiLanguage
  onLanguageChange: (language: UiLanguage) => void
}

const FREE_TEXT_MAX_LENGTH = 400
const FREE_TEXT_WARNING_THRESHOLD = 220

function getCounterColor(length: number): 'error.main' | 'warning.main' | 'text.secondary' {
  if (length >= FREE_TEXT_MAX_LENGTH) {
    return 'error.main'
  }

  if (length >= FREE_TEXT_WARNING_THRESHOLD) {
    return 'warning.main'
  }

  return 'text.secondary'
}

export default function EditionForm({
  initialConfig,
  onPreview,
  language,
  onLanguageChange,
}: Readonly<EditionFormProps>) {
  const { t } = useTranslation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { control, getValues, handleSubmit, setValue, formState: { errors } } = useForm<CalendarConfig>({
    defaultValues: initialConfig,
  })
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [shareUrl, setShareUrl] = useState('')
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'success' | 'error'>('idle')

  const orientation = useWatch({ control, name: 'orientation' })
  const gridLayout = useWatch({ control, name: 'gridLayout' })
  const firstDayOfWeek = useWatch({ control, name: 'firstDayOfWeek' })
  const freeText = useWatch({ control, name: 'freeText' }) ?? ''
  const freeTextBelowCalendars = useWatch({ control, name: 'freeTextBelowCalendars' }) ?? ''

  const freeTextCounterColor = getCounterColor(freeText.length)
  const freeTextBelowCalendarsCounterColor = getCounterColor(freeTextBelowCalendars.length)

  const onSubmit = (data: CalendarConfig) => {
    onPreview(data)
  }

  const handleOpenShareDialog = () => {
    setShareUrl(buildShareUrl(getValues(), language))
    setCopyFeedback('idle')
    setIsShareDialogOpen(true)
  }

  const handleCloseShareDialog = () => {
    setIsShareDialogOpen(false)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopyFeedback('success')
    } catch {
      setCopyFeedback('error')
    }
  }

  const handleSendByEmail = () => {
    const subject = t('edition.share.emailSubject')
    const body = `${t('edition.share.emailBody')}\n\n${shareUrl}`
    globalThis.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4, pb: isMobile ? 12 : 4 }}>
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
              name="freeText"
              control={control}
              rules={{
                maxLength: {
                  value: FREE_TEXT_MAX_LENGTH,
                  message: t('edition.errors.freeTextMaxLength', { max: FREE_TEXT_MAX_LENGTH }),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('edition.fields.freeText')}
                  placeholder={t('edition.fields.freeTextPlaceholder')}
                  fullWidth
                  multiline
                  minRows={3}
                  error={!!errors.freeText}
                  helperText={errors.freeText?.message ?? `${freeText.length}/${FREE_TEXT_MAX_LENGTH}`}
                  slotProps={{
                    formHelperText: errors.freeText ? undefined : { sx: { color: freeTextCounterColor } },
                    htmlInput: { maxLength: FREE_TEXT_MAX_LENGTH },
                  }}
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

            <FormControl fullWidth>
              <InputLabel id="first-day-of-week-label">{t('edition.firstDayOfWeek.label')}</InputLabel>
              <Select
                labelId="first-day-of-week-label"
                value={firstDayOfWeek}
                label={t('edition.firstDayOfWeek.label')}
                onChange={(event) => {
                  setValue('firstDayOfWeek', event.target.value as FirstDayOfWeek)
                }}
              >
                <MenuItem value="monday">{t('edition.firstDayOfWeek.monday')}</MenuItem>
                <MenuItem value="sunday">{t('edition.firstDayOfWeek.sunday')}</MenuItem>
              </Select>
            </FormControl>

            <Controller
              name="freeTextBelowCalendars"
              control={control}
              rules={{
                maxLength: {
                  value: FREE_TEXT_MAX_LENGTH,
                  message: t('edition.errors.freeTextMaxLength', { max: FREE_TEXT_MAX_LENGTH }),
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={t('edition.fields.freeTextBelowCalendars')}
                  placeholder={t('edition.fields.freeTextBelowCalendarsPlaceholder')}
                  fullWidth
                  multiline
                  minRows={3}
                  error={!!errors.freeTextBelowCalendars}
                  helperText={errors.freeTextBelowCalendars?.message ?? `${freeTextBelowCalendars.length}/${FREE_TEXT_MAX_LENGTH}`}
                  slotProps={{
                    formHelperText: errors.freeTextBelowCalendars
                      ? undefined
                      : { sx: { color: freeTextBelowCalendarsCounterColor } },
                    htmlInput: { maxLength: FREE_TEXT_MAX_LENGTH },
                  }}
                />
              )}
            />

            <Button
              type="button"
              variant="outlined"
              size="large"
              startIcon={<ShareIcon />}
              onClick={handleOpenShareDialog}
              fullWidth
            >
              {t('edition.actions.share')}
            </Button>

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

        <Dialog
          open={isShareDialogOpen}
          onClose={handleCloseShareDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ pr: 6 }}>
            {t('edition.share.title')}
            <IconButton
              aria-label={t('edition.share.close')}
              onClick={handleCloseShareDialog}
              sx={{ position: 'absolute', right: 12, top: 12 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t('edition.share.description')}
            </Typography>
            <TextField
              value={shareUrl}
              fullWidth
              multiline
              minRows={3}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
            {copyFeedback !== 'idle' && (
              <Typography
                variant="caption"
                sx={{ mt: 1, display: 'block' }}
                color={copyFeedback === 'success' ? 'success.main' : 'error.main'}
              >
                {copyFeedback === 'success'
                  ? t('edition.share.copySuccess')
                  : t('edition.share.copyError')}
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseShareDialog}>{t('edition.share.cancel')}</Button>
            <Button onClick={handleCopyLink} startIcon={<ContentCopyIcon />}>
              {t('edition.share.copy')}
            </Button>
            <Button onClick={handleSendByEmail} variant="contained" startIcon={<EmailIcon />}>
              {t('edition.share.sendEmail')}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>

      {isMobile && (
        <SpeedDial
          ariaLabel={t('edition.actions.fabAriaLabel')}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          className="no-print"
        >
          <SpeedDialAction
            icon={<ShareIcon />}
            tooltipTitle={t('edition.actions.share')}
            onClick={handleOpenShareDialog}
          />
          <SpeedDialAction
            icon={<PreviewIcon />}
            tooltipTitle={t('edition.actions.preview')}
            onClick={handleSubmit(onSubmit)}
          />
        </SpeedDial>
      )}
    </Container>
  )
}

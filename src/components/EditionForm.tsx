import { Controller, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { type CalendarConfig, type GridLayout, type Orientation } from '../types'
import PreviewIcon from '@mui/icons-material/Preview'

interface EditionFormProps {
  initialConfig: CalendarConfig
  onPreview: (config: CalendarConfig) => void
}

export default function EditionForm({ initialConfig, onPreview }: EditionFormProps) {
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<CalendarConfig>({
    defaultValues: initialConfig,
  })

  const orientation = watch('orientation')
  const gridLayout = watch('gridLayout')

  const onSubmit = (data: CalendarConfig) => {
    onPreview(data)
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Calendar Settings
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="title"
              control={control}
              rules={{ required: 'Title is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Calendar Title"
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />

            <Controller
              name="fromDate"
              control={control}
              rules={{ required: 'From date is required' }}
              render={({ field }) => (
                <DatePicker
                  label="From (Month/Year)"
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
                      helperText: errors.fromDate?.message,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="toDate"
              control={control}
              rules={{ required: 'To date is required' }}
              render={({ field }) => (
                <DatePicker
                  label="To (Month/Year)"
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
                      helperText: errors.toDate?.message,
                    },
                  }}
                />
              )}
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Orientation
              </Typography>
              <ToggleButtonGroup
                value={orientation}
                exclusive
                onChange={(_, val) => {
                  if (val) setValue('orientation', val as Orientation)
                }}
                fullWidth
              >
                <ToggleButton value="portrait">Portrait</ToggleButton>
                <ToggleButton value="landscape">Landscape</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Grid Layout
              </Typography>
              <ToggleButtonGroup
                value={gridLayout}
                exclusive
                onChange={(_, val) => {
                  if (val) setValue('gridLayout', val as GridLayout)
                }}
                fullWidth
              >
                <ToggleButton value="4x3">4 columns × 3 rows</ToggleButton>
                <ToggleButton value="3x4">3 columns × 4 rows</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<PreviewIcon />}
              fullWidth
            >
              Preview Calendar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  )
}

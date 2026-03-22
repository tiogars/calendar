import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      app: {
        title: 'Calendar Print',
        mode: {
          edition: 'Edition Mode',
          preview: 'Preview Mode',
        },
      },
      languages: {
        english: 'English',
        french: 'French',
      },
      edition: {
        title: 'Calendar Settings',
        languageLabel: 'Language',
        fields: {
          calendarTitle: 'Calendar Title',
          freeText: 'Free Text',
          freeTextPlaceholder: 'Add a short note or subtitle',
          freeTextBelowCalendars: 'Free Text Below Calendars',
          freeTextBelowCalendarsPlaceholder: 'Add a note displayed under the calendars',
          fromDate: 'From (Month/Year)',
          toDate: 'To (Month/Year)',
        },
        orientation: {
          label: 'Orientation',
          portrait: 'Portrait',
          landscape: 'Landscape',
        },
        gridLayout: {
          label: 'Grid Layout',
          option4x3: '4 columns x 3 rows',
          option3x4: '3 columns x 4 rows',
        },
        firstDayOfWeek: {
          label: 'First Day of Week',
          monday: 'Monday',
          sunday: 'Sunday',
        },
        actions: {
          preview: 'Preview Calendar',
        },
        errors: {
          titleRequired: 'Title is required',
          freeTextMaxLength: 'Free text must be {{max}} characters or less',
          fromDateRequired: 'From date is required',
          toDateRequired: 'To date is required',
        },
      },
      preview: {
        actions: {
          backToEdit: 'Back to Edit',
          print: 'Print',
        },
        footer: {
          printedOn: 'Printed on:',
        },
      },
      calendar: {
        dayNames: {
          su: 'Su',
          mo: 'Mo',
          tu: 'Tu',
          we: 'We',
          th: 'Th',
          fr: 'Fr',
          sa: 'Sa',
        },
      },
    },
  },
  fr: {
    translation: {
      app: {
        title: 'Impression Calendrier',
        mode: {
          edition: 'Mode Edition',
          preview: 'Mode Apercu',
        },
      },
      languages: {
        english: 'Anglais',
        french: 'Français',
      },
      edition: {
        title: 'Parametres du calendrier',
        languageLabel: 'Langue',
        fields: {
          calendarTitle: 'Titre du calendrier',
          freeText: 'Texte libre',
          freeTextPlaceholder: 'Ajoutez une note ou un sous-titre',
          freeTextBelowCalendars: 'Texte libre sous les calendriers',
          freeTextBelowCalendarsPlaceholder: 'Ajoutez une note affichee sous les calendriers',
          fromDate: 'De (Mois/Annee)',
          toDate: 'A (Mois/Annee)',
        },
        orientation: {
          label: 'Orientation',
          portrait: 'Portrait',
          landscape: 'Paysage',
        },
        gridLayout: {
          label: 'Disposition de la grille',
          option4x3: '4 colonnes x 3 lignes',
          option3x4: '3 colonnes x 4 lignes',
        },
        firstDayOfWeek: {
          label: 'Premier jour de la semaine',
          monday: 'Lundi',
          sunday: 'Dimanche',
        },
        actions: {
          preview: 'Apercu du calendrier',
        },
        errors: {
          titleRequired: 'Le titre est obligatoire',
          freeTextMaxLength: 'Le texte libre doit contenir au maximum {{max}} caracteres',
          fromDateRequired: 'La date de debut est obligatoire',
          toDateRequired: 'La date de fin est obligatoire',
        },
      },
      preview: {
        actions: {
          backToEdit: 'Retour a l\'edition',
          print: 'Imprimer',
        },
        footer: {
          printedOn: 'Imprime le :',
        },
      },
      calendar: {
        dayNames: {
          su: 'Di',
          mo: 'Lu',
          tu: 'Ma',
          we: 'Me',
          th: 'Je',
          fr: 'Ve',
          sa: 'Sa',
        },
      },
    },
  },
} as const

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n

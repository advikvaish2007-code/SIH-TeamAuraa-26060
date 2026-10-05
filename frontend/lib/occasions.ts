export type OccasionId = 'national' | 'founding' | 'eid' | 'ramadan'

export type Occasion = {
  id: OccasionId
  label: string
  eyebrow: string
  titleAr: string
  titleEn: string
  blessingAr: string
}

export const OCCASIONS: Occasion[] = [
  {
    id: 'national',
    label: 'National Day',
    eyebrow: '23 September',
    titleAr: 'اليوم الوطني',
    titleEn: 'Saudi National Day',
    blessingAr: 'دام عزّك يا وطن',
  },
  {
    id: 'founding',
    label: 'Founding Day',
    eyebrow: '22 February',
    titleAr: 'يوم التأسيس',
    titleEn: 'Founding Day',
    blessingAr: 'يوم بدينا',
  },
  {
    id: 'eid',
    label: 'Eid',
    eyebrow: 'Eid Al-Fitr · Al-Adha',
    titleAr: 'عيد مبارك',
    titleEn: 'Eid Mubarak',
    blessingAr: 'تقبّل الله منّا ومنكم',
  },
  {
    id: 'ramadan',
    label: 'Ramadan',
    eyebrow: 'The Holy Month',
    titleAr: 'رمضان كريم',
    titleEn: 'Ramadan Kareem',
    blessingAr: 'أعاده الله علينا وعليكم بالخير',
  },
]

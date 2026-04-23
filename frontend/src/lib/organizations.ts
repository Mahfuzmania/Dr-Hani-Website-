export type OrganizationKey =
  | 'bangladesh-specialized-hospital'
  | 'tmss-medical-college'
  | 'rajshahi-university'

export type OrganizationInfo = {
  href: string
  key: OrganizationKey
  logo: string
  title: string
}

export const organizations: Record<OrganizationKey, OrganizationInfo> = {
  'bangladesh-specialized-hospital': {
    key: 'bangladesh-specialized-hospital',
    title: 'Bangladesh Specialized Hospital',
    href: 'https://www.bdspecializedhospital.com/',
    logo: '/branding/organizations/bangladesh-specialized-hospital.png',
  },
  'tmss-medical-college': {
    key: 'tmss-medical-college',
    title: 'TMSS Medical College',
    href: 'https://tmssmedicalcollege.com/',
    logo: '/branding/organizations/tmss-medical-college.png',
  },
  'rajshahi-university': {
    key: 'rajshahi-university',
    title: 'Rajshahi University',
    href: 'https://www.ru.ac.bd/logo/',
    logo: '/branding/organizations/rajshahi-university.png',
  },
}

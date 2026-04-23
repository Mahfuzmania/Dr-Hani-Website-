type SocialLabel = 'Facebook' | 'Instagram' | 'LinkedIn'

const iconClassName = 'h-[1em] w-[1em]'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className ?? iconClassName}
      fill="currentColor"
    >
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.025 4.388 11.02 10.125 11.927v-8.438H7.078v-3.49h3.047V9.41c0-3.017 1.792-4.683 4.533-4.683 1.313 0 2.686.236 2.686.236v2.962h-1.514c-1.492 0-1.956.931-1.956 1.886v2.262h3.328l-.532 3.49h-2.796V24C19.612 23.093 24 18.098 24 12.073Z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className ?? iconClassName}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5.25" />
      <circle cx="12" cy="12" r="4.15" />
      <circle cx="17.45" cy="6.55" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className ?? iconClassName}
      fill="currentColor"
    >
      <path d="M20.447 20.452H16.89v-5.569c0-1.328-.024-3.037-1.849-3.037-1.851 0-2.134 1.445-2.134 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.849 3.37-1.849 3.605 0 4.271 2.372 4.271 5.456v6.284ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452Z" />
    </svg>
  )
}

export function SocialIcon({
  label,
  className,
}: {
  className?: string
  label: SocialLabel
}) {
  if (label === 'Facebook') {
    return <FacebookIcon className={className} />
  }

  if (label === 'Instagram') {
    return <InstagramIcon className={className} />
  }

  return <LinkedInIcon className={className} />
}

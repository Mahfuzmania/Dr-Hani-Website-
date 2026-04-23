import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function BaseIcon({ children, className, viewBox = '0 0 24 24', ...props }: IconProps & { viewBox?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={viewBox}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 16L16 8" />
      <path d="M9 8h7v7" />
    </BaseIcon>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12h13" />
      <path d="M14 7l5 5-5 5" />
    </BaseIcon>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 10l5 5 5-5" />
    </BaseIcon>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </BaseIcon>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 7l10 10" />
      <path d="M17 7L7 17" />
    </BaseIcon>
  )
}

export function CalendarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3.5" y="5.5" width="17" height="15" rx="3" />
      <path d="M7.5 3.8v3.4" />
      <path d="M16.5 3.8v3.4" />
      <path d="M3.5 10h17" />
    </BaseIcon>
  )
}

export function DocumentIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 3.5h7l4 4v13H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" />
      <path d="M14 3.5V8h4" />
      <path d="M8.5 12.5h7" />
      <path d="M8.5 16h5.5" />
    </BaseIcon>
  )
}

export function MicrophoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="8.5" y="4" width="7" height="11" rx="3.5" />
      <path d="M6 11.5a6 6 0 0 0 12 0" />
      <path d="M12 17.5v3" />
      <path d="M9 20.5h6" />
    </BaseIcon>
  )
}

export function CameraIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6.5 7.5h2.2l1.5-2h3.6l1.5 2h2.2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" />
      <circle cx="12" cy="13" r="3.6" />
    </BaseIcon>
  )
}

export function FlagIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 20V4.5" />
      <path d="M6 5c1.8-1.2 3.5-1.2 5.2 0 1.7 1.2 3.4 1.2 5.1 0l1.2-.8v7.7l-1.2.8c-1.7 1.2-3.4 1.2-5.1 0-1.7-1.2-3.4-1.2-5.2 0" />
    </BaseIcon>
  )
}

export function HeartIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 20s-6.8-4.2-8.6-8.3C2.2 9 3.2 6 6.3 6c2 0 3.2 1 4 2.2C11.1 7 12.3 6 14.3 6c3.1 0 4.1 3 2.9 5.7C18.8 15.8 12 20 12 20Z" />
    </BaseIcon>
  )
}

export function CommunityIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="8" cy="9" r="2.4" />
      <circle cx="16" cy="9.8" r="2.1" />
      <path d="M4.8 18c.6-2.3 2.2-3.7 4.8-3.7s4.1 1.4 4.8 3.7" />
      <path d="M13.2 18c.4-1.7 1.6-2.9 3.8-2.9 1 0 1.9.2 2.6.7" />
    </BaseIcon>
  )
}

export function BuildingIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 20V6.5l7-3 7 3V20" />
      <path d="M9 9.5h1.5" />
      <path d="M13.5 9.5H15" />
      <path d="M9 13h1.5" />
      <path d="M13.5 13H15" />
      <path d="M10.5 20v-3.5h3V20" />
    </BaseIcon>
  )
}

export function ShieldIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 3.8 18 6v5.5c0 4-2.1 6.7-6 8.7-3.9-2-6-4.7-6-8.7V6l6-2.2Z" />
      <path d="M9.4 12.1 11.1 14l3.5-4" />
    </BaseIcon>
  )
}

export function PlayIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 8.8 15.2 12 10 15.2Z" fill="currentColor" stroke="none" />
    </BaseIcon>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="M5.8 8l6.2 5 6.2-5" />
    </BaseIcon>
  )
}

export function MessageIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5.5 6h13a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H11l-3.8 3v-3H5.5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path d="M8 10.5h8" />
      <path d="M8 13.5h5.5" />
    </BaseIcon>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8.1 4.6c.4-.5 1-.8 1.6-.5l2 .8c.6.3.9 1 .8 1.6l-.4 2.1c0 .5-.5 1-1 1.2l-1.1.3a14 14 0 0 0 4.1 4.1l.3-1.1c.2-.5.7-.9 1.2-1l2.1-.4c.6-.1 1.3.2 1.6.8l.8 2c.2.6 0 1.2-.5 1.6l-1.3 1.1c-.7.6-1.7.9-2.6.7-3.7-.8-8.1-5.2-8.9-8.9-.2-.9.1-1.9.7-2.6Z" />
    </BaseIcon>
  )
}

export function SendIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4.5 11.8 19.5 4.8 14 19.4l-2.8-5-6.7-2.6Z" />
      <path d="M19.2 5 11 13.3" />
    </BaseIcon>
  )
}

export function UserIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="8.4" r="3.1" />
      <path d="M6 18c1-2.7 3.2-4 6-4s5 1.3 6 4" />
    </BaseIcon>
  )
}

export function ShareIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="17.5" cy="6.5" r="2.2" />
      <circle cx="6.5" cy="12" r="2.2" />
      <circle cx="17.5" cy="17.5" r="2.2" />
      <path d="M8.5 11 15.4 7.3" />
      <path d="M8.5 13 15.4 16.7" />
    </BaseIcon>
  )
}

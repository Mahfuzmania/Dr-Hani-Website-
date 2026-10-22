import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react/ssr'

type SocialLabel = 'Facebook' | 'Instagram' | 'LinkedIn'
export function SocialIcon({
  label,
  className,
}: {
  label: SocialLabel
  className?: string
}) {
  const Icon =
    label === 'Facebook'
      ? FacebookLogoIcon
      : label === 'Instagram'
        ? InstagramLogoIcon
        : LinkedinLogoIcon
  return (
    <Icon
      aria-hidden="true"
      weight={label === 'Instagram' ? 'regular' : 'fill'}
      className={className ?? 'h-[1em] w-[1em]'}
    />
  )
}

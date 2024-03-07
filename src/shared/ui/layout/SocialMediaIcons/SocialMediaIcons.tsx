import { Fragment } from 'react'

import TwitterSVG from 'assets/social-twitter.svg'
import DiscordSVG from 'assets/social-discord.svg'
import LinkedinSVG from 'assets/social-linkedin.svg'
import AngellistSVG from 'assets/social-angellist.svg'
import TelegramSVG from 'assets/social-telegram.svg'
import MediumSVG from 'assets/social-medium.svg'
import GithubSVG from 'assets/social-github.svg'
import CrewSVG from 'assets/social-crew.svg'
import JoinSVG from 'assets/social-join.svg'
import Link3SVG from 'assets/social-link3.svg'
import YoutubeSVG from 'assets/social-youtube.svg'
import DefiLamaSVG from 'assets/social-defi-lama.svg'
import DuneSVG from 'assets/social-dune.svg'
import DappRadarSVG from 'assets/social-dapp-radar.svg'

import s from './SocialMediaIcons.module.scss'

const ICONS = [
  {
    key: 'Twitter',
    icon: <TwitterSVG />,
    link: 'https://twitter.com/rocifi',
  },
  {
    key: 'Discord',
    icon: <DiscordSVG />,
    link: 'https://discord.com/invite/dq7cDETKxd',
  },
  {
    key: 'Telegram',
    icon: <TelegramSVG />,
    link: 'https://t.me/RociFi',
  },
  {
    key: 'Blog',
    icon: <MediumSVG />,
    link: 'https://blog.roci.fi/',
  },
  {
    key: 'Github',
    icon: <GithubSVG />,
    link: 'https://github.com/RociFi/',
  },
  {
    key: 'Linkedin',
    icon: <LinkedinSVG />,
    link: 'https://www.linkedin.com/company/rocifi/',
  },
  {
    key: 'Angellist',
    icon: <AngellistSVG />,
    link: 'https://angel.co/company/rocifi',
  },
  {
    key: 'Crew',
    icon: <CrewSVG />,
    link: 'https://rocifi.crew3.xyz/',
  },
  {
    key: 'Join',
    icon: <JoinSVG />,
    link: 'https://join.com/companies/rocifi',
  },
  {
    key: 'Link3',
    icon: <Link3SVG />,
    link: 'https://link3.to/rocifi',
  },
  {
    key: 'youtube',
    icon: <YoutubeSVG />,
    link: 'https://www.youtube.com/channel/UC2iHLIro2LXk_sn5-Te9OUg',
  },
  {
    key: 'DefiLama',
    icon: <DefiLamaSVG />,
    link: 'https://defillama.com/protocol/rocifi-v2',
  },
  {
    key: 'Dune',
    icon: <DuneSVG />,
    link: 'https://dune.com/roci_fi',
  },
  {
    key: 'DappRadar',
    icon: <DappRadarSVG />,
    link: 'https://dappradar.com/polygon/defi/rocifi',
  },
]

export const SocialMediaIcons = () => (
  <div className={s.root}>
    {ICONS.map(({ key, icon, link }, index) => {
      return (
        <Fragment key={key}>
          <a href={link} target="_blank" rel="noreferrer">
            {icon}
          </a>
          {index !== ICONS.length - 1 && <div className={s.divider} />}
        </Fragment>
      )
    })}
  </div>
)

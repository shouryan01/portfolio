import 'react-cmdk/dist/cmdk.css'
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk'
import { useState } from 'react'
import Router from 'next/router'

const Example = ({ open, setOpen }) => {
  const [page, setPage] = useState('root')
  const [search, setSearch] = useState('')

  const filteredItems = filterItems(
    [
      {
        heading: 'General',
        id: 'home',
        items: [
          {
            id: 'email',
            children: 'Email Shouryan',
            icon: 'EnvelopeIcon',
            href: 'mailto:snnikam@umich.edu',
          },
          {
            id: 'copy',
            children: 'Copy Website URL',
            icon: 'DocumentDuplicateIcon',
            onClick: () => {
              navigator.clipboard.writeText('https://www.shouryannikam.com')
            },
          },
        ],
      },
      {
        heading: 'Navigation',
        id: 'navigation',
        items: [
          {
            id: 'home',
            children: 'Home',
            icon: 'HomeIcon',
            onClick: () => {
              Router.push('/')
            },
          },
          {
            id: 'blog',
            children: 'Blog',
            icon: 'PencilSquareIcon',
            onClick: () => {
              Router.push('/blog')
            },
          },
          {
            id: 'projects',
            children: 'Projects',
            icon: 'SparklesIcon',
            onClick: () => {
              Router.push('/projects')
            },
          },
          {
            id: 'about',
            children: 'About',
            icon: 'UserIcon',
            onClick: () => {
              Router.push('/about')
            },
          },
        ],
      },
      {
        heading: 'Social Media Links',
        id: 'socials',
        items: [
          {
            id: 'linkedin',
            children: 'LinkedIn',
            icon: 'WalletIcon',
            onClick: () => {
              setPage('root')
              window.open('https://www.linkedin.com/in/shouryannikam', '_blank')
            },
          },
          {
            id: 'github',
            children: 'GitHub',
            icon: 'CodeBracketSquareIcon',
            onClick: () => {
              setPage('root')
              window.open('https://www.github.com/shouryan01', '_blank')
            },
          },
          {
            id: 'twitter',
            children: 'Twitter',
            icon: 'RssIcon',
            onClick: () => {
              setPage('root')
              window.open('https://www.twitter.com/shouryannikam', '_blank')
            },
          },
          {
            id: 'youtube',
            children: 'YouTube',
            icon: 'VideoCameraIcon',
            onClick: () => {
              setPage('root')
              window.open('https://www.youtube.com/c/ShouryanNikam', '_blank')
            },
          },
        ],
      },
    ],
    search
  )

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={page}
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>
    </CommandPalette>
  )
}

export default Example

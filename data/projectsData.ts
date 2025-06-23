interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  github?: string
  tech1?: string
  tech2?: string
  tech3?: string
  tech4?: string
}

const projectsData: Project[] = [
  {
    title: 'Google Tasks Desktop',
    description: `Google Tasks doesn't offer a native desktop app, so I made one!`,
    imgSrc: '/static/images/projects/google-tasks.jpg',
    href: '/blog/project/google-tasks-desktop',
    github: 'https://github.com/shouryan01/Google-Tasks-Desktop',
    tech1: 'Tauri',
    tech2: 'SvelteKit',
    tech3: 'Rust',
    tech4: 'desktop',
  },
  {
    title: 'Blazor Starter Template',
    description: `Microsoft's implementation of a intro to blazor isn't very good. So I made my own!`,
    imgSrc: '/static/images/projects/blazor.png',
    href: '/blog/project/blazor-template',
    github: 'https://github.com/shouryan01/BlazorServerTemplate',
    tech1: 'C#',
    tech2: 'HTML',
    tech3: 'JavaScript',
    tech4: 'CSS',
  },
  {
    title: 'OpenCV Rock-Paper-Scissors',
    description:
      'When you really love playing rock-paper-scissors, why not make a game that can run directly in the browser!',
    imgSrc: '/static/images/projects/paper-rock-scissors.jpg',
    href: '/blog/project/opencv-rock-paper-scissors',
    github: 'https://github.com/shouryan01/opencv-rock-paper-scissors',
    tech1: 'Python',
    tech2: 'OpenCV',
    tech3: 'MediaPipe',
    tech4: 'HTML',
  },
]

export default projectsData

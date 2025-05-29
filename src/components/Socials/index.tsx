import React from 'react'
import { Github, Linkedin } from 'lucide-react'

const SocialsComponent = () => {
  return (
    <>
      <a
        href="https://github.com/jam-mar"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
        aria-label="GitHub"
      >
        <Github size={20} />
      </a>
      <a
        href="https://www.linkedin.com/in/james-marriott/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin size={20} />
      </a>
    </>
  )
}

export default SocialsComponent

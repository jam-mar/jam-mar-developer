import React from 'react'
import { Github, Linkedin, Twitter } from 'lucide-react'

const SocialsComponent = () => {
  return (
    <>
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
        aria-label="GitHub"
      >
        <Github size={20} />
      </a>
      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
        aria-label="LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      <a
        href="https://twitter.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-white transition-colors"
        aria-label="Twitter"
      >
        <Twitter size={20} />
      </a>
    </>
  )
}

export default SocialsComponent

export const DEFAULT_SECTION_IDS = ['hero', 'aboutMe', 'tech', 'work', 'projects', 'contact']

export const navItems = [
  { id: DEFAULT_SECTION_IDS[0], labelKey: 'navigation.home', isRootPageLink: true },
  { id: DEFAULT_SECTION_IDS[1], labelKey: 'navigation.about_me' },
  { id: DEFAULT_SECTION_IDS[2], labelKey: 'navigation.tech' },
  { id: DEFAULT_SECTION_IDS[3], labelKey: 'navigation.work' },
  { id: DEFAULT_SECTION_IDS[4], labelKey: 'navigation.projects' },
  { id: DEFAULT_SECTION_IDS[5], labelKey: 'navigation.contact' },
].slice(0, DEFAULT_SECTION_IDS.length)

import { execSync } from 'child_process'

function build() {
  try {
    const content = execSync('cat dist/types/index.d.ts').toString()
    const updatedContent = content.replace(/\.tsx/g, '.d.ts')
    execSync(`echo "${updatedContent}" > dist/types/index.d.ts`)
  } catch (e) {
    console.error(e)
  }
}

build()

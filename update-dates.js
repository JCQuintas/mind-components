const { statSync, readdirSync, existsSync, readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const prettier = require('prettier')
const { execSync } = require('child_process')

const run = async () => {
  const prettierConfig = await prettier.resolveConfig(join(__dirname, 'prettier.config.js'))
  const editedRegex = /(edited: ')(?<edited>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)(')/
  const createdRegex = /created: '1970-01-01T00:00:00\.000Z'/
  const emptyDateRegex = /1970-01-01T00:00:00\.000Z/g
  const blogFolder = join(__dirname, 'content', 'blog')

  const updatedFiles = readdirSync(blogFolder)
    .map(p => join(blogFolder, p))
    .filter(p => statSync(p).isDirectory())
    .map(p => join(p, 'index.md'))
    .filter(existsSync)
    .map(p => ({
      path: p,
      edited: new Date(
        parseInt(execSync(`echo "$(git log -1 --format="%ct" -- ${p})"`, { encoding: 'utf8' }), 10) * 1000
      ).toISOString(),
      reason: null,
      content: readFileSync(p, { encoding: 'utf8' }),
    }))
    .map(p => {
      if (p.content.match(createdRegex)) {
        return {
          ...p,
          reason: 'created',
          content: p.content.replace(emptyDateRegex, new Date(Math.floor(Date.now() / 1000) * 1000).toISOString()),
        }
      }

      const editedRegexExecuted = editedRegex.exec(p.content)

      if (!editedRegexExecuted) return p

      const markdownEdited = new Date(editedRegexExecuted.groups.edited).toISOString()

      if (markdownEdited !== p.edited)
        return {
          ...p,
          reason: 'edited',
          content: p.content.replace(editedRegex, `$1${p.edited}$3`),
        }

      return p
    })
    .map(e => {
      const formattedContent = prettier.format(e.content, { parser: 'markdown', ...prettierConfig })
      if (e.reason || formattedContent !== e.content) {
        writeFileSync(e.path, formattedContent)
        execSync(`git add ${e.path.replace(__dirname + '/', '')}`)
        return { ...e, reason: e.reason || 'prettier' }
      }
      return e
    })
    .filter(e => e.reason)
    .map(e => ({ ...e, path: e.path.replace(blogFolder + '/', '').replace('/index.md', '') }))

  if (updatedFiles.some(Boolean)) {
    try {
      execSync(
        `git commit -m "Automatic - Markdown post dates\n\n${updatedFiles
          .map(v => `${v.path} - ${v.reason}`)
          .join('\n')}"`
      )
    } catch (error) {
      console.log('Command failed: git commit')
    }

    try {
      execSync(`git push`)
    } catch (error) {
      console.log('Command failed: git push')
    }
  }
}

try {
  run()
} catch (error) {
  console.log(error.message)
}
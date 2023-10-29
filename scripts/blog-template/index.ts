import { capitalCase, paramCase, sentenceCase } from 'change-case'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import inquirer from 'inquirer'
import { join } from 'path'

const red = '\x1b[31m'
const reset = '\x1b[0m'
const green = '\x1b[32m'

const createDirectoryIfNotExists = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(dir)
  }
}

const BLOG_CONTENT_FOLDER = '../../public/posts'
const TITLE_REPLACE = '<TITLE>'
const DESCRIPTION_REPLACE = '<DESCRIPTION>'

const start = async () => {
  const postData = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Title for the blog post:',
      validate: Boolean,
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description:',
      default: 'No description yet!',
    },
  ])

  const directory = paramCase(postData.title)
  const directoryPath = join(__dirname, BLOG_CONTENT_FOLDER, directory)

  if (existsSync(directoryPath)) console.log(red + `A post or folder '${directory}' already exists.` + reset)

  createDirectoryIfNotExists(directoryPath)

  const file = readFileSync(join(__dirname, 'index.md'), { encoding: 'utf8' })
  await writeFileSync(
    join(directoryPath, 'index.md'),
    file
      .replace(TITLE_REPLACE, capitalCase(postData.title))
      .replace(DESCRIPTION_REPLACE, sentenceCase(postData.description))
  )

  console.log(green + '✔' + reset + ' Everything done!')
}

start()

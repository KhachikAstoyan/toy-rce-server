import fs from 'node:fs/promises'
import path from 'node:path'
import { db } from '../db'

const migrationDir = './src/db/migrations' as const

async function runMigrations() {
  try {
    const command = process.argv[2]

    const files = await fs.readdir(migrationDir)
    files.sort()

    if (command) {
      const file = files.find((file) => file.includes(command))

      if (!file) {
        console.error('Invalid Migration name')
        process.exit(1)
      }

      const filePath = path.resolve(path.join(migrationDir, file))
      const module = await import(filePath)

      console.log(`Running ${command} migration`)

      if (module.up && module.up instanceof Function) {
        module.up(db)
      }
    } else {
      files.forEach(async (file) => {
        const filePath = path.resolve(path.join(migrationDir, file))
        const module = await import(filePath)

        if (module.up && module.up instanceof Function) {
          module.up(db)
        }
      })
    }
  } catch (error) {
    console.log("Couldn't run migrations. See error below")
    console.error(error)
  }
}

runMigrations()

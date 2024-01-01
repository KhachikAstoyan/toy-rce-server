import fs from 'node:fs/promises'
import path from 'node:path'
import { db } from '../db'

const migrationDir = './src/db/migrations' as const

async function runMigrations() {
  try {
    const command = process.argv[2]

    const files = await fs.readdir(migrationDir)
    files.sort()

    console.log(__filename)

    files.forEach(async (file) => {
      const filePath = path.resolve(path.join(migrationDir, file))
      console.table({ filePath })
      const module = await import(filePath)

      if (module.up && module.up instanceof Function) {
        module.up(db)
      }
    })
  } catch (error) {
    console.log("Couldn't run migrations. See error below")
    console.error(error)
  }
}

runMigrations()

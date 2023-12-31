import fs from 'node:fs/promises'
import path from 'node:path'

const migrationFileTemplate = `
import {db} from '..';

export const up = async () => {
  await db.connect();

  // write the up migration code here
};

export const down = async () => {
  await db.connect();

  // write the down migratio code here
};
`
const migrationDir = './src/db/migrations' as const
const migrationName = process.argv[2]

if (!migrationName) {
  console.error('Please provide a migration name')
  process.exit(1)
}

async function createMigration() {
  try {
    const fileName = `${new Date().toISOString()}-${migrationName}.ts`
    const filePath = path.join(migrationDir, fileName)

    const migrationDirStats = await fs.stat(migrationDir)

    if (!migrationDirStats.isDirectory()) {
      await fs.mkdir(migrationDir)
    }

    await fs.writeFile(filePath, migrationFileTemplate, { encoding: 'utf-8' })
  } catch (error) {
    console.log("Couldn't create migration file, please see the error below")
    console.error(error)
  }
}

createMigration()
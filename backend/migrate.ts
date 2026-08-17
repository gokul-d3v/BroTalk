import fs from 'fs';
import sql from './src/config/db';

async function migrate() {
  try {
    console.log("Reading schema...");
    const schema = fs.readFileSync('schema.sql', 'utf8');
    console.log("Applying schema to database...");
    await sql.unsafe(schema);
    console.log("Migration complete!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();

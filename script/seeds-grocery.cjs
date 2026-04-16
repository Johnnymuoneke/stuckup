const { neon } = require('@neondatabase/serverless');
const cryto = require("node:crypto")

const databaseUrl = "postgresql://neondb_owner:npg_n7Pw2oAugTrE@ep-young-waterfall-angtftw0-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

if (!databaseUrl) {
    throw new Error("DATABASE_URL is required. Example: DATABASE_URL=... npm run seed:grocery");
}

const sql = neon(databaseUrl)

const seedItems = [
    { name: 'bananas', category: 'produce', quantity: 6, priority: 'medim', purchased: false },
    { name: 'Avacado', category: 'produce', quantity: 3, priority: 'high', purchased: false },
    { name: 'Greek Yogurt', category: 'Dairy', quantity: 2, priority: 'medium', purchased: true },
    { name: 'Cheddar Cheese', category: 'Dairy', quantity: 1, priority: 'low', purchased: false },
    { name: 'Sourdough Bread', category: 'Bakery', quantity: 1, priority: 'high', purchased: false },
    { name: 'pasta', category: 'Pantry', quantity: 2, priority: 'low', purchased: false },
    { name: 'tomato sauce', category: 'pantry', quantity: 2, priority: 'medium', purchased: true },
    { name: 'Granola Bars', category: 'Snack', quantity: 5, priority: 'medium', purchased: false },
    { name: 'Dark Chocolate', category: 'Snack', quantity: 2, priority: 'low', purchased: false },
    { name: 'Eggs', category: 'Dairy', quantity: 12, priority: 'high', purchased: false },
]

async function seed() {
    await sql`
       CREATE TABLE IF NOT EXISTS grocery_items(
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        purchased BOOLEAN NOT NULL DEFAULT FALSE,
        priority TEXT NOT NULL DEFAULT "medium",
        updated_at BIGINT NOT NULL
       )
    `

    for (const item of seedItems) {
        await sql`
         INSERT INTO grocery_items(id, name, category, quantity, purchased, priority, updated_at)
        VALUES(
            ${crypto.randomUUID()},
            ${item.name},
            ${item.category},
            ${item.quantity},
            ${item.purchased},
            ${item.priority},
            ${Date.now()}
        )
        `
    }
    console.log(`seed complete: inserted ${seedItems.length} grocery items.`)
}

seed().catch((error)=>{
    console.error("Seed failed:", error);
    process.exit(1)
})
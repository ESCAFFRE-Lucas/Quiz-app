import path from "path";
import * as fs from "node:fs";

const isProduction = process.env.VERCEL === '1' ||
    process.env.VERCEL_ENV === 'production' ||
    process.env.NODE_ENV === 'production';

const schemaFile = isProduction ? 'schema.prod.prisma' : 'schema.local.prisma';

const sourcePath = path.join(__dirname, '..', 'prisma', schemaFile);
const destPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Schema file not found: ${schemaFile}`);
    process.exit(1);
}

fs.copyFileSync(sourcePath, destPath);
console.log(`✅ Using ${schemaFile} (Production: ${isProduction})`);
console.log(`📊 Environment - VERCEL: ${process.env.VERCEL}, VERCEL_ENV: ${process.env.VERCEL_ENV}, NODE_ENV: ${process.env.NODE_ENV}`);
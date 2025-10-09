import path from "node:path";
import * as fs from "node:fs";

const env = process.env.NODE_ENV || 'development';
const schemaFile = env === 'production' ? 'schema.prod.prisma' : 'schema.local.prisma';

const sourcePath = path.join(__dirname, '..', 'prisma', schemaFile);
const destPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

fs.copyFileSync(sourcePath, destPath);
console.log(`✅ Copied ${schemaFile} to schema.prisma`);

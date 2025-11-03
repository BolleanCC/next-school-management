import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDuplicates() {
    console.log('🔍 Checking for duplicate attendance records...\n');

    const duplicates = await prisma.$queryRaw<Array<{
        date: Date;
        lessonId: number;
        studentId: string;
        count: bigint;
    }>>`
        SELECT 
            date, 
            "lessonId", 
            "studentId", 
            COUNT(*) as count
        FROM "Attendance"
        GROUP BY date, "lessonId", "studentId"
        HAVING COUNT(*) > 1
    `;

    if (duplicates.length === 0) {
        console.log('✅ No duplicate records found! Safe to proceed with migration.\n');
        return true;
    }

    console.log(`⚠️  Found ${duplicates.length} duplicate record group(s):\n`);

    for (const dup of duplicates) {
        console.log(`Date: ${dup.date.toISOString().split('T')[0]}`);
        console.log(`Lesson ID: ${dup.lessonId}`);
        console.log(`Student ID: ${dup.studentId}`);
        console.log(`Count: ${dup.count.toString()}`);
        console.log('---');
    }

    console.log('\n⚠️  You need to clean up duplicates before adding unique constraint!');
    console.log('Run: npm run clean-attendance-duplicates\n');

    return false;
}

checkDuplicates()
    .then(() => {
        prisma.$disconnect();
    })
    .catch((error) => {
        console.error('Error:', error);
        prisma.$disconnect();
        process.exit(1);
    });


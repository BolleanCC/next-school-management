import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanDuplicates() {
    console.log('🧹 Cleaning duplicate attendance records...\n');

    // Find all duplicate groups
    const duplicates = await prisma.$queryRaw<Array<{
        date: Date;
        lessonId: number;
        studentId: string;
    }>>`
        SELECT 
            date, 
            "lessonId", 
            "studentId"
        FROM "Attendance"
        GROUP BY date, "lessonId", "studentId"
        HAVING COUNT(*) > 1
    `;

    if (duplicates.length === 0) {
        console.log('✅ No duplicates found.\n');
        return;
    }

    console.log(`Found ${duplicates.length} duplicate group(s). Cleaning...\n`);

    let totalDeleted = 0;

    for (const dup of duplicates) {
        // Get all records in this duplicate group
        const records = await prisma.attendance.findMany({
            where: {
                date: dup.date,
                lessonId: dup.lessonId,
                studentId: dup.studentId,
            },
            orderBy: { id: 'asc' }, // Keep the oldest record
        });

        if (records.length <= 1) continue;

        // Delete all except the first one
        const toDelete = records.slice(1);

        for (const record of toDelete) {
            await prisma.attendance.delete({
                where: { id: record.id }
            });
            totalDeleted++;
            console.log(`  Deleted duplicate: ID ${record.id}`);
        }

        console.log(`  Kept record ID ${records[0].id} for ${dup.studentId} on ${dup.date.toISOString().split('T')[0]}`);
    }

    console.log(`\n✅ Cleaned up ${totalDeleted} duplicate record(s).\n`);
}

cleanDuplicates()
    .then(() => {
        prisma.$disconnect();
    })
    .catch((error) => {
        console.error('Error:', error);
        prisma.$disconnect();
        process.exit(1);
    });


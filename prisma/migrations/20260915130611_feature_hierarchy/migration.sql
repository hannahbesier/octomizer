-- AlterTable
ALTER TABLE "Feature" ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Feature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

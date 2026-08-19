-- DropIndex
DROP INDEX "Income_work_session_id_key";

-- AlterTable
ALTER TABLE "WorkSession" ALTER COLUMN "started_at" SET DEFAULT CURRENT_TIMESTAMP;

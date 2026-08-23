import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

const motorComponents = [
  {
    name: "Oli Mesin",
    default_interval_km: 3000,
    default_interval_month: 3,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Filter Oli",
    default_interval_km: 6000,
    default_interval_month: 6,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Filter Udara",
    default_interval_km: 12000,
    default_interval_month: 12,
    is_critical: false,
    is_active: true,
  },
  {
    name: "Busi",
    default_interval_km: 12000,
    default_interval_month: 12,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Minyak Rem",
    default_interval_km: 24000,
    default_interval_month: 24,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Kampas Rem Depan",
    default_interval_km: 10000,
    default_interval_month: 12,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Kampas Rem Belakang",
    default_interval_km: 10000,
    default_interval_month: 12,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Rantai",
    default_interval_km: 500,
    default_interval_month: 1,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Set Gear dan Rantai",
    default_interval_km: 20000,
    default_interval_month: 24,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Cairan Pendingin",
    default_interval_km: 24000,
    default_interval_month: 24,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Aki",
    default_interval_km: 24000,
    default_interval_month: 24,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Ban Depan",
    default_interval_km: 20000,
    default_interval_month: 36,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Ban Belakang",
    default_interval_km: 15000,
    default_interval_month: 36,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Cakram Rem Depan",
    default_interval_km: 40000,
    default_interval_month: 48,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Cakram Rem Belakang",
    default_interval_km: 40000,
    default_interval_month: 48,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Kabel Kopling",
    default_interval_km: 12000,
    default_interval_month: 12,
    is_critical: false,
    is_active: true,
  },
  {
    name: "Kabel Gas",
    default_interval_km: 12000,
    default_interval_month: 12,
    is_critical: true,
    is_active: true,
  },
  {
    name: "V-Belt CVT",
    default_interval_km: 20000,
    default_interval_month: 24,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Roller CVT",
    default_interval_km: 12000,
    default_interval_month: 12,
    is_critical: false,
    is_active: true,
  },
  {
    name: "Oli Shockbreaker",
    default_interval_km: 24000,
    default_interval_month: 24,
    is_critical: false,
    is_active: true,
  },
  {
    name: "Laher Kemudi",
    default_interval_km: 24000,
    default_interval_month: 24,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Laher Roda",
    default_interval_km: 24000,
    default_interval_month: 24,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Servis Kaliper Rem",
    default_interval_km: 12000,
    default_interval_month: 12,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Setelan Klep",
    default_interval_km: 24000,
    default_interval_month: 24,
    is_critical: true,
    is_active: true,
  },
  {
    name: "Filter Bensin",
    default_interval_km: 24000,
    default_interval_month: 24,
    is_critical: false,
    is_active: true,
  },
  {
    name: "Pembersihan Injektor",
    default_interval_km: 12000,
    default_interval_month: 12,
    is_critical: false,
    is_active: true,
  },
  {
    name: "Pembersihan Throttle Body",
    default_interval_km: 12000,
    default_interval_month: 12,
    is_critical: false,
    is_active: true,
  },
  {
    name: "Oli Gardan",
    default_interval_km: 12000,
    default_interval_month: 12,
    is_critical: true,
    is_active: true,
  },
];

const user = {
  username: "initfan",
  email: "fan@mail.com",
  password: bcrypt.hashSync("12345678", 10),
};

const motor = {
  brand: "Honda Kentang",
  model: "Vario 160",
  year: "2023",
  police_number: "B 5678 ABC",
  kilometers: 12500,
};

async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: user,
    });
    await tx.motorcycle.create({
      data: { ...motor, user_id: 1 },
    });
    await tx.maintenanceComponent.createMany({
      data: motorComponents,
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seeding...")

  // 1. Create Subjects
  const subjects = await prisma.subject.createMany({
    data: [
      { name: "Mathematics", category: "STEM" },
      { name: "English", category: "Languages" },
      { name: "Physics", category: "STEM" },
    ],
    skipDuplicates: true, // prevents duplicates if seed runs multiple times
  })

  console.log("✅ Subjects created")

  // 2. Create a Student User
  const studentUser = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "hashed_password", // store hashed in production
      role: "STUDENT",
      profileImg: "https://i.pravatar.cc/150?img=1",
      studentProfile: {
        create: {
          goals: "Improve problem solving in math",
          preferredSubjects: ["Mathematics", "Physics"],
        },
      },
    },
    include: { studentProfile: true },
  })

  console.log("✅ Student created:", studentUser.email)

  // 3. Create a Tutor User
  const tutorUser = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "hashed_password",
      role: "TUTOR",
      profileImg: "https://i.pravatar.cc/150?img=2",
      tutorProfile: {
        create: {
          bio: "Experienced tutor in Math and Physics",
          hourlyRate: 25,
          languages: ["English"],
          ratingAvg: 4.8,
          totalLessons: 0,
        },
      },
    },
    include: { tutorProfile: true },
  })

  console.log("✅ Tutor created:", tutorUser.email)

  // 4. Link Tutor to Subjects
  const math = await prisma.subject.findFirst({ where: { name: "Mathematics" } })
  const physics = await prisma.subject.findFirst({ where: { name: "Physics" } })

  await prisma.tutorSubject.createMany({
    data: [
      { tutorId: tutorUser.tutorProfile.id, subjectId: math.id },
      { tutorId: tutorUser.tutorProfile.id, subjectId: physics.id },
    ],
  })

  console.log("✅ Tutor subjects linked")

  // 5. Add Tutor Availability
  await prisma.availability.createMany({
    data: [
      {
        tutorId: tutorUser.tutorProfile.id,
        dayOfWeek: "Monday",
        startTime: "10:00",
        endTime: "12:00",
        isRecurring: true,
      },
      {
        tutorId: tutorUser.tutorProfile.id,
        dayOfWeek: "Wednesday",
        startTime: "14:00",
        endTime: "16:00",
        isRecurring: true,
      },
    ],
  })

  console.log("✅ Tutor availability added")

  // 6. Create a Lesson
  const lesson = await prisma.lesson.create({
    data: {
      studentId: studentUser.studentProfile.id,
      tutorId: tutorUser.tutorProfile.id,
      subjectId: math.id,
      date: new Date("2025-09-01T10:00:00Z"),
      startTime: "10:00",
      endTime: "11:00",
      status: "COMPLETED",
      price: 25,
    },
  })

  console.log("✅ Lesson created:", lesson.id)

  // 7. Add Review for Lesson
  await prisma.review.create({
    data: {
      lessonId: lesson.id,
      studentId: studentUser.studentProfile.id,
      tutorId: tutorUser.tutorProfile.id,
      rating: 5,
      comment: "Great tutor! Explained concepts clearly.",
    },
  })

  console.log("✅ Review created")

  // 8. Add Payment Record
  await prisma.payment.create({
    data: {
      lessonId: lesson.id,
      amount: 25,
      method: "Credit Card",
      status: "PAID",
      paidAt: new Date(),
    },
  })

  console.log("✅ Payment recorded")

  console.log("🌱 Seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
})

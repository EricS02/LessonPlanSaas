import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import Plan from "@/components/Plan";
import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";
import React from "react";
import { LessonPlan, Section } from "@prisma/client";

const logger = {
  info: console.log,
  error: console.error,
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  logger.info("Fetching user session.");

  const { getUser } = getKindeServerSession();
  let user;

  try {
    user = await getUser();
    logger.info("User fetched successfully.");
  } catch (error) {
    logger.error("Error fetching user session:", error);
    redirect("/");
    return;
  }
  if (!user) {
    console.warn("User not found, redirecting to home.");
    redirect("/");
    return; // Ensure early return after redirect
  }

  logger.info(`Fetching lesson plan for user ID: ${user.id} and lesson plan ID: ${id}`);

  let lessonPlan;
  
  try {
    lessonPlan = await prisma.lessonPlan.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
      include: {
        sections: true,
      },
    });
    logger.info("Lesson plan fetched successfully.");
  } catch (error) {
    logger.error("Error fetching lesson plan:", error);
    return notFound(); // You may also want to return an error page or log this
  }
  if (!lessonPlan) {
    logger.error(`Lesson plan not found for ID: ${id}`);
    return notFound();
  }

  logger.info("Lesson plan data:", lessonPlan);

  return (
    <MaxWidthWrapper>
      <Plan lessonPlan={lessonPlan as LessonPlan & { sections: Section[] }} />
    </MaxWidthWrapper>
  );
}

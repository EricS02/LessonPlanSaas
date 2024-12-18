import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import prisma from "@/lib/prisma";
import Dashboard from "@/components/common/dashboard";
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
} from "@/utils/stripe";
import { hasSubscription } from "@/utils/stripe";

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  await createCustomerIfNull();

  if (!user) {
    redirect("/");
  }

  const userData = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
    select: {
      lessonPlans: true,
      stripe_customer_id: true,
    },
  });

  if (!userData) {
    redirect("/");
  }

  const subscribed = await hasSubscription();
  const manage_link = await generateCustomerPortalLink(
    "" + userData.stripe_customer_id
  );
  const checkoutLink = await createCheckoutLink(
    "" + userData?.stripe_customer_id
  );

  return (
    <MaxWidthWrapper className="py-8 md:py-20">
      <Dashboard lessonPlans={userData.lessonPlans}
        subscribed={subscribed.isSubscribed}
        manage_link={manage_link || ""}
        checkout_link={checkoutLink || ""}
      />
    </MaxWidthWrapper>
  );
};

export default page;

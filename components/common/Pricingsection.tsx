import { tiers } from "@/constants"
import MaxWidthWrapper from "./MaxWidthWrapper"
import PricingCard from "./PricingCard"

const Pricingsection = () => {
  return (
    <MaxWidthWrapper>
        <div className="py-20">
            <h2 className="text-3xl font-bold text-center mb-12">
                Choose your plan
            </h2>
            <p className="text-gray-500 text-sm">
                Please make sure you are signed in before buying a pro plan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 wax-w-4xl mx-auto mt-8">
                {tiers.map((tier, index) => (
                    <PricingCard tier={tier} key={index} index={index}/>

                ))}
            </div>
        </div>
    </MaxWidthWrapper>
  )
}

export default Pricingsection
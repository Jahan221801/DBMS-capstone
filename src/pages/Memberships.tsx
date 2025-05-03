
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Check, Info, Plus } from "lucide-react";

const MembershipPlans = [
  {
    id: 1,
    name: "Elite",
    price: 4999,
    duration: "Monthly",
    color: "bg-membership-elite",
    features: [
      "Access to all equipment and facilities",
      "Unlimited access to group classes",
      "Personal training session (2 per month)",
      "Access to sauna and spa facilities",
      "Priority booking for special events",
      "Nutrition consultation"
    ]
  },
  {
    id: 2,
    name: "Premium",
    price: 3499,
    duration: "Monthly",
    color: "bg-membership-premium",
    features: [
      "Access to all equipment and facilities",
      "Unlimited access to group classes",
      "Personal training session (1 per month)",
      "Access to sauna facilities",
      "Regular booking for special events"
    ]
  },
  {
    id: 3,
    name: "Basic",
    price: 1999,
    duration: "Monthly",
    color: "bg-membership-basic",
    features: [
      "Access to all equipment and facilities",
      "Limited access to group classes (3 per week)",
      "No personal training included",
      "Regular booking for special events"
    ]
  },
  {
    id: 4,
    name: "Annual Premium",
    price: 36999,
    duration: "Yearly",
    color: "bg-membership-annual",
    features: [
      "All Premium features",
      "Two months free (compared to monthly)",
      "Exclusive annual member events",
      "Free branded gym merchandise",
      "Bring a friend pass (3 per month)"
    ]
  },
  {
    id: 5,
    name: "Annual Basic",
    price: 19999,
    duration: "Yearly",
    color: "bg-membership-annual",
    features: [
      "All Basic features",
      "Two months free (compared to monthly)",
      "Discounted access to specialty classes",
      "Free branded gym merchandise"
    ]
  }
];

const Memberships = () => {
  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Memberships</h1>
          <p className="text-muted-foreground">Manage membership plans and subscriptions</p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MembershipPlans.map((plan) => (
          <Card key={plan.id} className="overflow-hidden">
            <div className={`${plan.color} h-2`} />
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{plan.name}</span>
                <span>₹{plan.price}</span>
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" />
                {plan.duration} plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-6">
                <Button variant="outline" size="sm">
                  <Info className="h-4 w-4 mr-2" />
                  Details
                </Button>
                <Button size="sm">Assign to Member</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
};

export default Memberships;

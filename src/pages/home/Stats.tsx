import { DollarSign, Globe, TrendingUp, Users } from "lucide-react";

const Stats = () => {
  const stats = [
    { value: "2M+", label: "Active Users", icon: Users },
    { value: "$50B+", label: "Transactions Processed", icon: DollarSign },
    { value: "180+", label: "Countries Supported", icon: Globe },
    { value: "99.9%", label: "Uptime Guarantee", icon: TrendingUp },
  ];
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex flex-col justify-center items-center gap-5 text-h1 mb-2">
                <div className="bg-gray-500 w-15 h-15 m-0 b-0 rounded-xl text-white ">
                  <stat.icon className="w-10 h-10 mx-auto my-2.5" />
                </div>
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

import Link from "next/link";
import { Camera, Sparkles, BarChart3, Leaf, ArrowRight, ChefHat, Recycle } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Camera,
      title: "Scan Ingredients",
      description: "Use AI-powered image recognition to instantly identify ingredients from your fridge or pantry.",
      color: "from-[#8b5cf6] to-[#7c3aed]",
    },
    {
      icon: Sparkles,
      title: "Smart Recipes",
      description: "Get personalized recipe suggestions based on ingredients you already have at home.",
      color: "from-[#3b82f6] to-[#2563eb]",
    },
    {
      icon: BarChart3,
      title: "Track Usage",
      description: "Monitor your food consumption patterns and reduce waste with smart insights.",
      color: "from-[#06b6d4] to-[#0891b2]",
    },
  ];

  const stats = [
    { value: "1.3B", label: "Tons of food wasted yearly" },
    { value: "30%", label: "Of all food produced is wasted" },
    { value: "$1T", label: "Economic loss annually" },
  ];

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/10 via-transparent to-[#3b82f6]/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#8b5cf6]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3b82f6]/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e1e2e] border border-[#2e2e3e] mb-8">
              <Leaf className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-sm text-[#a1a1aa]">Sustainable Kitchen Solutions</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Reduce Food Waste with{" "}
              <span className="gradient-text">AI-Powered</span>
              <br />
              Smart Cooking
            </h1>

            <p className="text-lg sm:text-xl text-[#a1a1aa] max-w-2xl mx-auto mb-10">
              Scan your ingredients, discover delicious recipes, and make every meal count.
              Join the movement towards a sustainable kitchen.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/scan"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-[#8b5cf6]/25 transition-all duration-300"
              >
                Start Scanning
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/recipes"
                className="flex items-center gap-2 px-8 py-4 rounded-full border border-[#2e2e3e] text-white font-semibold hover:bg-[#1e1e2e] transition-all duration-300"
              >
                <ChefHat className="w-5 h-5" />
                Browse Recipes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-[#1e1e2e] bg-[#111118]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <p className="text-[#71717a]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-[#a1a1aa] max-w-2xl mx-auto">
              Three simple steps to transform your kitchen into a zero-waste zone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-[#111118] border border-[#1e1e2e] card-hover"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-[#71717a] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#3b82f6]/20 border border-[#2e2e3e] p-12 lg:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#8b5cf6]/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3b82f6]/30 rounded-full blur-3xl" />

            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8b5cf6]/20 border border-[#8b5cf6]/30 mb-4">
                  <Recycle className="w-4 h-4 text-[#8b5cf6]" />
                  <span className="text-sm text-[#8b5cf6]">Join the Movement</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to reduce your food waste?
                </h2>
                <p className="text-[#a1a1aa] max-w-lg">
                  Start scanning your ingredients today and discover how easy sustainable cooking can be.
                </p>
              </div>
              <Link
                href="/scan"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#0a0a0f] font-semibold hover:bg-[#e5e5e5] transition-all duration-300 shrink-0"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

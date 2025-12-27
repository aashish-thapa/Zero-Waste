import Link from "next/link";
import { Clock, Users, ChefHat, ArrowRight, Sparkles, Search } from "lucide-react";

export default function RecipesPage() {
  const featuredRecipes = [
    {
      id: 1,
      title: "Mediterranean Veggie Bowl",
      description: "A colorful and nutritious bowl packed with fresh vegetables and herbs",
      time: "25 min",
      servings: 2,
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      tags: ["Vegetarian", "Healthy"],
    },
    {
      id: 2,
      title: "Leftover Pasta Frittata",
      description: "Transform yesterday's pasta into a delicious Italian-style egg dish",
      time: "20 min",
      servings: 4,
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
      tags: ["Zero-Waste", "Quick"],
    },
    {
      id: 3,
      title: "Veggie Stir Fry",
      description: "Quick and easy stir fry using any vegetables you have on hand",
      time: "15 min",
      servings: 3,
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&h=300&fit=crop",
      tags: ["Quick", "Versatile"],
    },
    {
      id: 4,
      title: "Banana Bread",
      description: "Perfect way to use overripe bananas - moist and delicious",
      time: "60 min",
      servings: 8,
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1605090930608-f6a88c5abe7a?w=400&h=300&fit=crop",
      tags: ["Zero-Waste", "Dessert"],
    },
    {
      id: 5,
      title: "Vegetable Soup",
      description: "Hearty soup made from any leftover vegetables in your fridge",
      time: "40 min",
      servings: 6,
      difficulty: "Easy",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
      tags: ["Zero-Waste", "Comfort"],
    },
    {
      id: 6,
      title: "Rice Paper Rolls",
      description: "Fresh and light rolls with whatever veggies you have available",
      time: "30 min",
      servings: 4,
      difficulty: "Medium",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop",
      tags: ["Healthy", "Light"],
    },
  ];

  const categories = [
    { name: "Zero-Waste", count: 24 },
    { name: "Quick & Easy", count: 18 },
    { name: "Vegetarian", count: 32 },
    { name: "Comfort Food", count: 15 },
    { name: "Healthy", count: 28 },
    { name: "Desserts", count: 12 },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Discover <span className="gradient-text">Recipes</span>
          </h1>
          <p className="text-[#a1a1aa] max-w-2xl mx-auto mb-8">
            Browse our collection of delicious recipes designed to help you minimize food waste
            and make the most of your ingredients.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71717a]" />
            <input
              type="text"
              placeholder="Search recipes by name or ingredient..."
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#111118] border border-[#1e1e2e] text-white placeholder-[#71717a] focus:outline-none focus:border-[#8b5cf6] transition-colors"
            />
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-[#8b5cf6]/20 to-[#3b82f6]/20 border border-[#2e2e3e]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6]">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Have ingredients at home?</h3>
                <p className="text-sm text-[#a1a1aa]">
                  Scan them and get personalized recipe suggestions
                </p>
              </div>
            </div>
            <Link
              href="/scan"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0a0a0f] font-medium hover:bg-[#e5e5e5] transition-all shrink-0"
            >
              Scan Ingredients
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                className="px-4 py-2 rounded-full bg-[#111118] border border-[#1e1e2e] text-[#a1a1aa] hover:text-white hover:border-[#8b5cf6] transition-all"
              >
                {category.name}
                <span className="ml-2 text-sm text-[#71717a]">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Featured Recipes</h2>
            <button className="text-[#8b5cf6] hover:text-[#7c3aed] transition-colors">
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="group rounded-2xl bg-[#111118] border border-[#1e1e2e] overflow-hidden card-hover cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    {recipe.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-[#0a0a0f]/80 backdrop-blur-sm text-xs text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-white mb-2 group-hover:text-[#8b5cf6] transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-sm text-[#71717a] mb-4 line-clamp-2">
                    {recipe.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-[#a1a1aa]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recipe.servings} servings
                    </div>
                    <div className="flex items-center gap-1">
                      <ChefHat className="w-4 h-4" />
                      {recipe.difficulty}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="rounded-2xl bg-[#111118] border border-[#1e1e2e] p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Zero-Waste <span className="gradient-text">Cooking Tips</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-xl bg-[#8b5cf6]/10 mb-4">
                <span className="text-2xl">🥕</span>
              </div>
              <h3 className="font-semibold mb-2">Use Everything</h3>
              <p className="text-sm text-[#71717a]">
                Vegetable scraps make great stock. Save them in the freezer!
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-xl bg-[#3b82f6]/10 mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="font-semibold mb-2">Store Smart</h3>
              <p className="text-sm text-[#71717a]">
                Proper storage extends the life of your ingredients significantly.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-xl bg-[#06b6d4]/10 mb-4">
                <span className="text-2xl">🍳</span>
              </div>
              <h3 className="font-semibold mb-2">Plan Ahead</h3>
              <p className="text-sm text-[#71717a]">
                Check what you have before shopping to avoid duplicate purchases.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

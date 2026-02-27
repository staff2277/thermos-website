"use client";

import { useState } from "react";
import { ModernCard, Section } from "@/components/ui/ModernCard";
import { Star, ThumbsUp, Filter, MessageSquareQuote } from "lucide-react";

// Mock Data
const MOCK_REVIEWS = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  author: ["Sarah Jenkins", "Michael T.", "Alex R.", "Emma W."][i % 4],
  rating: [5, 5, 4, 5][i % 4],
  date: "October 12, 2023",
  verified: true,
  title: [
    "Game Changer",
    "Stays Hot ALL DAY",
    "Sleek and Smart",
    "Worth Every Penny",
  ][i % 4],
  content:
    "I honestly didn't think a water bottle could be this impressive. The temperature control is flawless, but what really surprised me was the app integration. It actually reminds me to drink without being annoying.",
  likes: Math.floor(Math.random() * 50),
}));

export default function ReviewsPage() {
  const [filterRating, setFilterRating] = useState(0);

  const displayReviews =
    filterRating === 0
      ? MOCK_REVIEWS
      : MOCK_REVIEWS.filter((r) => r.rating === filterRating);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Section className="py-0 md:py-0">
        {/* Header Area */}
        <div className="text-center mb-16">
          <MessageSquareQuote className="w-16 h-16 mx-auto mb-6 text-brand-green/50" />
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Real Talk.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Hear what 10,000+ daily drinkers
            have to say about the THERMOS experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Summary & Filters Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <ModernCard className="p-8 sticky top-32">
              <div className="text-center pb-8 border-b border-white/10 mb-8">
                <div className="text-6xl font-black mb-2">4.9</div>
                <div className="flex justify-center text-brand-green mb-2">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-widest font-bold">
                  10,204 Reviews
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm uppercase tracking-widest font-semibold flex items-center mb-6">
                  <Filter className="w-4 h-4 mr-2" /> Filter By Rating
                </h3>

                <button
                  onClick={() => setFilterRating(0)}
                  className={`w-full text-left flex justify-between items-center text-sm font-medium ${filterRating === 0 ? "text-brand-green" : "text-gray-400 hover:text-white"}`}
                >
                  <span>All Reviews</span>
                  <span>(10K+)</span>
                </button>

                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={`filter-${rating}`}
                    onClick={() => setFilterRating(rating)}
                    className={`w-full flex items-center group transition-colors ${filterRating === rating ? "text-brand-green" : "text-gray-400 hover:text-white"}`}
                  >
                    <span className="w-4">{rating}</span>
                    <Star
                      className={`w-3 h-3 ml-1 mr-3 ${filterRating === rating ? "fill-current" : ""}`}
                    />

                    {/* Mock Progress Bar */}
                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-brand-green transition-all duration-500 ${filterRating === rating ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`}
                        style={{
                          width: `${rating === 5 ? 85 : rating === 4 ? 12 : rating === 3 ? 2 : 1}%`,
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </ModernCard>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3 space-y-6">
            {displayReviews.map((review) => (
              <ModernCard key={review.id} className="p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold flex items-center">
                        {review.author}
                        {review.verified && (
                          <span className="ml-2 text-[10px] bg-brand-green/20 text-brand-green uppercase tracking-widest px-2 py-0.5 rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {review.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex text-brand-green">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-white/10"}`}
                      />
                    ))}
                  </div>
                </div>

                <h4 className="text-xl font-bold mb-3">{review.title}</h4>
                <p className="text-gray-400 leading-relaxed mb-6">
                  {review.content}
                </p>

                <div className="flex items-center space-x-2 text-sm text-gray-500 hover:text-white transition-colors cursor-pointer w-max">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.likes})</span>
                </div>
              </ModernCard>
            ))}

            <div className="pt-12 flex justify-center">
              <button className="text-brand-green hover:text-white font-bold uppercase tracking-widest text-sm transition-colors border-b border-brand-green pb-1">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

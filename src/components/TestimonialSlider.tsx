import React, { useState, useEffect } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, Cog } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Testimonial {
 id: number;
 name: string;
 role: string;
 organization: string;
 content: string;
 rating: number;
 category: 'parent' | 'publisher' | 'ai-client';
}

const TestimonialSlider = () => {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [isAutoPlaying, setIsAutoPlaying] = useState(true);

 const testimonials: Testimonial[] = [
 {
 id: 1,
 name: "Sarah Mitchell",
 role: "Parent & Librarian",
 organization: "Westfield Elementary",
 content: "Plumberella is a delightful twist on classic fairy tales! My daughter loves the strong female protagonist who solves problems with her tools rather than waiting to be rescued. Nika's storytelling brings both humor and heart to every page.",
 rating: 5,
 category: 'parent'
 },
 {
 id: 2,
 name: "Dr. James Chen",
 role: "CTO",
 organization: "TechEd Solutions",
 content: "Nika's AI workshops transformed how our team thinks about implementing ethical AI. Her custom GPT for our educational platform perfectly balances innovation with child safety. Her expertise bridges the gap between technical excellence and practical application.",
 rating: 5,
 category: 'ai-client'
 },
 {
 id: 3,
 name: "Maria Rodriguez",
 role: "Publishing Director",
 organization: "Children's Literary Guild",
 content: "Working with Nika has been exceptional. Her unique voice combines whimsical storytelling with meaningful themes. The steampunk fairy tale genre she's pioneering resonates with both children and adults - a rare talent in children's literature.",
 rating: 5,
 category: 'publisher'
 },
 {
 id: 4,
 name: "Emily Thompson",
 role: "Mother of Three",
 organization: "Homeschool Educator",
 content: "My children are obsessed with Plumberella! They've started building their own 'inventions' after reading about her creative problem-solving. Nika's stories inspire creativity and confidence in young minds.",
 rating: 5,
 category: 'parent'
 },
 {
 id: 5,
 name: "David Park",
 role: "AI Strategy Lead",
 organization: "Future Learning Institute",
 content: "Nika's approach to AI consulting is refreshingly thoughtful. She helped us develop policies that protect students while embracing innovation. Her storytelling background gives her a unique perspective on human-AI interaction.",
 rating: 5,
 category: 'ai-client'
 }
 ];

 useEffect(() => {
 if (!isAutoPlaying) return;

 const interval = setInterval(() => {
 setCurrentIndex((prev) => (prev + 1) % testimonials.length);
 }, 5000);

 return () => clearInterval(interval);
 }, [isAutoPlaying, testimonials.length]);

 const goToNext = () => {
 setCurrentIndex((prev) => (prev + 1) % testimonials.length);
 setIsAutoPlaying(false);
 };

 const goToPrevious = () => {
 setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
 setIsAutoPlaying(false);
 };

 const goToSlide = (index: number) => {
 setCurrentIndex(index);
 setIsAutoPlaying(false);
 };

 const getCategoryColor = (category: string) => {
 switch (category) {
 case 'parent': return 'text-brass';
 case 'publisher': return 'text-oxidized-teal';
 case 'ai-client': return 'text-brass-dark';
 default: return 'text-brass';
 }
 };

 const getCategoryLabel = (category: string) => {
 switch (category) {
 case 'parent': return 'Parent';
 case 'publisher': return 'Publisher';
 case 'ai-client': return 'AI Client';
 default: return '';
 }
 };

 const currentTestimonial = testimonials[currentIndex];

 return (
 <section className="py-6 md:py-10 px-6 bg-gradient-to-r from-oxidized-teal/10 to-brass/10 relative overflow-hidden">
 {/* Background gears */}
 <div className="absolute inset-0 pointer-events-none">
 <Cog className="absolute top-10 left-10 w-24 h-24 text-brass/5 animate-spin" style={{ animationDuration: '15s' }} />
 <Cog className="absolute bottom-10 right-10 w-32 h-32 text-oxidized-teal/5 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
 </div>

 <div className="container mx-auto relative z-10">
 <div className="text-center mb-12">
 <h2 className="text-4xl font-bold text-oxidized-teal mb-4 font-playfair drop-shadow-text-drop">
 What People Say
 </h2>
 <p className="text-oxidized-teal/80 text-lg ">
 Testimonials from parents, publishers, and AI pilot clients
 </p>
 </div>

 <div className="max-w-[1080px] mx-auto relative">
 <Card className="bg-parchment/90 border-2 border-brass shadow-brass-drop min-h-[300px] relative overflow-hidden">
 {/* Decorative quote */}
 <Quote className="absolute top-6 left-6 w-12 h-12 text-brass/20" />
 
 <CardContent className="p-8 pt-16">
 <div className="text-center mb-6">
 <div className="flex justify-center mb-2">
 {[...Array(currentTestimonial.rating)].map((_, i) => (
 <Star key={i} className="w-5 h-5 text-brass fill-current" />
 ))}
 </div>
 <span className={`text-sm font-medium px-3 py-1 rounded-full bg-white/50 ${getCategoryColor(currentTestimonial.category)}`}>
 {getCategoryLabel(currentTestimonial.category)}
 </span>
 </div>
 
 <blockquote className="text-oxidized-teal text-lg text-center mb-6 leading-relaxed italic">
 "{currentTestimonial.content}"
 </blockquote>
 
 <div className="text-center">
 <div className="font-semibold text-oxidized-teal ">{currentTestimonial.name}</div>
 <div className="text-brass font-medium ">{currentTestimonial.role}</div>
 <div className="text-oxidized-teal/70 text-sm ">{currentTestimonial.organization}</div>
 </div>
 </CardContent>
 </Card>

 {/* Navigation */}
 <div className="flex items-center justify-between mt-6">
 <Button
 variant="outline"
 size="sm"
 onClick={goToPrevious}
 className="border-brass text-brass hover:bg-brass/10"
 >
 <ChevronLeft className="w-4 h-4" />
 </Button>

 {/* Dots indicator */}
 <div className="flex gap-2">
 {testimonials.map((_, index) => (
 <button
 key={index}
 onClick={() => goToSlide(index)}
 className={`w-3 h-3 rounded-full transition-all duration-300 ${
 index === currentIndex 
 ? 'bg-brass scale-125' 
 : 'bg-brass/30 hover:bg-brass/50'
 }`}
 />
 ))}
 </div>

 <Button
 variant="outline"
 size="sm"
 onClick={goToNext}
 className="border-brass text-brass hover:bg-brass/10"
 >
 <ChevronRight className="w-4 h-4" />
 </Button>
 </div>
 </div>
 </div>
 </section>
 );
};

export default TestimonialSlider;
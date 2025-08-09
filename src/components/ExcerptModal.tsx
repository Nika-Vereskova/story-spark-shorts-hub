
import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { posthog } from '@/lib/posthog';

interface ExcerptModalProps {
 isOpen: boolean;
 onClose: () => void;
}

const ExcerptModal = ({ isOpen, onClose }: ExcerptModalProps) => {
 const handleBuyPlumberella = () => {
 posthog.capture('book_purchase_clicked', {
 book_title: 'Plumberella',
 source: 'excerpt_modal'
 });
 
 window.open('https://amzn.eu/d/hmK81Zj', '_blank', 'noopener,noreferrer');
 };

 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
 <div className="bg-parchment border-2 border-brass max-w-4xl max-h-[90vh] overflow-y-auto relative">
 {/* Ornate brass corners */}
 <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-brass"></div>
 <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-brass"></div>
 <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-brass"></div>
 <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-brass"></div>
 
 <div className="p-8 pt-12">
 <button
 onClick={onClose}
 className="absolute top-4 right-4 text-oxidized-teal hover:text-brass transition-colors"
 >
 <X className="h-6 w-6" />
 </button>
 
 <h2 className="text-3xl font-bold text-oxidized-teal mb-6 font-playfair drop-shadow-text-drop text-center">
 Chapter 2. Plumberella
 </h2>
 
 <div className="prose prose-lg max-w-none text-oxidized-teal/90 leading-relaxed">
 <p className="mb-4">
 As you already know, Plumberella's birth was overshadowed by tragedy. When the time came to name the newborn, Henry, lost and heartbroken, sought some kind of anchor in the familiar. He looked at the shower in the bathroom, where he had just been soothing the baby, and thought: "Plumberella. Sweet, pure, like my life's true calling to make the world cleaner. I am the Plumber!" And so she was named Plumberella—not just officially, but also by love.
 </p>
 
 <p className="mb-4">
 The girl grew up calm, bright, and kind. As soon as she learned to firmly hold a wrench in her hands, she immediately began helping her father. Sometimes he took her along on jobs—thankfully, the clients didn't mind, and the girl was quieter than water and very capable.
 </p>
 
 <p className="mb-4">
 Sometimes she'd hand him an eight-millimeter wrench, or the wire cutters, or fish out the exact part from the toolbox as if by magic.
 </p>
 
 <p className="mb-4">
 By the age of seventeen, Plumberella was already quite proficient in plumbing. Henry proudly considered: maybe it was time to give her her first solo job? Especially since she wasn't just learning from him—she was attending the plumbing guild school. Of course, she was the only girl there. Moreover, the youngest: after the entrance exams, she had been allowed to skip two levels right away.
 </p>
 
 <p className="mb-4">
 But neither that nor the male-dominated environment fazed her. Plumberella was respected. For her intellect, composure, and directness. Some of the boys were even a little afraid of her: she not only knew the structure of a siphon better than any of them, but she could also snap off a sharp retort if someone started acting rude. The plunger—in her hands—was both a tool and a symbol of justice.
 </p>
 
 <p className="mb-4">
 And Plumberella adored reading. Books were like portals for her—she could immerse herself in any role: a princess, a scout, a space wizard... But there was no magic in her life. There were pipes, faucets, and work. Still, in rare free hours, you could find her at the library—among towers of books and the scent of old paper.
 </p>
 
 <p className="mb-4">
 That morning, Dad had left early. And since Plumberella's classes started later, she allowed herself the pleasure of lingering under the blanket, listening to the birds singing outside the window. In the kitchen, warm croissants waited for her—lovingly left by her father. She ate two and didn't regret it—the day promised to be interesting.
 </p>
 
 <p className="mb-4">
 While getting ready, she carefully arranged her tools in her pink toolbox—a gift from her father on her fifteenth birthday. Everything was sorted by color: wrenches—green, screwdrivers—blue, pliers—purple, like her lavender gloves. That made it easier for her to think.
 </p>
 
 <p className="mb-4">
 The day at school started briskly. Today's topic was the construction of toilet tanks. Theory was smooth, but a surprise awaited the students during practice. While the teacher was distracted checking notebooks, a few boys from the class decided to play a prank. The water tank of the training toilet was secretly opened, and thick green slime—brought from home by one of the students—was poured inside.
 </p>
 
 <p className="mb-4">
 The teacher, noticing nothing, began his explanation:
 </p>
 
 <p className="mb-4 italic">
 "So, dear apprentices, today we will learn how to diagnose faults in the flushing mechanism. One of you assembled the training setup yesterday. Let's see. I press the button—and…"
 </p>
 </div>
 
 <div className="mt-8 text-center">
 <Button 
 className="bg-oxidized-teal hover:bg-oxidized-teal-light text-parchment border-2 border-oxidized-teal-light shadow-inner-glow transition-all duration-300 hover:animate-steam-puff font-medium"
 onClick={handleBuyPlumberella}
 >
 Buy the Full Book on Amazon
 <ExternalLink className="ml-2 h-4 w-4" />
 </Button>
 </div>
 </div>
 </div>
 </div>
 );
};

export default ExcerptModal;


import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLocation } from 'react-router-dom';

const VisitorCounter = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const location = useLocation();

  const incrementVisits = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('increment-visits');
      
      if (error) {
        console.error('Error calling increment-visits function:', error);
        return;
      }

      if (data?.total_visits) {
        setVisitCount(data.total_visits);
      }
    } catch (error) {
      console.error('Error incrementing visits:', error);
    }
  };

  // Increment on initial load
  useEffect(() => {
    incrementVisits();
  }, []);

  // Re-fetch on route changes
  useEffect(() => {
    incrementVisits();
  }, [location.pathname]);

  // Don't render if we don't have a count (fail silently)
  if (visitCount === null) {
    return null;
  }

  return (
    <div 
      id="visit-counter"
      className="fixed bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-md text-xs font-semibold text-gray-800"
    >
      {visitCount.toLocaleString()} visits
    </div>
  );
};

export default VisitorCounter;

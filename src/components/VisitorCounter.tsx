
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLocation } from 'react-router-dom';

const VisitorCounter = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const incrementVisits = async () => {
    try {
      setError(null);
      console.log('Calling increment-visits function...');
      
      const { data, error } = await supabase.functions.invoke('increment-visits');
      
      console.log('Function response:', { data, error });
      
      if (error) {
        console.error('Error calling increment-visits function:', error);
        setError('Failed to update visit count');
        return;
      }

      if (data?.total_visits !== undefined) {
        setVisitCount(data.total_visits);
        console.log('Visit count updated to:', data.total_visits);
      } else {
        console.error('No total_visits in response:', data);
        setError('Invalid response format');
      }
    } catch (error) {
      console.error('Error incrementing visits:', error);
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  // Increment on initial load
  useEffect(() => {
    incrementVisits();
  }, []);

  // Re-fetch on route changes (but don't increment again)
  useEffect(() => {
    if (visitCount !== null) {
      console.log('Route changed to:', location.pathname);
      // Just log route changes, don't increment again
    }
  }, [location.pathname, visitCount]);

  // Always render something, even if there's an error
  if (error) {
    return (
      <div 
        id="visit-counter"
        className="fixed bottom-4 right-4 bg-red-100 text-red-800 p-3 rounded-xl shadow-md text-xs font-semibold"
      >
        Counter Error
      </div>
    );
  }

  if (isLoading) {
    return (
      <div 
        id="visit-counter"
        className="fixed bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-md text-xs font-semibold text-gray-800"
      >
        Loading...
      </div>
    );
  }

  return (
    <div 
      id="visit-counter"
      className="fixed bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-md text-xs font-semibold text-gray-800 z-50"
    >
      {visitCount ? visitCount.toLocaleString() : '0'} visits
    </div>
  );
};

export default VisitorCounter;

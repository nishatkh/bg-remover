import { createClient } from '@supabase/supabase-js';

// Remove unused Supabase client
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_ANON_KEY
// );

export const removeBackground = async (imageUrl: string): Promise<string> => {
  try {
    // Verify API key exists
    const apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY;
    if (!apiKey) {
      throw new Error('Remove.bg API key is not configured');
    }

    // Convert data URL to Blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Create form data
    const formData = new FormData();
    formData.append('image_file', blob);

    // Call remove.bg API
    const result = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: formData,
    });

    if (!result.ok) {
      const errorText = await result.text();
      console.error('Remove.bg API error:', {
        status: result.status,
        statusText: result.statusText,
        error: errorText
      });
      
      // Handle specific error cases
      if (result.status === 402) {
        throw new Error('API credit limit reached. Please check your remove.bg account.');
      } else if (result.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error(`Failed to remove background: ${result.statusText}`);
      }
    }

    // Convert the response to a data URL
    const processedBlob = await result.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(processedBlob);
    });
  } catch (error) {
    console.error('Error removing background:', error);
    throw error;
  }
};